import subprocess
import sys
import json
import traceback
from typing import List, Any, Dict
from models import Test, TestResult


class CodeRunner:
    """Exécute le code des élèves de manière sécurisée"""

    def __init__(self, timeout: int = 3):
        self.timeout = timeout

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
        # Préparer le script de test
        test_script = self._prepare_test_script(code, tests, data_files or [])

        try:
            # Exécuter dans un subprocess isolé
            result = subprocess.run(
                [sys.executable, "-c", test_script],
                capture_output=True,
                text=True,
                timeout=self.timeout,
                cwd="/Users/arcadiamc/Desktop/Cours/A2/Batterie exercice python"
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
                "traceback": None
            }
        except Exception as e:
            return {
                "success": False,
                "tests": [],
                "error": f"Erreur interne: {str(e)}",
                "traceback": traceback.format_exc()
            }

    def _prepare_test_script(self, code: str, tests: List[Test], data_files: List[str]) -> str:
        """Prépare le script qui sera exécuté pour tester le code"""

        # Créer le code de test
        test_code = f"""
import json
import sys
import traceback

# Code de l'élève
{code}

# Tests
results = {{
    "success": True,
    "tests": [],
    "error": None,
    "traceback": None
}}

tests_json = '''{json.dumps([{"input": t.input, "expected": t.expected, "description": t.description, "hidden": t.hidden} for t in tests])}'''
tests = json.loads(tests_json)

for test in tests:
    test_result = {{
        "passed": False,
        "input": test["input"],
        "expected": test["expected"],
        "actual": None,
        "error": None,
        "description": test.get("description"),
        "hidden": test.get("hidden", False)
    }}

    try:
        # Extraire le nom de la fonction depuis le code
        # Cherche toutes les fonctions définies au niveau module (pas dans les classes)
        import re
        # Trouve toutes les fonctions qui ne sont pas indentées (= au niveau module)
        func_matches = re.findall(r'^def\\s+(\\w+)\\s*\\(', '''{code}''', re.MULTILINE)
        if not func_matches:
            test_result["error"] = "Aucune fonction trouvée dans le code"
            results["tests"].append(test_result)
            results["success"] = False
            continue

        # Prend la dernière fonction définie (celle à tester)
        func_name = func_matches[-1]

        # Appeler la fonction
        func = globals()[func_name]
        actual = func(*test["input"])
        test_result["actual"] = actual

        # Vérifier le résultat
        if actual == test["expected"]:
            test_result["passed"] = True
        else:
            results["success"] = False

    except Exception as e:
        test_result["error"] = str(e)
        test_result["traceback"] = traceback.format_exc()
        results["success"] = False

    results["tests"].append(test_result)

# Afficher les résultats en JSON
print(json.dumps(results))
"""
        return test_code


# Instance globale
code_runner = CodeRunner()
