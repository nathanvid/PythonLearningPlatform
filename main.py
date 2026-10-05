from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
import yaml
from typing import List, Dict
from models import Exercise, Category, RunRequest, RunResponse, TestResult
from runner import code_runner

app = FastAPI(title="Python Learning Platform")

# Chemins
BASE_DIR = Path(__file__).parent
EXERCISES_DIR = BASE_DIR / "exercises"
STATIC_DIR = BASE_DIR / "static"

# Monter les fichiers statiques EN PREMIER (avant les routes)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# Cache des exercices
exercises_cache: Dict[str, List[Category]] = {}


def load_exercises() -> List[Category]:
    """Charge tous les exercices organisés par catégories"""
    if exercises_cache:
        return exercises_cache.get("categories", [])

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
        exercises = []

        # Charger tous les fichiers YAML dans la catégorie
        for yaml_file in sorted(category_dir.glob("*.yaml")):
            try:
                with open(yaml_file, "r", encoding="utf-8") as f:
                    data = yaml.safe_load(f)
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
    exercises_cache["categories"] = result
    return result


def get_exercise_by_id(exercise_id: str) -> Exercise:
    """Récupère un exercice par son ID"""
    categories = load_exercises()
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
async def get_categories() -> List[Category]:
    """Retourne toutes les catégories avec leurs exercices"""
    return load_exercises()


@app.get("/api/exercise/{exercise_id}")
async def get_exercise(exercise_id: str) -> Exercise:
    """Retourne un exercice spécifique"""
    return get_exercise_by_id(exercise_id)


@app.post("/api/run")
async def run_code(request: RunRequest) -> RunResponse:
    """
    Exécute le code de l'élève et retourne les résultats des tests
    """
    try:
        # Récupérer l'exercice
        exercise = get_exercise_by_id(request.exercise_id)

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
