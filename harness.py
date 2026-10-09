"""
Script exécuté dans un subprocess isolé pour tester le code de l'élève.

Lit sur stdin un JSON {"code": str, "tests": [...], "mode": "tests" | "output"} et écrit sur stdout
un JSON {"success", "tests", "error", "error_type", "error_message", "lineno", "traceback"}.
En mode "output" (exercices predict), aucun test n'est lancé : le JSON contient `output`,
ce que le code a affiché.
Chaque test a aussi `error_type`, `error_message`, `lineno` et `diagnostic`
(erreur de débutant reconnue, cf. feedback.py).
Les print() de l'élève sont capturés pour ne pas corrompre la sortie JSON.
"""
import contextlib
import io
import json
import linecache
import math
import re
import sys
import traceback

STUDENT_FILE = "<ton code>"


def json_key(key):
    """Clé de dictionnaire telle que le JSON des tests la représente (1 -> "1", True -> "true")"""
    if isinstance(key, str):
        return key
    try:
        return json.dumps(key)
    except TypeError:
        return key


def normalize(value):
    """
    Met la valeur sous la forme qu'elle aurait après un passage en JSON, comme `expected` :
    tuples -> listes, clés de dictionnaire -> texte
    """
    if isinstance(value, (list, tuple)):
        return [normalize(v) for v in value]
    if isinstance(value, dict):
        return {json_key(k): normalize(v) for k, v in value.items()}
    return value


def describe_error(exc):
    """Type, message, ligne dans le code élève et traceback limité au code élève"""
    te = traceback.TracebackException.from_exception(exc)
    student_frames = [f for f in te.stack if f.filename == STUDENT_FILE]
    te.stack = traceback.StackSummary.from_list(student_frames)

    if isinstance(exc, SyntaxError) and exc.filename == STUDENT_FILE:
        lineno = exc.lineno
    else:
        lineno = student_frames[-1].lineno if student_frames else None

    return {
        "error_type": type(exc).__name__,
        "error_message": str(exc),
        "lineno": lineno,
        "traceback": "".join(te.format()),
    }


def is_number(value):
    return isinstance(value, (int, float)) and not isinstance(value, bool)


def diagnose(actual, expected, printed):
    """Reconnaît une erreur de débutant fréquente quand un test échoue sans exception"""
    if actual is None and expected is not None:
        printed_lines = [line.strip() for line in printed.splitlines()]
        if str(expected) in printed_lines:
            return "print_not_return"
        return "returns_none"
    if is_number(actual) and is_number(expected) and math.isclose(actual, expected, rel_tol=1e-6):
        return "float_precision"
    if type(actual) is not type(expected) and str(actual) == str(expected):
        return "wrong_type"
    return None


def main():
    payload = json.loads(sys.stdin.read())
    code = payload["code"]
    tests = payload["tests"]

    results = {"success": True, "tests": [], "error": None, "traceback": None}
    namespace = {"__name__": "__main__"}

    # Rendre le code élève lisible par traceback (affiche la ligne fautive)
    linecache.cache[STUDENT_FILE] = (len(code), None, code.splitlines(True), STUDENT_FILE)

    # Exécuter le code de l'élève
    module_stdout = io.StringIO()
    try:
        compiled = compile(code, STUDENT_FILE, "exec")
        with contextlib.redirect_stdout(module_stdout):
            exec(compiled, namespace)
    except BaseException as e:
        results["success"] = False
        results["error"] = "Erreur d'exécution"
        results.update(describe_error(e))
        return results

    if payload.get("mode") == "output":
        results["output"] = module_stdout.getvalue()
        # Valeur finale des variables demandées (exercices output avec `checks.variables`)
        wanted = payload.get("variables", [])
        results["variables"] = {name: namespace[name] for name in wanted if name in namespace}
        return results

    # Fonctions définies au niveau module (non indentées) : on teste la dernière
    func_matches = re.findall(r"^def\s+(\w+)\s*\(", code, re.MULTILINE)

    for test in tests:
        test_result = {
            "passed": False,
            "input": test["input"],
            "expected": test["expected"],
            "actual": None,
            "error": None,
            "description": test.get("description"),
            "hidden": test.get("hidden", False),
        }

        if not func_matches:
            test_result["error"] = "Aucune fonction trouvée dans le code"
            test_result["diagnostic"] = "no_function"
            results["success"] = False
            results["tests"].append(test_result)
            continue

        # Sortie capturée par test, pour repérer un print() à la place d'un return
        printed = io.StringIO()
        try:
            func = namespace[func_matches[-1]]
            with contextlib.redirect_stdout(printed):
                actual = func(*test["input"])
            test_result["actual"] = actual

            if normalize(actual) == test["expected"]:
                test_result["passed"] = True
            else:
                results["success"] = False
                test_result["diagnostic"] = diagnose(actual, test["expected"], printed.getvalue())

        except BaseException as e:
            test_result["error"] = str(e)
            test_result.update(describe_error(e))
            results["success"] = False

        results["tests"].append(test_result)

    return results


if __name__ == "__main__":
    output = main()
    # default=repr : les valeurs non sérialisables (set, objets...) restent affichables
    sys.stdout.write(json.dumps(output, default=repr))
