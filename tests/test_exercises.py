"""Vérifie que tous les exercices YAML sont valides."""
import pytest
import yaml

from main import EXERCISES_DIR, load_exercises

YAML_FILES = sorted(EXERCISES_DIR.glob("*/*.yaml"))


def test_exercises_found():
    assert YAML_FILES, "Aucun exercice trouvé"


def test_all_exercises_load():
    loaded = sum(len(c.exercises) for c in load_exercises())
    assert loaded == len(YAML_FILES)


def test_exercise_ids_unique():
    ids = [e.id for c in load_exercises() for e in c.exercises]
    assert len(ids) == len(set(ids))


@pytest.mark.parametrize("path", YAML_FILES, ids=lambda p: f"{p.parent.name}/{p.name}")
def test_template_compiles(path):
    data = yaml.safe_load(path.read_text(encoding="utf-8"))
    compile(data["template"], str(path), "exec")
    assert data["tests"], "L'exercice n'a aucun test"


@pytest.mark.parametrize("path", YAML_FILES, ids=lambda p: f"{p.parent.name}/{p.name}")
def test_english_translation(path):
    data = yaml.safe_load(path.read_text(encoding="utf-8"))
    en = data.get("en")
    assert en, "Traduction anglaise manquante (bloc `en:`)"
    for field in ("title", "description", "template"):
        assert en.get(field), f"Champ `en.{field}` manquant"
    compile(en["template"], str(path), "exec")
    assert len(en.get("hints", [])) == len(data.get("hints", [])), "Pas le même nombre d'indices"
    assert len(en.get("tests", [])) == len(data["tests"]), "Pas le même nombre de tests"


def test_english_exercises_load():
    fr = [e for c in load_exercises("fr") for e in c.exercises]
    en = [e for c in load_exercises("en") for e in c.exercises]
    assert [e.id for e in en] == [e.id for e in fr]
    assert all(len(a.tests) == len(b.tests) for a, b in zip(fr, en))
