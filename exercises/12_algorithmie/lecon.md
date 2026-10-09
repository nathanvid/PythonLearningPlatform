# Algorithmique

Un **algorithme** est une méthode précise, étape par étape, pour résoudre un problème. Tu en connais déjà : additionner les éléments d'une liste, trouver le plus grand… Dans cette leçon : quelques schémas qui reviennent sans cesse, et une méthode pour les inventer.

## 1. Une méthode en 4 étapes

Avant d'écrire du code, il faut savoir **résoudre le problème à la main** :

1. **Comprendre** : reformule le problème et prends un petit exemple.
2. **Résoudre à la main** : note les étapes que tu suis sur ton exemple.
3. **Traduire** en Python : chaque étape devient une ou plusieurs lignes.
4. **Tester** les cas limites : liste vide, un seul élément, nombres négatifs…

## 2. Chercher : s'arrêter dès qu'on a trouvé

Pour savoir si une valeur est dans une liste, on la parcourt et on renvoie `True` **dès qu'on la trouve**. Si la boucle se termine sans l'avoir trouvée, on renvoie `False` :

```python
def has_negative(numbers):
    for n in numbers:
        if n < 0:
            return True      # trouvé : inutile de continuer
    return False             # tout parcouru, rien trouvé

print(has_negative([4, -1, 7]))
print(has_negative([4, 1, 7]))
```

Affiche `True`, puis `False`.

Le `return False` est **après** la boucle, pas dans un `else` : sinon la fonction s'arrêterait dès le premier élément.

~~~exercice
type: write
description: |
  Complète la fonction `contains(items, value)` pour qu'elle renvoie `True` si `value` est dans `items`, et `False` sinon.
  Utilise une boucle `for`, **sans** le mot `in` en dehors de la boucle (pas de `value in items`).

  Exemples :
  - `contains([3, 8, 5], 8)` renvoie `True`
  - `contains([3, 8, 5], 4)` renvoie `False`
  - `contains([], 1)` renvoie `False`
template: |
  def contains(items, value):
      # Écris ton code ici
      pass
solution: |
  def contains(items, value):
      for item in items:
          if item == value:
              return True
      return False
hints:
  - "`return True` dans le `if`, `return False` après la boucle."
tests:
  - input: [[3, 8, 5], 8]
    expected: true
    description: "Valeur présente"
  - input: [[3, 8, 5], 4]
    expected: false
    description: "Valeur absente"
  - input: [[], 1]
    expected: false
    description: "Liste vide"
  - input: [[1, 2, 3], 3]
    expected: true
    description: "Valeur en dernier"
~~~

## 3. Compter des diviseurs

Un nombre `d` **divise** `n` quand le reste `n % d` vaut `0`. Pour trouver tous les diviseurs de `n`, on essaie chaque nombre de `1` à `n` :

```python
n = 12
for d in range(1, n + 1):
    if n % d == 0:
        print(d)
```

Affiche `1`, `2`, `3`, `4`, `6`, `12`.

Un nombre **premier** est un nombre qui a exactement deux diviseurs : 1 et lui-même (2, 3, 5, 7, 11…).

~~~exercice
type: write
description: |
  Complète la fonction `count_divisors(n)` pour qu'elle renvoie le nombre de diviseurs de `n` (un entier supérieur ou égal à 1).

  Exemples :
  - `count_divisors(12)` renvoie `6` (1, 2, 3, 4, 6, 12)
  - `count_divisors(7)` renvoie `2` (1 et 7)
  - `count_divisors(1)` renvoie `1`
template: |
  def count_divisors(n):
      # Écris ton code ici
      pass
solution: |
  def count_divisors(n):
      count = 0
      for d in range(1, n + 1):
          if n % d == 0:
              count += 1
      return count
hints:
  - "Même boucle que l'exemple, avec un compteur à la place du print."
tests:
  - input: [12]
    expected: 6
    description: "count_divisors(12)"
  - input: [7]
    expected: 2
    description: "count_divisors(7)"
  - input: [1]
    expected: 1
    description: "count_divisors(1)"
~~~

## 4. Comparer chaque élément avec le suivant

Pour vérifier une propriété qui concerne deux éléments **voisins**, on parcourt les indices et on compare `items[i]` à `items[i + 1]`. Attention : le dernier indice n'a pas de suivant, donc on s'arrête à `len(items) - 1`.

```python
numbers = [3, 5, 4]
for i in range(len(numbers) - 1):
    print(numbers[i], "puis", numbers[i + 1])
```

Affiche `3 puis 5`, puis `5 puis 4`.

~~~exercice
type: write
description: |
  Complète la fonction `is_increasing(items)` pour qu'elle renvoie `True` si chaque élément est inférieur ou égal au suivant, et `False` sinon.
  Une liste vide ou d'un seul élément est croissante.

  Exemples :
  - `is_increasing([1, 2, 2, 5])` renvoie `True`
  - `is_increasing([1, 3, 2])` renvoie `False`
  - `is_increasing([])` renvoie `True`
template: |
  def is_increasing(items):
      # Écris ton code ici
      pass
solution: |
  def is_increasing(items):
      for i in range(len(items) - 1):
          if items[i] > items[i + 1]:
              return False
      return True
hints:
  - "Dès qu'un élément est plus grand que son suivant, la réponse est `False`."
tests:
  - input: [[1, 2, 2, 5]]
    expected: true
    description: "Croissante avec une égalité"
  - input: [[1, 3, 2]]
    expected: false
    description: "Pas croissante"
  - input: [[]]
    expected: true
    description: "Liste vide"
  - input: [[7]]
    expected: true
    description: "Un seul élément"
~~~

## 5. Échanger deux éléments d'une liste

Beaucoup d'algorithmes de tri **échangent** deux éléments. Avec un tuple, ça se fait en une ligne :

```python
numbers = [5, 1, 4]
numbers[0], numbers[1] = numbers[1], numbers[0]
print(numbers)
```

Affiche `[1, 5, 4]`.

Le **tri à bulles** répète cette idée : il parcourt la liste, échange deux voisins quand ils sont dans le mauvais ordre, et recommence jusqu'à ce que plus aucun échange ne soit nécessaire.

~~~exercice
type: predict
description: |
  Ce code fait **un seul passage** du tri à bulles. Qu'affiche-t-il ?
code: |
  numbers = [4, 3, 1, 2]
  for i in range(len(numbers) - 1):
      if numbers[i] > numbers[i + 1]:
          numbers[i], numbers[i + 1] = numbers[i + 1], numbers[i]
      print(numbers)
hints:
  - "Le print est dans la boucle : la liste est affichée après chaque comparaison."
~~~

## 6. Tracer un algorithme

Pour comprendre une boucle, fais un **tableau** avec la valeur de chaque variable à chaque tour. Par exemple :

```python
n = 13
steps = 0
while n > 1:
    n = n // 2
    steps += 1
print(steps)
```

| Tour | n | etapes |
|---|---|---|
| départ | 13 | 0 |
| 1 | 6 | 1 |
| 2 | 3 | 2 |
| 3 | 1 | 3 |

Affiche `3`.

## 7. Couper en deux à chaque étape

Pour deviner un nombre entre 1 et 100, la meilleure stratégie est de proposer le **milieu**, puis de garder la moitié où se trouve le nombre. On divise le problème par deux à chaque essai : 7 essais suffisent toujours.

La **recherche binaire** applique cette idée à une liste **triée** : on regarde l'élément du milieu, puis on ne continue que dans la moitié gauche ou la moitié droite.

~~~exercice
type: predict
description: |
  On cherche `7` dans une liste triée en coupant en deux à chaque tour. Trace les variables `low`, `high` et `middle`. Qu'affiche ce code ?
code: |
  items = [1, 3, 5, 7, 9, 11, 13]
  low = 0
  high = len(items) - 1
  while low <= high:
      middle = (low + high) // 2
      print(middle, items[middle])
      if items[middle] == 7:
          print("trouvé")
          break
      elif items[middle] < 7:
          low = middle + 1
      else:
          high = middle - 1
hints:
  - "`break` sort de la boucle immédiatement. Au départ, `low` vaut 0 et `high` vaut 6."
~~~

## Pièges fréquents

- Mettre le `return False` d'une recherche dans un `else` à l'intérieur de la boucle.
- Sortir de la liste avec `items[i + 1]` : la boucle doit s'arrêter à `len(items) - 1`.
- Initialiser un compteur ou un accumulateur **dans** la boucle.
- Oublier les cas limites : liste vide, un seul élément.
