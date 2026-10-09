from pydantic import BaseModel, Field
from typing import Any, Dict, List, Literal, Optional

# Langues disponibles pour les exercices et l'interface
Lang = Literal["fr", "en"]

# Types d'exercices (approche PRIMM : lire et modifier avant d'écrire)
# - write   : écrire la fonction à partir du template
# - fix     : le template contient un bug à corriger
# - predict : prédire ce qu'affiche `code` (pas de tests, la sortie réelle sert de référence)
# - parsons : remettre dans l'ordre les lignes de `solution`
# - output  : écrire un programme qui affiche la même chose que `solution` (sans fonction)
# Un fix ou un parsons sans `tests` est corrigé comme un output : on compare ce qu'il affiche.
ExerciseType = Literal["write", "fix", "predict", "parsons", "output"]


class Test(BaseModel):
    """Représente un test pour un exercice"""
    input: List[Any]
    expected: Any
    description: Optional[str] = None
    hidden: bool = False  # Si True, les détails du test ne seront pas affichés


class OutputChecks(BaseModel):
    """Exigences sur la façon d'écrire le code d'un exercice output (cf. checks.py)"""
    variables: Dict[str, Any] = {}  # variables qui doivent exister, avec leur valeur finale
    uses: List[str] = []  # noms qui doivent être lus dans le code (pas seulement affectés)
    constructs: List[Literal["if", "elif", "else", "and", "or", "not", "+=", "for", "while", "def", "return"]] = []


class Exercise(BaseModel):
    """Représente un exercice complet"""

    id: str
    type: ExerciseType = "write"
    title: str
    description: str
    template: str = ""
    hints: List[str] = []
    tests: List[Test] = []
    code: Optional[str] = None  # predict : code à lire
    steps: List[str] = []  # predict : étapes intermédiaires (code de plus en plus long), avant `code`
    solution: Optional[str] = Field(default=None, exclude=True)  # jamais envoyée au client
    lines: Optional[List[str]] = None  # parsons : lignes de la solution, mélangées par l'API
    checks: Optional[OutputChecks] = Field(default=None, exclude=True)  # output : exigences sur le code
    category: str
    data_files: Optional[List[str]] = None  # Fichiers de données nécessaires

    def checks_output(self) -> bool:
        """Corrigé sur ce que le programme affiche (et non en appelant une fonction avec des tests)"""
        return self.type == "output" or (self.type in ("fix", "parsons") and not self.tests)


class Category(BaseModel):
    """Représente une catégorie d'exercices"""
    id: str  # Nom du dossier (ex: "01_bases")
    name: str
    lesson: Optional[str] = None  # Leçon en Markdown (lecon.md / lecon.en.md)
    exercises: List[Exercise]


class RunRequest(BaseModel):
    """Requête pour exécuter du code"""
    code: str = ""
    exercise_id: str
    lang: Lang = "fr"
    answer: Optional[str] = None  # predict : sortie prédite par l'élève
    reveal: bool = False  # predict : renvoyer la sortie réelle même si la réponse est fausse
    step: Optional[int] = None  # predict : index de l'étape (len(steps) ou None = `code`)


class TestResult(BaseModel):
    """Résultat d'un test individuel"""
    passed: bool
    input: List[Any]
    expected: Any
    actual: Any = None
    error: Optional[str] = None
    description: Optional[str] = None
    hidden: bool = False  # Si True, masquer les détails dans le frontend
    error_type: Optional[str] = None  # Nom de l'exception (ex: "NameError")
    lineno: Optional[int] = None  # Ligne de l'erreur dans le code élève
    traceback: Optional[str] = None  # Limité au code élève
    diagnostic: Optional[str] = None  # Erreur de débutant reconnue (cf. feedback.DIAGNOSTICS)
    feedback: Optional[str] = None  # Explication pédagogique dans la langue demandée


class RunResponse(BaseModel):
    """Réponse après exécution du code"""
    success: bool
    tests: List[TestResult]
    error: Optional[str] = None  # Erreur globale (syntaxe, timeout, etc.)
    error_type: Optional[str] = None
    lineno: Optional[int] = None
    traceback: Optional[str] = None
    feedback: Optional[str] = None
    output: Optional[str] = None  # predict : sortie réelle du code (si réussi ou révélé)


class ProgressData(BaseModel):
    """Données de progression sauvegardées"""
    exercise_id: str
    code: str
    score: float  # Pourcentage de tests réussis (0-100)
    completed: bool  # True si tous les tests passent
