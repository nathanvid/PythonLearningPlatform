import json
import os
import shutil
import subprocess
import sys
import tempfile
import traceback
from pathlib import Path
from typing import List, Dict
from models import Test

BASE_DIR = Path(__file__).parent
HARNESS = BASE_DIR / "harness.py"


class CodeRunner:
    """Exécute le code des élèves de manière sécurisée"""

    def __init__(self, timeout: int = 3):
        self.timeout = timeout

    def run_output(self, code: str, data_files: List[str] = None, variables: List[str] = None) -> Dict:
        """
        Exécute le code sans test et renvoie ce qu'il affiche (clé `output`),
        ainsi que la valeur finale des `variables` demandées (clé `variables`)
        """
        payload = {"code": code, "tests": [], "mode": "output", "variables": variables or []}
        return self._run_harness(payload, data_files)

    def run_code(self, code: str, tests: List[Test], data_files: List[str] = None) -> Dict:
        """
        Exécute le code avec les tests fournis

        Args:
            code: Le code Python de l'élève
            tests: Liste des tests à exécuter
            data_files: Liste des fichiers de données accessibles

        Returns:
            Dict avec success, tests results, error, traceback
        """
        return self._run_harness({
            "code": code,
            "tests": [t.model_dump() for t in tests],
        }, data_files)

    def _run_harness(self, payload: Dict, data_files: List[str] = None) -> Dict:
        """Lance harness.py dans un subprocess et renvoie son JSON"""
        payload = json.dumps(payload)

        # Variables d'environnement : forcer l'UTF-8 (Windows utilise cp1252 par défaut)
        env = {**os.environ, "PYTHONIOENCODING": "utf-8", "PYTHONUTF8": "1"}

        try:
            # Exécuter dans un subprocess isolé, dans un dossier temporaire
            with tempfile.TemporaryDirectory(ignore_cleanup_errors=True) as workdir:
                self._copy_data_files(data_files or [], Path(workdir))
                result = subprocess.run(
                    [sys.executable, str(HARNESS)],
                    input=payload,
                    capture_output=True,
                    text=True,
                    encoding="utf-8",
                    errors="replace",
                    timeout=self.timeout,
                    cwd=workdir,
                    env=env,
                )

            # Parser les résultats JSON
            if result.returncode == 0:
                output = result.stdout.strip()
                if output:
                    results = json.loads(output)
                    return results
                else:
                    return {
                        "success": False,
                        "tests": [],
                        "error": "Aucune sortie du programme",
                        "traceback": None
                    }
            else:
                # Erreur d'exécution
                error_output = result.stderr.strip()
                return {
                    "success": False,
                    "tests": [],
                    "error": "Erreur d'exécution",
                    "traceback": error_output
                }

        except subprocess.TimeoutExpired:
            return {
                "success": False,
                "tests": [],
                "error": f"Timeout: le code a pris plus de {self.timeout} secondes",
                "error_type": "Timeout",
                "traceback": None
            }
        except Exception as e:
            return {
                "success": False,
                "tests": [],
                "error": f"Erreur interne: {str(e)}",
                "traceback": traceback.format_exc()
            }

    @staticmethod
    def _copy_data_files(data_files: List[str], workdir: Path) -> None:
        """Copie les fichiers de données (chemins relatifs au projet) dans le dossier d'exécution"""
        for name in data_files:
            src = BASE_DIR / name
            if src.is_file():
                shutil.copy(src, workdir / src.name)


# Instance globale
code_runner = CodeRunner()
