# Les exceptions

Quand une erreur se produit pendant l'exécution, Python **lève une exception** : le programme s'arrête et affiche un message. Dans cette leçon : comprendre ces erreurs, les **intercepter** pour que le programme continue, et en déclencher soi-même.

## 1. Quand un programme plante

Tu as déjà rencontré des erreurs. Chacune a un **nom** qui indique ce qui s'est passé :

| Exception | Exemple | Ce qui s'est passé |
|---|---|---|
| `ZeroDivisionError` | `10 / 0` | division par zéro |
| `ValueError` | `int("abc")` | valeur impossible à convertir |
| `IndexError` | `[1, 2][5]` | indice trop grand |
| `KeyError` | `{"a": 1}["b"]` | clé absente du dictionnaire |
| `TypeError` | `"5" + 3` | types incompatibles |

Dès qu'une exception est levée, les lignes suivantes ne sont **pas** exécutées.

## 2. Intercepter une erreur : `try` / `except`

On place le code qui peut échouer dans un bloc `try` (« essaie »). Si une erreur se produit, Python saute directement dans le bloc `except` au lieu de planter :

```python
try:
    result = 10 / 0
    print("Cette ligne n'est pas exécutée")
except ZeroDivisionError:
    print("Division impossible")
print("Le programme continue")
```

Affiche `Division impossible`, puis `Le programme continue`.

~~~exercice
type: predict
description: |
  Suis le chemin de Python. Qu'affiche ce code ?
code: |
  print("A")
  try:
      print("B")
      x = 1 / 0
      print("C")
  except ZeroDivisionError:
      print("D")
  print("E")
hints:
  - "Dès que l'erreur se produit, Python saute dans le `except` : la suite du `try` est ignorée."
~~~

~~~exercice
type: write
description: |
  Complète la fonction `inverse(x)` pour qu'elle renvoie `1 / x`, ou `None` si `x` vaut 0.
  Utilise `try` / `except ZeroDivisionError` (pas de `if`).

  Exemples :
  - `inverse(4)` renvoie `0.25`
  - `inverse(0)` renvoie `None`
template: |
  def inverse(x):
      # Écris ton code ici
      pass
solution: |
  def inverse(x):
      try:
          return 1 / x
      except ZeroDivisionError:
          return None
hints:
  - "Mets `return 1 / x` dans le `try`, et `return None` dans le `except`."
tests:
  - input: [4]
    expected: 0.25
    description: "inverse(4)"
  - input: [0]
    expected: null
    description: "inverse(0)"
  - input: [-2]
    expected: -0.5
    description: "inverse(-2)"
~~~

## 3. Préciser le type d'erreur

Après `except`, on écrit le **nom** de l'exception qu'on sait gérer. Une autre erreur n'est pas interceptée : elle fait toujours planter le programme, ce qui permet de repérer les vrais bugs.

```python
text = "abc"
try:
    number = int(text)
except ValueError:
    number = 0
print(number)
```

Affiche `0`.

~~~exercice
type: write
description: |
  Complète la fonction `read_int(text)` pour qu'elle renvoie `text` converti en entier, ou `0` si la conversion est impossible.

  Exemples :
  - `read_int("42")` renvoie `42`
  - `read_int("bonjour")` renvoie `0`
  - `read_int("-7")` renvoie `-7`
template: |
  def read_int(text):
      # Écris ton code ici
      pass
solution: |
  def read_int(text):
      try:
          return int(text)
      except ValueError:
          return 0
hints:
  - "`int(\"bonjour\")` lève une `ValueError`."
tests:
  - input: ["42"]
    expected: 42
    description: "read_int(\"42\")"
  - input: ["bonjour"]
    expected: 0
    description: "read_int(\"bonjour\")"
  - input: ["-7"]
    expected: -7
    description: "read_int(\"-7\")"
  - input: [""]
    expected: 0
    description: "Texte vide"
~~~

## 4. Plusieurs types d'erreurs

On peut enchaîner plusieurs `except`, chacun avec son traitement. Python utilise le premier qui correspond à l'erreur :

```python
def item(items, i):
    try:
        return items[i]
    except IndexError:
        return "indice trop grand"
    except TypeError:
        return "l'indice doit être un nombre"

print(item([10, 20], 1))
print(item([10, 20], 5))
print(item([10, 20], "a"))
```

Affiche `20`, `indice trop grand`, puis `l'indice doit être un number`.

~~~exercice
type: fix
description: |
  La fonction `divide(a, b)` doit renvoyer `a / b`, ou le texte `"Division par zéro"` si `b` vaut 0.
  Elle plante pourtant quand `b` vaut 0 : le `except` n'intercepte pas le bon type d'erreur. Corrige-le.
template: |
  def divide(a, b):
      try:
          return a / b
      except ValueError:
          return "Division par zéro"
solution: |
  def divide(a, b):
      try:
          return a / b
      except ZeroDivisionError:
          return "Division par zéro"
hints:
  - "Quelle exception lève `10 / 0` ? Regarde le tableau de l'étape 1."
tests:
  - input: [10, 2]
    expected: 5.0
    description: "divide(10, 2)"
  - input: [10, 0]
    expected: "Division par zéro"
    description: "divide(10, 0)"
~~~

## 5. `else` et `finally`

Deux blocs facultatifs complètent `try` / `except` :

- `else` s'exécute seulement si **aucune** erreur ne s'est produite ;
- `finally` s'exécute **toujours**, qu'il y ait eu une erreur ou non.

```python
try:
    result = 10 / 2
except ZeroDivisionError:
    print("erreur")
else:
    print("ok :", result)
finally:
    print("terminé")
```

Affiche `ok : 5.0`, puis `terminé`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ? La fonction est appelée deux fois.
code: |
  def test(x):
      try:
          r = 10 / x
      except ZeroDivisionError:
          print("erreur")
      else:
          print("résultat", r)
      finally:
          print("fin")

  test(5)
  test(0)
hints:
  - "`else` seulement sans erreur, `finally` dans tous les cas."
~~~

## 6. Lire le message d'une erreur

Avec `except ... as e`, la variable `e` contient l'exception. `str(e)` donne son message :

```python
try:
    int("abc")
except ValueError as e:
    print("Erreur :", e)
```

Affiche `Erreur : invalid literal for int() with base 10: 'abc'`.

## 7. Lever sa propre exception : `raise`

On peut déclencher soi-même une exception avec `raise`, pour signaler qu'une valeur est invalide. On choisit le type d'exception et on écrit un message :

```python
def check_age(age):
    if age < 0:
        raise ValueError("l'âge ne peut pas être négatif")
    return age

try:
    check_age(-5)
except ValueError as e:
    print("Erreur :", e)
```

Affiche `Erreur : l'âge ne peut pas être négatif`.

~~~exercice
type: write
description: |
  La fonction `validate_grade(grade)` est déjà écrite : elle lève une `ValueError` si la note n'est pas entre 0 et 20.

  Complète la fonction `check(grade)` : elle appelle `validate_grade(grade)` dans un `try` et renvoie :
  - `"Note acceptée"` si aucune erreur n'est levée ;
  - `"Refusée : "` suivi du message de l'erreur sinon.

  Exemples :
  - `check(15)` renvoie `"Note acceptée"`
  - `check(25)` renvoie `"Refusée : la note doit être entre 0 et 20"`
template: |
  def validate_grade(grade):
      if grade < 0 or grade > 20:
          raise ValueError("la note doit être entre 0 et 20")
      return grade

  def check(grade):
      # Écris ton code ici
      pass
solution: |
  def validate_grade(grade):
      if grade < 0 or grade > 20:
          raise ValueError("la note doit être entre 0 et 20")
      return grade

  def check(grade):
      try:
          validate_grade(grade)
      except ValueError as e:
          return "Refusée : " + str(e)
      return "Note acceptée"
hints:
  - "`except ValueError as e:` puis `return \"Refusée : \" + str(e)`."
tests:
  - input: [15]
    expected: "Note acceptée"
    description: "check(15)"
  - input: [25]
    expected: "Refusée : la note doit être entre 0 et 20"
    description: "check(25)"
  - input: [-1]
    expected: "Refusée : la note doit être entre 0 et 20"
    description: "check(-1)"
~~~

## Pièges fréquents

- Écrire un `except:` sans type d'erreur : il attrape tout, même tes propres bugs. Précise toujours l'exception attendue.
- Mettre trop de lignes dans le `try` : n'y mets que celles qui peuvent vraiment échouer.
- Intercepter le mauvais type d'erreur : l'exception n'est pas attrapée et le programme plante.
- Oublier que les lignes du `try` situées après l'erreur ne sont pas exécutées.
