"""
Script exécuté dans un subprocess isolé pour tester le code de l'élève.

Lit sur stdin un JSON {"code": str, "tests": [...]} et écrit sur stdout
un JSON {"success", "tests", "error", "traceback"}.
Les print() de l'élève sont capturés pour ne pas corrompre la sortie JSON.
"""
import contextlib
import io
import json
import re
import sys
import traceback


def main():
    payload = json.loads(sys.stdin.read())
    code = payload["code"]
    tests = payload["tests"]

    results = {"success": True, "tests": [], "error": None, "traceback": None}
    namespace = {"__name__": "__main__"}
    student_stdout = io.StringIO()

    # Exécuter le code de l'élève
    try:
        compiled = compile(code, "<ton code>", "exec")
        with contextlib.redirect_stdout(student_stdout):
            exec(compiled, namespace)
    except BaseException:
        results["success"] = False
        results["error"] = "Erreur d'exécution"
        results["traceback"] = traceback.format_exc()
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

        try:
            if not func_matches:
                raise RuntimeError("Aucune fonction trouvée dans le code")

            func = namespace[func_matches[-1]]
            with contextlib.redirect_stdout(student_stdout):
                actual = func(*test["input"])
            test_result["actual"] = actual

            if actual == test["expected"]:
                test_result["passed"] = True
            else:
                results["success"] = False

        except BaseException as e:
            test_result["error"] = str(e)
            test_result["traceback"] = traceback.format_exc()
            results["success"] = False

        results["tests"].append(test_result)

    return results


if __name__ == "__main__":
    output = main()
    # default=repr : les valeurs non sérialisables (set, objets...) restent affichables
    sys.stdout.write(json.dumps(output, default=repr))
