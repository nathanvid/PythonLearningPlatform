"""Tests du runner : exécution du code élève dans un subprocess."""
from models import Test as Case
from runner import CodeRunner

runner = CodeRunner(timeout=10)
ADD_TESTS = [Case(input=[2, 3], expected=5), Case(input=[-1, 1], expected=0, hidden=True)]


def test_correct_solution():
    result = runner.run_code("def add(a, b):\n    return a + b\n", ADD_TESTS)
    assert result["success"]
    assert [t["passed"] for t in result["tests"]] == [True, True]
    assert result["tests"][1]["hidden"] is True


def test_wrong_solution():
    result = runner.run_code("def add(a, b):\n    return a - b\n", ADD_TESTS)
    assert not result["success"]
    assert result["tests"][0]["actual"] == -1


def test_syntax_error():
    result = runner.run_code("def add(a, b)\n    return a + b\n", ADD_TESTS)
    assert not result["success"]
    assert "SyntaxError" in result["traceback"]


def test_runtime_error_in_test():
    result = runner.run_code("def add(a, b):\n    return a / 0\n", ADD_TESTS)
    assert not result["success"]
    assert "division" in result["tests"][0]["error"]


def test_print_does_not_break_output():
    code = "def add(a, b):\n    print('debug', a, b)\n    return a + b\n"
    assert runner.run_code(code, ADD_TESTS)["success"]


def test_triple_quotes_and_backslashes():
    code = "def add(a, b):\n    '''doc'''\n    s = \"\\\\n\"\n    return a + b\n"
    assert runner.run_code(code, ADD_TESTS)["success"]


def test_unicode():
    code = "def salut(nom):\n    return f'Bonjour {nom} ! éàç 🐍'\n"
    tests = [Case(input=["Zoé"], expected="Bonjour Zoé ! éàç 🐍")]
    assert runner.run_code(code, tests)["success"]


def test_no_function():
    result = runner.run_code("x = 1\n", ADD_TESTS)
    assert not result["success"]
    assert "Aucune fonction" in result["tests"][0]["error"]


def test_non_serializable_result():
    result = runner.run_code("def add(a, b):\n    return {a, b}\n", ADD_TESTS)
    assert not result["success"]


def test_tuple_matches_list():
    # Le JSON des tests n'a pas de tuples : (a, b) doit valoir [a, b]
    code = "def add(a, b):\n    return (a, [b])\n"
    tests = [Case(input=[1, 2], expected=[1, [2]])]
    assert runner.run_code(code, tests)["success"]


def test_dict_with_number_keys():
    # Le JSON n'a que des clés texte : {1: "a"} doit valoir {"1": "a"}
    code = "def add(a, b):\n    return {a: 'x', b: 'y'}\n"
    tests = [Case(input=[1, 2], expected={1: "x", 2: "y"})]
    assert runner.run_code(code, tests)["success"]


def test_exit_is_caught():
    result = runner.run_code("import sys\nsys.exit(1)\n", ADD_TESTS)
    assert not result["success"]


def test_timeout():
    quick = CodeRunner(timeout=1)
    result = quick.run_code("def add(a, b):\n    while True:\n        pass\n", ADD_TESTS)
    assert not result["success"]
    assert "Timeout" in result["error"]


def test_runs_in_temp_dir(tmp_path):
    # Le code élève écrit dans son propre dossier temporaire, pas dans le projet
    code = "import os\ndef add(a, b):\n    open('f.txt', 'w').close()\n    return a + b\n"
    assert runner.run_code(code, ADD_TESTS)["success"]


# --- Erreurs structurées et diagnostics (utilisés par feedback.py) ---

def test_runtime_error_type_and_line():
    code = "def add(a, b):\n    total = a + b\n    return totl\n"
    test = runner.run_code(code, ADD_TESTS)["tests"][0]
    assert test["error_type"] == "NameError"
    assert test["lineno"] == 3
    # Le traceback ne montre que le code élève, pas harness.py
    assert "harness" not in test["traceback"]
    assert "return totl" in test["traceback"]


def test_syntax_error_type_and_line():
    result = runner.run_code("x = 1\ndef add(a, b)\n    return a + b\n", ADD_TESTS)
    assert result["error_type"] == "SyntaxError"
    assert result["lineno"] == 2


def test_timeout_error_type():
    quick = CodeRunner(timeout=1)
    result = quick.run_code("while True:\n    pass\n", ADD_TESTS)
    assert result["error_type"] == "Timeout"


def test_diagnostic_print_not_return():
    code = "def add(a, b):\n    print(a + b)\n"
    assert runner.run_code(code, ADD_TESTS)["tests"][0]["diagnostic"] == "print_not_return"


def test_diagnostic_returns_none():
    code = "def add(a, b):\n    pass\n"
    assert runner.run_code(code, ADD_TESTS)["tests"][0]["diagnostic"] == "returns_none"


def test_diagnostic_wrong_type():
    code = "def add(a, b):\n    return str(a + b)\n"
    assert runner.run_code(code, ADD_TESTS)["tests"][0]["diagnostic"] == "wrong_type"


def test_diagnostic_float_precision():
    code = "def add(a, b):\n    return a + b + 1e-9\n"
    assert runner.run_code(code, ADD_TESTS)["tests"][0]["diagnostic"] == "float_precision"


def test_diagnostic_none_for_plain_wrong_answer():
    code = "def add(a, b):\n    return a - b\n"
    assert runner.run_code(code, ADD_TESTS)["tests"][0].get("diagnostic") is None


def test_diagnostic_no_function():
    assert runner.run_code("x = 1\n", ADD_TESTS)["tests"][0]["diagnostic"] == "no_function"
