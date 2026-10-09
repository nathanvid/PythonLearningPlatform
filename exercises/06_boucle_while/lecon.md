# La boucle `while`

La boucle `while` répète des lignes **tant qu'**une condition est vraie. Elle sert quand on ne sait pas à l'avance combien de tours il faudra.

## 1. Répéter tant que

`while` veut dire « tant que ». Avant **chaque** tour, Python vérifie la condition : si elle est vraie, il fait un tour ; si elle est fausse, il sort de la boucle.

```python
n = 1
while n <= 3:
    print(n)
    n += 1
```

Affiche `1`, `2`, `3`.

Étape par étape : `n` vaut 1 (1 <= 3, on affiche 1), puis 2 (on affiche 2), puis 3 (on affiche 3), puis 4 : `4 <= 3` est faux, la boucle s'arrête.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ? Suis la valeur de `n` à chaque tour.
code: |
  n = 3
  while n > 0:
      print(n)
      n -= 1
  print("Fin")
hints:
  - "La condition est vérifiée avant chaque tour : quand n vaut 0, on sort."
~~~

~~~exercice
type: output
description: |
  Avec une boucle `while` (pas de `for`), affiche les nombres de `1` à `5`, un par ligne :

  ```text
  1
  2
  3
  4
  5
  ```
template: |
  n = 1
  # Écris ta boucle while ici
solution: |
  n = 1
  while n <= 5:
      print(n)
      n += 1
checks:
  constructs: [while]
hints:
  - "Dans la boucle : affiche n, puis augmente-le de 1."
~~~

## 2. Zéro tour, c'est possible

Si la condition est fausse dès le départ, la boucle ne fait **aucun** tour :

```python
n = 10
while n < 5:
    print(n)
print("Fin")
```

Affiche seulement `Fin`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ?
code: |
  n = 10
  while n < 5:
      print(n)
      n += 1
  print("Terminé")
hints:
  - "Teste la condition avec n = 10 avant le premier tour."
~~~

## 3. Attention à la boucle infinie

Si la variable de la condition ne change jamais, la condition reste vraie pour toujours : c'est une **boucle infinie**. Le programme ne s'arrête plus (ici, la plateforme l'arrête au bout de 3 secondes).

```python
n = 1
while n <= 3:
    print(n)
    n += 1      # sans cette ligne, n resterait à 1 pour toujours
```

Dans une boucle `while`, vérifie toujours qu'une ligne **rapproche** la condition de `False`.

~~~exercice
type: fix
description: |
  Ce programme doit afficher `1`, `2`, `3`, mais il ne s'arrête jamais.
  Ajoute la ligne qui manque dans la boucle pour qu'il affiche exactement :

  ```text
  1
  2
  3
  ```
template: |
  n = 1
  while n <= 3:
      print(n)
solution: |
  n = 1
  while n <= 3:
      print(n)
      n += 1
checks:
  constructs: [while]
hints:
  - "n doit augmenter à chaque tour, sinon n <= 3 reste toujours vrai."
~~~

## 4. Quand utiliser `while` plutôt que `for` ?

- `for` : on sait **combien** de tours faire (« répète 10 fois »).
- `while` : on sait **quand s'arrêter** (« continue jusqu'à dépasser 100 »).

Par exemple : combien de fois faut-il doubler 1 pour dépasser 100 ?

```python
value = 1
rounds = 0
while value <= 100:
    value *= 2
    rounds += 1
print(rounds, value)
```

Affiche `7 128` : après 7 doublements, on obtient 128.

~~~exercice
type: output
description: |
  On part de `value = 1` et on la double tant qu'elle est inférieure ou égale à `1000`.

  Avec une boucle `while`, compte le nombre de doublements dans une variable `rounds`, puis affiche :

  ```text
  Il faut 10 doublements
  ```
template: |
  value = 1
  rounds = 0
  # Écris ta boucle while ici
solution: |
  value = 1
  rounds = 0
  while value <= 1000:
      value *= 2
      rounds += 1
  print("Il faut", rounds, "doublements")
checks:
  variables:
    rounds: 10
  uses: [rounds]
  constructs: [while]
hints:
  - "À chaque tour : doubler valeur et ajouter 1 à tours. Le print est après la boucle."
~~~

~~~exercice
type: output
description: |
  Tu places `100` euros, et chaque année ton argent augmente de 10 % (il est multiplié par `1.1`).

  Avec une boucle `while`, compte dans une variable `years` combien d'années il faut pour avoir **au moins** `200` euros, puis affiche :

  ```text
  8 ans
  ```
template: |
  money = 100
  years = 0
  # Écris ta boucle while ici
solution: |
  money = 100
  years = 0
  while money < 200:
      money *= 1.1
      years += 1
  print(years, "ans")
checks:
  variables:
    years: 8
  uses: [money, years]
  constructs: [while]
hints:
  - "On continue tant que `money < 200`."
~~~

## Pièges fréquents

- Oublier de faire changer la variable de la condition : boucle infinie.
- Écrire la condition à l'envers : la boucle ne fait aucun tour.
- Oublier les deux-points `:` à la fin de la ligne `while`.
- Décaler le `print` du résultat final : il s'affiche à chaque tour.
