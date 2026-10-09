from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
import random
import re
import yaml
from typing import List, Dict, Optional, Tuple
from models import Exercise, Category, Lang, RunRequest, RunResponse, TestResult
from runner import code_runner
from feedback import explain
from checks import verify_checks

app = FastAPI(title="Python Learning Platform")

# Chemins
BASE_DIR = Path(__file__).parent
EXERCISES_DIR = BASE_DIR / "exercises"
STATIC_DIR = BASE_DIR / "static"

# Monter les fichiers statiques EN PREMIER (avant les routes)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


@app.middleware("http")
async def revalidate_frontend(request, call_next):
    """Le navigateur revalide la page et les fichiers statiques à chaque chargement (304 si inchangés),
    pour ne jamais mélanger un ancien index.html avec un nouvel app.js après une mise à jour"""
    response = await call_next(request)
    if request.url.path == "/" or request.url.path.startswith("/static/"):
        response.headers["Cache-Control"] = "no-cache"
    return response

# Le français est la langue de base des YAML ; les autres langues sont des blocs optionnels
LANGUAGES = ("fr", "en")
DEFAULT_LANG = "fr"

# Noms affichés des catégories (clé = nom du dossier sans préfixe numérique)
CATEGORY_NAMES = {
    "fr": {
        "variables": "print et variables",
        "types": "types de données",
        "calculs": "calculs",
        "conditions": "conditions",
        "boucle_for": "boucle for",
        "boucle_while": "boucle while",
        "tuples_ensembles": "tuples et ensembles",
        "fichiers_regex": "fichiers et regex",
    },
    "en": {
        "variables": "print and variables",
        "types": "data types",
        "calculs": "calculations",
        "conditions": "conditions",
        "boucle_for": "for loops",
        "boucle_while": "while loops",
        "fonctions": "functions",
        "strings": "strings",
        "listes": "lists",
        "tuples_ensembles": "tuples and sets",
        "dictionnaires": "dictionaries",
        "algorithmie": "algorithms",
        "exceptions": "exceptions",
        "modules": "modules",
        "fichiers_regex": "files and regex",
        "poo": "OOP",
        "projets": "projects",
    },
}

def lesson_path(category_dir: Path, lang: str) -> Path:
    """Fichier de leçon d'une catégorie : lecon.md (français) ou lecon.<lang>.md"""
    return category_dir / ("lecon.md" if lang == DEFAULT_LANG else f"lecon.{lang}.md")


def load_lesson(category_dir: Path, lang: str) -> Optional[str]:
    path = lesson_path(category_dir, lang)
    return path.read_text(encoding="utf-8") if path.is_file() else None


# Exercices intégrés aux leçons : bloc ~~~exercice (ou ```exercice) contenant du YAML (mêmes champs
# qu'un exercice). Préférer ~~~ : l'énoncé peut alors contenir des blocs ```text sans fermer le bloc.
LESSON_EXERCISE_RE = re.compile(r"^(```|~~~)exercice\n(.*?)^\1[ \t]*$", re.DOTALL | re.MULTILINE)


def parse_lesson(text: str, category_id: str) -> Tuple[str, List[Exercise]]:
    """
    Extrait les exercices d'une leçon. Chaque bloc est remplacé par un emplacement
    <div data-exercise-id="..."> que le frontend transforme en exercice interactif.
    Les id (<catégorie>-ex<n>) suivent l'ordre des blocs : identiques en FR et en EN.
    """
    exercises: List[Exercise] = []

    def replace(match):
        exercise_id = f"{category_id}-ex{len(exercises) + 1}"
        try:
            data = yaml.safe_load(match.group(2))
            exercise = Exercise(id=exercise_id, category=category_id, title=data.pop("title", ""), **data)
        except Exception as e:
            print(f"Erreur dans l'exercice {exercise_id} de la leçon : {e}")
            return ""
        exercises.append(exercise)
        return f'<div class="lesson-exercise" data-exercise-id="{exercise_id}"></div>'

    return LESSON_EXERCISE_RE.sub(replace, text), exercises


# Cache des exercices, par langue
exercises_cache: Dict[str, List[Category]] = {}
# Exercices des leçons (absents de la barre latérale et du score), par langue puis par id
lesson_exercises_cache: Dict[str, Dict[str, Exercise]] = {}


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
    for i, test in enumerate(base.get("tests", [])):
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
    lesson_exercises: Dict[str, Exercise] = {}

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
            lesson = load_lesson(category_dir, lang)
            if lesson:
                lesson, embedded = parse_lesson(lesson, category_name)
                lesson_exercises.update({e.id: e for e in embedded})
            categories[category_name] = Category(
                id=category_name,
                name=display_name,  # Utiliser le nom sans préfixe pour l'affichage
                lesson=lesson,
                exercises=exercises
            )

    result = list(categories.values())
    exercises_cache[lang] = result
    lesson_exercises_cache[lang] = lesson_exercises
    return result


def get_exercise_by_id(exercise_id: str, lang: str = DEFAULT_LANG) -> Exercise:
    """Récupère un exercice par son ID"""
    categories = load_exercises(lang)
    for category in categories:
        for exercise in category.exercises:
            if exercise.id == exercise_id:
                return exercise
    if exercise_id in lesson_exercises_cache[lang]:
        return lesson_exercises_cache[lang][exercise_id]
    raise HTTPException(status_code=404, detail="Exercice non trouvé")


@app.get("/")
async def root():
    """Sert la page principale"""
    return FileResponse(STATIC_DIR / "index.html")


@app.get("/api/categories")
async def get_categories(lang: Lang = DEFAULT_LANG) -> List[Category]:
    """Retourne toutes les catégories avec leurs exercices"""
    return load_exercises(lang)


def shuffle_lines(solution: str) -> List[str]:
    """Lignes non vides de la solution, mélangées (jamais dans l'ordre d'origine si possible)"""
    lines = [line for line in solution.splitlines() if line.strip()]
    shuffled = lines[:]
    if len(set(lines)) > 1:
        while shuffled == lines:
            random.shuffle(shuffled)
    return shuffled


@app.get("/api/exercise/{exercise_id}")
async def get_exercise(exercise_id: str, lang: Lang = DEFAULT_LANG) -> Exercise:
    """Retourne un exercice spécifique (pour un parsons : avec les lignes mélangées)"""
    exercise = get_exercise_by_id(exercise_id, lang)
    if exercise.type == "parsons":
        exercise = exercise.model_copy(update={"lines": shuffle_lines(exercise.solution)})
    return exercise


def normalize_output(text: str) -> List[str]:
    """Lignes d'une sortie, sans espaces de fin ni lignes vides au début et à la fin"""
    return [line.rstrip() for line in text.strip("\n").splitlines()] if text.strip() else []


def first_difference(answer: str, output: str) -> Optional[int]:
    """Numéro (à partir de 1) de la première ligne où la prédiction diffère, ou None si identique"""
    predicted, real = normalize_output(answer), normalize_output(output)
    for i, (a, b) in enumerate(zip(predicted, real), start=1):
        if a.strip() != b.strip():
            return i
    if len(predicted) != len(real):
        return min(len(predicted), len(real)) + 1
    return None


def predict_code(exercise: Exercise, step: Optional[int]) -> str:
    """Code de l'étape demandée : une étape intermédiaire, ou `code` (dernière étape)"""
    if step is not None and 0 <= step < len(exercise.steps):
        return exercise.steps[step]
    return exercise.code


def run_output_check(exercise: Exercise, request: RunRequest) -> RunResponse:
    """Compare ce qu'affiche le programme de l'élève à ce qu'affiche `exercise.solution`"""
    reference = code_runner.run_output(exercise.solution, exercise.data_files)
    if reference.get("error"):
        # La solution d'un exercice ne doit jamais échouer : erreur de l'exercice
        return RunResponse(success=False, tests=[], error=reference["error"], traceback=reference.get("traceback"))

    checks = exercise.checks
    variables = list(checks.variables) if checks else []
    results = code_runner.run_output(request.code, exercise.data_files, variables)
    if results.get("error"):
        explain(results, request.lang)
        return RunResponse(
            success=False, tests=[], error=results["error"], error_type=results.get("error_type"),
            lineno=results.get("lineno"), traceback=results.get("traceback"), feedback=results.get("feedback"),
        )

    output = results["output"]
    test = {"passed": False, "input": [], "expected": None}
    # D'abord la façon d'écrire le code (variables, instructions), puis ce qu'il affiche
    failed_check = verify_checks(request.code, results.get("variables", {}), checks)
    if failed_check:
        test["diagnostic"], test["detail"] = failed_check
    else:
        test["output_line"] = first_difference(output, reference["output"])
        test["passed"] = test["output_line"] is None
        if not test["passed"]:
            test["diagnostic"] = "output_mismatch" if output.strip() else "no_output"
    passed = test["passed"]
    explain({"tests": [test]}, request.lang)
    return RunResponse(success=passed, tests=[TestResult(**test)], output=output)


def run_predict(exercise: Exercise, request: RunRequest) -> RunResponse:
    """Compare la sortie prédite par l'élève à la sortie réelle du code de l'étape demandée"""
    results = code_runner.run_output(predict_code(exercise, request.step), exercise.data_files)
    if results.get("error"):
        # Le code d'un exercice predict ne doit jamais échouer : erreur de l'exercice
        return RunResponse(success=False, tests=[], error=results["error"], traceback=results.get("traceback"))

    output = results["output"]
    lineno = first_difference(request.answer or "", output)
    passed = lineno is None
    test = {"passed": passed, "input": [], "expected": None, "lineno": lineno,
            "diagnostic": None if passed else "predict_mismatch"}
    explain({"tests": [test]}, request.lang)
    return RunResponse(
        success=passed,
        tests=[TestResult(**test)],
        output=output if passed or request.reveal else None,
    )


@app.post("/api/run")
async def run_code(request: RunRequest) -> RunResponse:
    """
    Exécute le code de l'élève et retourne les résultats des tests
    """
    try:
        # Récupérer l'exercice
        exercise = get_exercise_by_id(request.exercise_id, request.lang)
        if exercise.type == "predict":
            return run_predict(exercise, request)
        if exercise.checks_output():
            return run_output_check(exercise, request)

        # Exécuter le code
        results = code_runner.run_code(
            code=request.code,
            tests=exercise.tests,
            data_files=exercise.data_files
        )

        # Ajouter les explications pédagogiques des erreurs
        results = explain(results, request.lang)

        return RunResponse(
            success=results["success"],
            tests=[TestResult(**test_data) for test_data in results.get("tests", [])],
            error=results.get("error"),
            error_type=results.get("error_type"),
            lineno=results.get("lineno"),
            traceback=results.get("traceback"),
            feedback=results.get("feedback"),
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
    print("Démarrage de la plateforme d'apprentissage Python...")
    print("Accédez à http://localhost:8000")
    uvicorn.run(app, host="127.0.0.1", port=8000)
