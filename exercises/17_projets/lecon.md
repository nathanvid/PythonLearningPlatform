# Mener un projet

Un projet rassemble tout ce que tu as appris. La difficulté n'est plus la syntaxe, mais l'**organisation** : comment découper un gros problème en petits morceaux faciles. Dans cette leçon, on construit pas à pas le moteur d'un **jeu du pendu**.

## 1. Découper le problème

Face à un gros problème, on ne commence pas par écrire du code : on fait la **liste des sous-problèmes**. Pour le pendu :

1. Afficher le mot avec des `_` à la place des lettres pas encore trouvées.
2. Savoir si le mot est entièrement trouvé.
3. Calculer les vies restantes après une proposition.
4. Enchaîner les propositions jusqu'à la fin de la partie.

Chaque sous-problème devient une **petite fonction**, qu'on écrit et qu'on teste **seule**, avant de passer à la suivante.

## 2. Premier morceau : masquer le mot

On garde les lettres déjà proposées dans un **ensemble** `found`. Pour masquer le mot, on parcourt ses lettres et on construit un nouveau texte :

```python
word = "chat"
found = {"c", "a"}
result = ""
for letter in word:
    if letter in found:
        result += letter
    else:
        result += "_"
print(result)
```

Affiche `c_a_`.

~~~exercice
type: write
description: |
  Transforme l'exemple en fonction : complète `mask(word, found)` pour qu'elle renvoie `word` où chaque lettre qui n'est **pas** dans `found` est remplacée par `_`.

  Exemples :
  - `mask("chat", ["c", "a"])` renvoie `"c_a_"`
  - `mask("chat", [])` renvoie `"____"`
template: |
  def mask(word, found):
      # Écris ton code ici
      pass
solution: |
  def mask(word, found):
      result = ""
      for letter in word:
          if letter in found:
              result += letter
          else:
              result += "_"
      return result
hints:
  - "Reprends la boucle de l'exemple et termine par `return result`."
tests:
  - input: ["chat", ["c", "a"]]
    expected: "c_a_"
    description: "Deux lettres trouvées"
  - input: ["chat", []]
    expected: "____"
    description: "Aucune lettre"
  - input: ["banane", ["a", "n"]]
    expected: "_anan_"
    description: "Lettres répétées"
~~~

## 3. Deuxième morceau : le mot est-il trouvé ?

Le mot est trouvé quand **toutes** ses lettres sont dans `found`. On peut le vérifier avec la fonction précédente : le mot masqué ne contient alors plus aucun `_`.

~~~exercice
type: write
description: |
  Complète `won(word, found)` pour qu'elle renvoie `True` si toutes les lettres de `word` sont dans `found`, et `False` sinon.
  La fonction `mask` de l'étape précédente est déjà écrite : utilise-la.

  Exemples :
  - `won("chat", ["c", "h", "a", "t"])` renvoie `True`
  - `won("chat", ["c", "a"])` renvoie `False`
template: |
  def mask(word, found):
      result = ""
      for letter in word:
          if letter in found:
              result += letter
          else:
              result += "_"
      return result

  def won(word, found):
      # Écris ton code ici
      pass
solution: |
  def mask(word, found):
      result = ""
      for letter in word:
          if letter in found:
              result += letter
          else:
              result += "_"
      return result

  def won(word, found):
      return "_" not in mask(word, found)
hints:
  - "Le mot est trouvé quand `\"_\"` n'est pas dans `mask(word, found)`."
tests:
  - input: ["chat", ["c", "h", "a", "t"]]
    expected: true
    description: "Toutes les lettres"
  - input: ["chat", ["c", "a"]]
    expected: false
    description: "Il manque des lettres"
  - input: ["aaa", ["a"]]
    expected: true
    description: "Une seule lettre répétée"
~~~

## 4. Troisième morceau : les vies

Une proposition fait perdre une vie seulement si la lettre **n'est pas** dans le mot **et** qu'elle **n'a pas** déjà été proposée. Écrire cette règle dans une fonction à part permet de la tester avec des cas précis.

~~~exercice
type: write
description: |
  Complète `lives_left(word, already_guessed, letter, lives)` pour qu'elle renvoie le nombre de vies **après** la proposition de `letter` :
  - `lives` sans changement si `letter` est dans `word` ou a déjà été proposée (elle est dans `already_guessed`) ;
  - `lives - 1` sinon.

  Exemples :
  - `lives_left("chat", [], "z", 6)` renvoie `5`
  - `lives_left("chat", [], "c", 6)` renvoie `6`
  - `lives_left("chat", ["z"], "z", 5)` renvoie `5`
template: |
  def lives_left(word, already_guessed, letter, lives):
      # Écris ton code ici
      pass
solution: |
  def lives_left(word, already_guessed, letter, lives):
      if letter in word or letter in already_guessed:
          return lives
      return lives - 1
hints:
  - "Une seule condition avec `or` suffit."
tests:
  - input: ["chat", [], "z", 6]
    expected: 5
    description: "Lettre absente"
  - input: ["chat", [], "c", 6]
    expected: 6
    description: "Lettre présente"
  - input: ["chat", ["z"], "z", 5]
    expected: 5
    description: "Lettre déjà proposée"
~~~

## 5. Assembler les morceaux

Une fois chaque morceau testé, on les assemble dans une boucle. Le programme principal devient court et lisible, car chaque détail est rangé dans sa fonction :

```python
def mask(word, found):
    return "".join(l if l in found else "_" for l in word)

word = "code"
found = set()
lives = 6
for letter in ["e", "z", "c", "o", "d"]:
    if letter not in word and letter not in found:
        lives -= 1
    found.add(letter)
    print(mask(word, found), lives)
```

Affiche `___e 6`, `___e 5`, `c__e 5`, `co_e 5`, puis `code 5`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ? Suis `found` et `lives` à chaque tour.
code: |
  word = "ami"
  found = set()
  lives = 3
  for letter in ["a", "z", "z", "i", "m"]:
      if letter not in word and letter not in found:
          lives -= 1
      found.add(letter)
  print(lives)
  print(sorted(found))
hints:
  - "Le deuxième `\"z\"` est déjà dans `found` : il ne coûte pas de vie."
~~~

## 6. Avancer pas à pas

- Écris **une** fonction, teste-la tout de suite (avec quelques `print` ou avec les tests), puis passe à la suivante.
- Commence par une version simple qui marche, améliore-la ensuite.
- Pense aux cas limites : liste vide, mot d'une lettre, aucune proposition…
- Lance les tests souvent : un test qui échoue indique exactement ce qui reste à faire.

## 7. Choisir ses structures de données

| Besoin | Structure |
|---|---|
| Une suite ordonnée d'éléments | liste |
| Savoir vite si un élément est présent, sans doublons | ensemble |
| Associer une information à une clé | dictionnaire |
| Des valeurs qui vont ensemble et ne changent pas | tuple |
| Regrouper les données et les actions d'une même « chose » | classe |

Dans le pendu : un **ensemble** pour les lettres proposées (pas de doublons, test `in` rapide), et un **tuple** pour renvoyer le résultat `(masked_word, lives, status)`.

## 8. Un outil pour le chiffre de César : le modulo

Le projet du chiffre de César décale des lettres dans l'alphabet, en repartant au début après `z`. Le reste `%` fait exactement ça : `(position + decalage) % 26` reste toujours entre 0 et 25.

```python
alphabet = "abcdefghijklmnopqrstuvwxyz"
position = alphabet.index("y")
print(position)
print(alphabet[(position + 3) % 26])
```

Affiche `24`, puis `b` : après `z`, on repart à `a`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ? En Python, le reste d'une division par 26 est toujours entre 0 et 25, même pour un nombre négatif.
code: |
  print((24 + 3) % 26)
  print((0 - 1) % 26)
  print((5 + 26) % 26)
hints:
  - "`-1 % 26` vaut 25 : on recule d'une case en partant du début, donc on arrive à la fin."
~~~

## Quand tu bloques

- Relis l'énoncé et les exemples : quelle est l'entrée, quelle est la sortie attendue ?
- Teste ta fonction sur le plus petit exemple possible.
- Lis l'explication de l'erreur et la ligne indiquée.
- Utilise les indices, un par un.
