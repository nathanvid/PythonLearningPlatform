# Exceptions

When an error happens while a program runs, Python **raises an exception**: the program stops and displays a message. In this lesson: understanding these errors, **catching** them so that the program goes on, and raising your own.

## 1. When a program crashes

You have already met errors. Each one has a **name** that tells what happened:

| Exception | Example | What happened |
|---|---|---|
| `ZeroDivisionError` | `10 / 0` | division by zero |
| `ValueError` | `int("abc")` | value that can't be converted |
| `IndexError` | `[1, 2][5]` | index too large |
| `KeyError` | `{"a": 1}["b"]` | key missing from the dictionary |
| `TypeError` | `"5" + 3` | incompatible types |

As soon as an exception is raised, the following lines do **not** run.

## 2. Catching an error: `try` / `except`

Put the code that may fail in a `try` block. If an error happens, Python jumps straight into the `except` block instead of crashing:

```python
try:
    result = 10 / 0
    print("This line doesn't run")
except ZeroDivisionError:
    print("Division impossible")
print("The program goes on")
```

Displays `Division impossible`, then `The program goes on`.

~~~exercice
type: predict
description: |
  Follow Python's path. What does this code display?
code: |
  print("A")
  try:
      print("B")
      x = 1 / 0
      print("C")
  except ZeroDivisionError:
      print("D")
  print("E")
hints:
  - "As soon as the error happens, Python jumps into the `except`: the rest of the `try` is skipped."
~~~

~~~exercice
type: write
description: |
  Complete the function `inverse(x)` so that it returns `1 / x`, or `None` if `x` is 0.
  Use `try` / `except ZeroDivisionError` (no `if`).

  Examples:
  - `inverse(4)` returns `0.25`
  - `inverse(0)` returns `None`
template: |
  def inverse(x):
      # Write your code here
      pass
solution: |
  def inverse(x):
      try:
          return 1 / x
      except ZeroDivisionError:
          return None
hints:
  - "Put `return 1 / x` in the `try`, and `return None` in the `except`."
tests:
  - input: [4]
    expected: 0.25
    description: "inverse(4)"
  - input: [0]
    expected: null
    description: "inverse(0)"
  - input: [-2]
    expected: -0.5
    description: "inverse(-2)"
~~~

## 3. Naming the type of error

After `except`, write the **name** of the exception you know how to handle. Any other error is not caught: it still crashes the program, which helps you spot real bugs.

```python
text = "abc"
try:
    number = int(text)
except ValueError:
    number = 0
print(number)
```

Displays `0`.

~~~exercice
type: write
description: |
  Complete the function `read_int(text)` so that it returns `text` converted to a whole number, or `0` if the conversion is impossible.

  Examples:
  - `read_int("42")` returns `42`
  - `read_int("hello")` returns `0`
  - `read_int("-7")` returns `-7`
template: |
  def read_int(text):
      # Write your code here
      pass
solution: |
  def read_int(text):
      try:
          return int(text)
      except ValueError:
          return 0
hints:
  - "`int(\"hello\")` raises a `ValueError`."
tests:
  - input: ["42"]
    expected: 42
    description: "read_int(\"42\")"
  - input: ["hello"]
    expected: 0
    description: "read_int(\"hello\")"
  - input: ["-7"]
    expected: -7
    description: "read_int(\"-7\")"
  - input: [""]
    expected: 0
    description: "Empty text"
~~~

## 4. Several types of errors

You can chain several `except` blocks, each with its own handling. Python uses the first one that matches the error:

```python
def item(items, i):
    try:
        return items[i]
    except IndexError:
        return "index too large"
    except TypeError:
        return "the index must be a number"

print(item([10, 20], 1))
print(item([10, 20], 5))
print(item([10, 20], "a"))
```

Displays `20`, `index too large`, then `the index must be a number`.

~~~exercice
type: fix
description: |
  The function `divide(a, b)` must return `a / b`, or the text `"Division by zero"` if `b` is 0.
  Yet it crashes when `b` is 0: the `except` doesn't catch the right type of error. Fix it.
template: |
  def divide(a, b):
      try:
          return a / b
      except ValueError:
          return "Division by zero"
solution: |
  def divide(a, b):
      try:
          return a / b
      except ZeroDivisionError:
          return "Division by zero"
hints:
  - "Which exception does `10 / 0` raise? Look at the table in step 1."
tests:
  - input: [10, 2]
    expected: 5.0
    description: "divide(10, 2)"
  - input: [10, 0]
    expected: "Division by zero"
    description: "divide(10, 0)"
~~~

## 5. `else` and `finally`

Two optional blocks complete `try` / `except`:

- `else` runs only if **no** error happened;
- `finally` **always** runs, whether there was an error or not.

```python
try:
    result = 10 / 2
except ZeroDivisionError:
    print("error")
else:
    print("ok:", result)
finally:
    print("done")
```

Displays `ok: 5.0`, then `done`.

~~~exercice
type: predict
description: |
  What does this code display? The function is called twice.
code: |
  def test(x):
      try:
          r = 10 / x
      except ZeroDivisionError:
          print("error")
      else:
          print("result", r)
      finally:
          print("end")

  test(5)
  test(0)
hints:
  - "`else` only without an error, `finally` in every case."
~~~

## 6. Reading an error's message

With `except ... as e`, the variable `e` holds the exception. `str(e)` gives its message:

```python
try:
    int("abc")
except ValueError as e:
    print("Error:", e)
```

Displays `Error: invalid literal for int() with base 10: 'abc'`.

## 7. Raising your own exception: `raise`

You can trigger an exception yourself with `raise`, to signal that a value is invalid. Choose the type of exception and write a message:

```python
def check_age(age):
    if age < 0:
        raise ValueError("age can't be negative")
    return age

try:
    check_age(-5)
except ValueError as e:
    print("Error:", e)
```

Displays `Error: age can't be negative`.

~~~exercice
type: write
description: |
  The function `validate_grade(grade)` is already written: it raises a `ValueError` if the grade is not between 0 and 20.

  Complete the function `check(grade)`: it calls `validate_grade(grade)` in a `try` and returns:
  - `"Grade accepted"` if no error is raised;
  - `"Rejected: "` followed by the error's message otherwise.

  Examples:
  - `check(15)` returns `"Grade accepted"`
  - `check(25)` returns `"Rejected: the grade must be between 0 and 20"`
template: |
  def validate_grade(grade):
      if grade < 0 or grade > 20:
          raise ValueError("the grade must be between 0 and 20")
      return grade

  def check(grade):
      # Write your code here
      pass
solution: |
  def validate_grade(grade):
      if grade < 0 or grade > 20:
          raise ValueError("the grade must be between 0 and 20")
      return grade

  def check(grade):
      try:
          validate_grade(grade)
      except ValueError as e:
          return "Rejected: " + str(e)
      return "Grade accepted"
hints:
  - "`except ValueError as e:` then `return \"Rejected: \" + str(e)`."
tests:
  - input: [15]
    expected: "Grade accepted"
    description: "check(15)"
  - input: [25]
    expected: "Rejected: the grade must be between 0 and 20"
    description: "check(25)"
  - input: [-1]
    expected: "Rejected: the grade must be between 0 and 20"
    description: "check(-1)"
~~~

## Common pitfalls

- Writing an `except:` without an error type: it catches everything, even your own bugs. Always name the expected exception.
- Putting too many lines in the `try`: only put the ones that can really fail.
- Catching the wrong type of error: the exception isn't caught and the program crashes.
- Forgetting that the lines of the `try` after the error don't run.
