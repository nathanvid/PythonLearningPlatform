# Tuples et ensembles

Deux autres façons de ranger plusieurs valeurs : le **tuple**, une suite qu'on ne peut pas modifier, et l'**ensemble**, une collection sans doublons.

## 1. Le tuple

Un tuple s'écrit entre **parenthèses**. Il se lit comme une liste : indices, `len`, boucle `for`…

```python
point = (3, 4)
print(point[0])
print(len(point))
```

Affiche `3`, puis `2`.

## 2. Un tuple ne se modifie pas

On ne peut ni changer un élément d'un tuple, ni lui en ajouter : `point[0] = 5` provoque une erreur (`TypeError`).

On utilise un tuple pour des valeurs qui vont **ensemble** et ne doivent pas changer : les coordonnées d'un point, une date…

```python
date = (14, 7, 1789)
print(date[2])
```

Affiche `1789`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ?
code: |
  colour = (255, 128, 0)
  print(colour[1])
  print(colour[-1])
  print(len(colour))
  print(colour[0] + colour[2])
hints:
  - "Un tuple se lit exactement comme une liste."
~~~

## 3. Ranger chaque valeur dans une variable

L'**unpacking** (« déballage ») range les éléments d'un tuple dans plusieurs variables d'un coup. Il faut autant de variables que d'éléments :

```python
point = (3, 4)
x, y = point
print(x)
print(y)
```

Affiche `3`, puis `4`.

~~~exercice
type: output
description: |
  1. En **une seule ligne**, range les trois valeurs du tuple `date` dans trois variables `day`, `month` et `year`.
  2. Affiche-les avec une f-string pour obtenir exactement :

  ```text
  14/7/1789
  ```
template: |
  date = (14, 7, 1789)
  # Écris ton code ici
solution: |
  date = (14, 7, 1789)
  day, month, year = date
  print(f"{day}/{month}/{year}")
checks:
  variables:
    day: 14
    month: 7
    year: 1789
  uses: [date, day, month, year]
hints:
  - "`day, month, year = date`"
~~~

## 4. Échanger deux variables

Grâce aux tuples, on échange deux variables en une ligne, sans variable temporaire :

```python
a = 1
b = 2
a, b = b, a
print(a, b)
```

Affiche `2 1`. À droite, Python fabrique le tuple `(2, 1)`, puis le déballe dans `a` et `b`.

## 5. Renvoyer plusieurs valeurs

Une fonction peut renvoyer un tuple : c'est la façon de renvoyer **plusieurs valeurs** d'un coup.

```python
def min_max(numbers):
    return (min(numbers), max(numbers))

low, high = min_max([4, 1, 9])
print(low, high)
```

Affiche `1 9`.

~~~exercice
type: write
description: |
  Complète la fonction `rectangle(width, height)` pour qu'elle renvoie le tuple `(perimetre, aire)` du rectangle.

  Exemples :
  - `rectangle(3, 4)` renvoie `(14, 12)`
  - `rectangle(5, 5)` renvoie `(20, 25)`
template: |
  def rectangle(width, height):
      # Écris ton code ici
      pass
solution: |
  def rectangle(width, height):
      return (2 * (width + height), width * height)
hints:
  - "`return (perimetre, aire)`, en calculant les deux valeurs."
tests:
  - input: [3, 4]
    expected: [14, 12]
    description: "rectangle(3, 4)"
  - input: [5, 5]
    expected: [20, 25]
    description: "rectangle(5, 5)"
  - input: [10, 1]
    expected: [22, 10]
    description: "rectangle(10, 1)"
~~~

## 6. L'ensemble

Un **ensemble** (`set`) s'écrit entre **accolades** `{ }`. Il a deux particularités :

- il ne garde **jamais de doublons** ;
- ses éléments n'ont **pas d'ordre** (donc pas d'indices).

```python
colours = {"rouge", "vert", "rouge"}
print(len(colours))
print("vert" in colours)
```

Affiche `2`, puis `True` : le deuxième `"rouge"` n'a pas été gardé.

Pour un ensemble vide, on écrit `set()` : `{}` crée autre chose (un dictionnaire, vu dans la leçon suivante).

## 7. Supprimer les doublons d'une liste

`set(liste)` transforme une liste en ensemble, ce qui supprime les doublons. `sorted` renvoie ensuite une liste triée :

```python
grades = [12, 15, 12, 9, 15]
print(sorted(set(grades)))
print(len(set(grades)))
```

Affiche `[9, 12, 15]`, puis `3`.

On ajoute un élément avec `add` :

```python
seen = set()
seen.add("chat")
seen.add("chat")
print(len(seen))
```

Affiche `1`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ?
code: |
  s = {3, 1, 3, 2, 1}
  print(len(s))
  print(2 in s)
  s.add(5)
  s.add(3)
  print(sorted(s))
hints:
  - "Un ensemble ne garde chaque valeur qu'une seule fois."
~~~

~~~exercice
type: write
description: |
  Complète la fonction `count_distinct(values)` pour qu'elle renvoie le nombre de valeurs **différentes** de la liste, avec un ensemble.

  Exemples :
  - `count_distinct([1, 2, 2, 3, 3, 3])` renvoie `3`
  - `count_distinct([])` renvoie `0`
template: |
  def count_distinct(values):
      # Écris ton code ici
      pass
solution: |
  def count_distinct(values):
      return len(set(values))
hints:
  - "`set(values)` enlève les doublons ; il reste à compter."
tests:
  - input: [[1, 2, 2, 3, 3, 3]]
    expected: 3
    description: "count_distinct([1, 2, 2, 3, 3, 3])"
  - input: [[]]
    expected: 0
    description: "count_distinct([])"
  - input: [["a", "b", "a"]]
    expected: 2
    description: "count_distinct([\"a\", \"b\", \"a\"])"
~~~

## 8. Combiner deux ensembles

| Écriture | Résultat |
|---|---|
| `a & b` | les éléments présents dans `a` **et** dans `b` (intersection) |
| `a \| b` | les éléments présents dans `a` **ou** dans `b` (union) |
| `a - b` | les éléments de `a` **absents** de `b` (différence) |

```python
a = {1, 2, 3}
b = {2, 3, 4}
print(sorted(a & b))
print(sorted(a | b))
print(sorted(a - b))
```

Affiche `[2, 3]`, `[1, 2, 3, 4]`, puis `[1]`.

~~~exercice
type: write
description: |
  Complète la fonction `common_letters(word1, word2)` pour qu'elle renvoie la liste **triée** des lettres présentes dans les deux mots, chacune une seule fois.

  Exemples :
  - `common_letters("chat", "chien")` renvoie `["c", "h"]`
  - `common_letters("abc", "xyz")` renvoie `[]`
template: |
  def common_letters(word1, word2):
      # Écris ton code ici
      pass
solution: |
  def common_letters(word1, word2):
      return sorted(set(word1) & set(word2))
hints:
  - "`set(\"chat\")` donne l'ensemble des lettres du mot."
tests:
  - input: ["chat", "chien"]
    expected: ["c", "h"]
    description: "common_letters(\"chat\", \"chien\")"
  - input: ["abc", "xyz"]
    expected: []
    description: "common_letters(\"abc\", \"xyz\")"
  - input: ["banane", "ananas"]
    expected: ["a", "n"]
    description: "common_letters(\"banane\", \"ananas\")"
~~~

## Pièges fréquents

- Essayer de modifier un tuple : il faut en créer un nouveau.
- Déballer avec le mauvais nombre de variables : `x, y = (1, 2, 3)` provoque une erreur.
- Écrire `{}` pour un ensemble vide : il faut `set()`.
- Utiliser un indice sur un ensemble : `s[0]` provoque une erreur, utilise `sorted(s)` si tu as besoin d'un ordre.
