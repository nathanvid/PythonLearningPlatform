"""Tests de l'API FastAPI."""
from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_index():
    response = client.get("/")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]


def test_static_files():
    for name in ("app.js", "style.css"):
        response = client.get(f"/static/{name}")
        assert response.status_code == 200
        assert response.headers["cache-control"] == "no-cache"


def test_categories():
    categories = client.get("/api/categories").json()
    assert len(categories) == 17


def test_unknown_exercise():
    assert client.get("/api/exercise/inexistant").status_code == 404


def test_run_addition():
    response = client.post("/api/run", json={
        "exercise_id": "addition",
        "code": "def add(a, b):\n    return a + b\n",
    })
    data = response.json()
    assert data["success"]
    assert any(t["hidden"] for t in data["tests"])


def test_categories_english():
    categories = client.get("/api/categories", params={"lang": "en"}).json()
    assert categories[0]["name"] == "print and variables"
    functions = next(c for c in categories if c["id"] == "07_fonctions")
    titles = {e["id"]: e["title"] for e in functions["exercises"]}
    assert titles["addition"] == "Adding two numbers"


def test_unknown_lang():
    assert client.get("/api/categories", params={"lang": "de"}).status_code == 422


def test_run_uses_language_tests():
    # La sortie attendue de cet exercice est du texte, traduit selon la langue
    code = "def create_dog_speak(name, breed):\n    return f'Woof! I am {name}'\n"
    en = client.post("/api/run", json={"exercise_id": "inheritance_animal", "code": code, "lang": "en"})
    fr = client.post("/api/run", json={"exercise_id": "inheritance_animal", "code": code})
    assert en.json()["success"]
    assert not fr.json()["success"]


def test_run_returns_feedback():
    response = client.post("/api/run", json={
        "exercise_id": "addition",
        "code": "def add(a, b):\n    print(a + b)\n",
        "lang": "en",
    })
    test = response.json()["tests"][0]
    assert test["diagnostic"] == "print_not_return"
    assert test["feedback"] == "Your function prints the right result with `print`, but it must **return** it with `return`."


def test_run_global_error_feedback():
    data = client.post("/api/run", json={"exercise_id": "addition", "code": "def add(a, b)\n"}).json()
    assert data["error_type"] == "SyntaxError"
    assert data["lineno"] == 1
    assert data["feedback"].startswith("Python n'arrive pas")


# --- Exercices predict et parsons ---

def test_parsons_hides_solution():
    data = client.get("/api/exercise/parsons_count_positives").json()
    assert "solution" not in data
    expected = [
        "def count_positives(numbers):",
        "    count = 0",
        "    for n in numbers:",
        "        if n > 0:",
        "            count += 1",
        "    return count",
    ]
    assert sorted(data["lines"]) == sorted(expected)
    assert data["lines"] != expected


def test_solution_never_in_categories():
    categories = client.get("/api/categories").json()
    assert all("solution" not in e for c in categories for e in c["exercises"])


def test_parsons_run_assembled_code():
    lines = [
        "def count_positives(numbers):",
        "    count = 0",
        "    for n in numbers:",
        "        if n > 0:",
        "            count += 1",
        "    return count",
    ]
    data = client.post("/api/run", json={"exercise_id": "parsons_count_positives", "code": "\n".join(lines)}).json()
    assert data["success"]


def predict(answer, reveal=False, lang="fr", step=None):
    return client.post("/api/run", json={
        "exercise_id": "predict_variables_loop", "answer": answer, "reveal": reveal, "lang": lang, "step": step,
    }).json()


def test_predict_correct():
    # Espaces de fin et lignes vides autour sont tolérés
    data = predict("4 6  \n0\n4\n8\n\n")
    assert data["success"]
    assert data["output"] == "4 6\n0\n4\n8\n"


def test_predict_wrong_hides_output():
    data = predict("4 6\n0\n3\n6")
    assert not data["success"]
    assert data["output"] is None
    assert data["tests"][0]["lineno"] == 3
    assert "ligne 3" in data["tests"][0]["feedback"]


def test_predict_too_short():
    assert predict("4 6\n0", lang="en")["tests"][0]["feedback"].startswith("Your prediction differs from the real output from line 3")


def test_predict_reveal():
    data = predict("", reveal=True)
    assert not data["success"]
    assert data["output"] == "4 6\n0\n4\n8\n"


def test_predict_steps():
    # Les étapes intermédiaires exécutent leur propre code ; la dernière étape est `code`
    steps = client.get("/api/exercise/predict_variables_loop").json()["steps"]
    assert len(steps) == 4
    assert predict("3", step=0)["success"]
    assert predict("6", step=1)["output"] == "6\n"
    assert not predict("4 6", step=1)["success"]
    assert predict("4 6\n0\n4\n8", step=len(steps))["success"]



# --- Exercices intégrés aux leçons et type output ---

def test_lesson_has_exercise_slots():
    lesson = client.get("/api/categories").json()[0]["lesson"]
    assert '<div class="lesson-exercise" data-exercise-id="01_variables-ex1"></div>' in lesson
    assert "exercice\n" not in lesson


def test_lesson_exercise_hides_solution():
    data = client.get("/api/exercise/01_variables-ex1").json()
    assert data["type"] == "output"
    assert "solution" not in data


def run_output(code, lang="fr"):
    return client.post("/api/run", json={"exercise_id": "01_variables-ex1", "code": code, "lang": lang}).json()


def test_output_correct():
    data = run_output('print("Bonjour")\nprint("Je découvre Python")')
    assert data["success"]
    assert data["output"] == "Bonjour\nJe découvre Python\n"


def test_output_mismatch():
    data = run_output('print("bonjour")\nprint("Je découvre Python")')
    assert not data["success"]
    assert data["tests"][0]["diagnostic"] == "output_mismatch"
    assert "ligne 1" in data["tests"][0]["feedback"]
    assert data["tests"][0]["lineno"] is None  # la ligne concerne l'affichage, pas le code


def test_output_nothing_printed():
    data = run_output('x = "Hello"', lang="en")
    assert data["tests"][0]["diagnostic"] == "no_output"
    assert "print(...)" in data["tests"][0]["feedback"]


def test_output_error_explained():
    data = run_output('print(Bonjour)')
    assert data["error_type"] == "NameError"
    assert data["lineno"] == 1
    assert "`Bonjour`" in data["feedback"]



# --- Contrôles sur la façon d'écrire le code (checks) ---

def run_lesson(exercise_id, code, lang="fr"):
    return client.post("/api/run", json={"exercise_id": exercise_id, "code": code, "lang": lang}).json()


def test_checks_hidden_from_client():
    assert "checks" not in client.get("/api/exercise/01_variables-ex3").json()


def test_checks_print_without_variable():
    test = run_lesson("01_variables-ex3", 'print("Paris")')["tests"][0]
    assert test["diagnostic"] == "missing_variable"
    assert "`city`" in test["feedback"]


def test_checks_variable_not_used():
    test = run_lesson("01_variables-ex3", 'city = "Paris"\nprint("Paris")')["tests"][0]
    assert test["diagnostic"] == "unused_variable"


def test_checks_wrong_value():
    test = run_lesson("01_variables-ex3", 'city = "Lyon"\nprint(city)')["tests"][0]
    assert test["diagnostic"] == "wrong_variable"
    assert "`'Lyon'`" in test["feedback"] and "`'Paris'`" in test["feedback"]


def test_checks_pass():
    assert run_lesson("01_variables-ex3", 'city = "Paris"\nprint(city)')["success"]


def test_checks_missing_construct():
    data = run_lesson("05_boucle_for-ex1", 'print("Bravo")\nprint("Bravo")\nprint("Bravo")', lang="en")
    assert data["tests"][0]["diagnostic"] == "missing_construct"
    assert data["tests"][0]["feedback"] == "Your program must use a `for` loop."
