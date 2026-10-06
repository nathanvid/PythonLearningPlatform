from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
import yaml
from typing import List, Dict
from models import Exercise, Category, Lang, RunRequest, RunResponse, TestResult
from runner import code_runner

app = FastAPI(title="Python Learning Platform")

# Chemins
BASE_DIR = Path(__file__).parent
EXERCISES_DIR = BASE_DIR / "exercises"
STATIC_DIR = BASE_DIR / "static"

# Monter les fichiers statiques EN PREMIER (avant les routes)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# Le français est la langue de base des YAML ; les autres langues sont des blocs optionnels
LANGUAGES = ("fr", "en")
DEFAULT_LANG = "fr"

# Noms affichés des catégories (clé = nom du dossier sans préfixe numérique)
CATEGORY_NAMES = {
    "en": {
        "bases": "basics",
        "listes": "lists",
        "dictionnaires": "dictionaries",
        "fonctions": "functions",
        "algorithmie": "algorithms",
        "poo": "OOP",
        "exceptions": "exceptions",
        "strings": "strings",
        "modules": "modules",
    },
}

# Cache des exercices, par langue
exercises_cache: Dict[str, List[Category]] = {}


def localize(data: dict, lang: str) -> dict:
    """
    Applique la traduction `lang` d'un exercice YAML.

    Le bloc de traduction peut remplacer title, description, template, hints,
    et contient `tests` : une liste alignée sur les tests d'origine, où chaque
    élément est soit la description traduite, soit un dict de champs à remplacer
    (ex: expected quand la sortie attendue est du texte).
    """
    base = {k: v for k, v in data.items() if k not in LANGUAGES}
    translation = data.get(lang) if lang != DEFAULT_LANG else None
    if not translation:
        return base

    base.update({k: v for k, v in translation.items() if k != "tests"})
    tests_tr = translation.get("tests", [])
    tests = []
    for i, test in enumerate(base["tests"]):
        override = tests_tr[i] if i < len(tests_tr) else {}
        if isinstance(override, str):
            override = {"description": override}
        tests.append({**test, **override})
    base["tests"] = tests
    return base


def load_exercises(lang: str = DEFAULT_LANG) -> List[Category]:
    """Charge tous les exercices organisés par catégories, dans la langue demandée"""
    if lang in exercises_cache:
        return exercises_cache[lang]

    categories = {}

    # Parcourir les dossiers de catégories
    if not EXERCISES_DIR.exists():
        EXERCISES_DIR.mkdir(parents=True)
        return []

    for category_dir in sorted(EXERCISES_DIR.iterdir()):
        if not category_dir.is_dir():
            continue

        # Enlever le préfixe numérique (ex: "01_bases" → "bases")
        category_name = category_dir.name
        display_name = category_name.split('_', 1)[1] if '_' in category_name else category_name
        display_name = CATEGORY_NAMES.get(lang, {}).get(display_name, display_name)
        exercises = []

        # Charger tous les fichiers YAML dans la catégorie
        for yaml_file in sorted(category_dir.glob("*.yaml")):
            try:
                with open(yaml_file, "r", encoding="utf-8") as f:
                    data = localize(yaml.safe_load(f), lang)
                    data["category"] = category_name
                    exercise = Exercise(**data)
                    exercises.append(exercise)
            except Exception as e:
                print(f"Erreur lors du chargement de {yaml_file}: {e}")

        if exercises:
            categories[category_name] = Category(
                name=display_name,  # Utiliser le nom sans préfixe pour l'affichage
                exercises=exercises
            )

    result = list(categories.values())
    exercises_cache[lang] = result
    return result


def get_exercise_by_id(exercise_id: str, lang: str = DEFAULT_LANG) -> Exercise:
    """Récupère un exercice par son ID"""
    categories = load_exercises(lang)
    for category in categories:
        for exercise in category.exercises:
            if exercise.id == exercise_id:
                return exercise
    raise HTTPException(status_code=404, detail="Exercice non trouvé")


@app.get("/")
async def root():
    """Sert la page principale"""
    return FileResponse(STATIC_DIR / "index.html")


@app.get("/api/categories")
async def get_categories(lang: Lang = DEFAULT_LANG) -> List[Category]:
    """Retourne toutes les catégories avec leurs exercices"""
    return load_exercises(lang)


@app.get("/api/exercise/{exercise_id}")
async def get_exercise(exercise_id: str, lang: Lang = DEFAULT_LANG) -> Exercise:
    """Retourne un exercice spécifique"""
    return get_exercise_by_id(exercise_id, lang)


@app.post("/api/run")
async def run_code(request: RunRequest) -> RunResponse:
    """
    Exécute le code de l'élève et retourne les résultats des tests
    """
    try:
        # Récupérer l'exercice
        exercise = get_exercise_by_id(request.exercise_id, request.lang)

        # Exécuter le code
        results = code_runner.run_code(
            code=request.code,
            tests=exercise.tests,
            data_files=exercise.data_files
        )

        # Convertir en TestResult objects
        test_results = []
        for test_data in results.get("tests", []):
            test_result = TestResult(
                passed=test_data["passed"],
                input=test_data["input"],
                expected=test_data["expected"],
                actual=test_data.get("actual"),
                error=test_data.get("error"),
                description=test_data.get("description"),
                hidden=test_data.get("hidden", False)
            )
            test_results.append(test_result)

        return RunResponse(
            success=results["success"],
            tests=test_results,
            error=results.get("error"),
            traceback=results.get("traceback")
        )

    except HTTPException:
        raise
    except Exception as e:
        return RunResponse(
            success=False,
            tests=[],
            error=f"Erreur serveur: {str(e)}",
            traceback=None
        )


if __name__ == "__main__":
    import uvicorn
    print("🚀 Démarrage de la plateforme d'apprentissage Python...")
    print("📚 Accédez à http://localhost:8000")
    uvicorn.run(app, host="127.0.0.1", port=8000)
