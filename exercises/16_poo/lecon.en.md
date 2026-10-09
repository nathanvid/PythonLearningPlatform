# Object-oriented programming

Until now, data (variables) and actions (functions) were separate. **Object-oriented programming** groups them: an **object** holds its own data and knows how to do its own actions.

## 1. Class and object

- A **class** is a **blueprint**: it describes what an object holds and what it can do.
- An **object** is a **copy** built from that blueprint.

With the "Dog" blueprint, you can build several dogs: Rex, Fido… Each one has its own name.

You already use objects: a list is an object of the `list` class, and `append` is one of its actions.

## 2. Creating a class and an object

You create a class with the word `class` (its name starts with a capital letter). You build an object by calling the class like a function:

```python
class Dog:
    pass

rex = Dog()
rex.name = "Rex"
print(rex.name)
```

Displays `Rex`. `rex.name` is an **attribute**: a variable stored **inside** the object.

## 3. The constructor `__init__`

Rather than adding attributes by hand afterwards, you write a special method, `__init__`, called **automatically** when each object is created:

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

rex = Dog("Rex", 3)
print(rex.name, rex.age)
```

Displays `Rex 3`.

- `__init__` is written with **two** underscores on each side;
- `self` refers to **the object being created**: `self.name = name` stores the parameter `name` in the object's `name` attribute;
- in the call `Dog("Rex", 3)`, you don't give `self`: Python does it.

~~~exercice
type: predict
description: |
  What does this code display? Two objects are created from the same class.
code: |
  class Student:
      def __init__(self, name, grade):
          self.name = name
          self.grade = grade

  a = Student("Ada", 18)
  b = Student("Leo", 12)
  print(a.name, b.grade)
  print(a.grade + b.grade)
hints:
  - "Each object has its own attributes: `a.grade` is 18, `b.grade` is 12."
~~~

~~~exercice
type: output
description: |
  1. Create a class `Book` whose constructor receives `title` and `author`, and stores them in the attributes `self.title` and `self.author`.
  2. Create an object `book` with the title `"1984"` and the author `"Orwell"`.
  3. Display its two attributes to get exactly:

  ```text
  1984 - Orwell
  ```
template: |
  class Book:
      def __init__(self, title, author):
          # Store the parameters in attributes
          pass

  # Create the object and display its attributes
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

## 4. Methods

A **method** is a function written inside the class. It always receives `self` as its first parameter, which gives it access to the object's attributes:

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

Displays `12`. You call a method with a dot and parentheses: `r.area()`.

## 5. In the exercises

Only the **last function** of the code is tested. The exercises of this lesson therefore end with an ordinary function that creates an object and uses its methods:

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

Displays `10`.

~~~exercice
type: write
description: |
  Complete the class `Circle`:
  - the constructor stores `radius` in `self.radius`;
  - the method `diameter(self)` returns the diameter (2 × radius).

  Then complete the function `circle_diameter(radius)`, which creates a `Circle` and returns its diameter.

  Examples:
  - `circle_diameter(3)` returns `6`
  - `circle_diameter(0.5)` returns `1.0`
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
  - "Inside the method, the radius is read with `self.radius`."
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

## 6. A method with parameters

Like a function, a method can receive parameters **in addition to** `self`. It uses them together with the object's attributes:

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

Displays `True`, then `False`. In the call, you only give `threshold`: `self` is always provided by Python.

~~~exercice
type: write
description: |
  Complete the `Product` class:
  - the constructor stores `name` and `price` in attributes;
  - the method `discounted_price(self, percent)` returns the price after a `percent` % discount, that is `price - price * percent / 100`.

  Then complete `sale_price(price, percent)`, which creates a `Product` named `"item"` with this price and returns its discounted price.

  Examples:
  - `sale_price(50, 20)` returns `40.0`
  - `sale_price(80, 0)` returns `80.0`
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
      product = Product("item", price)
      return product.discounted_price(percent)
hints:
  - "Inside the method, the price is read with `self.price`; `percent` is an ordinary parameter."
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

## 7. Changing an object's state

A method can **change** the object's attributes. The object keeps these changes:

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

Displays `170`.

~~~exercice
type: predict
description: |
  What does this code display? The two counters are independent objects.
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
  - "Each object has its own `value` attribute."
~~~

~~~exercice
type: fix
description: |
  The function `greeting(name)` must return `"Hello "` followed by the name, for example `greeting("Ada")` must return `"Hello Ada"`.
  It crashes with an `AttributeError`: the constructor doesn't store the name **in the object**. Fix it.
template: |
  class Person:
      def __init__(self, name):
          name = name

      def greet(self):
          return "Hello " + self.name

  def greeting(name):
      return Person(name).greet()
solution: |
  class Person:
      def __init__(self, name):
          self.name = name

      def greet(self):
          return "Hello " + self.name

  def greeting(name):
      return Person(name).greet()
hints:
  - "To store a value in the object, write `self.` before the attribute."
tests:
  - input: ["Ada"]
    expected: "Hello Ada"
    description: "greeting(\"Ada\")"
  - input: ["Leo"]
    expected: "Hello Leo"
    description: "greeting(\"Leo\")"
~~~

## 8. A method that checks before acting

A method can contain an `if`. It is useful to **protect** the object: here, a withdrawal larger than the balance is refused. The method returns `True` if the withdrawal happened, `False` otherwise:

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

Displays `True`, `False`, then `70`: the second withdrawal was refused, the balance did not change.

~~~exercice
type: predict
description: |
  What does this code display? Follow the balance line by line.
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
  - "At the time of the first withdrawal, the balance is 70."
~~~

## 9. An attribute holding a list

An attribute can hold any value, including a **list**. You create it empty in `__init__`, then the methods fill it:

```python
class Basket:
    def __init__(self):
        self.items = []

    def add(self, item):
        self.items.append(item)

    def size(self):
        return len(self.items)

b = Basket()
b.add("bread")
b.add("milk")
print(b.items)
print(b.size())
```

Displays `['bread', 'milk']`, then `2`. Each basket has **its own** list: `self.items = []` runs every time an object is created.

~~~exercice
type: write
description: |
  Complete the `Gradebook` class:
  - the constructor creates the attribute `self.grades`, an empty list;
  - `add(self, grade)` adds a grade to the list;
  - `average(self)` returns the average of the grades (their sum divided by how many there are).

  Then complete `average_of(grades)`: it creates a `Gradebook`, adds each grade of the list `grades` with `add`, and returns the average. The list is never empty.

  Examples:
  - `average_of([10, 14])` returns `12.0`
  - `average_of([15])` returns `15.0`
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
  - "In `average_of`, a loop `for grade in grades:` calls `gradebook.add(grade)`."
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

## 10. A method that calls another one

Inside a method, `self` also gives access to the object's **other methods**: you write `self.` in front of their name.

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def describe(self):
        return "Area: " + str(self.area())

r = Rectangle(3, 4)
print(r.describe())
```

Displays `Area: 12`. `describe` reuses `area` instead of redoing the calculation.

~~~exercice
type: predict
description: |
  What does this code display? Careful: the list of coins changes before the last `print`.
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
  - "`is_rich` recomputes the total at each call, with the list as it is at that moment."
~~~

~~~exercice
type: fix
description: |
  `square_text(3)` should return `"Square of area 9"`, but the code crashes with a `NameError` in the `describe` method. Fix it.
template: |
  class Square:
      def __init__(self, side):
          self.side = side

      def area(self):
          return self.side * self.side

      def describe(self):
          return "Square of area " + str(area())

  def square_text(side):
      return Square(side).describe()
solution: |
  class Square:
      def __init__(self, side):
          self.side = side

      def area(self):
          return self.side * self.side

      def describe(self):
          return "Square of area " + str(self.area())

  def square_text(side):
      return Square(side).describe()
hints:
  - "To call another method of the same object, you must write `self.` in front of it."
tests:
  - input: [3]
    expected: "Square of area 9"
    description: "square_text(3)"
  - input: [5]
    expected: "Square of area 25"
    description: "square_text(5)"
~~~

## 11. A list of objects

You can store several objects in a list, then go through it with `for`. At each turn, the loop variable **is** an object: you read its attributes with a dot.

```python
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

students = [Student("Ada", 18), Student("Leo", 12), Student("Ines", 15)]
for student in students:
    print(student.name, student.grade)
```

Displays:

```text
Ada 18
Leo 12
Ines 15
```

~~~exercice
type: write
description: |
  The `Student` class is already written. Complete `best_student(names, grades)`:
  1. fill the list `students` with one `Student` per student (the name `names[i]` goes with the grade `grades[i]`);
  2. go through this list to find the student with the best grade;
  3. return their **name**.

  In case of a tie, return the first one. The lists are never empty.

  Examples:
  - `best_student(["Ada", "Leo", "Ines"], [18, 12, 15])` returns `"Ada"`
  - `best_student(["Tom", "Zoe"], [9, 14])` returns `"Zoe"`
template: |
  class Student:
      def __init__(self, name, grade):
          self.name = name
          self.grade = grade

  def best_student(names, grades):
      students = []
      # Fill the list, then look for the best student
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
  - "Keep the best student in a variable `best = students[0]`, then compare `student.grade` with `best.grade`."
tests:
  - input: [["Ada", "Leo", "Ines"], [18, 12, 15]]
    expected: "Ada"
    description: "The first one is the best"
  - input: [["Tom", "Zoe"], [9, 14]]
    expected: "Zoe"
    description: "The last one is the best"
  - input: [["Lea", "Max"], [10, 10]]
    expected: "Lea"
    description: "Tie: the first one"
~~~

## 12. Objects talking to each other

A method can receive **another object** as a parameter. It can then read and change that object's attributes too:

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

Displays `70 50`. In `give`, `self` is `alice` (the object written before the dot) and `other` is `bob`.

~~~exercice
type: write
description: |
  On a grid, to go from one point to another, you count the squares travelled horizontally and vertically.

  Complete the `Point` class:
  - the constructor stores `x` and `y` in attributes;
  - `distance(self, other)` returns `abs(self.x - other.x) + abs(self.y - other.y)`.

  Then complete `grid_distance(x1, y1, x2, y2)`, which creates the two points and returns the distance from the first to the second.

  Examples:
  - `grid_distance(0, 0, 3, 4)` returns `7`
  - `grid_distance(1, 1, 1, 1)` returns `0`
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
  - "The other point's coordinates are read with `other.x` and `other.y`."
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
  `after_transfer(100, 20, 30)` creates two accounts, moves 30 from the first to the second and returns their balances. It should return `[70, 50]`, but returns `[100, 20]`: the money doesn't change accounts. Fix the `transfer` method.
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
  - "In `transfer`, `self` is the account that gives and `other` the one that receives."
tests:
  - input: [100, 20, 30]
    expected: [70, 50]
    description: "after_transfer(100, 20, 30)"
  - input: [50, 0, 50]
    expected: [0, 50]
    description: "after_transfer(50, 0, 50)"
~~~

## 13. Displaying an object: `__str__`

By default, `print(obj)` displays an unreadable text, like `<__main__.Point object at 0x…>`. The special method `__str__` chooses the text to display:

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

Displays `(2, 5)` twice.

~~~exercice
type: write
description: |
  Complete the class `Time`:
  - the constructor stores `hours` and `minutes` in attributes;
  - `__str__` returns the text `"H:MM"`, with the minutes always on 2 digits (`f"{self.minutes:02d}"`).

  Then complete `show_time(hours, minutes)`, which returns `str(...)` of a `Time` object.

  Examples:
  - `show_time(9, 5)` returns `"9:05"`
  - `show_time(14, 30)` returns `"14:30"`
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
          return f"{self.hours}:{self.minutes:02d}"

  def show_time(hours, minutes):
      return str(Time(hours, minutes))
hints:
  - "`__str__` must **return** the text with `return`, not display it."
tests:
  - input: [9, 5]
    expected: "9:05"
    description: "show_time(9, 5)"
  - input: [14, 30]
    expected: "14:30"
    description: "show_time(14, 30)"
  - input: [0, 0]
    expected: "0:00"
    description: "show_time(0, 0)"
~~~

## 14. Inheritance

A class can **inherit** from another one: it gets all its attributes and methods, and can add or **redefine** some. Write the parent class between parentheses:

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def introduce(self):
        return "I am " + self.name

class Dog(Animal):
    def shout(self):
        return "Woof"

rex = Dog("Rex")
print(rex.introduce())    # method inherited from Animal
print(rex.shout())        # method added by Dog
```

Displays `I am Rex`, then `Woof`. `Dog` doesn't need to rewrite `__init__` or `introduce`.

~~~exercice
type: write
description: |
  The class `Animal` is already written. Complete:
  - the class `Cat`, which inherits from `Animal`, with a method `shout(self)` that returns `"Meow"`;
  - the function `cat_talks(name)`, which creates a `Cat` and returns its introduction, `" and I say "`, then its shout.

  Example:
  - `cat_talks("Felix")` returns `"I am Felix and I say Meow"`
template: |
  class Animal:
      def __init__(self, name):
          self.name = name

      def introduce(self):
          return "I am " + self.name

  class Cat(Animal):
      pass

  def cat_talks(name):
      pass
solution: |
  class Animal:
      def __init__(self, name):
          self.name = name

      def introduce(self):
          return "I am " + self.name

  class Cat(Animal):
      def shout(self):
          return "Meow"

  def cat_talks(name):
      cat = Cat(name)
      return cat.introduce() + " and I say " + cat.shout()
hints:
  - "`Cat` inherits `introduce`: you only need to add the `shout` method."
tests:
  - input: ["Felix"]
    expected: "I am Felix and I say Meow"
    description: "cat_talks(\"Felix\")"
  - input: ["Tom"]
    expected: "I am Tom and I say Meow"
    description: "cat_talks(\"Tom\")"
~~~

## 15. Redefining a method

A child class can write a method **that already exists** in the parent class. For its objects, **its own** version runs: we say it **overrides** the method.

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def shout(self):
        return "..."

class Dog(Animal):
    def shout(self):
        return "Woof"

print(Animal("Bob").shout())
print(Dog("Rex").shout())
```

Displays `...`, then `Woof`. Python first looks for the method in the object's class, then, if it doesn't find it, in the parent class.

~~~exercice
type: predict
description: |
  What does this code display? `Bike` overrides `wheels`, `Truck` overrides nothing.
code: |
  class Vehicle:
      def __init__(self, name):
          self.name = name

      def wheels(self):
          return 4

      def describe(self):
          return self.name + ": " + str(self.wheels()) + " wheels"

  class Bike(Vehicle):
      def wheels(self):
          return 2

  class Truck(Vehicle):
      pass

  print(Vehicle("car").describe())
  print(Bike("bike").describe())
  print(Truck("truck").describe())
hints:
  - "`describe` calls `self.wheels()`: the version of the object's class is the one that runs."
~~~

## 16. Completing the parent's constructor: `super()`

When the child class needs an **extra** attribute, it writes its own `__init__`. But this new `__init__` **replaces** the parent's: the parent's attributes are no longer created… unless you call the parent's constructor with `super().__init__(...)`:

```python
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)   # runs Animal's __init__
        self.breed = breed

rex = Dog("Rex", "Labrador")
print(rex.name, rex.breed)
```

Displays `Rex Labrador`. `super()` refers to the parent class.

~~~exercice
type: fix
description: |
  `manager_info("Ada", 3000, 4)` should return `"Ada earns 3000 and leads 4 people"`, but the code crashes with an `AttributeError`: a `Manager` has no `name` attribute. Fix the constructor of `Manager`.
template: |
  class Employee:
      def __init__(self, name, salary):
          self.name = name
          self.salary = salary

      def describe(self):
          return self.name + " earns " + str(self.salary)

  class Manager(Employee):
      def __init__(self, name, salary, team_size):
          self.team_size = team_size

  def manager_info(name, salary, team_size):
      manager = Manager(name, salary, team_size)
      return manager.describe() + " and leads " + str(manager.team_size) + " people"
solution: |
  class Employee:
      def __init__(self, name, salary):
          self.name = name
          self.salary = salary

      def describe(self):
          return self.name + " earns " + str(self.salary)

  class Manager(Employee):
      def __init__(self, name, salary, team_size):
          super().__init__(name, salary)
          self.team_size = team_size

  def manager_info(name, salary, team_size):
      manager = Manager(name, salary, team_size)
      return manager.describe() + " and leads " + str(manager.team_size) + " people"
hints:
  - "The constructor of `Manager` must first run the one of `Employee`, with `super()`."
tests:
  - input: ["Ada", 3000, 4]
    expected: "Ada earns 3000 and leads 4 people"
    description: "manager_info(\"Ada\", 3000, 4)"
  - input: ["Leo", 2500, 2]
    expected: "Leo earns 2500 and leads 2 people"
    description: "manager_info(\"Leo\", 2500, 2)"
~~~

## 17. A shared attribute: the class attribute

Attributes created with `self.` belong to **one** object. A variable written directly in the class, outside any method, is a **class attribute**: it exists only once, **shared** by all objects. You read it with the class name:

```python
class Ticket:
    count = 0

    def __init__(self, owner):
        self.owner = owner
        Ticket.count += 1
        self.number = Ticket.count

t1 = Ticket("Ada")
t2 = Ticket("Leo")
print(t1.number, t2.number)
print(Ticket.count)
```

Displays `1 2`, then `2`. Each ticket has its own number (`self.number`), but the counter `Ticket.count` is common to all of them.

~~~exercice
type: predict
description: |
  What does this code display? `max_lives` is a class attribute, `lives` belongs to each player.
code: |
  class Player:
      max_lives = 3

      def __init__(self, name):
          self.name = name
          self.lives = Player.max_lives

      def hit(self):
          self.lives -= 1

  a = Player("Ada")
  b = Player("Leo")
  a.hit()
  a.hit()
  print(a.lives, b.lives)
  Player.max_lives = 5
  c = Player("Ines")
  print(c.lives, b.lives)
hints:
  - "`self.lives` is copied from `Player.max_lives` at creation: changing `max_lives` afterwards only affects new players."
~~~

## 18. A computed attribute: `@property`

Some values are **computed** from the attributes, like the area of a square. By writing `@property` just above a method, you read it **like an attribute**, without parentheses:

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

Displays `9`, then `25`: the value is recomputed at each read, so it always follows `side`.

~~~exercice
type: write
description: |
  Complete the `Box` class:
  - the constructor stores `width`, `height` and `depth` in attributes;
  - `volume` is a **property** (`@property`) that returns width × height × depth.

  Then complete `box_volume(width, height, depth)`, which creates a `Box` and returns its `volume` (without parentheses).

  Examples:
  - `box_volume(2, 3, 4)` returns `24`
  - `box_volume(1, 1, 1)` returns `1`
template: |
  class Box:
      def __init__(self, width, height, depth):
          pass

      # Add the volume property

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
  - "Write `@property` on the line just above `def volume(self):`."
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

## Common pitfalls

- Forgetting `self` as the first parameter of a method.
- Writing `name = name` instead of `self.name = name` in `__init__`: the value isn't stored in the object.
- Forgetting the parentheses when calling: `r.area` is the method itself, `r.area()` runs it.
- Writing `_init_` with a single underscore on each side: it needs **two**.
- Using `print` in `__str__` instead of `return`.
- Forgetting `self.` to call another method of the object: `self.area()`, not `area()`.
- Writing an `__init__` in the child class without calling `super().__init__(...)`: the parent's attributes are not created.
- Putting parentheses after a property: `s.area`, not `s.area()`.
