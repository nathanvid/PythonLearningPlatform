# Les dictionnaires

Un **dictionnaire** associe des **clés** à des **valeurs**, comme un vrai dictionnaire associe un mot à sa définition, ou un répertoire un nom à un numéro.

## 1. Créer un dictionnaire

Un dictionnaire s'écrit entre accolades `{ }`, avec des paires `clé: valeur` séparées par des virgules :

```python
ages = {"Ada": 36, "Alan": 41}
print(ages)
print(len(ages))
```

Affiche `{'Ada': 36, 'Alan': 41}`, puis `2` : il y a deux paires.

Les clés sont souvent du texte, mais peuvent aussi être des nombres. Une clé n'apparaît **qu'une seule fois**.

## 2. Lire une valeur

On lit une valeur avec sa **clé** entre crochets (et non avec un indice) :

```python
ages = {"Ada": 36, "Alan": 41}
print(ages["Ada"])
```

Affiche `36`.

Si la clé n'existe pas, `ages["Grace"]` provoque une erreur (`KeyError`).

## 3. Lire sans risque : `get`

`d.get(cle, defaut)` renvoie la valeur si la clé existe, et `defaut` sinon, sans erreur :

```python
ages = {"Ada": 36}
print(ages.get("Ada", 0))
print(ages.get("Grace", 0))
```

Affiche `36`, puis `0`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ?
code: |
  capitals = {"France": "Paris", "Italie": "Rome", "Japon": "Tokyo"}
  print(capitals["Italie"])
  print(len(capitals))
  print(capitals.get("Chine", "inconnue"))
  print(capitals.get("Japon", "inconnue"))
hints:
  - "get renvoie la valeur par défaut seulement si la clé n'existe pas."
~~~

## 4. Ajouter ou modifier une valeur

On affecte une valeur à une clé. Si la clé n'existe pas, elle est **ajoutée** ; si elle existe, sa valeur est **remplacée** :

```python
stock = {"pommes": 3}
stock["poires"] = 5      # ajout
stock["pommes"] = 10     # modification
print(stock)
```

Affiche `{'pommes': 10, 'poires': 5}`.

On supprime une paire avec `del` : `del stock["poires"]`.

~~~exercice
type: output
description: |
  1. Crée un dictionnaire `grades` qui associe `"Ada"` à `18` et `"Alan"` à `15`.
  2. Ajoute l'élève `"Grace"` avec la note `17`.
  3. Change la note de `"Alan"` en `16`.
  4. Affiche `grades`.

  Le programme doit afficher exactement :

  ```text
  {'Ada': 18, 'Alan': 16, 'Grace': 17}
  ```
template: |
  # Écris ton code ici
solution: |
  grades = {"Ada": 18, "Alan": 15}
  grades["Grace"] = 17
  grades["Alan"] = 16
  print(grades)
checks:
  variables:
    grades: {"Ada": 18, "Alan": 16, "Grace": 17}
  uses: [grades]
hints:
  - "`grades[\"Grace\"] = 17` ajoute une paire ; la même écriture remplace une valeur existante."
~~~

## 5. Tester si une clé existe

`in` cherche parmi les **clés** (pas parmi les valeurs) :

```python
ages = {"Ada": 36}
print("Ada" in ages)
print(36 in ages)
```

Affiche `True`, puis `False`.

~~~exercice
type: write
description: |
  Complète la fonction `translate(word, dico)` pour qu'elle renvoie la traduction de `word` trouvée dans le dictionnaire `dico`,
  ou `"?"` si le mot n'y est pas.

  Exemples :
  - `translate("chat", {"chat": "cat", "chien": "dog"})` renvoie `"cat"`
  - `translate("loup", {"chat": "cat"})` renvoie `"?"`
template: |
  def translate(word, dico):
      # Écris ton code ici
      pass
solution: |
  def translate(word, dico):
      return dico.get(word, "?")
hints:
  - "`get` permet de donner une valeur par défaut."
tests:
  - input: ["chat", {"chat": "cat", "chien": "dog"}]
    expected: "cat"
    description: "Mot connu"
  - input: ["loup", {"chat": "cat"}]
    expected: "?"
    description: "Mot inconnu"
  - input: ["chien", {"chat": "cat", "chien": "dog"}]
    expected: "dog"
    description: "Autre mot connu"
~~~

## 6. Parcourir un dictionnaire

Une boucle `for` sur un dictionnaire parcourt ses **clés** :

```python
ages = {"Ada": 36, "Alan": 41}
for name in ages:
    print(name, ages[name])
```

Affiche `Ada 36`, puis `Alan 41`.

Avec `.items()`, on obtient directement la clé **et** la valeur à chaque tour :

```python
ages = {"Ada": 36, "Alan": 41}
for name, age in ages.items():
    print(name, "a", age, "ans")
```

Affiche `Ada a 36 ans`, puis `Alan a 41 ans`.

`.values()` donne seulement les valeurs : `sum(ages.values())` vaut `77`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ?
code: |
  stock = {"pommes": 3, "poires": 0, "kiwis": 7}
  for fruit, quantity in stock.items():
      if quantity > 0:
          print(fruit, quantity)
  print(sum(stock.values()))
hints:
  - "Les paires sont parcourues dans l'ordre où elles ont été ajoutées."
~~~

~~~exercice
type: write
description: |
  Complète la fonction `best(grades)` : elle reçoit un dictionnaire qui associe des prénoms à des notes, et renvoie le **prénom** qui a la meilleure note.
  Le dictionnaire n'est jamais vide, et il n'y a jamais d'égalité.

  Exemples :
  - `best({"Ada": 18, "Alan": 15})` renvoie `"Ada"`
  - `best({"Léo": 9, "Zoé": 14, "Lou": 11})` renvoie `"Zoé"`
template: |
  def best(grades):
      # Écris ton code ici
      pass
solution: |
  def best(grades):
      winner = None
      for name, grade in grades.items():
          if winner is None or grade > grades[winner]:
              winner = name
      return winner
hints:
  - "Parcours `grades.items()` en gardant le prénom de la meilleure note vue jusqu'ici."
tests:
  - input: [{"Ada": 18, "Alan": 15}]
    expected: "Ada"
    description: "Deux élèves"
  - input: [{"Léo": 9, "Zoé": 14, "Lou": 11}]
    expected: "Zoé"
    description: "Trois élèves"
  - input: [{"Max": 12}]
    expected: "Max"
    description: "Un seul élève"
~~~

## 7. Compter avec un dictionnaire

Un usage très fréquent : compter combien de fois chaque valeur apparaît. Pour chaque élément, on crée sa clé à `0` si elle n'existe pas encore, puis on ajoute 1 :

```python
count = {}
for fruit in ["pomme", "kiwi", "pomme"]:
    if fruit not in count:
        count[fruit] = 0
    count[fruit] += 1
print(count)
```

Affiche `{'pomme': 2, 'kiwi': 1}`.

~~~exercice
type: write
description: |
  Complète la fonction `count_words(sentence)` pour qu'elle renvoie un dictionnaire qui associe chaque mot de `sentence` à son nombre d'apparitions.
  Les mots sont séparés par des espaces.

  Exemples :
  - `count_words("le chat et le chien")` renvoie `{"le": 2, "chat": 1, "et": 1, "chien": 1}`
  - `count_words("")` renvoie `{}`
template: |
  def count_words(sentence):
      # Écris ton code ici
      pass
solution: |
  def count_words(sentence):
      count = {}
      for word in sentence.split():
          if word not in count:
              count[word] = 0
          count[word] += 1
      return count
hints:
  - "Même schéma que l'exemple, en parcourant `sentence.split()`."
tests:
  - input: ["le chat et le chien"]
    expected: {"le": 2, "chat": 1, "et": 1, "chien": 1}
    description: "Un mot répété"
  - input: [""]
    expected: {}
    description: "Phrase vide"
  - input: ["oui oui oui"]
    expected: {"oui": 3}
    description: "Un seul mot, trois fois"
~~~

## Pièges fréquents

- Lire une clé absente avec `d[cle]` : utilise `in` ou `get` si elle peut manquer.
- Chercher une valeur avec `in` : `in` ne regarde que les clés.
- Utiliser un indice : `ages[0]` cherche la **clé** `0`, pas le premier élément.
- Oublier `.items()` pour parcourir clés et valeurs ensemble.
