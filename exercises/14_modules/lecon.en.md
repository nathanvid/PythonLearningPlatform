# Modules

A **module** is a file full of ready-made functions. Python comes with hundreds of modules: the **standard library**. Rather than rewriting everything, you **import** what already exists.

## 1. Importing a module

Write `import` followed by the module's name, **at the top of the file**. Then use its functions with the `module.` prefix:

```python
import math

print(math.sqrt(16))
print(math.pi)
```

Displays `4.0` (the square root of 16), then `3.141592653589793`.

~~~exercice
type: output
description: |
  Import the `math` module, then display the square root of `81` with `math.sqrt`.

  The program must display exactly:

  ```text
  9.0
  ```
template: |
  # Write your code here
solution: |
  import math
  print(math.sqrt(81))
checks:
  uses: [math]
hints:
  - "`sqrt` always returns a decimal number."
~~~

## 2. Importing only what you need

With `from module import name`, you import one specific function, and use it **without** prefix:

```python
from math import floor, ceil

print(floor(2.7))    # rounds down
print(ceil(2.1))     # rounds up
```

Displays `2`, then `3`.

~~~exercice
type: predict
description: |
  What does this code display?
code: |
  import math
  print(math.floor(7.9), math.ceil(7.1))
  print(round(math.pi, 2))
  print(math.sqrt(25) + 1)
hints:
  - "`floor` always rounds down, `ceil` always rounds up."
~~~

~~~exercice
type: write
description: |
  Complete the function `disc_area(radius)` so that it returns the area of a disc, `math.pi × radius²`, **rounded to 2 digits** after the decimal point.
  Don't forget to import `math` at the top of the code.

  Examples:
  - `disc_area(1)` returns `3.14`
  - `disc_area(2)` returns `12.57`
template: |
  def disc_area(radius):
      # Write your code here
      pass
solution: |
  import math

  def disc_area(radius):
      return round(math.pi * radius ** 2, 2)
hints:
  - "`round(value, 2)` rounds to 2 digits after the decimal point."
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

## 3. Chance: `random`

The `random` module draws values at random. The result changes on each run:

```python
import random

die = random.randint(1, 6)          # whole number between 1 and 6, both included
colour = random.choice(["red", "green", "blue"])   # a random item
print(1 <= die <= 6)
print(colour in ["red", "green", "blue"])
```

Displays `True`, then `True`: you don't know which values were drawn, but you know their limits.

## 4. Dates: `datetime`

The `datetime` module can calculate with dates. `date(year, month, day)` creates a date; the difference between two dates gives a duration, whose `.days` is the number of days:

```python
from datetime import date

start = date(2024, 1, 1)
end = date(2024, 3, 1)
print((end - start).days)
```

Displays `60` (2024 is a leap year: February has 29 days).

`date.fromisoformat("2024-03-01")` creates a date from a text in the `YYYY-MM-DD` format.

~~~exercice
type: write
description: |
  Complete the function `days_before_christmas(text)`: `text` is a date in the `"YYYY-MM-DD"` format, and the function returns the number of days until 25 December **of the same year**.

  Examples:
  - `days_before_christmas("2024-12-01")` returns `24`
  - `days_before_christmas("2024-12-25")` returns `0`
template: |
  from datetime import date

  def days_before_christmas(text):
      # Write your code here
      pass
solution: |
  from datetime import date

  def days_before_christmas(text):
      day = date.fromisoformat(text)
      christmas = date(day.year, 12, 25)
      return (christmas - day).days
hints:
  - "A date has a `.year` attribute: `date(day.year, 12, 25)` is Christmas of the same year."
tests:
  - input: ["2024-12-01"]
    expected: 24
    description: "1 December"
  - input: ["2024-12-25"]
    expected: 0
    description: "Christmas day"
  - input: ["2023-11-25"]
    expected: 30
    description: "One month before"
~~~

## 5. Exchanging data: `json`

The **JSON** format is used to exchange data between programs, as text. It looks a lot like Python dictionaries and lists.

- `json.loads(text)` turns a JSON text into a Python value;
- `json.dumps(value)` does the opposite.

```python
import json

data = json.loads('{"name": "Ada", "age": 36}')
print(data["name"])
print(json.dumps({"ok": True}))
```

Displays `Ada`, then `{"ok": true}`: in JSON, `True` is written `true`.

~~~exercice
type: predict
description: |
  What does this code display?
code: |
  import json
  text = '{"name": "Leo", "grades": [12, 15, 9]}'
  student = json.loads(text)
  print(student["name"])
  print(sum(student["grades"]))
  print(json.dumps([1, None, False]))
hints:
  - "After `json.loads`, you get a real Python dictionary. In JSON, `None` is written `null`."
~~~

## 6. Finding the right function

Nobody knows every module by heart. To search:

- the official documentation: docs.python.org/3/library;
- in Python, `help(math.floor)` displays a function's help, and `dir(math)` lists what a module contains.

## Common pitfalls

- Forgetting the `import`: Python doesn't know `math` and raises a `NameError`.
- Forgetting the prefix: after `import math`, write `math.sqrt`, not `sqrt`.
- Naming your own file `random.py` or `math.py`: it hides the real module.
- Forgetting that `math.sqrt` always returns a `float`: `math.sqrt(16)` is `4.0`.
