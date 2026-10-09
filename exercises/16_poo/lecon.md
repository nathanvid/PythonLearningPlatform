# La programmation orientée objet

Jusqu'ici, les données (variables) et les actions (fonctions) étaient séparées. La **programmation orientée objet** les regroupe : un **objet** contient ses propres données et sait faire ses propres actions.

## 1. Classe et objet

- Une **classe** est un **plan** : elle décrit ce qu'un objet contient et ce qu'il sait faire.
- Un **objet** est un **exemplaire** fabriqué à partir de ce plan.

Avec le plan « Chien », on peut fabriquer plusieurs chiens : Rex, Médor… Chacun a son propre nom.

Tu utilises déjà des objets : une liste est un objet de la classe `list`, et `append` est une de ses actions.

## 2. Créer une classe et un objet

On crée une classe avec le mot `class` (le nom commence par une majuscule). On fabrique un objet en appelant la classe comme une fonction :

```python
class Dog:
    pass

rex = Dog()
rex.name = "Rex"
print(rex.name)
```

Affiche `Rex`. `rex.name` est un **attribut** : une variable rangée **dans** l'objet.

## 3. Le constructeur `__init__`

Plutôt que d'ajouter les attributs à la main après coup, on écrit une méthode spéciale, `__init__`, appelée **automatiquement** à la création de chaque objet :

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

rex = Dog("Rex", 3)
print(rex.name, rex.age)
```

Affiche `Rex 3`.

- `__init__` s'écrit avec **deux** tirets bas de chaque côté ;
- `self` désigne **l'objet en train d'être créé** : `self.name = name` range le paramètre `name` dans l'attribut `name` de l'objet ;
- à l'appel `Dog("Rex", 3)`, on ne donne pas `self` : Python s'en charge.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ? Deux objets sont créés à partir de la même classe.
code: |
  class Student:
      def __init__(self, name, grade):
          self.name = name
          self.grade = grade

  a = Student("Ada", 18)
  b = Student("Léo", 12)
  print(a.name, b.grade)
  print(a.grade + b.grade)
hints:
  - "Chaque objet a ses propres attributs : `a.grade` vaut 18, `b.grade` vaut 12."
~~~

~~~exercice
type: output
description: |
  1. Crée une classe `Book` dont le constructeur reçoit `title` et `author`, et les range dans les attributs `self.title` et `self.author`.
  2. Crée un objet `book` avec le titre `"1984"` et l'auteur `"Orwell"`.
  3. Affiche ses deux attributs pour obtenir exactement :

  ```text
  1984 - Orwell
  ```
template: |
  class Book:
      def __init__(self, title, author):
          # Range les paramètres dans des attributs
          pass

  # Crée l'objet et affiche ses attributs
solution: |
  class Book:
      def __init__(self, title, author):
          self.title = title
          self.author = author

  book = Book("1984", "Orwell")
  print(book.title, "-", book.author)
checks:
  uses: [Book, book]
hints:
  - "`print(book.title, \"-\", book.author)`"
~~~

## 4. Les méthodes

Une **méthode** est une fonction écrite dans la classe. Elle reçoit toujours `self` en premier paramètre, ce qui lui donne accès aux attributs de l'objet :

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

r = Rectangle(3, 4)
print(r.area())
```

Affiche `12`. On appelle une méthode avec un point et des parenthèses : `r.area()`.

## 5. Dans les exercices

Seule la **dernière fonction** du code est testée. Les exercices de cette leçon se terminent donc par une fonction ordinaire qui crée un objet et utilise ses méthodes :

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

def rectangle_area(width, height):
    r = Rectangle(width, height)
    return r.area()

print(rectangle_area(5, 2))
```

Affiche `10`.

~~~exercice
type: write
description: |
  Complète la classe `Circle` :
  - le constructeur range `radius` dans `self.radius` ;
  - la méthode `diameter(self)` renvoie le diamètre (2 × rayon).

  Puis complète la fonction `circle_diameter(radius)`, qui crée un `Circle` et renvoie son diamètre.

  Exemples :
  - `circle_diameter(3)` renvoie `6`
  - `circle_diameter(0.5)` renvoie `1.0`
template: |
  class Circle:
      def __init__(self, radius):
          pass

      def diameter(self):
          pass

  def circle_diameter(radius):
      pass
solution: |
  class Circle:
      def __init__(self, radius):
          self.radius = radius

      def diameter(self):
          return 2 * self.radius

  def circle_diameter(radius):
      return Circle(radius).diameter()
hints:
  - "Dans la méthode, le rayon se lit avec `self.radius`."
tests:
  - input: [3]
    expected: 6
    description: "circle_diameter(3)"
  - input: [0.5]
    expected: 1.0
    description: "circle_diameter(0.5)"
  - input: [10]
    expected: 20
    description: "circle_diameter(10)"
~~~

## 6. Une méthode avec des paramètres

Comme une fonction, une méthode peut recevoir des paramètres **en plus** de `self`. Elle les utilise avec les attributs de l'objet :

```python
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

    def has_passed(self, threshold):
        return self.grade >= threshold

ada = Student("Ada", 14)
print(ada.has_passed(10))
print(ada.has_passed(15))
```

Affiche `True`, puis `False`. À l'appel, on donne seulement `threshold` : `self` est toujours fourni par Python.

~~~exercice
type: write
description: |
  Complète la classe `Product` :
  - le constructeur range `name` et `price` dans des attributs ;
  - la méthode `discounted_price(self, percent)` renvoie le prix après une réduction de `percent` %, c'est-à-dire `price - price * percent / 100`.

  Puis complète `sale_price(price, percent)`, qui crée un `Product` nommé `"article"` avec ce prix et renvoie son prix réduit.

  Exemples :
  - `sale_price(50, 20)` renvoie `40.0`
  - `sale_price(80, 0)` renvoie `80.0`
template: |
  class Product:
      def __init__(self, name, price):
          pass

      def discounted_price(self, percent):
          pass

  def sale_price(price, percent):
      pass
solution: |
  class Product:
      def __init__(self, name, price):
          self.name = name
          self.price = price

      def discounted_price(self, percent):
          return self.price - self.price * percent / 100

  def sale_price(price, percent):
      product = Product("article", price)
      return product.discounted_price(percent)
hints:
  - "Dans la méthode, le prix se lit avec `self.price` ; `percent` est un paramètre ordinaire."
tests:
  - input: [50, 20]
    expected: 40.0
    description: "sale_price(50, 20)"
  - input: [80, 0]
    expected: 80.0
    description: "sale_price(80, 0)"
  - input: [30, 50]
    expected: 15.0
    description: "sale_price(30, 50)"
~~~

## 7. Changer l'état d'un objet

Une méthode peut **modifier** les attributs de l'objet. L'objet garde ces changements :

```python
class Account:
    def __init__(self, balance):
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

a = Account(100)
a.deposit(50)
a.deposit(20)
print(a.balance)
```

Affiche `170`.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ? Les deux compteurs sont des objets indépendants.
code: |
  class Counter:
      def __init__(self):
          self.value = 0

      def add(self):
          self.value += 1

  a = Counter()
  b = Counter()
  a.add()
  a.add()
  b.add()
  print(a.value, b.value)
hints:
  - "Chaque objet a son propre attribut `value`."
~~~

~~~exercice
type: fix
description: |
  La fonction `greeting(name)` doit renvoyer `"Bonjour "` suivi du nom, par exemple `greeting("Ada")` doit renvoyer `"Bonjour Ada"`.
  Elle plante avec une `AttributeError` : le constructeur ne range pas le nom **dans l'objet**. Corrige-le.
template: |
  class Person:
      def __init__(self, name):
          name = name

      def greet(self):
          return "Bonjour " + self.name

  def greeting(name):
      return Person(name).greet()
solution: |
  class Person:
      def __init__(self, name):
          self.name = name

      def greet(self):
          return "Bonjour " + self.name

  def greeting(name):
      return Person(name).greet()
hints:
  - "Pour ranger une valeur dans l'objet, il faut écrire `self.` devant l'attribut."
tests:
  - input: ["Ada"]
    expected: "Bonjour Ada"
    description: "greeting(\"Ada\")"
  - input: ["Léo"]
    expected: "Bonjour Léo"
    description: "greeting(\"Léo\")"
~~~

## 8. Une méthode qui vérifie avant d'agir

Une méthode peut contenir un `if`. C'est utile pour **protéger** l'objet : ici, on refuse un retrait plus grand que le solde. La méthode renvoie `True` si le retrait a eu lieu, `False` sinon :

```python
class Account:
    def __init__(self, balance):
        self.balance = balance

    def withdraw(self, amount):
        if amount > self.balance:
            return False
        self.balance -= amount
        return True

a = Account(100)
print(a.withdraw(30))
print(a.withdraw(500))
print(a.balance)
```

Affiche `True`, `False`, puis `70` : le second retrait a été refusé, le solde n'a pas bougé.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ? Suis la valeur du solde ligne par ligne.
code: |
  class Account:
      def __init__(self, balance):
          self.balance = balance

      def deposit(self, amount):
          self.balance += amount

      def withdraw(self, amount):
          if amount > self.balance:
              return False
          self.balance -= amount
          return True

  a = Account(50)
  a.deposit(20)
  print(a.withdraw(100))
  a.deposit(40)
  print(a.withdraw(100))
  print(a.balance)
hints:
  - "Au moment du premier retrait, le solde vaut 70."
~~~

## 9. Un attribut qui contient une liste

Un attribut peut contenir n'importe quelle valeur, y compris une **liste**. On la crée vide dans `__init__`, puis les méthodes la remplissent :

```python
class Basket:
    def __init__(self):
        self.items = []

    def add(self, item):
        self.items.append(item)

    def size(self):
        return len(self.items)

b = Basket()
b.add("pain")
b.add("lait")
print(b.items)
print(b.size())
```

Affiche `['pain', 'lait']`, puis `2`. Chaque panier a **sa propre** liste : `self.items = []` est exécuté à chaque création d'objet.

~~~exercice
type: write
description: |
  Complète la classe `Gradebook` (un carnet de notes) :
  - le constructeur crée l'attribut `self.grades`, une liste vide ;
  - `add(self, grade)` ajoute une note à la liste ;
  - `average(self)` renvoie la moyenne des notes (leur somme divisée par leur nombre).

  Puis complète `average_of(grades)` : elle crée un `Gradebook`, y ajoute chaque note de la liste `grades` avec `add`, et renvoie la moyenne. La liste n'est jamais vide.

  Exemples :
  - `average_of([10, 14])` renvoie `12.0`
  - `average_of([15])` renvoie `15.0`
template: |
  class Gradebook:
      def __init__(self):
          pass

      def add(self, grade):
          pass

      def average(self):
          pass

  def average_of(grades):
      pass
solution: |
  class Gradebook:
      def __init__(self):
          self.grades = []

      def add(self, grade):
          self.grades.append(grade)

      def average(self):
          return sum(self.grades) / len(self.grades)

  def average_of(grades):
      gradebook = Gradebook()
      for grade in grades:
          gradebook.add(grade)
      return gradebook.average()
hints:
  - "Dans `average_of`, une boucle `for grade in grades:` appelle `gradebook.add(grade)`."
tests:
  - input: [[10, 14]]
    expected: 12.0
    description: "average_of([10, 14])"
  - input: [[15]]
    expected: 15.0
    description: "average_of([15])"
  - input: [[8, 12, 16]]
    expected: 12.0
    description: "average_of([8, 12, 16])"
~~~

## 10. Une méthode qui en appelle une autre

Dans une méthode, `self` donne aussi accès aux **autres méthodes** de l'objet : on écrit `self.` devant leur nom.

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def describe(self):
        return "Aire : " + str(self.area())

r = Rectangle(3, 4)
print(r.describe())
```

Affiche `Aire : 12`. `describe` réutilise `area` au lieu de refaire le calcul.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ? Attention : la liste de pièces change avant le dernier `print`.
code: |
  class Wallet:
      def __init__(self, coins):
          self.coins = coins

      def total(self):
          return sum(self.coins)

      def is_rich(self):
          return self.total() > 10

  w = Wallet([2, 5, 1])
  print(w.total())
  print(w.is_rich())
  w.coins.append(5)
  print(w.is_rich())
hints:
  - "`is_rich` recalcule le total à chaque appel, avec la liste telle qu'elle est à ce moment-là."
~~~

~~~exercice
type: fix
description: |
  `square_text(3)` doit renvoyer `"Carré d'aire 9"`, mais le code plante avec une `NameError` dans la méthode `describe`. Corrige-le.
template: |
  class Square:
      def __init__(self, side):
          self.side = side

      def area(self):
          return self.side * self.side

      def describe(self):
          return "Carré d'aire " + str(area())

  def square_text(side):
      return Square(side).describe()
solution: |
  class Square:
      def __init__(self, side):
          self.side = side

      def area(self):
          return self.side * self.side

      def describe(self):
          return "Carré d'aire " + str(self.area())

  def square_text(side):
      return Square(side).describe()
hints:
  - "Pour appeler une autre méthode du même objet, il faut écrire `self.` devant."
tests:
  - input: [3]
    expected: "Carré d'aire 9"
    description: "square_text(3)"
  - input: [5]
    expected: "Carré d'aire 25"
    description: "square_text(5)"
~~~

## 11. Une liste d'objets

On peut ranger plusieurs objets dans une liste, puis la parcourir avec `for`. À chaque tour, la variable de boucle **est** un objet : on lit ses attributs avec un point.

```python
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

students = [Student("Ada", 18), Student("Léo", 12), Student("Inès", 15)]
for student in students:
    print(student.name, student.grade)
```

Affiche :

```text
Ada 18
Léo 12
Inès 15
```

~~~exercice
type: write
description: |
  La classe `Student` est déjà écrite. Complète `best_student(names, grades)` :
  1. remplis la liste `students` avec un `Student` par élève (le nom `names[i]` va avec la note `grades[i]`) ;
  2. parcours cette liste pour trouver l'élève qui a la meilleure note ;
  3. renvoie son **nom**.

  En cas d'égalité, renvoie le premier. Les listes ne sont jamais vides.

  Exemples :
  - `best_student(["Ada", "Léo", "Inès"], [18, 12, 15])` renvoie `"Ada"`
  - `best_student(["Tom", "Zoé"], [9, 14])` renvoie `"Zoé"`
template: |
  class Student:
      def __init__(self, name, grade):
          self.name = name
          self.grade = grade

  def best_student(names, grades):
      students = []
      # Remplis la liste, puis cherche le meilleur élève
      pass
solution: |
  class Student:
      def __init__(self, name, grade):
          self.name = name
          self.grade = grade

  def best_student(names, grades):
      students = []
      for i in range(len(names)):
          students.append(Student(names[i], grades[i]))
      best = students[0]
      for student in students:
          if student.grade > best.grade:
              best = student
      return best.name
hints:
  - "Garde le meilleur élève dans une variable `best = students[0]`, puis compare `student.grade` à `best.grade`."
tests:
  - input: [["Ada", "Léo", "Inès"], [18, 12, 15]]
    expected: "Ada"
    description: "Le premier est le meilleur"
  - input: [["Tom", "Zoé"], [9, 14]]
    expected: "Zoé"
    description: "Le dernier est le meilleur"
  - input: [["Léa", "Max"], [10, 10]]
    expected: "Léa"
    description: "Égalité : le premier"
~~~

## 12. Des objets qui se parlent

Une méthode peut recevoir **un autre objet** en paramètre. Elle peut alors lire et modifier ses attributs, elle aussi :

```python
class Account:
    def __init__(self, balance):
        self.balance = balance

    def give(self, other, amount):
        self.balance -= amount
        other.balance += amount

alice = Account(100)
bob = Account(20)
alice.give(bob, 30)
print(alice.balance, bob.balance)
```

Affiche `70 50`. Dans `give`, `self` est `alice` (l'objet écrit avant le point) et `other` est `bob`.

~~~exercice
type: write
description: |
  Sur un quadrillage, pour aller d'un point à un autre, on compte les cases parcourues à l'horizontale et à la verticale.

  Complète la classe `Point` :
  - le constructeur range `x` et `y` dans des attributs ;
  - `distance(self, other)` renvoie `abs(self.x - other.x) + abs(self.y - other.y)`.

  Puis complète `grid_distance(x1, y1, x2, y2)`, qui crée les deux points et renvoie la distance du premier au second.

  Exemples :
  - `grid_distance(0, 0, 3, 4)` renvoie `7`
  - `grid_distance(1, 1, 1, 1)` renvoie `0`
template: |
  class Point:
      def __init__(self, x, y):
          pass

      def distance(self, other):
          pass

  def grid_distance(x1, y1, x2, y2):
      pass
solution: |
  class Point:
      def __init__(self, x, y):
          self.x = x
          self.y = y

      def distance(self, other):
          return abs(self.x - other.x) + abs(self.y - other.y)

  def grid_distance(x1, y1, x2, y2):
      a = Point(x1, y1)
      b = Point(x2, y2)
      return a.distance(b)
hints:
  - "Les coordonnées de l'autre point se lisent avec `other.x` et `other.y`."
tests:
  - input: [0, 0, 3, 4]
    expected: 7
    description: "grid_distance(0, 0, 3, 4)"
  - input: [1, 1, 1, 1]
    expected: 0
    description: "grid_distance(1, 1, 1, 1)"
  - input: [5, 2, 1, 6]
    expected: 8
    description: "grid_distance(5, 2, 1, 6)"
~~~

~~~exercice
type: fix
description: |
  `after_transfer(100, 20, 30)` crée deux comptes, fait passer 30 du premier au second et renvoie leurs soldes. Elle doit renvoyer `[70, 50]`, mais renvoie `[100, 20]` : l'argent ne change pas de compte. Corrige la méthode `transfer`.
template: |
  class Account:
      def __init__(self, balance):
          self.balance = balance

      def transfer(self, other, amount):
          self.balance -= amount
          self.balance += amount

  def after_transfer(balance_a, balance_b, amount):
      a = Account(balance_a)
      b = Account(balance_b)
      a.transfer(b, amount)
      return [a.balance, b.balance]
solution: |
  class Account:
      def __init__(self, balance):
          self.balance = balance

      def transfer(self, other, amount):
          self.balance -= amount
          other.balance += amount

  def after_transfer(balance_a, balance_b, amount):
      a = Account(balance_a)
      b = Account(balance_b)
      a.transfer(b, amount)
      return [a.balance, b.balance]
hints:
  - "Dans `transfer`, `self` est le compte qui donne et `other` celui qui reçoit."
tests:
  - input: [100, 20, 30]
    expected: [70, 50]
    description: "after_transfer(100, 20, 30)"
  - input: [50, 0, 50]
    expected: [0, 50]
    description: "after_transfer(50, 0, 50)"
~~~

## 13. Afficher un objet : `__str__`

Par défaut, `print(objet)` affiche un texte peu lisible, comme `<__main__.Point object at 0x…>`. La méthode spéciale `__str__` choisit le texte à afficher :

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"({self.x}, {self.y})"

p = Point(2, 5)
print(p)
print(str(p))
```

Affiche `(2, 5)` deux fois.

~~~exercice
type: write
description: |
  Complète la classe `Time` :
  - le constructeur range `hours` et `minutes` dans des attributs ;
  - `__str__` renvoie le texte `"HhMM"`, avec les minutes toujours sur 2 chiffres (`f"{self.minutes:02d}"`).

  Puis complète `show_time(hours, minutes)`, qui renvoie `str(...)` d'un objet `Time`.

  Exemples :
  - `show_time(9, 5)` renvoie `"9h05"`
  - `show_time(14, 30)` renvoie `"14h30"`
template: |
  class Time:
      def __init__(self, hours, minutes):
          pass

      def __str__(self):
          pass

  def show_time(hours, minutes):
      pass
solution: |
  class Time:
      def __init__(self, hours, minutes):
          self.hours = hours
          self.minutes = minutes

      def __str__(self):
          return f"{self.hours}h{self.minutes:02d}"

  def show_time(hours, minutes):
      return str(Time(hours, minutes))
hints:
  - "`__str__` doit **renvoyer** le texte avec `return`, pas l'afficher."
tests:
  - input: [9, 5]
    expected: "9h05"
    description: "show_time(9, 5)"
  - input: [14, 30]
    expected: "14h30"
    description: "show_time(14, 30)"
  - input: [0, 0]
    expected: "0h00"
    description: "show_time(0, 0)"
~~~

## 14. L'héritage

Une classe peut **hériter** d'une autre : elle récupère tous ses attributs et méthodes, et peut en ajouter ou en **redéfinir**. On écrit la classe parente entre parenthèses :

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def introduce(self):
        return "Je suis " + self.name

class Dog(Animal):
    def shout(self):
        return "Wouf"

rex = Dog("Rex")
print(rex.introduce())    # méthode héritée d'Animal
print(rex.shout())        # méthode ajoutée par Dog
```

Affiche `Je suis Rex`, puis `Wouf`. `Dog` n'a pas besoin de réécrire `__init__` ni `introduce`.

~~~exercice
type: write
description: |
  La classe `Animal` est déjà écrite. Complète :
  - la classe `Cat`, qui hérite d'`Animal`, avec une méthode `shout(self)` qui renvoie `"Miaou"` ;
  - la fonction `cat_talks(name)`, qui crée un `Cat` et renvoie sa présentation, `" et je dis "`, puis son cri.

  Exemple :
  - `cat_talks("Félix")` renvoie `"Je suis Félix et je dis Miaou"`
template: |
  class Animal:
      def __init__(self, name):
          self.name = name

      def introduce(self):
          return "Je suis " + self.name

  class Cat(Animal):
      pass

  def cat_talks(name):
      pass
solution: |
  class Animal:
      def __init__(self, name):
          self.name = name

      def introduce(self):
          return "Je suis " + self.name

  class Cat(Animal):
      def shout(self):
          return "Miaou"

  def cat_talks(name):
      cat = Cat(name)
      return cat.introduce() + " et je dis " + cat.shout()
hints:
  - "`Cat` hérite de `introduce` : il suffit d'ajouter la méthode `shout`."
tests:
  - input: ["Félix"]
    expected: "Je suis Félix et je dis Miaou"
    description: "cat_talks(\"Félix\")"
  - input: ["Tom"]
    expected: "Je suis Tom et je dis Miaou"
    description: "cat_talks(\"Tom\")"
~~~

## 15. Redéfinir une méthode

Une classe fille peut écrire une méthode **qui existe déjà** dans la classe parente. Pour ses objets, c'est **sa** version qui s'exécute : on dit qu'elle **redéfinit** la méthode.

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def shout(self):
        return "..."

class Dog(Animal):
    def shout(self):
        return "Wouf"

print(Animal("Bob").shout())
print(Dog("Rex").shout())
```

Affiche `...`, puis `Wouf`. Python cherche d'abord la méthode dans la classe de l'objet, puis, s'il ne la trouve pas, dans la classe parente.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ? `Bike` redéfinit `wheels`, `Truck` ne redéfinit rien.
code: |
  class Vehicle:
      def __init__(self, name):
          self.name = name

      def wheels(self):
          return 4

      def describe(self):
          return self.name + " : " + str(self.wheels()) + " roues"

  class Bike(Vehicle):
      def wheels(self):
          return 2

  class Truck(Vehicle):
      pass

  print(Vehicle("voiture").describe())
  print(Bike("vélo").describe())
  print(Truck("camion").describe())
hints:
  - "`describe` appelle `self.wheels()` : c'est la version de la classe de l'objet qui s'exécute."
~~~

## 16. Compléter le constructeur du parent : `super()`

Quand la classe fille a besoin d'un attribut **en plus**, elle écrit son propre `__init__`. Mais ce nouveau `__init__` **remplace** celui du parent : les attributs du parent ne sont plus créés… sauf si on appelle le constructeur du parent avec `super().__init__(...)` :

```python
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)   # exécute le __init__ d'Animal
        self.breed = breed

rex = Dog("Rex", "Labrador")
print(rex.name, rex.breed)
```

Affiche `Rex Labrador`. `super()` désigne la classe parente.

~~~exercice
type: fix
description: |
  `manager_info("Ada", 3000, 4)` doit renvoyer `"Ada gagne 3000 et dirige 4 personnes"`, mais le code plante avec une `AttributeError` : un `Manager` n'a pas d'attribut `name`. Corrige le constructeur de `Manager`.
template: |
  class Employee:
      def __init__(self, name, salary):
          self.name = name
          self.salary = salary

      def describe(self):
          return self.name + " gagne " + str(self.salary)

  class Manager(Employee):
      def __init__(self, name, salary, team_size):
          self.team_size = team_size

  def manager_info(name, salary, team_size):
      manager = Manager(name, salary, team_size)
      return manager.describe() + " et dirige " + str(manager.team_size) + " personnes"
solution: |
  class Employee:
      def __init__(self, name, salary):
          self.name = name
          self.salary = salary

      def describe(self):
          return self.name + " gagne " + str(self.salary)

  class Manager(Employee):
      def __init__(self, name, salary, team_size):
          super().__init__(name, salary)
          self.team_size = team_size

  def manager_info(name, salary, team_size):
      manager = Manager(name, salary, team_size)
      return manager.describe() + " et dirige " + str(manager.team_size) + " personnes"
hints:
  - "Le constructeur de `Manager` doit d'abord exécuter celui d'`Employee`, avec `super()`."
tests:
  - input: ["Ada", 3000, 4]
    expected: "Ada gagne 3000 et dirige 4 personnes"
    description: "manager_info(\"Ada\", 3000, 4)"
  - input: ["Léo", 2500, 2]
    expected: "Léo gagne 2500 et dirige 2 personnes"
    description: "manager_info(\"Léo\", 2500, 2)"
~~~

## 17. Un attribut partagé : l'attribut de classe

Les attributs créés avec `self.` appartiennent à **un** objet. Une variable écrite directement dans la classe, hors de toute méthode, est un **attribut de classe** : il existe en un seul exemplaire, **partagé** par tous les objets. On le lit avec le nom de la classe :

```python
class Ticket:
    count = 0

    def __init__(self, owner):
        self.owner = owner
        Ticket.count += 1
        self.number = Ticket.count

t1 = Ticket("Ada")
t2 = Ticket("Léo")
print(t1.number, t2.number)
print(Ticket.count)
```

Affiche `1 2`, puis `2`. Chaque ticket a son propre numéro (`self.number`), mais le compteur `Ticket.count` est commun à tous.

~~~exercice
type: predict
description: |
  Qu'affiche ce code ? `max_lives` est un attribut de classe, `lives` est propre à chaque joueur.
code: |
  class Player:
      max_lives = 3

      def __init__(self, name):
          self.name = name
          self.lives = Player.max_lives

      def hit(self):
          self.lives -= 1

  a = Player("Ada")
  b = Player("Léo")
  a.hit()
  a.hit()
  print(a.lives, b.lives)
  Player.max_lives = 5
  c = Player("Inès")
  print(c.lives, b.lives)
hints:
  - "`self.lives` est copié depuis `Player.max_lives` à la création : changer `max_lives` ensuite ne concerne que les nouveaux joueurs."
~~~

## 18. Un attribut calculé : `@property`

Certaines valeurs se **calculent** à partir des attributs, comme l'aire d'un carré. En écrivant `@property` juste au-dessus d'une méthode, on la lit **comme un attribut**, sans parenthèses :

```python
class Square:
    def __init__(self, side):
        self.side = side

    @property
    def area(self):
        return self.side ** 2

s = Square(3)
print(s.area)
s.side = 5
print(s.area)
```

Affiche `9`, puis `25` : la valeur est recalculée à chaque lecture, elle suit toujours `side`.

~~~exercice
type: write
description: |
  Complète la classe `Box` :
  - le constructeur range `width`, `height` et `depth` dans des attributs ;
  - `volume` est une **propriété** (`@property`) qui renvoie largeur × hauteur × profondeur.

  Puis complète `box_volume(width, height, depth)`, qui crée une `Box` et renvoie son `volume` (sans parenthèses).

  Exemples :
  - `box_volume(2, 3, 4)` renvoie `24`
  - `box_volume(1, 1, 1)` renvoie `1`
template: |
  class Box:
      def __init__(self, width, height, depth):
          pass

      # Ajoute la propriété volume

  def box_volume(width, height, depth):
      pass
solution: |
  class Box:
      def __init__(self, width, height, depth):
          self.width = width
          self.height = height
          self.depth = depth

      @property
      def volume(self):
          return self.width * self.height * self.depth

  def box_volume(width, height, depth):
      return Box(width, height, depth).volume
hints:
  - "Écris `@property` sur la ligne juste au-dessus de `def volume(self):`."
tests:
  - input: [2, 3, 4]
    expected: 24
    description: "box_volume(2, 3, 4)"
  - input: [1, 1, 1]
    expected: 1
    description: "box_volume(1, 1, 1)"
  - input: [5, 2, 10]
    expected: 100
    description: "box_volume(5, 2, 10)"
~~~

## Pièges fréquents

- Oublier `self` comme premier paramètre d'une méthode.
- Écrire `name = name` au lieu de `self.name = name` dans `__init__` : la valeur n'est pas rangée dans l'objet.
- Oublier les parenthèses à l'appel : `r.area` est la méthode elle-même, `r.area()` l'exécute.
- Écrire `_init_` avec un seul tiret bas de chaque côté : il en faut **deux**.
- Faire `print` dans `__str__` au lieu de `return`.
- Oublier `self.` pour appeler une autre méthode de l'objet : `self.area()`, pas `area()`.
- Écrire un `__init__` dans la classe fille sans appeler `super().__init__(...)` : les attributs du parent ne sont pas créés.
- Mettre des parenthèses après une propriété : `s.area`, pas `s.area()`.
