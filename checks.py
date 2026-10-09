"""
Vérifications de la façon dont le code est écrit (exercices output).

Un exercice output compare ce qu'affiche le programme ; `checks` permet en plus d'exiger
qu'il passe par des variables précises ou utilise certaines instructions, pour qu'on ne
puisse pas réussir avec un simple print("…") de la réponse.

Le code n'est jamais exécuté ici : il est seulement analysé (ast). Les valeurs des
variables viennent de harness.py, qui exécute le code dans le subprocess.
"""
import ast
from typing import Any, Dict, Optional, Tuple

from models import OutputChecks

_MISSING = object()


def _is_elif(node: ast.AST) -> bool:
    # `elif` n'existe pas dans l'ast : c'est un if seul dans le orelse d'un autre if
    return isinstance(node, ast.If) and len(node.orelse) == 1 and isinstance(node.orelse[0], ast.If)


def _has_construct(tree: ast.AST, construct: str) -> bool:
    nodes = list(ast.walk(tree))
    tests = {
        "if": lambda n: isinstance(n, ast.If),
        "elif": _is_elif,
        # un vrai else, pas seulement le orelse qui porte un elif
        "else": lambda n: isinstance(n, (ast.If, ast.For, ast.While)) and n.orelse and not _is_elif(n),
        "and": lambda n: isinstance(n, ast.BoolOp) and isinstance(n.op, ast.And),
        "or": lambda n: isinstance(n, ast.BoolOp) and isinstance(n.op, ast.Or),
        "not": lambda n: isinstance(n, ast.UnaryOp) and isinstance(n.op, ast.Not),
        "+=": lambda n: isinstance(n, ast.AugAssign),
        "for": lambda n: isinstance(n, ast.For),
        "while": lambda n: isinstance(n, ast.While),
        "def": lambda n: isinstance(n, ast.FunctionDef),
        "return": lambda n: isinstance(n, ast.Return),
    }
    return any(tests[construct](n) for n in nodes)


def _names_read(tree: ast.AST) -> set:
    return {n.id for n in ast.walk(tree) if isinstance(n, ast.Name) and isinstance(n.ctx, ast.Load)}


def verify_checks(code: str, variables: Dict[str, Any], checks: Optional[OutputChecks]) -> Optional[Tuple[str, dict]]:
    """
    Renvoie (diagnostic, détails) pour le premier contrôle qui échoue, ou None si tout est bon.
    `variables` : valeurs des variables à la fin de l'exécution (renvoyées par harness.py).
    """
    if not checks:
        return None

    for name, expected in checks.variables.items():
        actual = variables.get(name, _MISSING)
        if actual is _MISSING:
            return "missing_variable", {"name": name}
        if actual != expected:
            return "wrong_variable", {"name": name, "actual": repr(actual), "expected": repr(expected)}

    tree = ast.parse(code)
    read = _names_read(tree)
    for name in checks.uses:
        if name not in read:
            return "unused_variable", {"name": name}

    for construct in checks.constructs:
        if not _has_construct(tree, construct):
            return "missing_construct", {"construct": construct}

    return None
