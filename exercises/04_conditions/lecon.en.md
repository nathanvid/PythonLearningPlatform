# Conditions

Until now, every line ran. With a **condition**, the program makes a choice: it runs some lines only if something is true.

## 1. Comparing two values

A comparison always gives `True` or `False`.

| Written | Read as |
|---|---|
| `a == b` | a is equal to b |
| `a != b` | a is different from b |
| `a < b` | a is smaller than b |
| `a > b` | a is greater than b |
| `a <= b` | a is smaller than or equal to b |
| `a >= b` | a is greater than or equal to b |

```python
age = 15
print(age >= 18)
print(age == 15)
```

Displays `False`, then `True`.

Careful: to **compare**, write `==` (two equal signs). A single `=` is used to **store** a value.

~~~exercice
type: predict
description: |
  Each comparison gives `True` or `False`. What does this code display?
code: |
  x = 7
  print(x > 5)
  print(x == 8)
  print(x != 8)
  print(x <= 7)
hints:
  - "`<=` is also true when both values are equal."
~~~

## 2. Making a choice: `if`

The lines under an `if` run **only if** the condition is true.

```python
grade = 14
if grade >= 10:
    print("Pass")
```

Displays `Pass`, because `14 >= 10` is true.

Two important rules:

- the `if` line ends with a colon `:`;
- the lines that depend on the `if` are **shifted by 4 spaces**: this is the **indentation**.

## 3. What is inside the `if`, and what comes after

All the shifted lines belong to the `if`. The first line that is no longer shifted comes **after** the `if`: it always runs.

```python
grade = 14
if grade >= 10:
    print("Pass")
    print("Well done")
print("End")
```

Displays `Pass`, `Well done`, then `End`.

~~~exercice
type: predict
description: |
  This time, the grade is lower. What does this code display?
code: |
  grade = 8
  if grade >= 10:
      print("Pass")
      print("Well done")
  print("End")
hints:
  - "The two shifted lines are skipped together; the last one doesn't depend on the if."
~~~

## 4. Otherwise: `else`

The lines under `else` run when the `if` condition is **false**. The `else` has no condition.

```python
grade = 8
if grade >= 10:
    print("Pass")
else:
    print("Fail")
```

Displays `Fail`.

~~~exercice
type: output
description: |
  The variable `age` is `20`.

  Write an `if` / `else` that uses `age` and displays:
  - `Adult` if `age` is greater than or equal to `18`;
  - `Minor` otherwise.

  With `age = 20`, the program must display exactly:

  ```text
  Adult
  ```
template: |
  age = 20
  # Write your if / else here
solution: |
  age = 20
  if age >= 18:
      print("Adult")
  else:
      print("Minor")
checks:
  uses: [age]
  constructs: [if, else]
hints:
  - "Don't forget the colons after the condition and after else."
~~~

## 5. Several cases: `elif`

`elif` means "otherwise, if". Python checks the conditions **in order** and runs only the **first** block whose condition is true.

```python
grade = 13
if grade >= 16:
    print("Excellent")
elif grade >= 12:
    print("Good")
else:
    print("Needs work")
```

Displays `Good`: `13 >= 16` is false, then `13 >= 12` is true, so Python stops there.

~~~exercice
type: predict
description: |
  Watch the order of the conditions! What does this code display?
code: |
  temperature = 30
  if temperature > 10:
      print("Mild")
  elif temperature > 25:
      print("Hot")
  else:
      print("Cold")
hints:
  - "Python stops at the first true condition, even if a later one is true too."
~~~

~~~exercice
type: output
description: |
  The variable `grade` is `13`. With `if`, `elif` and `else`, display:
  - `Excellent` if the grade is greater than or equal to `16`;
  - `Good` if it is greater than or equal to `12`;
  - `Fair` if it is greater than or equal to `10`;
  - `Insufficient` otherwise.

  With `grade = 13`, the program must display exactly:

  ```text
  Good
  ```
template: |
  grade = 13
  # Write your conditions here
solution: |
  grade = 13
  if grade >= 16:
      print("Excellent")
  elif grade >= 12:
      print("Good")
  elif grade >= 10:
      print("Fair")
  else:
      print("Insufficient")
checks:
  uses: [grade]
  constructs: [if, elif, else]
hints:
  - "Test the grades from the highest to the lowest."
~~~

## 6. Two conditions at once: `and`

`and` is true only if **both** conditions are true.

```python
age = 15
if age >= 12 and age <= 17:
    print("Teenager")
```

Displays `Teenager`.

## 7. At least one condition: `or`

`or` is true if **at least one** of the conditions is true.

```python
day = "sunday"
if day == "saturday" or day == "sunday":
    print("Weekend")
```

Displays `Weekend`.

## 8. The opposite: `not`

`not` reverses a condition: `not True` is `False`.

```python
rain = False
if not rain:
    print("Let's go out")
```

Displays `Let's go out`.

~~~exercice
type: output
description: |
  The variable `age` is `15`. With **a single** condition that uses `and`, display:
  - `Teen price` if `age` is between `12` and `17` (included);
  - `Full price` otherwise.

  With `age = 15`, the program must display exactly:

  ```text
  Teen price
  ```
template: |
  age = 15
  # Write your code here
solution: |
  age = 15
  if age >= 12 and age <= 17:
      print("Teen price")
  else:
      print("Full price")
checks:
  uses: [age]
  constructs: [if, else, and]
hints:
  - "`age >= 12 and age <= 17`"
~~~

~~~exercice
type: fix
description: |
  This program crashes with a syntax error. Fix the condition so that it displays exactly:

  ```text
  five
  ```
template: |
  x = 5
  if x = 5:
      print("five")
solution: |
  x = 5
  if x == 5:
      print("five")
checks:
  uses: [x]
  constructs: [if]
hints:
  - "To compare, write `==`. A single `=` is used to store a value."
~~~

## Common pitfalls

- Writing `=` instead of `==` in a condition.
- Forgetting the colon `:` at the end of an `if`, `elif` or `else` line.
- Forgetting to shift by 4 spaces the lines that depend on the `if`.
- Putting the `elif` in the wrong order: only the first true condition counts.
- Writing `if age >= 12 and <= 17`: repeat the variable, `age >= 12 and age <= 17`.
