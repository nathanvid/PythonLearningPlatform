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
