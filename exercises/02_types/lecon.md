# Les types de données

Une variable peut contenir différentes **sortes** de valeurs : des nombres, du texte… On les appelle des **types**. Le type d'une valeur décide de ce qu'on peut faire avec.

## 1. Les nombres entiers : `int`

Des nombres **sans virgule**, positifs ou négatifs.

```python
students = 28
temperature = -3
print(students)
```

Affiche `28`.

## 2. Les nombres à virgule : `float`

Des nombres **avec une virgule**. Attention : en Python, on écrit un **point**, jamais une virgule.

```python
height = 1.62
price = 9.99
print(height)
```

Affiche `1.62`.

## 3. Le texte : `str`

Du texte, toujours **entre guillemets**. On dit aussi une **chaîne de caractères**.

```python
first_name = "Ada"
message = "Bonjour !"
print(message)
```

Affiche `Bonjour !`.

Attention : `15` est un nombre, mais `"15"` (avec des guillemets) est du **texte**.

## 4. Vrai ou faux : `bool`

Un booléen n'a que deux valeurs possibles : `True` (vrai) et `False` (faux). Avec une **majuscule**, sans guillemets.

```python
registered = True
adult = False
print(registered)
```

Affiche `True`.

## 5. Connaître le type d'une valeur

La fonction `type` donne le type d'une valeur :

```python
print(type(28))
print(type(1.62))
print(type("Ada"))
print(type(True))
```

Affiche :

```text
<class 'int'>
<class 'float'>
<class 'str'>
<class 'bool'>
```

~~~exercice
type: predict
description: |
  Qu'affiche ce code ? Écris les lignes exactement comme Python les affiche.
code: |
  print(type(7))
  print(type(7.0))
  print(type("7"))
hints:
  - "Un point fait un float, des guillemets font un str."
~~~

## 6. Coller et répéter du texte

Entre deux textes, `+` ne calcule pas : il les **colle** l'un après l'autre. Et `*` avec un nombre **répète** un texte.

```python
print("Bon" + "jour")
print("ha" * 3)
```

Affiche :

```text
Bonjour
hahaha
```

`+` n'ajoute pas d'espace : pour en avoir un, il faut le mettre dans un texte, comme `"Bon" + " " + "jour"`.

~~~exercice
type: predict
description: |
  Attention, piège ! `a` contient un nombre, `b` contient du texte. Qu'affiche ce code ?
code: |
  a = 15
  b = "15"
  print(a + a)
  print(b + b)
  print(b * 2)
hints:
  - "Entre deux textes, + colle et * répète."
~~~

~~~exercice
type: output
description: |
  1. Crée `first_name` qui contient `"Ada"` et `last_name` qui contient `"Lovelace"`.
  2. Crée une variable `full` qui colle `first_name`, un espace et `last_name` avec `+`.
  3. Affiche `full`.

  Le programme doit afficher exactement :

  ```text
  Ada Lovelace
  ```
template: |
  # Écris ton code ici
solution: |
  first_name = "Ada"
  last_name = "Lovelace"
  full = first_name + " " + last_name
  print(full)
checks:
  variables:
    full: "Ada Lovelace"
  uses: [first_name, last_name, full]
hints:
  - "L'espace est un texte comme un autre : `\" \"`."
~~~

## 7. On ne mélange pas texte et nombre avec `+`

Coller un texte et un nombre avec `+` provoque une erreur (`TypeError`) : Python ne sait pas s'il doit calculer ou coller.

```python
age = 14
print("J'ai", age, "ans")   # avec des virgules : aucun problème
```

Affiche `J'ai 14 ans`. Écrire `"J'ai " + age` provoquerait une erreur.

## 8. Convertir d'un type à l'autre

On peut **convertir** une valeur :

- `int(...)` transforme en nombre entier ;
- `float(...)` transforme en nombre à virgule ;
- `str(...)` transforme en texte.

```python
text = "20"
number = int(text)      # le texte "20" devient le nombre 20
print(number + 5)        # 25

age = 14
print("J'ai " + str(age) + " ans")   # le nombre 14 devient le texte "14"
```

Affiche `25`, puis `J'ai 14 ans`.

~~~exercice
type: fix
description: |
  Ce programme plante avec une `TypeError`. Corrige la **deuxième** ligne avec `str()` pour qu'il affiche exactement :

  ```text
  J'ai 14 ans
  ```
template: |
  age = 14
  print("J'ai " + age + " ans")
solution: |
  age = 14
  print("J'ai " + str(age) + " ans")
checks:
  uses: [age, str]
hints:
  - "`str(age)` transforme le nombre 14 en texte, qu'on peut coller avec +."
~~~

~~~exercice
type: output
description: |
  La variable `text` contient `"20"` : c'est du texte, pas un nombre.

  1. Convertis-la en nombre entier avec `int()` et range le résultat dans une variable `number`.
  2. Affiche `number + 5`.

  Le programme doit afficher exactement :

  ```text
  25
  ```
template: |
  text = "20"
  # Écris ton code ici
solution: |
  text = "20"
  number = int(text)
  print(number + 5)
checks:
  variables:
    number: 20
  uses: [text, number, int]
hints:
  - "`number = int(text)`"
~~~

~~~exercice
type: predict
description: |
  Qu'affiche ce code ? Regarde bien le type de chaque valeur avant chaque `+` ou `*`.
code: |
  print(int("7") + 3)
  print(str(7) + "3")
  print(float("2.5") * 2)
hints:
  - "Après la conversion, on calcule entre deux nombres ou on colle entre deux textes."
~~~

## Pièges fréquents

- Écrire une virgule dans un nombre : `1,5` n'est pas un float, il faut écrire `1.5`.
- Écrire `true` au lieu de `True`.
- Coller un texte et un nombre avec `+` : convertis d'abord avec `str()`, ou utilise des virgules dans `print`.
- Oublier que `"15"` est du texte : `"15" + "15"` donne `1515`, pas `30`.
