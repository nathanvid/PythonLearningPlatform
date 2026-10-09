# Les listes

Une **liste** range plusieurs valeurs, dans un ordre précis, sous un seul nom. Dans cette leçon : lire, modifier, parcourir et construire des listes.

## 1. Créer une liste

Une liste s'écrit entre **crochets** `[ ]`, avec des valeurs séparées par des virgules. `len` donne le nombre d'éléments :

```python
grades = [12, 15, 9]
fruits = ["pomme", "kiwi"]
empty = []
print(grades)
print(len(grades))
print(len(empty))
```

Affiche `[12, 15, 9]`, `3`, puis `0`.

## 2. Lire un élément

Comme pour les chaînes, chaque élément a un **indice** qui commence à **0**, et `-1` désigne le dernier :

```python
grades = [12, 15, 9]
print(grades[0])
print(grades[-1])
```

Affiche `12`, puis `9`. Un indice trop grand provoque une `IndexError`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ?
code: |
  animals = ["chat", "chien", "lapin", "poisson"]
  print(len(animals))
  print(animals[1])
  print(animals[-1])
  print(animals[0] + animals[2])
hints:
  - "Le premier élément est à l'indice 0."
~~~

~~~exercice
type: write
description: |
  Complète la fonction `last(items)` pour qu'elle renvoie le dernier élément de `items` (la liste n'est jamais vide).

  Exemples :
  - `last([3, 8, 5])` renvoie `5`
  - `last(["a"])` renvoie `"a"`
template: |
  def last(items):
      # Écris ton code ici
      pass
solution: |
  def last(items):
      return items[-1]
hints:
  - "Un indice négatif part de la fin."
tests:
  - input: [[3, 8, 5]]
    expected: 5
    description: "last([3, 8, 5])"
  - input: [["a"]]
    expected: "a"
    description: "last([\"a\"])"
  - input: [[1, 2, 3, 4, 5, 6]]
    expected: 6
    description: "last([1, 2, 3, 4, 5, 6])"
~~~

## 3. Modifier un élément

Contrairement aux chaînes, une liste **peut être modifiée**. On remplace un élément en l'affectant à son indice :

```python
grades = [12, 15, 9]
grades[2] = 10
print(grades)
```

Affiche `[12, 15, 10]`.

## 4. Ajouter et retirer

- `items.append(x)` ajoute `x` **à la fin** ;
- `items.remove(x)` retire la première valeur égale à `x` ;
- `items.pop()` retire le dernier élément (et le renvoie).

```python
shopping = ["pain", "lait"]
shopping.append("œufs")
shopping.remove("pain")
print(shopping)
```

Affiche `['lait', 'œufs']`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ? Suis le contenu de la liste après chaque ligne.
code: |
  numbers = [4, 7, 1]
  numbers[0] = 5
  numbers.append(9)
  print(numbers)
  numbers.remove(7)
  print(numbers)
  print(len(numbers))
hints:
  - "append ajoute à la fin ; remove retire la valeur indiquée, pas un indice."
~~~

## 5. Tester si une valeur est dans la liste

```python
fruits = ["pomme", "kiwi"]
print("kiwi" in fruits)
print("banane" in fruits)
```

Affiche `True`, puis `False`.

## 6. Parcourir une liste

Une boucle `for` parcourt la liste : à chaque tour, la variable contient **un élément**.

```python
fruits = ["pomme", "kiwi", "poire"]
for fruit in fruits:
    print(fruit)
```

Affiche `pomme`, `kiwi`, puis `poire`.

Comme avec `range`, on peut accumuler pendant le parcours :

```python
total = 0
for grade in [12, 15, 9]:
    total += grade
print(total)
```

Affiche `36`.

~~~exercice
type: write
description: |
  Complète la fonction `total(numbers)` pour qu'elle renvoie la somme des éléments de `numbers`, avec une boucle `for` (sans la fonction `sum`).

  Exemples :
  - `total([1, 2, 3])` renvoie `6`
  - `total([])` renvoie `0`
template: |
  def total(numbers):
      # Écris ton code ici
      pass
solution: |
  def total(numbers):
      result = 0
      for n in numbers:
          result += n
      return result
hints:
  - "Accumulateur à 0 avant la boucle, `return` après."
tests:
  - input: [[1, 2, 3]]
    expected: 6
    description: "total([1, 2, 3])"
  - input: [[]]
    expected: 0
    description: "total([])"
  - input: [[10, -5, 3]]
    expected: 8
    description: "total([10, -5, 3])"
~~~

## 7. Construire une nouvelle liste

Pour fabriquer une liste à partir d'une autre, on part d'une liste **vide** et on fait `append` dans la boucle :

```python
doubles = []
for n in [1, 2, 3]:
    doubles.append(n * 2)
print(doubles)
```

Affiche `[2, 4, 6]`.

Le schéma est toujours le même : liste vide **avant** la boucle, `append` **dans** la boucle, résultat **après**.

~~~exercice
type: write
description: |
  Complète la fonction `positives(numbers)` pour qu'elle renvoie une **nouvelle** liste contenant seulement les nombres strictement positifs de `numbers`, dans le même ordre.

  Exemples :
  - `positives([3, -1, 0, 5])` renvoie `[3, 5]`
  - `positives([-2, -8])` renvoie `[]`
template: |
  def positives(numbers):
      # Écris ton code ici
      pass
solution: |
  def positives(numbers):
      result = []
      for n in numbers:
          if n > 0:
              result.append(n)
      return result
hints:
  - "Liste vide avant la boucle ; `append` seulement si `n > 0`."
tests:
  - input: [[3, -1, 0, 5]]
    expected: [3, 5]
    description: "positives([3, -1, 0, 5])"
  - input: [[-2, -8]]
    expected: []
    description: "positives([-2, -8])"
  - input: [[]]
    expected: []
    description: "positives([])"
~~~

## 8. Des fonctions toutes prêtes

Python fournit des fonctions pour les listes de nombres :

```python
grades = [12, 15, 9]
print(sum(grades))    # somme : 36
print(min(grades))    # plus petit : 9
print(max(grades))    # plus grand : 15
```

Et pour trier :

- `sorted(items)` **renvoie** une nouvelle liste triée, sans toucher à l'originale ;
- `items.sort()` trie la liste **elle-même**.

```python
grades = [12, 15, 9]
print(sorted(grades))
print(grades)
grades.sort()
print(grades)
```

Affiche `[9, 12, 15]`, `[12, 15, 9]`, puis `[9, 12, 15]`.

~~~exercice
type: write
description: |
  Complète la fonction `average(grades)` pour qu'elle renvoie la moyenne des notes (la liste n'est jamais vide), avec `sum` et `len`.

  Exemples :
  - `average([10, 20])` renvoie `15.0`
  - `average([12, 15, 9])` renvoie `12.0`
template: |
  def average(grades):
      # Écris ton code ici
      pass
solution: |
  def average(grades):
      return sum(grades) / len(grades)
hints:
  - "La moyenne, c'est la somme divisée par le nombre de notes."
tests:
  - input: [[10, 20]]
    expected: 15.0
    description: "average([10, 20])"
  - input: [[12, 15, 9]]
    expected: 12.0
    description: "average([12, 15, 9])"
  - input: [[7]]
    expected: 7.0
    description: "average([7])"
~~~

## 9. Découper une liste

Le découpage fonctionne exactement comme pour les chaînes :

```python
numbers = [10, 20, 30, 40, 50]
print(numbers[1:3])
print(numbers[:2])
print(numbers[::-1])
```

Affiche `[20, 30]`, `[10, 20]`, puis `[50, 40, 30, 20, 10]`.

## 10. Deux noms pour une même liste

Attention : `b = a` ne copie **pas** la liste. `a` et `b` désignent **la même** liste : modifier l'une modifie l'autre.

```python
a = [1, 2]
b = a
b.append(3)
print(a)
```

Affiche `[1, 2, 3]`. Pour une vraie copie, on écrit `b = a[:]` ou `b = list(a)`.

~~~exercice
type: predict
description: |
  Attention, piège ! Qu'affiche ce code ?
code: |
  a = [1, 2, 3]
  b = a
  c = a[:]
  b.append(4)
  c.append(5)
  print(a)
  print(b)
  print(c)
hints:
  - "`b = a` : même liste. `c = a[:]` : une copie indépendante."
~~~

## 11. Les listes en compréhension

Python a une écriture courte pour le schéma « liste vide + boucle + append » : la **liste en compréhension**.

```python
doubles = [n * 2 for n in [1, 2, 3]]
print(doubles)
```

Affiche `[2, 4, 6]`. Elle se lit : « `n * 2` pour chaque `n` de la liste ».

On peut ajouter une condition à la fin pour **filtrer** :

```python
big = [n for n in [4, 9, 2, 7] if n > 5]
print(big)
```

Affiche `[9, 7]`.

~~~exercice
type: write
description: |
  Complète la fonction `squares(numbers)` pour qu'elle renvoie la liste des carrés des éléments de `numbers`, avec une **liste en compréhension** (une seule ligne).

  Exemples :
  - `squares([1, 2, 3])` renvoie `[1, 4, 9]`
  - `squares([])` renvoie `[]`
template: |
  def squares(numbers):
      # Écris ton code ici
      pass
solution: |
  def squares(numbers):
      return [n * n for n in numbers]
hints:
  - "`[... for n in numbers]`, avec à la place des points ce que devient chaque `n`."
tests:
  - input: [[1, 2, 3]]
    expected: [1, 4, 9]
    description: "squares([1, 2, 3])"
  - input: [[]]
    expected: []
    description: "squares([])"
  - input: [[-2, 5]]
    expected: [4, 25]
    description: "squares([-2, 5])"
~~~

## Pièges fréquents

- Oublier que le premier indice est `0`.
- Écrire `items = items.append(x)` : `append` modifie la liste et renvoie `None`.
- Créer la liste résultat **dans** la boucle : elle est vidée à chaque tour.
- Croire que `b = a` fait une copie.
- Confondre `sorted(items)` (renvoie une copie triée) et `items.sort()` (trie la liste elle-même).
