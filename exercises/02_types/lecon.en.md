# Data types

A variable can hold different **kinds** of values: numbers, text… They are called **types**. The type of a value decides what you can do with it.

## 1. Whole numbers: `int`

Numbers **without a decimal part**, positive or negative.

```python
students = 28
temperature = -3
print(students)
```

Displays `28`.

## 2. Decimal numbers: `float`

Numbers **with a decimal part**, written with a **dot**.

```python
height = 1.62
price = 9.99
print(height)
```

Displays `1.62`.

## 3. Text: `str`

Text, always **between quotes**. It is also called a **string**.

```python
first_name = "Ada"
message = "Hello!"
print(message)
```

Displays `Hello!`.

Careful: `15` is a number, but `"15"` (with quotes) is **text**.

## 4. True or false: `bool`

A boolean has only two possible values: `True` and `False`. With a **capital letter**, without quotes.

```python
registered = True
adult = False
print(registered)
```

Displays `True`.

## 5. Finding the type of a value

The `type` function gives the type of a value:

```python
print(type(28))
print(type(1.62))
print(type("Ada"))
print(type(True))
```

Displays:

```text
<class 'int'>
<class 'float'>
<class 'str'>
<class 'bool'>
```

~~~exercice
type: predict
description: |
  What does this code display? Write the lines exactly as Python displays them.
code: |
  print(type(7))
  print(type(7.0))
  print(type("7"))
hints:
  - "A dot makes a float, quotes make a str."
~~~

## 6. Joining and repeating text

Between two texts, `+` doesn't calculate: it **sticks** them together. And `*` with a number **repeats** a text.

```python
print("Hel" + "lo")
print("ha" * 3)
```

Displays:

```text
Hello
hahaha
```

`+` doesn't add a space: to get one, put it in a text, like `"Hello" + " " + "Ada"`.

~~~exercice
type: predict
description: |
  Careful, it's a trap! `a` holds a number, `b` holds text. What does this code display?
code: |
  a = 15
  b = "15"
  print(a + a)
  print(b + b)
  print(b * 2)
hints:
  - "Between two texts, + joins and * repeats."
~~~

~~~exercice
type: output
description: |
  1. Create `first_name` holding `"Ada"` and `last_name` holding `"Lovelace"`.
  2. Create a variable `full` that joins `first_name`, a space and `last_name` with `+`.
  3. Display `full`.

  The program must display exactly:

  ```text
  Ada Lovelace
  ```
template: |
  # Write your code here
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
  - "The space is a text like any other: `\" \"`."
~~~

## 7. Don't mix text and numbers with `+`

Joining a text and a number with `+` causes an error (`TypeError`): Python doesn't know whether to calculate or to join.

```python
age = 14
print("I am", age, "years old")   # with commas: no problem
```

Displays `I am 14 years old`. Writing `"I am " + age` would cause an error.

## 8. Converting from one type to another

You can **convert** a value:

- `int(...)` turns it into a whole number;
- `float(...)` turns it into a decimal number;
- `str(...)` turns it into text.

```python
text = "20"
number = int(text)       # the text "20" becomes the number 20
print(number + 5)        # 25

age = 14
print("I am " + str(age) + " years old")   # the number 14 becomes the text "14"
```

Displays `25`, then `I am 14 years old`.

~~~exercice
type: fix
description: |
  This program crashes with a `TypeError`. Fix the **second** line with `str()` so that it displays exactly:

  ```text
  I am 14 years old
  ```
template: |
  age = 14
  print("I am " + age + " years old")
solution: |
  age = 14
  print("I am " + str(age) + " years old")
checks:
  uses: [age, str]
hints:
  - "`str(age)` turns the number 14 into text, which can be joined with +."
~~~

~~~exercice
type: output
description: |
  The variable `text` holds `"20"`: it is text, not a number.

  1. Convert it to a whole number with `int()` and store the result in a variable `number`.
  2. Display `number + 5`.

  The program must display exactly:

  ```text
  25
  ```
template: |
  text = "20"
  # Write your code here
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
  What does this code display? Look carefully at the type of each value before each `+` or `*`.
code: |
  print(int("7") + 3)
  print(str(7) + "3")
  print(float("2.5") * 2)
hints:
  - "After the conversion, you either calculate between two numbers or join two texts."
~~~

## Common pitfalls

- Writing a comma in a number: `1,5` is not a float, write `1.5`.
- Writing `true` instead of `True`.
- Joining a text and a number with `+`: convert first with `str()`, or use commas in `print`.
- Forgetting that `"15"` is text: `"15" + "15"` gives `1515`, not `30`.
