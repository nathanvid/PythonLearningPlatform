"""Vérifie que tous les exercices YAML sont valides."""
import re

import pytest
import yaml

from main import EXERCISES_DIR, LANGUAGES, LESSON_EXERCISE_RE, lesson_exercises_cache, lesson_path, load_exercises, localize
from checks import verify_checks
from models import Test as Case
from runner import CodeRunner

runner = CodeRunner(timeout=10)
# Pour les templates : certains bouclent à l'infini exprès (exercice à corriger)
quick_runner = CodeRunner(timeout=2)

YAML_FILES = sorted(EXERCISES_DIR.glob("*/*.yaml"))


def test_exercises_found():
    assert YAML_FILES, "Aucun exercice trouvé"


def test_all_exercises_load():
    loaded = sum(len(c.exercises) for c in load_exercises())
    assert loaded == len(YAML_FILES)


def test_exercise_ids_unique():
    ids = [e.id for c in load_exercises() for e in c.exercises]
    assert len(ids) == len(set(ids))


# Champs obligatoires (à traduire dans `en:`) selon le type d'exercice
REQUIRED_FIELDS = {
    "write": ("title", "description", "template"),
    "fix": ("title", "description", "template"),
    "predict": ("title", "description"),
    "parsons": ("title", "description"),
    "output": ("title", "description"),
}


def read(path):
    return yaml.safe_load(path.read_text(encoding="utf-8"))


def ids(path):
    return f"{path.parent.name}/{path.name}"


@pytest.mark.parametrize("path", YAML_FILES, ids=ids)
def test_required_fields(path):
    data = read(path)
    kind = data.get("type", "write")
    assert kind in REQUIRED_FIELDS, f"Type inconnu : {kind}"
    for field in REQUIRED_FIELDS[kind]:
        assert data.get(field), f"Champ `{field}` manquant"
    if kind == "predict":
        assert data.get("code"), "Un exercice predict doit avoir un `code`"
        assert not data.get("tests"), "Un exercice predict n'a pas de tests"
    elif kind == "write":
        assert data.get("tests"), "L'exercice n'a aucun test"
    elif kind == "output":
        assert not data.get("tests"), "Un exercice output est corrigé sur son affichage, sans tests"
    # fix / parsons : avec tests, on teste une fonction ; sans tests, on compare l'affichage
    if kind in ("fix", "parsons", "output"):
        assert data.get("solution"), f"Un exercice {kind} doit avoir une `solution`"


def validate(exercise):
    """Vérifie qu'un exercice (YAML ou intégré à une leçon) est cohérent et faisable"""
    name = exercise.id
    data_files = exercise.data_files

    if exercise.type == "predict":
        # Chaque étape intermédiaire est un programme complet, comme le code final
        for code in [*exercise.steps, exercise.code]:
            result = runner.run_output(code, data_files)
            assert not result.get("error"), f"{name} :\n{result.get('traceback')}"
            assert result["output"].strip(), f"{name} : le code doit afficher quelque chose :\n{code}"
        return

    if exercise.template and exercise.type != "fix":  # un template fix peut planter exprès
        compile(exercise.template, name, "exec")

    if exercise.checks_output():
        checks = exercise.checks
        variables = list(checks.variables) if checks else []
        reference = runner.run_output(exercise.solution, data_files, variables)
        assert not reference.get("error"), f"{name} : la solution plante\n{reference.get('traceback')}"
        assert reference["output"].strip(), f"{name} : la solution n'affiche rien"
        assert verify_checks(exercise.solution, reference["variables"], checks) is None, \
            f"{name} : la solution ne respecte pas ses propres checks"
        if exercise.template:
            got = quick_runner.run_output(exercise.template, data_files, variables)
            already_right = (not got.get("error") and got["output"] == reference["output"]
                             and verify_checks(exercise.template, got["variables"], checks) is None)
            assert not already_right, f"{name} : le template est déjà juste"
        if checks:
            # Recopier l'affichage attendu avec des print ne doit pas suffire
            cheat = "\n".join(f"print({line!r})" for line in reference["output"].splitlines())
            cheat_vars = runner.run_output(cheat, variables=variables)["variables"]
            assert verify_checks(cheat, cheat_vars, checks) is not None, \
                f"{name} : les checks laissent passer un simple print de la réponse"
    elif exercise.solution:
        result = runner.run_code(exercise.solution, exercise.tests, data_files)
        failed = [t for t in result["tests"] if not t["passed"]]
        assert result["success"], f"{name} : {result.get('traceback') or failed}"
        if exercise.type == "fix":
            assert not quick_runner.run_code(exercise.template, exercise.tests, data_files)["success"], \
                f"{name} : le template d'un exercice fix doit échouer aux tests"


def exercises_by_id(lang):
    return {e.id: e for c in load_exercises(lang) for e in c.exercises}


@pytest.mark.parametrize("lang", LANGUAGES)
@pytest.mark.parametrize("path", YAML_FILES, ids=ids)
def test_exercise_valid(path, lang):
    validate(exercises_by_id(lang)[read(path)["id"]])


@pytest.mark.parametrize("path", YAML_FILES, ids=ids)
def test_english_translation(path):
    data = read(path)
    en = data.get("en")
    assert en, "Traduction anglaise manquante (bloc `en:`)"
    for field in REQUIRED_FIELDS[data.get("type", "write")]:
        assert en.get(field), f"Champ `en.{field}` manquant"
    if en.get("template"):
        compile(en["template"], str(path), "exec")
    assert len(en.get("hints", [])) == len(data.get("hints", [])), "Pas le même nombre d'indices"
    assert len(en.get("tests", [])) == len(data.get("tests", [])), "Pas le même nombre de tests"
    assert len(en.get("steps", [])) == len(data.get("steps", [])), "Pas le même nombre d'étapes"


def test_english_exercises_load():
    fr = [e for c in load_exercises("fr") for e in c.exercises]
    en = [e for c in load_exercises("en") for e in c.exercises]
    assert [e.id for e in en] == [e.id for e in fr]
    assert all(len(a.tests) == len(b.tests) for a, b in zip(fr, en))


CATEGORY_DIRS = sorted(d for d in EXERCISES_DIR.iterdir() if d.is_dir())


@pytest.mark.parametrize("lang", LANGUAGES)
@pytest.mark.parametrize("category_dir", CATEGORY_DIRS, ids=lambda d: d.name)
def test_lesson_exists(category_dir, lang):
    path = lesson_path(category_dir, lang)
    assert path.is_file(), f"Leçon manquante : {path.name}"
    text = path.read_text(encoding="utf-8")
    assert text.startswith("# "), "La leçon doit commencer par un titre « # … »"
    assert "```python" in text, "La leçon doit contenir au moins un exemple de code"


CODE_BLOCK = re.compile(r"```python\n(.*?)```", re.DOTALL)


@pytest.mark.parametrize("lang", LANGUAGES)
@pytest.mark.parametrize("category_dir", CATEGORY_DIRS, ids=lambda d: d.name)
def test_lesson_examples_run(category_dir, lang):
    # Chaque exemple de la leçon doit s'exécuter sans erreur
    path = lesson_path(category_dir, lang)
    if not path.is_file():
        pytest.skip("Leçon manquante")
    for block in CODE_BLOCK.findall(path.read_text(encoding="utf-8")):
        result = runner.run_output(block)
        assert not result.get("error"), f"{block}\n{result.get('traceback')}"



# --- Exercices intégrés aux leçons (blocs ```exercice) ---

LESSON_TYPES = ("predict", "output", "write", "fix")


def lesson_exercises(lang):
    load_exercises(lang)
    return lesson_exercises_cache[lang]


@pytest.mark.parametrize("lang", LANGUAGES)
@pytest.mark.parametrize("category_dir", CATEGORY_DIRS, ids=lambda d: d.name)
def test_lesson_exercises_all_parsed(category_dir, lang):
    # Un bloc invalide est ignoré au chargement : on vérifie qu'aucun n'a été perdu
    path = lesson_path(category_dir, lang)
    if not path.is_file():
        pytest.skip("Leçon manquante")
    blocks = LESSON_EXERCISE_RE.findall(path.read_text(encoding="utf-8"))
    parsed = [e for e in lesson_exercises(lang).values() if e.category == category_dir.name]
    assert len(parsed) == len(blocks)


def test_lesson_exercises_same_in_all_languages():
    fr = {i: e.type for i, e in lesson_exercises("fr").items()}
    en = {i: e.type for i, e in lesson_exercises("en").items()}
    assert fr == en


@pytest.mark.parametrize("lang", LANGUAGES)
def test_lesson_exercises_valid(lang):
    for exercise in lesson_exercises(lang).values():
        assert exercise.type in LESSON_TYPES, exercise.id
        assert exercise.description.strip(), exercise.id
        validate(exercise)
