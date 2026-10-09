# Les fonctions

Une **fonction** est un morceau de code auquel on donne un **nom**, pour pouvoir le réutiliser autant de fois qu'on veut. Dans cette leçon : à quoi ça sert, comment en créer une, et comment elle renvoie un résultat.

## 1. Pourquoi des fonctions ?

Imagine qu'on doive saluer trois personnes avec le même message de trois lignes. Sans fonction, on recopie trois fois les mêmes lignes : c'est long, et si on veut changer le message, il faut le corriger à trois endroits.

Une fonction règle ce problème : on écrit les lignes **une seule fois**, on leur donne un nom, et on utilise ce nom chaque fois qu'on en a besoin.

Tu en utilises déjà sans le savoir : `print`, `type`, `int` ou `round` sont des fonctions écrites par d'autres.

## 2. Définir une fonction

On crée une fonction avec le mot `def` (pour « définir ») :

```python
def say_hello():
    print("Bonjour !")
    print("Bienvenue.")
```

- `def` annonce une nouvelle fonction ;
- `say_hello` est son nom (mêmes règles que pour une variable) ;
- les parenthèses `()` et les deux-points `:` sont obligatoires ;
- les lignes de la fonction sont **décalées de 4 espaces**.

Attention : ce code n'affiche **rien**. `def` ne fait que ranger les lignes sous un nom, sans les exécuter.

## 3. Appeler une fonction

Pour exécuter le code d'une fonction, on l'**appelle** : on écrit son nom suivi de parenthèses.

```python
def say_hello():
    print("Bonjour !")

say_hello()
say_hello()
```

Affiche `Bonjour !` deux fois. À chaque appel, Python « saute » dans la fonction, exécute ses lignes, puis revient juste après l'appel.

~~~exercice
type: predict
description: |
  Suis le chemin de Python ligne par ligne. Qu'affiche ce code ?
code: |
  def say_hello():
      print("Bonjour")

  print("Début")
  say_hello()
  say_hello()
  print("Fin")
hints:
  - "Les lignes de la fonction ne s'exécutent qu'au moment des appels, dans l'ordre du programme."
~~~

~~~exercice
type: output
description: |
  1. Définis une fonction `greet` (sans paramètre) qui affiche `Bonjour !`.
  2. Appelle-la **deux fois**.

  Le programme doit afficher exactement :

  ```text
  Bonjour !
  Bonjour !
  ```
template: |
  # Définis la fonction ici

  # Appelle-la ici
solution: |
  def greet():
      print("Bonjour !")

  greet()
  greet()
checks:
  uses: [greet]
  constructs: [def]
hints:
  - "Un appel s'écrit avec les parenthèses : `greet()`."
~~~

## 4. Les paramètres

Un **paramètre** est une valeur qu'on donne à la fonction au moment de l'appel. Dans la fonction, il s'utilise comme une variable.

```python
def greet(name):
    print("Bonjour", name)

greet("Ada")
greet("Léo")
```

Affiche `Bonjour Ada`, puis `Bonjour Léo`. Au premier appel, `name` vaut `"Ada"` ; au second, il vaut `"Léo"`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ? Note la valeur du paramètre `n` à chaque appel.
code: |
  def show_double(n):
      print(n, "->", n * 2)

  show_double(3)
  show_double(10)
hints:
  - "Avec `show_double(3)`, n vaut 3 pendant tout l'appel."
~~~

## 5. Plusieurs paramètres

On sépare les paramètres par des virgules. Les valeurs sont données **dans le même ordre**.

```python
def introduce(name, age):
    print(name, "a", age, "ans")

introduce("Ada", 36)
```

Affiche `Ada a 36 ans` : `name` reçoit `"Ada"` et `age` reçoit `36`.

## 6. Renvoyer un résultat : `return`

Souvent, on veut qu'une fonction **calcule** quelque chose et nous **donne** le résultat. Pour ça, on utilise `return` :

```python
def square(n):
    return n * n

result = square(4)
print(result)
```

Affiche `16`. L'appel `square(4)` est **remplacé** par la valeur renvoyée : la ligne devient `result = 16`.

~~~exercice
type: write
description: |
  Complète la fonction `triple(n)` pour qu'elle **renvoie** `n` multiplié par 3.

  Exemples :
  - `triple(2)` renvoie `6`
  - `triple(-4)` renvoie `-12`
template: |
  def triple(n):
      # Écris ton code ici
      pass
solution: |
  def triple(n):
      return n * 3
hints:
  - "Remplace `pass` par une ligne qui commence par `return`."
tests:
  - input: [2]
    expected: 6
    description: "triple(2)"
  - input: [0]
    expected: 0
    description: "triple(0)"
  - input: [-4]
    expected: -12
    description: "triple(-4)"
~~~

## 7. `return` ou `print` ?

Ce sont deux choses différentes :

- `print` **affiche** une valeur à l'écran, puis la valeur est perdue ;
- `return` **renvoie** la valeur à l'endroit de l'appel, pour qu'on puisse s'en servir.

Une fonction sans `return` renvoie une valeur spéciale : `None` (« rien »).

```python
def double_print(n):
    print(n * 2)

def double_return(n):
    return n * 2

a = double_print(5)     # affiche 10
b = double_return(5)     # n'affiche rien
print(a, b)
```

La dernière ligne affiche `None 10` : `a` ne contient rien, `b` contient bien `10`.

~~~exercice
type: fix
description: |
  La fonction `double(n)` doit **renvoyer** le double de `n`, par exemple `double(4)` doit renvoyer `8`.
  Elle affiche le bon résultat, mais ne le renvoie pas : corrige-la.
template: |
  def double(n):
      print(n * 2)
solution: |
  def double(n):
      return n * 2
hints:
  - "Les tests regardent ce que la fonction renvoie, pas ce qu'elle affiche."
tests:
  - input: [4]
    expected: 8
    description: "double(4)"
  - input: [0]
    expected: 0
    description: "double(0)"
  - input: [-3]
    expected: -6
    description: "double(-3)"
~~~

## 8. `return` arrête la fonction

Dès qu'un `return` est exécuté, la fonction s'arrête : les lignes suivantes ne sont pas exécutées.

```python
def test():
    return 1
    print("Jamais affiché")

print(test())
```

Affiche seulement `1`.

## 9. Utiliser le résultat

Une valeur renvoyée s'utilise comme n'importe quelle valeur : dans un calcul, dans un `print`, dans une condition…

```python
def square(n):
    return n * n

print(square(3) + square(4))     # 9 + 16
if square(5) > 20:
    print("Grand carré")
```

Affiche `25`, puis `Grand carré`.

~~~exercice
type: write
description: |
  Complète la fonction `rectangle_area(width, height)` pour qu'elle renvoie l'aire du rectangle (largeur × hauteur).

  Exemples :
  - `rectangle_area(3, 4)` renvoie `12`
  - `rectangle_area(10, 2)` renvoie `20`
template: |
  def rectangle_area(width, height):
      # Écris ton code ici
      pass
solution: |
  def rectangle_area(width, height):
      return width * height
hints:
  - "Utilise les deux paramètres dans le calcul."
tests:
  - input: [3, 4]
    expected: 12
    description: "rectangle_area(3, 4)"
  - input: [10, 2]
    expected: 20
    description: "rectangle_area(10, 2)"
  - input: [5, 0]
    expected: 0
    description: "rectangle_area(5, 0)"
~~~

## 10. Des conditions et des boucles dans une fonction

Une fonction peut contenir tout ce que tu as appris : conditions, boucles… Il suffit de décaler leurs lignes de 4 espaces de plus.

```python
def sign(n):
    if n >= 0:
        return "positif"
    else:
        return "négatif"

print(sign(-3))
```

Affiche `négatif`.

~~~exercice
type: write
description: |
  Complète la fonction `is_adult(age)` pour qu'elle renvoie `True` si `age` est supérieur ou égal à 18, et `False` sinon.

  Exemples :
  - `is_adult(20)` renvoie `True`
  - `is_adult(12)` renvoie `False`
template: |
  def is_adult(age):
      # Écris ton code ici
      pass
solution: |
  def is_adult(age):
      if age >= 18:
          return True
      else:
          return False
hints:
  - "Chaque cas du if / else a son propre `return`."
tests:
  - input: [20]
    expected: true
    description: "is_adult(20)"
  - input: [18]
    expected: true
    description: "is_adult(18)"
  - input: [12]
    expected: false
    description: "is_adult(12)"
~~~

~~~exercice
type: write
description: |
  Complète la fonction `sum_up_to(n)` pour qu'elle renvoie la somme des nombres de 1 à `n`, calculée avec une boucle `for`.

  Exemples :
  - `sum_up_to(3)` renvoie `6` (1 + 2 + 3)
  - `sum_up_to(10)` renvoie `55`
template: |
  def sum_up_to(n):
      # Écris ton code ici
      pass
solution: |
  def sum_up_to(n):
      total = 0
      for i in range(1, n + 1):
          total += i
      return total
hints:
  - "Le `return` se place après la boucle, une fois la somme terminée."
tests:
  - input: [3]
    expected: 6
    description: "sum_up_to(3)"
  - input: [10]
    expected: 55
    description: "sum_up_to(10)"
  - input: [1]
    expected: 1
    description: "sum_up_to(1)"
~~~

## 11. Les variables d'une fonction restent dans la fonction

Une variable créée dans une fonction n'existe **que** pendant l'appel. En dehors, Python ne la connaît pas.

```python
def compute():
    result = 42
    return result

value = compute()
print(value)        # 42
```

Écrire `print(result)` à la dernière ligne provoquerait une erreur : `result` n'existe que dans `compute`. Pour récupérer une valeur, on utilise `return`.

## 12. Comment les exercices sont corrigés

Dans les exercices de fonctions, tu écris **seulement la fonction**. Les tests l'appellent avec différentes valeurs et comparent ce qu'elle **renvoie** au résultat attendu. Par exemple :

| Entrée | Attendu | Obtenu |
|---|---|---|
| `[3]` | `6` | ce que renvoie `triple(3)` |

Donc :

- utilise `return`, pas `print`, pour donner le résultat ;
- utilise les paramètres, pas des valeurs écrites à la main : les tests essaient plusieurs valeurs.

## Pièges fréquents

- Définir une fonction sans jamais l'appeler : rien ne se passe.
- Oublier les parenthèses à l'appel : `greet` au lieu de `greet()`.
- Utiliser `print` au lieu de `return` : la fonction renvoie `None`.
- Laisser `pass` dans le template : la fonction renvoie `None`.
- Écrire du code après un `return` dans le même bloc : il n'est jamais exécuté.
