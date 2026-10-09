# Les calculs

Python est une excellente calculatrice. Dans cette leçon : les opérations, leurs priorités, et comment mettre à jour une variable.

## 1. Les quatre opérations

```python
print(7 + 2)    # addition : 9
print(7 - 2)    # soustraction : 5
print(7 * 2)    # multiplication : 14
print(7 / 2)    # division : 3.5
```

La multiplication s'écrit `*` et la division `/`.

## 2. La division donne toujours un `float`

Même quand le résultat « tombe juste », `/` donne un nombre à virgule :

```python
print(10 / 2)
```

Affiche `5.0`, pas `5`.

## 3. Division entière `//` et reste `%`

Quand on partage 17 bonbons entre 5 enfants :

- `17 // 5` donne `3` : chaque enfant reçoit 3 bonbons (la **division entière**) ;
- `17 % 5` donne `2` : il reste 2 bonbons (le **reste**, qu'on appelle aussi « modulo »).

```python
print(17 // 5)
print(17 % 5)
```

Affiche `3`, puis `2`.

Le reste sert souvent à savoir si un nombre est pair : `n % 2` vaut `0` quand `n` est pair.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ? Une ligne par `print`.
code: |
  print(10 / 2)
  print(7 // 2)
  print(7 % 2)
hints:
  - "/ donne toujours un float ; // garde la partie entière ; % donne le reste."
~~~

## 4. La puissance `**`

`a ** b` calcule `a` multiplié par lui-même `b` fois :

```python
print(2 ** 3)    # 2 * 2 * 2
print(5 ** 2)    # 5 au carré
```

Affiche `8`, puis `25`.

## 5. Les priorités

Comme en maths, `*` et `/` passent **avant** `+` et `-`. Les **parenthèses** passent avant tout.

```python
print(2 + 3 * 4)      # d'abord 3 * 4 = 12, puis 2 + 12
print((2 + 3) * 4)    # d'abord 2 + 3 = 5, puis 5 * 4
```

Affiche `14`, puis `20`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ? Applique les priorités avant de calculer.
code: |
  print(2 + 3 * 4)
  print((2 + 3) * 4)
  print(10 - 4 - 3)
  print(2 * 3 ** 2)
hints:
  - "** passe avant *, qui passe avant + et -. À priorité égale, on calcule de gauche à droite."
~~~

## 6. Calculer avec des variables

On utilise les variables comme des nombres, et on range les résultats dans d'autres variables :

```python
price = 4
quantity = 3
total = price * quantity
print(total)
```

Affiche `12`.

~~~exercice
type: output
description: |
  Un rectangle mesure `7` de large et `3` de haut.

  1. Crée `width = 7` et `height = 3`.
  2. Calcule `area` (largeur × hauteur) et `perimeter` (2 × (largeur + hauteur)) en utilisant ces variables.
  3. Affiche-les pour obtenir exactement :

  ```text
  Aire : 21
  Périmètre : 20
  ```
template: |
  width = 7
  height = 3
  # Calcule aire et perimetre ici

solution: |
  width = 7
  height = 3
  area = width * height
  perimeter = 2 * (width + height)
  print("Aire :", area)
  print("Périmètre :", perimeter)
checks:
  variables:
    area: 21
    perimeter: 20
  uses: [width, height, area, perimeter]
hints:
  - "Pour le périmètre, les parenthèses font l'addition avant la multiplication."
~~~

~~~exercice
type: output
description: |
  Un film dure `135` minutes. Convertis cette durée en heures et minutes.

  1. Crée `minutes = 135`.
  2. Calcule `hours` avec `//` et `rest` avec `%` (une heure = 60 minutes).
  3. Affiche exactement :

  ```text
  2 h 15 min
  ```
template: |
  minutes = 135
  # Écris ton code ici
solution: |
  minutes = 135
  hours = minutes // 60
  rest = minutes % 60
  print(hours, "h", rest, "min")
checks:
  variables:
    hours: 2
    rest: 15
  uses: [minutes, hours, rest]
hints:
  - "`print(hours, \"h\", rest, \"min\")` met un espace entre chaque valeur."
~~~

## 7. Mettre à jour une variable

On calcule souvent une nouvelle valeur à partir de l'ancienne. Le `=` se lit de droite à gauche :

```python
score = 10
score = score + 5    # à droite : 10 + 5 = 15, rangé dans score
print(score)
```

Affiche `15`.

Python a un raccourci : `score += 5` veut dire exactement `score = score + 5`. Il existe aussi `-=`, `*=` et `/=`.

```python
money = 20
money -= 8      # argent = argent - 8
money *= 2      # argent = argent * 2
print(money)
```

Affiche `24`.

~~~exercice
type: output
description: |
  1. Crée `score = 0`.
  2. Ajoute `10` à `score` avec `+=`, puis encore `5` avec `+=`.
  3. Affiche `score`.

  Le programme doit afficher exactement :

  ```text
  15
  ```
template: |
  score = 0
  # Écris ton code ici
solution: |
  score = 0
  score += 10
  score += 5
  print(score)
checks:
  variables:
    score: 15
  uses: [score]
  constructs: ["+="]
hints:
  - "`score += 10` ajoute 10 à la valeur actuelle de score."
~~~

## 8. Arrondir

`round(nombre, chiffres)` arrondit un nombre avec le nombre de chiffres voulu après la virgule :

```python
print(round(3.14159, 2))
print(round(7.6))
```

Affiche `3.14`, puis `8`.

~~~exercice
type: fix
description: |
  Ce programme doit calculer la moyenne de deux notes, `12` et `16`, et afficher exactement :

  ```text
  14.0
  ```

  Il affiche `20.0` à cause d'un problème de priorité. Corrige la **troisième** ligne.
template: |
  a = 12
  b = 16
  average = a + b / 2
  print(average)
solution: |
  a = 12
  b = 16
  average = (a + b) / 2
  print(average)
checks:
  variables:
    average: 14.0
  uses: [a, b, average]
hints:
  - "La division passe avant l'addition : il faut des parenthèses."
~~~

## Pièges fréquents

- Oublier que `/` donne un `float` : `10 / 2` vaut `5.0`.
- Oublier les priorités : `a + b / 2` divise seulement `b`.
- Écrire `x` pour multiplier : en Python, c'est `*`.
- Écrire `^` pour la puissance : en Python, c'est `**`.
