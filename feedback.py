"""
Explications pédagogiques des erreurs, en français et en anglais.

harness.py renvoie des codes (`error_type`, `diagnostic`) ; `explain()` y ajoute
un champ `feedback` : un message simple destiné à un débutant.
Les messages utilisent `code` (rendu en <code> par le frontend).
"""
import re

# Explications par type d'exception (clé = nom de la classe, ou "Timeout" pour le runner)
ERROR_EXPLANATIONS = {
    "SyntaxError": {
        "fr": "Python n'arrive pas à lire ton code : il y a une faute de syntaxe. Regarde la ligne indiquée "
              "et celle juste avant : du texte écrit sans guillemets (`\"Bonjour\"`) ? "
              "Un `:` oublié après `def`, `if`, `for` ou `while` ? Une parenthèse ou un guillemet pas fermé ?",
        "en": "Python can't read your code: there is a syntax mistake. Look at the line shown and the one "
              "just before: text written without quotes (`\"Hello\"`)? "
              "A missing `:` after `def`, `if`, `for` or `while`? A bracket or a quote that isn't closed?",
    },
    "IndentationError": {
        "fr": "Problème d'indentation : en Python, les espaces en début de ligne comptent. Le contenu d'un "
              "`def`, `if`, `for`… doit être décalé de 4 espaces, et les lignes d'un même bloc doivent être alignées.",
        "en": "Indentation problem: in Python, spaces at the start of a line matter. The body of a "
              "`def`, `if`, `for`… must be shifted by 4 spaces, and lines of the same block must be aligned.",
    },
    "TabError": {
        "fr": "Tu mélanges tabulations et espaces pour indenter. Utilise uniquement des espaces (4 par niveau).",
        "en": "You are mixing tabs and spaces for indentation. Use spaces only (4 per level).",
    },
    "NameError": {
        "fr": "Python ne connaît pas le nom `{name}`. Vérifie l'orthographe (majuscules comprises), que la "
              "variable est créée avant d'être utilisée, et mets des guillemets si c'est du texte.",
        "en": "Python doesn't know the name `{name}`. Check the spelling (including capitals), that the "
              "variable is created before it is used, and add quotes if it is meant to be text.",
    },
    "UnboundLocalError": {
        "fr": "Tu utilises une variable dans ta fonction avant de lui avoir donné une valeur. "
              "Initialise-la au début de la fonction (par exemple `total = 0`).",
        "en": "You use a variable in your function before giving it a value. "
              "Initialise it at the start of the function (for example `total = 0`).",
    },
    "TypeError": {
        "fr": "Une opération reçoit une valeur du mauvais type : par exemple additionner un nombre et du texte "
              "(`5 + \"3\"`), ou appeler une fonction avec le mauvais nombre d'arguments. "
              "Pour convertir, utilise `int()`, `float()` ou `str()`.",
        "en": "An operation got a value of the wrong type: for example adding a number and text "
              "(`5 + \"3\"`), or calling a function with the wrong number of arguments. "
              "To convert, use `int()`, `float()` or `str()`.",
    },
    "IndexError": {
        "fr": "Tu demandes une position qui n'existe pas dans une liste ou une chaîne. Les indices commencent "
              "à 0 : le dernier élément d'une liste de longueur `n` est à l'indice `n - 1`. Une liste vide n'a aucun élément.",
        "en": "You ask for a position that doesn't exist in a list or a string. Indexes start at 0: "
              "the last item of a list of length `n` is at index `n - 1`. An empty list has no items.",
    },
    "KeyError": {
        "fr": "Cette clé n'existe pas dans le dictionnaire. Vérifie son orthographe, ou teste-la avant "
              "avec `cle in dico`, ou utilise `dico.get(cle)`.",
        "en": "This key doesn't exist in the dictionary. Check its spelling, test it first "
              "with `key in d`, or use `d.get(key)`.",
    },
    "ValueError": {
        "fr": "Le type est bon mais la valeur ne convient pas, par exemple `int(\"abc\")`. "
              "Vérifie la valeur que tu convertis ou que tu passes à la fonction.",
        "en": "The type is right but the value isn't, for example `int(\"abc\")`. "
              "Check the value you convert or pass to the function.",
    },
    "ZeroDivisionError": {
        "fr": "Division par zéro ! Vérifie le diviseur avant de diviser, par exemple avec un `if`.",
        "en": "Division by zero! Check the divisor before dividing, for example with an `if`.",
    },
    "AttributeError": {
        "fr": "Cette valeur n'a pas l'attribut ou la méthode que tu appelles. Vérifie l'orthographe et le type "
              "de la valeur (une liste a `append`, pas `push`). Si le message parle de `NoneType`, "
              "une fonction a renvoyé `None` au lieu d'une valeur.",
        "en": "This value doesn't have the attribute or method you call. Check the spelling and the type "
              "of the value (a list has `append`, not `push`). If the message mentions `NoneType`, "
              "a function returned `None` instead of a value.",
    },
    "RecursionError": {
        "fr": "Ta fonction s'appelle elle-même sans jamais s'arrêter. Une fonction récursive a besoin d'un "
              "cas de base qui renvoie un résultat sans se rappeler.",
        "en": "Your function calls itself and never stops. A recursive function needs a base case "
              "that returns a result without calling itself again.",
    },
    "ModuleNotFoundError": {
        "fr": "Ce module n'existe pas : vérifie l'orthographe du nom après `import`.",
        "en": "This module doesn't exist: check the spelling of the name after `import`.",
    },
    "ImportError": {
        "fr": "Cet élément n'existe pas dans le module : vérifie l'orthographe après `from … import`.",
        "en": "This name doesn't exist in the module: check the spelling after `from … import`.",
    },
    "FileNotFoundError": {
        "fr": "Le fichier est introuvable. Vérifie son nom, son extension et son dossier.",
        "en": "The file can't be found. Check its name, extension and folder.",
    },
    "Timeout": {
        "fr": "Ton code met trop de temps : sûrement une boucle infinie. Dans une boucle `while`, "
              "vérifie que la condition finit par devenir fausse (une variable doit changer à chaque tour).",
        "en": "Your code takes too long: probably an infinite loop. In a `while` loop, check that the "
              "condition eventually becomes false (a variable must change on each iteration).",
    },
}

# NameError sans nom identifiable dans le message
NAME_ERROR_GENERIC = {
    "fr": "Python ne connaît pas un des noms utilisés. Vérifie l'orthographe et que chaque variable "
          "est créée avant d'être utilisée.",
    "en": "Python doesn't know one of the names used. Check the spelling and that each variable "
          "is created before it is used.",
}

# Erreurs de débutant reconnues par harness.diagnose() quand un test échoue sans exception
DIAGNOSTICS = {
    "print_not_return": {
        "fr": "Ta fonction affiche le bon résultat avec `print`, mais elle doit le **renvoyer** avec `return`.",
        "en": "Your function prints the right result with `print`, but it must **return** it with `return`.",
    },
    "returns_none": {
        "fr": "Ta fonction ne renvoie rien (`None`). As-tu oublié `return`, ou laissé `pass` ?",
        "en": "Your function returns nothing (`None`). Did you forget `return`, or leave `pass`?",
    },
    "wrong_type": {
        "fr": "Bonne valeur, mais mauvais type : ta fonction renvoie un `{actual_type}` alors qu'un "
              "`{expected_type}` est attendu.",
        "en": "Right value, wrong type: your function returns a `{actual_type}` but a "
              "`{expected_type}` is expected.",
    },
    "float_precision": {
        "fr": "Presque ! Ton résultat est très proche de la valeur attendue sans être égal. Vérifie ta formule, "
              "ou arrondis avec `round(valeur, 2)` : les calculs à virgule sont parfois imprécis.",
        "en": "Almost! Your result is very close to the expected value but not equal. Check your formula, "
              "or round with `round(value, 2)`: decimal calculations are sometimes imprecise.",
    },
    "predict_mismatch": {
        "fr": "Ta prédiction diffère de la vraie sortie à partir de la ligne {line}. Relis le code "
              "instruction par instruction en notant la valeur de chaque variable, comme le ferait Python.",
        "en": "Your prediction differs from the real output from line {line}. Read the code again "
              "one statement at a time, writing down the value of each variable, as Python would.",
    },
    "output_mismatch": {
        "fr": "Ce que ton programme affiche ne correspond pas à ce qui est demandé, à partir de la ligne {line} "
              "de l'affichage. Compare bien avec la consigne : les majuscules et la ponctuation comptent.",
        "en": "What your program displays doesn't match what is asked, from line {line} of the output. "
              "Compare carefully with the instructions: capital letters and punctuation matter.",
    },
    "no_output": {
        "fr": "Ton programme n'affiche rien. Pour afficher quelque chose, utilise `print(...)`.",
        "en": "Your program displays nothing. To display something, use `print(...)`.",
    },
    "missing_variable": {
        "fr": "La variable `{name}` n'existe pas dans ton programme. Crée-la avec `{name} = ...`",
        "en": "The variable `{name}` doesn't exist in your program. Create it with `{name} = ...`",
    },
    "wrong_variable": {
        "fr": "La variable `{name}` contient `{actual}`, mais elle devrait contenir `{expected}`.",
        "en": "The variable `{name}` holds `{actual}`, but it should hold `{expected}`.",
    },
    "unused_variable": {
        "fr": "Ton programme doit se servir de la variable `{name}` : écris son nom au lieu de "
              "réécrire sa valeur à la main.",
        "en": "Your program must use the variable `{name}`: write its name instead of "
              "typing its value by hand.",
    },
    "missing_construct": {
        "fr": "Ton programme doit utiliser {construct}.",
        "en": "Your program must use {construct}.",
    },
    "no_function": {
        "fr": "Aucune fonction trouvée : ton code doit définir une fonction avec `def`, "
              "au tout début de la ligne (sans espace avant).",
        "en": "No function found: your code must define a function with `def`, "
              "at the very start of the line (no space before it).",
    },
}

# Noms des instructions exigées par `checks.constructs`
CONSTRUCT_NAMES = {
    "if": {"fr": "un `if`", "en": "an `if`"},
    "elif": {"fr": "un `elif`", "en": "an `elif`"},
    "and": {"fr": "le mot `and`", "en": "the word `and`"},
    "or": {"fr": "le mot `or`", "en": "the word `or`"},
    "not": {"fr": "le mot `not`", "en": "the word `not`"},
    "+=": {"fr": "l'opérateur `+=` (ou `-=`, `*=`…)", "en": "the `+=` operator (or `-=`, `*=`…)"},
    "else": {"fr": "un `else`", "en": "an `else`"},
    "for": {"fr": "une boucle `for`", "en": "a `for` loop"},
    "while": {"fr": "une boucle `while`", "en": "a `while` loop"},
    "def": {"fr": "une fonction (`def`)", "en": "a function (`def`)"},
    "return": {"fr": "un `return`", "en": "a `return`"},
}

NAME_RE = re.compile(r"name '(\w+)' is not defined")


def _error_feedback(error_type, error_message, lang):
    if error_type == "NameError":
        match = NAME_RE.search(error_message or "")
        if not match:
            return NAME_ERROR_GENERIC[lang]
        return ERROR_EXPLANATIONS["NameError"][lang].format(name=match.group(1))
    explanation = ERROR_EXPLANATIONS.get(error_type)
    return explanation[lang] if explanation else None


def _diagnostic_feedback(test, lang):
    template = DIAGNOSTICS[test["diagnostic"]][lang]
    if test["diagnostic"] == "predict_mismatch":
        return template.format(line=test.get("lineno"))
    if test["diagnostic"] == "output_mismatch":
        return template.format(line=test.get("output_line"))
    if test["diagnostic"] == "missing_construct":
        return template.format(construct=CONSTRUCT_NAMES[test["detail"]["construct"]][lang])
    if "detail" in test:
        return template.format(**test["detail"])
    if test["diagnostic"] == "wrong_type":
        return template.format(
            actual_type=type(test.get("actual")).__name__,
            expected_type=type(test.get("expected")).__name__,
        )
    return template


def explain(results: dict, lang: str) -> dict:
    """Ajoute un champ `feedback` à l'erreur globale et à chaque test qui échoue"""
    if results.get("error_type"):
        results["feedback"] = _error_feedback(results["error_type"], results.get("error_message"), lang)

    for test in results.get("tests", []):
        if test.get("diagnostic"):
            test["feedback"] = _diagnostic_feedback(test, lang)
        elif test.get("error_type"):
            test["feedback"] = _error_feedback(test["error_type"], test.get("error_message"), lang)

    return results
