# Fichiers et expressions régulières

Jusqu'ici, les données disparaissaient à la fin du programme. Avec les **fichiers**, on les enregistre sur le disque. Avec les **expressions régulières**, on cherche des motifs dans un texte (des dates, des adresses e-mail…).

## 1. Ouvrir un fichier

On ouvre un fichier avec `open(name, mode, encoding="utf-8")`, dans un bloc `with` qui le **referme automatiquement** à la fin :

```python
with open("message.txt", "w", encoding="utf-8") as f:
    f.write("Bonjour\n")
```

- `"message.txt"` est le nom du fichier ;
- `"w"` (« write ») ouvre le fichier en **écriture** : il est créé, ou **vidé** s'il existait ;
- `f` est la variable qui représente le fichier ouvert ;
- `encoding="utf-8"` permet d'écrire les accents correctement sur tous les ordinateurs.

## 2. Écrire

`f.write(text)` écrit du texte dans le fichier. Attention : il n'ajoute **pas** de retour à la ligne. On l'écrit soi-même avec `"\n"` :

```python
with open("courses.txt", "w", encoding="utf-8") as f:
    f.write("pain\n")
    f.write("lait\n")
```

Le fichier contient maintenant deux lignes : `pain` et `lait`.

## 3. Lire tout le fichier

Sans mode (ou avec `"r"`), le fichier est ouvert en **lecture**. `f.read()` renvoie tout son contenu sous forme de texte :

```python
with open("courses.txt", "w", encoding="utf-8") as f:
    f.write("pain\nlait\n")

with open("courses.txt", encoding="utf-8") as f:
    content = f.read()
print(content)
```

Affiche `pain`, puis `lait`.

~~~exercice
type: output
description: |
  1. Écris dans le fichier `message.txt` les deux lignes `Bonjour` et `Au revoir`.
  2. Relis le fichier avec `read()` et affiche son contenu avec `print(content.strip())`.

  Le programme doit afficher exactement :

  ```text
  Bonjour
  Au revoir
  ```
template: |
  # 1. Écris le fichier

  # 2. Relis-le et affiche son contenu
solution: |
  with open("message.txt", "w", encoding="utf-8") as f:
      f.write("Bonjour\n")
      f.write("Au revoir\n")

  with open("message.txt", encoding="utf-8") as f:
      content = f.read()
  print(content.strip())
checks:
  uses: [open]
hints:
  - "Pense au `\"\\n\"` à la fin de chaque ligne écrite."
~~~

## 4. Lire ligne par ligne

Une boucle `for` sur un fichier ouvert parcourt ses **lignes**. Chaque ligne garde son `"\n"` final : `strip()` l'enlève.

```python
with open("courses.txt", "w", encoding="utf-8") as f:
    f.write("pain\nlait\n")

with open("courses.txt", encoding="utf-8") as f:
    for line in f:
        print("-", line.strip())
```

Affiche `- pain`, puis `- lait`.

~~~exercice
type: write
description: |
  Le fichier `eleves.csv` est disponible. Il contient :

  ```text
  nom,note
  Alice,14
  Bob,9
  Chloé,17
  David,12
  ```

  Complète la fonction `count_lines(filename)` pour qu'elle renvoie le nombre de lignes du fichier.

  Exemple :
  - `count_lines("eleves.csv")` renvoie `5`
template: |
  def count_lines(filename):
      # Écris ton code ici
      pass
solution: |
  def count_lines(filename):
      count = 0
      with open(filename, encoding="utf-8") as f:
          for line in f:
              count += 1
      return count
hints:
  - "Un compteur, et une boucle `for line in f`."
data_files:
  - "exercises/15_fichiers_regex/data/eleves.csv"
tests:
  - input: ["eleves.csv"]
    expected: 5
    description: "count_lines(\"eleves.csv\")"
~~~

## 5. Ajouter à la fin

Le mode `"a"` (« append ») ouvre le fichier pour **ajouter** du texte à la fin, sans effacer ce qui y est déjà :

```python
with open("journal.txt", "w", encoding="utf-8") as f:
    f.write("lundi\n")
with open("journal.txt", "a", encoding="utf-8") as f:
    f.write("mardi\n")
with open("journal.txt", encoding="utf-8") as f:
    print(f.read().strip())
```

Affiche `lundi`, puis `mardi`.

~~~exercice
type: predict
description: |
  Attention aux modes `"w"` et `"a"` ! Qu'affiche ce code ?
code: |
  with open("test.txt", "w", encoding="utf-8") as f:
      f.write("A\n")
  with open("test.txt", "a", encoding="utf-8") as f:
      f.write("B\n")
  with open("test.txt", "w", encoding="utf-8") as f:
      f.write("C\n")
  with open("test.txt", "a", encoding="utf-8") as f:
      f.write("D\n")
  with open("test.txt", encoding="utf-8") as f:
      print(f.read().strip())
hints:
  - "`\"w\"` vide le fichier avant d'écrire ; `\"a\"` ajoute à la fin."
~~~

## 6. Découper une ligne

Beaucoup de fichiers rangent plusieurs valeurs par ligne, séparées par un caractère (`,` ou `;`). On les sépare avec `split` :

```python
line = "Alice,14\n"
name, grade = line.strip().split(",")
print(name, int(grade) + 1)
```

Affiche `Alice 15`. Les valeurs lues dans un fichier sont toujours du **texte** : il faut les convertir avec `int` pour calculer.

~~~exercice
type: write
description: |
  Complète la fonction `total_grades(filename)` pour qu'elle renvoie la somme des notes du fichier `eleves.csv` (le même qu'à l'étape 4).
  La première ligne (`name,grade`) est un en-tête : elle ne contient pas de note.

  Exemple :
  - `total_grades("eleves.csv")` renvoie `52`
template: |
  def total_grades(filename):
      # Écris ton code ici
      pass
solution: |
  def total_grades(filename):
      total = 0
      with open(filename, encoding="utf-8") as f:
          for line in f:
              name, grade = line.strip().split(",")
              if grade != "note":
                  total += int(grade)
      return total
hints:
  - "Pour chaque ligne : `name, grade = line.strip().split(\",\")`, en ignorant la ligne d'en-tête."
data_files:
  - "exercises/15_fichiers_regex/data/eleves.csv"
tests:
  - input: ["eleves.csv"]
    expected: 52
    description: "total_grades(\"eleves.csv\")"
~~~

## 7. Le module `csv`

Pour les fichiers CSV (valeurs séparées par des virgules), le module `csv` fait le découpage à ta place. `csv.DictReader` utilise la première ligne comme en-tête et transforme chaque ligne en dictionnaire :

```python
import csv

with open("notes.csv", "w", encoding="utf-8") as f:
    f.write("nom,note\nAda,18\nAlan,15\n")

with open("notes.csv", encoding="utf-8") as f:
    for student in csv.DictReader(f):
        print(student["nom"], student["note"])
```

Affiche `Ada 18`, puis `Alan 15`.

## 8. Les expressions régulières

Une **expression régulière** (ou regex) décrit un **motif** de texte. Par exemple, `\d` veut dire « un chiffre ». Le module `re` cherche ces motifs. On écrit les motifs avec `r"..."` pour que Python ne transforme pas les `\`.

| Motif | Signification |
|---|---|
| `\d` | un chiffre |
| `\w` | une lettre, un chiffre ou `_` |
| `.` | n'importe quel caractère |
| `[abc]` | un caractère parmi `a`, `b`, `c` |
| `+` | l'élément précédent, une fois ou plus |
| `{3}` | l'élément précédent, exactement 3 fois |

- `re.findall(pattern, text)` renvoie la liste de tous les morceaux qui correspondent ;
- `re.fullmatch(pattern, text)` vérifie que le texte **entier** correspond (résultat différent de `None`) ;
- `re.sub(pattern, replacement, text)` remplace tous les morceaux qui correspondent.

```python
import re

print(re.findall(r"\d+", "3 chats et 12 poissons"))
print(re.fullmatch(r"\d{4}", "2026") is not None)
print(re.sub(r"\d", "#", "a1b22"))
```

Affiche `['3', '12']`, `True`, puis `a#b##`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ?
code: |
  import re
  print(re.findall(r"\d", "a1b22"))
  print(re.findall(r"\d+", "a1b22"))
  print(re.findall(r"[aeiou]", "python"))
  print(re.fullmatch(r"\w+", "bonjour") is not None)
  print(re.fullmatch(r"\w+", "bon jour") is not None)
hints:
  - "`\\d+` prend d'un coup tous les chiffres qui se suivent ; `\\w` ne correspond pas à un espace."
~~~

~~~exercice
type: write
description: |
  Complète la fonction `is_postcode(text)` pour qu'elle renvoie `True` si `text` est formé d'**exactement 5 chiffres**, et `False` sinon.
  Utilise `re.fullmatch`.

  Exemples :
  - `is_postcode("75001")` renvoie `True`
  - `is_postcode("7500")` renvoie `False`
  - `is_postcode("75A01")` renvoie `False`
template: |
  import re

  def is_postcode(text):
      # Écris ton code ici
      pass
solution: |
  import re

  def is_postcode(text):
      return re.fullmatch(r"\d{5}", text) is not None
hints:
  - "Le motif `\\d{5}` correspond à 5 chiffres."
tests:
  - input: ["75001"]
    expected: true
    description: "Cinq chiffres"
  - input: ["7500"]
    expected: false
    description: "Quatre chiffres"
  - input: ["75A01"]
    expected: false
    description: "Avec une lettre"
  - input: ["750011"]
    expected: false
    description: "Six chiffres"
~~~

~~~exercice
type: write
description: |
  Complète la fonction `hide_digits(text)` pour qu'elle renvoie `text` où **chaque chiffre** est remplacé par `*`, avec `re.sub`.

  Exemples :
  - `hide_digits("Code : 1234")` renvoie `"Code : ****"`
  - `hide_digits("abc")` renvoie `"abc"`
template: |
  import re

  def hide_digits(text):
      # Écris ton code ici
      pass
solution: |
  import re

  def hide_digits(text):
      return re.sub(r"\d", "*", text)
hints:
  - "`re.sub(pattern, replacement, text)` avec le motif d'un chiffre."
tests:
  - input: ["Code : 1234"]
    expected: "Code : ****"
    description: "hide_digits(\"Code : 1234\")"
  - input: ["abc"]
    expected: "abc"
    description: "Aucun chiffre"
  - input: ["a1b2"]
    expected: "a*b*"
    description: "Chiffres mélangés"
~~~

## Pièges fréquents

- Ouvrir en `"w"` un fichier qu'on voulait compléter : son contenu est effacé. Pour ajouter, c'est `"a"`.
- Oublier `"\n"` avec `write` : tout s'écrit sur une seule ligne.
- Oublier que les lignes lues gardent leur `"\n"` : utilise `strip()`.
- Oublier de convertir avec `int` les nombres lus dans un fichier.
- Oublier le `r` devant un motif de regex : `"\d"` peut être mal interprété.
