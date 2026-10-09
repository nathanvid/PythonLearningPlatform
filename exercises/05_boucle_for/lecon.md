# La boucle `for`

Une **boucle** répète des lignes plusieurs fois, sans avoir à les recopier. La boucle `for` sert quand on sait **combien de fois** répéter.

## 1. Répéter une action

```python
for i in range(3):
    print("Coucou")
```

Affiche `Coucou` trois fois. `range(3)` veut dire « 3 tours ».

Comme pour `if`, la ligne `for` se termine par deux-points `:` et les lignes à répéter sont **décalées de 4 espaces**.

~~~exercice
type: output
description: |
  Avec une boucle `for`, affiche **3 fois** le mot `Bravo`, un par ligne :

  ```text
  Bravo
  Bravo
  Bravo
  ```
template: |
  # Écris ta boucle ici
solution: |
  for i in range(3):
      print("Bravo")
checks:
  constructs: [for]
hints:
  - "Un seul print, décalé de 4 espaces sous la ligne du for."
~~~

## 2. La variable de boucle

À chaque tour, la variable `i` prend une nouvelle valeur. `range(3)` donne `0`, puis `1`, puis `2` : on commence à **0** et on s'arrête **avant** 3.

```python
for i in range(3):
    print(i)
```

Affiche :

```text
0
1
2
```

~~~exercice
type: predict
description: |
  Qu'affiche ce code ? Calcule `i * 10` à chaque tour.
code: |
  for i in range(4):
      print(i * 10)
hints:
  - "range(4) donne 0, 1, 2 et 3."
~~~

## 3. Pendant la boucle, et après

Les lignes décalées sont répétées. La première ligne qui n'est plus décalée s'exécute **une seule fois**, après la boucle.

```python
for i in range(2):
    print("Tour", i)
print("Fini")
```

Affiche `Tour 0`, `Tour 1`, puis `Fini`.

## 4. Choisir le départ et l'arrivée

`range(debut, fin)` commence à `debut` et s'arrête **avant** `fin`.

```python
for i in range(1, 4):
    print(i)
```

Affiche `1`, `2`, `3`.

~~~exercice
type: output
description: |
  Avec une boucle `for` et `range`, affiche les nombres de `1` à `5`, un par ligne :

  ```text
  1
  2
  3
  4
  5
  ```
template: |
  # Écris ta boucle ici
solution: |
  for i in range(1, 6):
      print(i)
checks:
  constructs: [for]
hints:
  - "La fin de range est exclue : pour aller jusqu'à 5, il faut écrire 6."
~~~

## 5. Avancer de plusieurs en plusieurs

Un troisième nombre donne le **pas** : de combien on avance à chaque tour.

```python
for i in range(0, 10, 2):
    print(i)
```

Affiche `0`, `2`, `4`, `6`, `8`.

Avec un pas négatif, on compte à rebours : `range(3, 0, -1)` donne `3`, `2`, `1`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ?
code: |
  for i in range(2, 11, 3):
      print(i)
hints:
  - "On part de 2 et on ajoute 3 à chaque tour, tant qu'on reste avant 11."
~~~

## 6. Additionner dans une boucle

Pour calculer une somme, on prépare une variable **avant** la boucle, puis on lui ajoute un nombre **à chaque tour** :

```python
total = 0
for i in range(1, 4):
    total += i
print(total)
```

Étape par étape : `total` vaut 0, puis 0 + 1 = 1, puis 1 + 2 = 3, puis 3 + 3 = 6. Affiche `6`.

On appelle cette variable un **accumulateur**.

~~~exercice
type: output
description: |
  Avec une boucle `for`, calcule la somme de tous les nombres de `1` à `100` dans une variable `total`, puis affiche `total`.

  Le programme doit afficher exactement :

  ```text
  5050
  ```
template: |
  total = 0
  # Écris ta boucle ici
solution: |
  total = 0
  for i in range(1, 101):
      total += i
  print(total)
checks:
  variables:
    total: 5050
  uses: [total]
  constructs: [for]
hints:
  - "Le print doit être après la boucle (non décalé), pour n'afficher que le résultat final."
~~~

~~~exercice
type: fix
description: |
  Ce programme doit calculer `1 + 2 + 3 + 4` et afficher exactement :

  ```text
  10
  ```

  Il affiche `4`. Trouve la ligne en trop et supprime-la.
template: |
  total = 0
  for i in range(1, 5):
      total = 0
      total += i
  print(total)
solution: |
  total = 0
  for i in range(1, 5):
      total += i
  print(total)
checks:
  variables:
    total: 10
  uses: [total]
  constructs: [for]
hints:
  - "Une ligne remet total à 0 à chaque tour."
~~~

## 7. Une condition dans une boucle

On peut mettre un `if` dans une boucle. Par exemple, pour compter les nombres pairs de 1 à 10 :

```python
count = 0
for i in range(1, 11):
    if i % 2 == 0:
        count += 1
print(count)
```

Affiche `5`. Les lignes du `if` sont décalées de **8 espaces** : 4 pour la boucle, 4 de plus pour le `if`.

~~~exercice
type: output
description: |
  Avec une boucle `for`, affiche la table de multiplication de `7`, de `7 x 1` à `7 x 10`.
  Utilise la variable de boucle pour le deuxième nombre et pour le calcul.

  Le programme doit afficher exactement :

  ```text
  7 x 1 = 7
  7 x 2 = 14
  7 x 3 = 21
  7 x 4 = 28
  7 x 5 = 35
  7 x 6 = 42
  7 x 7 = 49
  7 x 8 = 56
  7 x 9 = 63
  7 x 10 = 70
  ```
template: |
  # Écris ta boucle ici
solution: |
  for i in range(1, 11):
      print(7, "x", i, "=", 7 * i)
checks:
  constructs: [for]
hints:
  - "`print(7, \"x\", i, \"=\", 7 * i)` affiche une ligne de la table."
~~~

## Pièges fréquents

- Oublier que `range(n)` commence à 0 et s'arrête avant `n`.
- Créer l'accumulateur **dans** la boucle : il repart de 0 à chaque tour.
- Décaler le `print` final : il s'affiche alors à chaque tour au lieu d'une seule fois.
- Oublier les deux-points `:` à la fin de la ligne `for`.
