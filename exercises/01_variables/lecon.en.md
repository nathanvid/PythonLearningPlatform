# Displaying and storing values

In this lesson: display text with `print`, then store values in **variables**. One idea per step, with an exercise as soon as you have something to practise.

## 1. Displaying a message

To make a program write something on the screen, use `print`. Text goes **between quotes**.

```python
print("Hello")
```

This code displays:

```text
Hello
```

## 2. Displaying several lines

Python reads the program **from top to bottom**, one line after another. Each `print` displays a new line.

```python
print("Line 1")
print("Line 2")
```

Displays:

```text
Line 1
Line 2
```

~~~exercice
type: output
description: |
  Write a program that displays **exactly** these two lines:

  ```text
  Hello
  I am discovering Python
  ```
template: |
  # Write your code here
solution: |
  print("Hello")
  print("I am discovering Python")
hints:
  - "You need one print per line."
~~~

## 3. Displaying several things on one line

You can give `print` several values, separated by **commas**. Python displays them on the same line, with **one space** between each.

```python
print("Hello", "Ada")
print("I am", 15, "years old")
```

Displays:

```text
Hello Ada
I am 15 years old
```

~~~exercice
type: predict
description: |
  What does this code display? Write exactly what appears on the screen, line by line.
code: |
  print("One", "two", "three")
  print("Score:", 10)
hints:
  - "Each comma becomes a space in the output."
~~~

## 4. What is a variable?

A variable is like a **box with a label**.

- The label is the variable's **name**.
- What you put in the box is the **value**.

```python
age = 15
```

This line means: "store the value `15` in a box called `age`". It displays nothing.

## 5. Reading a variable

To use what is in the box, write its name, **without quotes**:

```python
age = 15
print(age)
```

Displays `15`.

With quotes, `print("age")` would display the word `age`, not the value.

~~~exercice
type: output
description: |
  1. Create a variable `city` that holds the text `"Paris"`.
  2. Display the variable `city` with `print`.

  The program must display:

  ```text
  Paris
  ```
template: |
  # Write your code here
solution: |
  city = "Paris"
  print(city)
checks:
  variables:
    city: "Paris"
  uses: [city]
hints:
  - "In print, write the variable's name, without quotes."
~~~

## 6. Displaying text and a variable

With the comma from step 3, you can mix text and variables in one `print`:

```python
first_name = "Ada"
print("Hello", first_name)
```

Displays `Hello Ada`.

~~~exercice
type: output
description: |
  1. Create a variable `first_name` that holds `"Leo"`.
  2. With **a single** `print` that uses `first_name`, display exactly:

  ```text
  My name is Leo
  ```
template: |
  # Write your code here
solution: |
  first_name = "Leo"
  print("My name is", first_name)
checks:
  variables:
    first_name: "Leo"
  uses: [first_name]
hints:
  - "Separate the text and the variable with a comma: `print(\"My name is\", first_name)`."
~~~

## 7. Changing what is in a variable

You can replace what is in the box. The old value **disappears**.

```python
score = 10
score = 25
print(score)
```

Displays `25`.

~~~exercice
type: predict
description: |
  What does this code display? Follow the value of `score` line after line.
code: |
  score = 10
  print(score)
  score = 25
  print(score)
hints:
  - "Each print displays the value of score at the moment it runs."
~~~

## 8. The `=` sign is read from right to left

In Python, `=` doesn't mean "is equal to". It means **"store in"**.

Python first looks at what is **on the right**, then stores it in the variable **on the left**. So you can copy the value of one variable into another:

```python
a = 5
b = a
print(b)
```

Displays `5`. The line `b = a` copies the **value** of `a` (5) into `b`. After that, the two boxes are independent.

~~~exercice
type: predict
description: |
  Careful, it's a trap! What does this code display?
code: |
  a = 5
  b = a
  a = 8
  print(a)
  print(b)
hints:
  - "`b = a` copies the value 5 into b. Changing a afterwards doesn't change b."
~~~

## 9. Naming variables well

A variable name:

- contains letters, digits and the underscore `_`;
- contains **no spaces**: write `my_age`, not `my age`;
- does **not start with a digit**: `score2` yes, `2score` no;
- is case-sensitive: `Age` and `age` are two different variables.

Choose names that say what is in the box: `price` is clearer than `x`.

~~~exercice
type: fix
description: |
  This program crashes because of an incorrect variable name.

  Fix it: the variable must be called `my_name`. The program must display:

  ```text
  Ada
  ```
template: |
  my name = "Ada"
  print(my name)
solution: |
  my_name = "Ada"
  print(my_name)
checks:
  variables:
    my_name: "Ada"
  uses: [my_name]
hints:
  - "A variable name can't contain a space: replace it with `_`."
~~~

## 10. Comments

Everything after a `#` on a line is a **comment**: Python ignores it. It is there to explain the code to people who read it.

```python
# This program displays the age
age = 15      # the age in years
print(age)
```

Displays only `15`.

## Common pitfalls

- Forgetting the quotes around text: `print(Hello)` causes an error.
- Putting quotes around a variable: `print("age")` displays the word `age`.
- Putting a space in a variable name: `my age = 15` is an error.
- Using a variable before creating it: Python doesn't know it yet.
