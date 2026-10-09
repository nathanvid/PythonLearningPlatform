# Les modules

Un **module** est un fichier rempli de fonctions toutes prêtes. Python est livré avec des centaines de modules : c'est la **bibliothèque standard**. Plutôt que de tout réécrire, on **importe** ce qui existe déjà.

## 1. Importer un module

On écrit `import` suivi du nom du module, **en haut du fichier**. Ensuite, on utilise ses fonctions avec le préfixe `module.` :

```python
import math

print(math.sqrt(16))
print(math.pi)
```

Affiche `4.0` (la racine carrée de 16), puis `3.141592653589793`.

~~~exercice
type: output
description: |
  Importe le module `math`, puis affiche la racine carrée de `81` avec `math.sqrt`.

  Le programme doit afficher exactement :

  ```text
  9.0
  ```
template: |
  # Écris ton code ici
solution: |
  import math
  print(math.sqrt(81))
checks:
  uses: [math]
hints:
  - "`sqrt` renvoie toujours un nombre à virgule."
~~~

## 2. Importer seulement ce dont on a besoin

Avec `from module import nom`, on importe une fonction précise, et on l'utilise **sans** préfixe :

```python
from math import floor, ceil

print(floor(2.7))    # arrondi vers le bas
print(ceil(2.1))     # arrondi vers le haut
```

Affiche `2`, puis `3`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ?
code: |
  import math
  print(math.floor(7.9), math.ceil(7.1))
  print(round(math.pi, 2))
  print(math.sqrt(25) + 1)
hints:
  - "`floor` arrondit toujours vers le bas, `ceil` toujours vers le haut."
~~~

~~~exercice
type: write
description: |
  Complète la fonction `disc_area(radius)` pour qu'elle renvoie l'aire d'un disque, `math.pi × rayon²`, **arrondie à 2 chiffres** après la virgule.
  N'oublie pas d'importer `math` en haut du code.

  Exemples :
  - `disc_area(1)` renvoie `3.14`
  - `disc_area(2)` renvoie `12.57`
template: |
  def disc_area(radius):
      # Écris ton code ici
      pass
solution: |
  import math

  def disc_area(radius):
      return round(math.pi * radius ** 2, 2)
hints:
  - "`round(valeur, 2)` arrondit à 2 chiffres après la virgule."
tests:
  - input: [1]
    expected: 3.14
    description: "disc_area(1)"
  - input: [2]
    expected: 12.57
    description: "disc_area(2)"
  - input: [0]
    expected: 0.0
    description: "disc_area(0)"
~~~

## 3. Le hasard : `random`

Le module `random` tire des valeurs au hasard. Le résultat change à chaque exécution :

```python
import random

die = random.randint(1, 6)          # entier entre 1 et 6, bornes comprises
colour = random.choice(["rouge", "vert", "bleu"])   # un élément au hasard
print(1 <= die <= 6)
print(colour in ["rouge", "vert", "bleu"])
```

Affiche `True`, puis `True` : on ne sait pas quelles valeurs ont été tirées, mais on sait dans quelles limites elles sont.

## 4. Les dates : `datetime`

Le module `datetime` sait calculer avec des dates. `date(year, month, day)` crée une date ; la différence entre deux dates donne une durée, dont `.days` est le nombre de jours :

```python
from datetime import date

start = date(2024, 1, 1)
end = date(2024, 3, 1)
print((end - start).days)
```

Affiche `60` (2024 est bissextile : février a 29 jours).

`date.fromisoformat("2024-03-01")` crée une date à partir d'un texte au format `AAAA-MM-JJ`.

~~~exercice
type: write
description: |
  Complète la fonction `days_before_christmas(text)` : `text` est une date au format `"AAAA-MM-JJ"`, et la fonction renvoie le nombre de jours jusqu'au 25 décembre **de la même année**.

  Exemples :
  - `days_before_christmas("2024-12-01")` renvoie `24`
  - `days_before_christmas("2024-12-25")` renvoie `0`
template: |
  from datetime import date

  def days_before_christmas(text):
      # Écris ton code ici
      pass
solution: |
  from datetime import date

  def days_before_christmas(text):
      day = date.fromisoformat(text)
      christmas = date(day.year, 12, 25)
      return (christmas - day).days
hints:
  - "Une date a un attribut `.year` : `date(day.year, 12, 25)` est le Noël de la même année."
tests:
  - input: ["2024-12-01"]
    expected: 24
    description: "1er décembre"
  - input: ["2024-12-25"]
    expected: 0
    description: "Le jour de Noël"
  - input: ["2023-11-25"]
    expected: 30
    description: "Un mois avant"
~~~

## 5. Échanger des données : `json`

Le format **JSON** sert à échanger des données entre programmes, sous forme de texte. Il ressemble beaucoup aux dictionnaires et aux listes de Python.

- `json.loads(text)` transforme un texte JSON en valeur Python ;
- `json.dumps(valeur)` fait l'inverse.

```python
import json

data = json.loads('{"nom": "Ada", "age": 36}')
print(data["nom"])
print(json.dumps({"ok": True}))
```

Affiche `Ada`, puis `{"ok": true}` : en JSON, `True` s'écrit `true`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ?
code: |
  import json
  text = '{"nom": "Léo", "notes": [12, 15, 9]}'
  student = json.loads(text)
  print(student["nom"])
  print(sum(student["notes"]))
  print(json.dumps([1, None, False]))
hints:
  - "Après `json.loads`, on obtient un vrai dictionnaire Python. En JSON, `None` s'écrit `null`."
~~~

## 6. Trouver la bonne fonction

Personne ne connaît tous les modules par cœur. Pour chercher :

- la documentation officielle : docs.python.org/fr/3/library ;
- dans Python, `help(math.floor)` affiche l'aide d'une fonction, et `dir(math)` liste le contenu d'un module.

## Pièges fréquents

- Oublier l'`import` : Python ne connaît pas `math` et lève une `NameError`.
- Oublier le préfixe : après `import math`, on écrit `math.sqrt`, pas `sqrt`.
- Nommer son propre fichier `random.py` ou `math.py` : il cache le vrai module.
- Oublier que `math.sqrt` renvoie toujours un `float` : `math.sqrt(16)` vaut `4.0`.
