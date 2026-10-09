# Les chaînes de caractères

Une **chaîne de caractères** (`str`), c'est du texte : une suite de caractères entre guillemets. Dans cette leçon : lire un caractère, découper, transformer et parcourir un texte.

## 1. Une suite de caractères

Une chaîne est une suite de caractères : lettres, chiffres, espaces, ponctuation… `len` donne le nombre de caractères :

```python
word = "Python"
print(len(word))
print(len("Bon jour"))
```

Affiche `6`, puis `8` : l'espace compte comme un caractère.

## 2. Lire un caractère : les indices

Chaque caractère a une **position**, appelée **indice**. Le premier est à l'indice **0**.

```text
 P   y   t   h   o   n
 0   1   2   3   4   5
```

```python
word = "Python"
print(word[0])
print(word[3])
```

Affiche `P`, puis `h`.

## 3. Compter depuis la fin

Un indice négatif part de la fin : `-1` est le dernier caractère, `-2` l'avant-dernier…

```python
word = "Python"
print(word[-1])
print(word[-2])
```

Affiche `n`, puis `o`.

Attention : un indice trop grand provoque une erreur (`IndexError`). Dans `"Python"`, le dernier indice est `5`, pas `6`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ?
code: |
  word = "Bonjour"
  print(len(word))
  print(word[0])
  print(word[-1])
  print(word[2])
hints:
  - "Le premier caractère est à l'indice 0."
~~~

~~~exercice
type: write
description: |
  Complète la fonction `first_last(word)` pour qu'elle renvoie la première lettre de `word` collée à sa dernière lettre.

  Exemples :
  - `first_last("Python")` renvoie `"Pn"`
  - `first_last("chat")` renvoie `"ct"`
template: |
  def first_last(word):
      # Écris ton code ici
      pass
solution: |
  def first_last(word):
      return word[0] + word[-1]
hints:
  - "La dernière lettre est `word[-1]`, quelle que soit la longueur du mot."
tests:
  - input: ["Python"]
    expected: "Pn"
    description: "first_last(\"Python\")"
  - input: ["chat"]
    expected: "ct"
    description: "first_last(\"chat\")"
  - input: ["ok"]
    expected: "ok"
    description: "first_last(\"ok\")"
~~~

## 4. Découper un morceau

`word[start:end]` renvoie le morceau qui va de l'indice `start` jusqu'à `end` **non compris** (comme `range`).

```python
word = "Python"
print(word[0:2])    # indices 0 et 1
print(word[2:6])    # indices 2 à 5
```

Affiche `Py`, puis `thon`.

On peut omettre un des deux nombres : `word[:2]` part du début, `word[2:]` va jusqu'à la fin.

```python
word = "Python"
print(word[:2])
print(word[2:])
```

Affiche `Py`, puis `thon`.

## 5. Inverser une chaîne

Comme pour `range`, un troisième nombre donne le **pas**. Avec un pas de `-1`, on lit la chaîne à l'envers :

```python
print("Python"[::-1])
```

Affiche `nohtyP`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ?
code: |
  word = "programme"
  print(word[0:3])
  print(word[3:])
  print(word[:1] + word[-1])
  print(word[::-1])
hints:
  - "La fin d'un découpage n'est jamais incluse."
~~~

~~~exercice
type: write
description: |
  Complète la fonction `capitalize_first(word)` pour qu'elle renvoie `word` avec sa **première lettre** en majuscule, le reste inchangé.
  Utilise un indice, un découpage et la méthode `upper()` (vue juste après : `"a".upper()` donne `"A"`).

  Exemples :
  - `capitalize_first("ada")` renvoie `"Ada"`
  - `capitalize_first("python")` renvoie `"Python"`
template: |
  def capitalize_first(word):
      # Écris ton code ici
      pass
solution: |
  def capitalize_first(word):
      return word[0].upper() + word[1:]
hints:
  - "Colle la première lettre en majuscule (`word[0].upper()`) et la suite du mot (`word[1:]`)."
tests:
  - input: ["ada"]
    expected: "Ada"
    description: "capitalize_first(\"ada\")"
  - input: ["python"]
    expected: "Python"
    description: "capitalize_first(\"python\")"
  - input: ["a"]
    expected: "A"
    description: "capitalize_first(\"a\")"
~~~

## 6. Les méthodes : transformer un texte

Une **méthode** est une fonction attachée à une valeur. On l'appelle avec un point : `text.method()`.

```python
name = "Ada Lovelace"
print(name.upper())     # tout en majuscules
print(name.lower())     # tout en minuscules
```

Affiche `ADA LOVELACE`, puis `ada lovelace`.

Une chaîne ne peut **jamais être modifiée** : une méthode renvoie une **nouvelle** chaîne. Pour garder le résultat, il faut le ranger : `name = name.upper()`.

## 7. Nettoyer et remplacer

- `strip()` enlève les espaces au début et à la fin ;
- `replace(old, new)` remplace un morceau par un autre, partout.

```python
typed = "   bonjour   "
print(typed.strip())
print("banane".replace("a", "o"))
```

Affiche `bonjour`, puis `bonone`.

## 8. Chercher dans un texte

- `piece in text` vaut `True` si le morceau `piece` est dans le texte ;
- `text.count(piece)` compte combien de fois il y apparaît.

```python
sentence = "le chat et le chien"
print("chat" in sentence)
print(sentence.count("le"))
```

Affiche `True`, puis `2`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ?
code: |
  text = "  Bonjour  "
  print(text.strip())
  print(text.strip().upper())
  print("banane".replace("an", "AN"))
  print("banane".count("a"))
  print("z" in "banane")
hints:
  - "On peut enchaîner les méthodes : `text.strip().upper()` applique strip, puis upper au résultat."
~~~

## 9. Parcourir un texte lettre par lettre

Une boucle `for` peut parcourir une chaîne : à chaque tour, la variable contient **un caractère**.

```python
for letter in "abc":
    print(letter)
```

Affiche `a`, `b`, puis `c`.

En ajoutant un `if`, on compte par exemple les `a` :

```python
count = 0
for letter in "banane":
    if letter == "a":
        count += 1
print(count)
```

Affiche `2`.

~~~exercice
type: write
description: |
  Complète la fonction `count_letter(text, letter)` pour qu'elle renvoie le nombre de fois où `letter` apparaît dans `text`.
  Utilise une boucle `for` qui parcourt `text` (sans la méthode `count`).

  Exemples :
  - `count_letter("banane", "a")` renvoie `2`
  - `count_letter("python", "z")` renvoie `0`
template: |
  def count_letter(text, letter):
      # Écris ton code ici
      pass
solution: |
  def count_letter(text, letter):
      count = 0
      for character in text:
          if character == letter:
              count += 1
      return count
hints:
  - "Un compteur avant la boucle, `+= 1` dans le `if`, et `return` après la boucle."
tests:
  - input: ["banane", "a"]
    expected: 2
    description: "count_letter(\"banane\", \"a\")"
  - input: ["python", "z"]
    expected: 0
    description: "count_letter(\"python\", \"z\")"
  - input: ["aaa", "a"]
    expected: 3
    description: "count_letter(\"aaa\", \"a\")"
~~~

## 10. Construire un texte dans une boucle

Comme on additionne des nombres dans un accumulateur, on peut **coller** des caractères dans une chaîne qui part vide (`""`) :

```python
result = ""
for letter in "abc":
    result = result + letter.upper()
print(result)
```

Affiche `ABC`.

~~~exercice
type: write
description: |
  Complète la fonction `without_spaces(text)` pour qu'elle renvoie `text` sans aucun espace.
  Construis le résultat avec une boucle `for` : on colle chaque caractère qui n'est pas un espace.

  Exemples :
  - `without_spaces("bon jour")` renvoie `"bonjour"`
  - `without_spaces(" a b c ")` renvoie `"abc"`
template: |
  def without_spaces(text):
      # Écris ton code ici
      pass
solution: |
  def without_spaces(text):
      result = ""
      for character in text:
          if character != " ":
              result += character
      return result
hints:
  - "Pars de `result = \"\"` et colle seulement les caractères différents de `\" \"`."
tests:
  - input: ["bon jour"]
    expected: "bonjour"
    description: "without_spaces(\"bon jour\")"
  - input: [" a b c "]
    expected: "abc"
    description: "without_spaces(\" a b c \")"
  - input: ["python"]
    expected: "python"
    description: "without_spaces(\"python\")"
~~~

## 11. Insérer des valeurs : les f-strings

Une **f-string** est une chaîne précédée d'un `f`. Tout ce qui est entre accolades `{}` est remplacé par sa valeur :

```python
name = "Ada"
age = 36
print(f"{name} a {age} ans")
print(f"Dans 10 ans : {age + 10}")
```

Affiche `Ada a 36 ans`, puis `Dans 10 ans : 46`. Pas besoin de `str()` ni de `+` : la f-string s'occupe de tout.

~~~exercice
type: output
description: |
  Les variables `item` et `price` sont déjà créées. Avec **une f-string** qui utilise ces deux variables, affiche exactement :

  ```text
  Le stylo coûte 2 euros
  ```
template: |
  item = "stylo"
  price = 2
  # Affiche la phrase avec une f-string
solution: |
  item = "stylo"
  price = 2
  print(f"Le {item} coûte {price} euros")
checks:
  uses: [item, price]
hints:
  - "`f\"Le {produit} ...\"` : la valeur de produit remplace `{item}`."
~~~

## 12. Découper en mots et recoller

`split()` découpe un texte en **morceaux** à chaque espace. Le résultat est une **liste** de mots (les listes sont le sujet de la leçon suivante) ; `len` donne le nombre de morceaux :

```python
sentence = "le chat dort"
words = sentence.split()
print(words)
print(len(words))
```

Affiche `['le', 'chat', 'dort']`, puis `3`.

À l'inverse, `separator.join(words)` recolle les morceaux avec le séparateur choisi :

```python
words = "le chat dort".split()
print("-".join(words))
```

Affiche `le-chat-dort`.

~~~exercice
type: write
description: |
  Complète la fonction `number_of_words(sentence)` pour qu'elle renvoie le nombre de mots de `sentence`, avec `split()` et `len()`.
  `split()` ignore les espaces en trop : `"a   b"` contient 2 mots.

  Exemples :
  - `number_of_words("le chat dort")` renvoie `3`
  - `number_of_words("")` renvoie `0`
template: |
  def number_of_words(sentence):
      # Écris ton code ici
      pass
solution: |
  def number_of_words(sentence):
      return len(sentence.split())
hints:
  - "`sentence.split()` donne la liste des mots ; il reste à compter ses éléments."
tests:
  - input: ["le chat dort"]
    expected: 3
    description: "number_of_words(\"le chat dort\")"
  - input: [""]
    expected: 0
    description: "number_of_words(\"\")"
  - input: ["  a   b  "]
    expected: 2
    description: "number_of_words(\"  a   b  \")"
~~~

## Pièges fréquents

- Oublier que le premier indice est `0`, et que le dernier est `len(text) - 1`.
- Oublier que la fin d'un découpage `[start:end]` n'est pas incluse.
- Croire qu'une méthode modifie la chaîne : `name.upper()` seul ne change pas `name`.
- Oublier le `f` devant une f-string : les accolades s'affichent alors telles quelles.
- Écrire `text[0] = "B"` : une chaîne ne se modifie pas, on en construit une nouvelle.
