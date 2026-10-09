# Les conditions

Jusqu'ici, toutes les lignes s'exécutaient. Avec une **condition**, le programme fait un choix : il exécute certaines lignes seulement si quelque chose est vrai.

## 1. Comparer deux valeurs

Une comparaison donne toujours `True` (vrai) ou `False` (faux).

| Écriture | Se lit |
|---|---|
| `a == b` | a est égal à b |
| `a != b` | a est différent de b |
| `a < b` | a est plus petit que b |
| `a > b` | a est plus grand que b |
| `a <= b` | a est plus petit ou égal à b |
| `a >= b` | a est plus grand ou égal à b |

```python
age = 15
print(age >= 18)
print(age == 15)
```

Affiche `False`, puis `True`.

Attention : pour **comparer**, on écrit `==` (deux signes égal). Un seul `=` sert à **ranger** une valeur.

~~~exercice
type: predict
description: |
  Chaque comparaison donne `True` ou `False`. Qu'affiche ce code ?
code: |
  x = 7
  print(x > 5)
  print(x == 8)
  print(x != 8)
  print(x <= 7)
hints:
  - "`<=` est vrai aussi quand les deux valeurs sont égales."
~~~

## 2. Faire un choix : `if`

`if` veut dire « si ». Les lignes en dessous ne s'exécutent **que si** la condition est vraie.

```python
grade = 14
if grade >= 10:
    print("Admis")
```

Affiche `Admis`, car `14 >= 10` est vrai.

Deux règles importantes :

- la ligne du `if` se termine par deux-points `:` ;
- les lignes qui dépendent du `if` sont **décalées de 4 espaces** : c'est l'**indentation**.

## 3. Ce qui est dans le `if`, et ce qui est après

Toutes les lignes décalées font partie du `if`. La première ligne qui n'est plus décalée est **après** le `if` : elle s'exécute toujours.

```python
grade = 14
if grade >= 10:
    print("Admis")
    print("Bravo")
print("Fin")
```

Affiche `Admis`, `Bravo`, puis `Fin`.

~~~exercice
type: predict
description: |
  Cette fois, la note est plus petite. Qu'affiche ce code ?
code: |
  grade = 8
  if grade >= 10:
      print("Admis")
      print("Bravo")
  print("Fin")
hints:
  - "Les deux lignes décalées sont sautées ensemble ; la dernière ne dépend pas du if."
~~~

## 4. Sinon : `else`

`else` veut dire « sinon ». Ses lignes s'exécutent quand la condition du `if` est **fausse**. Le `else` n'a pas de condition.

```python
grade = 8
if grade >= 10:
    print("Admis")
else:
    print("Recalé")
```

Affiche `Recalé`.

~~~exercice
type: output
description: |
  La variable `age` vaut `20`.

  Écris un `if` / `else` qui utilise `age` et affiche :
  - `Majeur` si `age` est supérieur ou égal à `18` ;
  - `Mineur` sinon.

  Avec `age = 20`, le programme doit afficher exactement :

  ```text
  Majeur
  ```
template: |
  age = 20
  # Écris ton if / else ici
solution: |
  age = 20
  if age >= 18:
      print("Majeur")
  else:
      print("Mineur")
checks:
  uses: [age]
  constructs: [if, else]
hints:
  - "N'oublie pas les deux-points après la condition et après else."
~~~

## 5. Plusieurs cas : `elif`

`elif` veut dire « sinon, si ». Python teste les conditions **dans l'ordre** et exécute seulement le **premier** bloc dont la condition est vraie.

```python
grade = 13
if grade >= 16:
    print("Très bien")
elif grade >= 12:
    print("Bien")
else:
    print("À travailler")
```

Affiche `Bien` : `13 >= 16` est faux, puis `13 >= 12` est vrai, donc Python s'arrête là.

~~~exercice
type: predict
description: |
  Attention à l'ordre des conditions ! Qu'affiche ce code ?
code: |
  temperature = 30
  if temperature > 10:
      print("Doux")
  elif temperature > 25:
      print("Chaud")
  else:
      print("Froid")
hints:
  - "Python s'arrête à la première condition vraie, même si une suivante l'est aussi."
~~~

~~~exercice
type: output
description: |
  La variable `grade` vaut `13`. Avec `if`, `elif` et `else`, affiche :
  - `Très bien` si la note est supérieure ou égale à `16` ;
  - `Bien` si elle est supérieure ou égale à `12` ;
  - `Passable` si elle est supérieure ou égale à `10` ;
  - `Insuffisant` sinon.

  Avec `grade = 13`, le programme doit afficher exactement :

  ```text
  Bien
  ```
template: |
  grade = 13
  # Écris tes conditions ici
solution: |
  grade = 13
  if grade >= 16:
      print("Très bien")
  elif grade >= 12:
      print("Bien")
  elif grade >= 10:
      print("Passable")
  else:
      print("Insuffisant")
checks:
  uses: [grade]
  constructs: [if, elif, else]
hints:
  - "Teste les notes de la plus grande à la plus petite."
~~~

## 6. Deux conditions à la fois : `and`

`and` (« et ») est vrai seulement si **les deux** conditions sont vraies.

```python
age = 15
if age >= 12 and age <= 17:
    print("Adolescent")
```

Affiche `Adolescent`.

## 7. Au moins une condition : `or`

`or` (« ou ») est vrai si **au moins une** des conditions est vraie.

```python
day = "dimanche"
if day == "samedi" or day == "dimanche":
    print("Week-end")
```

Affiche `Week-end`.

## 8. Le contraire : `not`

`not` inverse une condition : `not True` vaut `False`.

```python
rain = False
if not rain:
    print("On sort")
```

Affiche `On sort`.

~~~exercice
type: output
description: |
  La variable `age` vaut `15`. Avec **une seule** condition qui utilise `and`, affiche :
  - `Tarif ado` si `age` est entre `12` et `17` (inclus) ;
  - `Tarif normal` sinon.

  Avec `age = 15`, le programme doit afficher exactement :

  ```text
  Tarif ado
  ```
template: |
  age = 15
  # Écris ton code ici
solution: |
  age = 15
  if age >= 12 and age <= 17:
      print("Tarif ado")
  else:
      print("Tarif normal")
checks:
  uses: [age]
  constructs: [if, else, and]
hints:
  - "`age >= 12 and age <= 17`"
~~~

~~~exercice
type: fix
description: |
  Ce programme plante avec une erreur de syntaxe. Corrige la condition pour qu'il affiche exactement :

  ```text
  cinq
  ```
template: |
  x = 5
  if x = 5:
      print("cinq")
solution: |
  x = 5
  if x == 5:
      print("cinq")
checks:
  uses: [x]
  constructs: [if]
hints:
  - "Pour comparer, on écrit `==`. Un seul `=` sert à ranger une valeur."
~~~

## Pièges fréquents

- Écrire `=` au lieu de `==` dans une condition.
- Oublier les deux-points `:` à la fin de la ligne `if`, `elif` ou `else`.
- Oublier de décaler de 4 espaces les lignes qui dépendent du `if`.
- Mettre les `elif` dans le mauvais ordre : seule la première condition vraie compte.
- Écrire `if age >= 12 and <= 17` : il faut répéter la variable, `age >= 12 and age <= 17`.
