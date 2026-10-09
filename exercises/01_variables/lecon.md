# Afficher et ranger des valeurs

Dans cette leçon : afficher du texte avec `print`, puis ranger des valeurs dans des **variables**. Une seule idée par étape, avec un exercice dès que tu as de quoi t'entraîner.

## 1. Afficher un message

Pour qu'un programme écrive quelque chose à l'écran, on utilise `print`. Le texte se met **entre guillemets**.

```python
print("Bonjour")
```

Ce code affiche :

```text
Bonjour
```

## 2. Afficher plusieurs lignes

Python lit le programme **de haut en bas**, une ligne après l'autre. Chaque `print` affiche une nouvelle ligne.

```python
print("Ligne 1")
print("Ligne 2")
```

Affiche :

```text
Ligne 1
Ligne 2
```

~~~exercice
type: output
description: |
  Écris un programme qui affiche **exactement** ces deux lignes :

  ```text
  Bonjour
  Je découvre Python
  ```
template: |
  # Écris ton code ici
solution: |
  print("Bonjour")
  print("Je découvre Python")
hints:
  - "Il faut un print par ligne."
~~~

## 3. Afficher plusieurs choses sur une ligne

On peut donner plusieurs valeurs à `print`, séparées par des **virgules**. Python les affiche sur la même ligne, avec **un espace** entre chacune.

```python
print("Bonjour", "Ada")
print("J'ai", 15, "ans")
```

Affiche :

```text
Bonjour Ada
J'ai 15 ans
```

~~~exercice
type: predict
description: |
  Qu'affiche ce code ? Écris exactement ce qui apparaît à l'écran, ligne par ligne.
code: |
  print("Un", "deux", "trois")
  print("Score :", 10)
hints:
  - "Chaque virgule devient un espace dans l'affichage."
~~~

## 4. Une variable, c'est quoi ?

Une variable, c'est comme une **boîte avec une étiquette**.

- L'étiquette, c'est le **nom** de la variable.
- Ce qu'on met dans la boîte, c'est la **valeur**.

```python
age = 15
```

Cette ligne veut dire : « range la valeur `15` dans une boîte qui s'appelle `age` ». Elle n'affiche rien.

## 5. Lire une variable

Pour utiliser ce qu'il y a dans la boîte, on écrit son nom, **sans guillemets** :

```python
age = 15
print(age)
```

Affiche `15`.

Avec des guillemets, `print("age")` afficherait le mot `age`, pas la valeur.

~~~exercice
type: output
description: |
  1. Crée une variable `city` qui contient le texte `"Paris"`.
  2. Affiche la variable `city` avec `print`.

  Le programme doit afficher :

  ```text
  Paris
  ```
template: |
  # Écris ton code ici
solution: |
  city = "Paris"
  print(city)
checks:
  variables:
    city: "Paris"
  uses: [city]
hints:
  - "Dans print, écris le nom de la variable, sans guillemets."
~~~

## 6. Afficher un texte et une variable

Avec la virgule de l'étape 3, on mélange du texte et des variables dans un même `print` :

```python
first_name = "Ada"
print("Bonjour", first_name)
```

Affiche `Bonjour Ada`.

~~~exercice
type: output
description: |
  1. Crée une variable `first_name` qui contient `"Léo"`.
  2. Avec **un seul** `print` qui utilise `first_name`, affiche exactement :

  ```text
  Je m'appelle Léo
  ```
template: |
  # Écris ton code ici
solution: |
  first_name = "Léo"
  print("Je m'appelle", first_name)
checks:
  variables:
    first_name: "Léo"
  uses: [first_name]
hints:
  - "Sépare le texte et la variable par une virgule : `print(\"Je m'appelle\", first_name)`."
~~~

## 7. Changer le contenu d'une variable

On peut remplacer ce qu'il y a dans la boîte. L'ancienne valeur **disparaît**.

```python
score = 10
score = 25
print(score)
```

Affiche `25`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ? Suis la valeur de `score` ligne après ligne.
code: |
  score = 10
  print(score)
  score = 25
  print(score)
hints:
  - "Chaque print affiche la valeur de score au moment où il est exécuté."
~~~

## 8. Le signe `=` se lit de droite à gauche

En Python, `=` ne veut pas dire « est égal à ». Il veut dire **« range dans »**.

Python regarde d'abord ce qui est **à droite**, puis le range dans la variable **à gauche**. On peut donc copier la valeur d'une variable dans une autre :

```python
a = 5
b = a
print(b)
```

Affiche `5`. La ligne `b = a` copie la **valeur** de `a` (5) dans `b`. Ensuite, les deux boîtes sont indépendantes.

~~~exercice
type: predict
description: |
  Attention, piège ! Qu'affiche ce code ?
code: |
  a = 5
  b = a
  a = 8
  print(a)
  print(b)
hints:
  - "`b = a` copie la valeur 5 dans b. Changer a ensuite ne change pas b."
~~~

## 9. Bien nommer ses variables

Un nom de variable :

- contient des lettres, des chiffres et le tiret bas `_` ;
- ne contient **pas d'espace** : on écrit `my_age`, pas `my age` ;
- ne commence **pas par un chiffre** : `score2` oui, `2score` non ;
- fait la différence entre majuscules et minuscules : `Age` et `age` sont deux variables différentes.

Choisis des noms qui disent ce que contient la boîte : `prix` est plus clair que `x`.

~~~exercice
type: fix
description: |
  Ce programme plante à cause d'un nom de variable incorrect.

  Corrige-le : la variable doit s'appeler `my_name`. Le programme doit afficher :

  ```text
  Ada
  ```
template: |
  my name = "Ada"
  print(my name)
solution: |
  my_name = "Ada"
  print(my_name)
checks:
  variables:
    my_name: "Ada"
  uses: [my_name]
hints:
  - "Un nom de variable ne peut pas contenir d'espace : remplace-le par `_`."
~~~

## 10. Les commentaires

Tout ce qui suit un `#` sur une ligne est un **commentaire** : Python l'ignore. Il sert à expliquer le code à ceux qui le lisent.

```python
# Ce programme affiche l'âge
age = 15      # l'âge en années
print(age)
```

Affiche seulement `15`.

## Pièges fréquents

- Oublier les guillemets autour d'un texte : `print(Bonjour)` provoque une erreur.
- Mettre des guillemets autour d'une variable : `print("age")` affiche le mot `age`.
- Mettre un espace dans un nom de variable : `my age = 15` est une erreur.
- Utiliser une variable avant de l'avoir créée : Python ne la connaît pas encore.
