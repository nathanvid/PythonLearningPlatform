from pydantic import BaseModel
from typing import List, Optional, Any


class Test(BaseModel):
    """Représente un test pour un exercice"""
    input: List[Any]
    expected: Any
    description: Optional[str] = None
    hidden: bool = False  # Si True, les détails du test ne seront pas affichés


class Exercise(BaseModel):
    """Représente un exercice complet"""
    id: str
    title: str
    description: str
    template: str
    hints: List[str] = []
    tests: List[Test]
    category: str
    data_files: Optional[List[str]] = None  # Fichiers de données nécessaires


class Category(BaseModel):
    """Représente une catégorie d'exercices"""
    name: str
    exercises: List[Exercise]


class RunRequest(BaseModel):
    """Requête pour exécuter du code"""
    code: str
    exercise_id: str


class TestResult(BaseModel):
    """Résultat d'un test individuel"""
    passed: bool
    input: List[Any]
    expected: Any
    actual: Any = None
    error: Optional[str] = None
    description: Optional[str] = None
    hidden: bool = False  # Si True, masquer les détails dans le frontend


class RunResponse(BaseModel):
    """Réponse après exécution du code"""
    success: bool
    tests: List[TestResult]
    error: Optional[str] = None  # Erreur globale (syntaxe, timeout, etc.)
    traceback: Optional[str] = None


class ProgressData(BaseModel):
    """Données de progression sauvegardées"""
    exercise_id: str
    code: str
    score: float  # Pourcentage de tests réussis (0-100)
    completed: bool  # True si tous les tests passent
