# Calculations

Python is an excellent calculator. In this lesson: operations, their priorities, and how to update a variable.

## 1. The four operations

```python
print(7 + 2)    # addition: 9
print(7 - 2)    # subtraction: 5
print(7 * 2)    # multiplication: 14
print(7 / 2)    # division: 3.5
```

Multiplication is written `*` and division `/`.

## 2. Division always gives a `float`

Even when the result is a whole number, `/` gives a decimal number:

```python
print(10 / 2)
```

Displays `5.0`, not `5`.

## 3. Integer division `//` and remainder `%`

When you share 17 sweets between 5 children:

- `17 // 5` gives `3`: each child gets 3 sweets (the **integer division**);
- `17 % 5` gives `2`: 2 sweets are left (the **remainder**, also called "modulo").

```python
print(17 // 5)
print(17 % 5)
```

Displays `3`, then `2`.

The remainder is often used to know whether a number is even: `n % 2` is `0` when `n` is even.

~~~exercice
type: predict
description: |
  What does this code display? One line per `print`.
code: |
  print(10 / 2)
  print(7 // 2)
  print(7 % 2)
hints:
  - "/ always gives a float; // keeps the whole part; % gives the remainder."
~~~

## 4. Power `**`

`a ** b` computes `a` multiplied by itself `b` times:

```python
print(2 ** 3)    # 2 * 2 * 2
print(5 ** 2)    # 5 squared
```

Displays `8`, then `25`.

## 5. Priorities

As in maths, `*` and `/` come **before** `+` and `-`. **Parentheses** come before everything.

```python
print(2 + 3 * 4)      # first 3 * 4 = 12, then 2 + 12
print((2 + 3) * 4)    # first 2 + 3 = 5, then 5 * 4
```

Displays `14`, then `20`.

~~~exercice
type: predict
description: |
  What does this code display? Apply the priorities before calculating.
code: |
  print(2 + 3 * 4)
  print((2 + 3) * 4)
  print(10 - 4 - 3)
  print(2 * 3 ** 2)
hints:
  - "** comes before *, which comes before + and -. With equal priority, calculate from left to right."
~~~

## 6. Calculating with variables

Use variables like numbers, and store the results in other variables:

```python
price = 4
quantity = 3
total = price * quantity
print(total)
```

Displays `12`.

~~~exercice
type: output
description: |
  A rectangle is `7` wide and `3` high.

  1. Create `width = 7` and `height = 3`.
  2. Compute `area` (width × height) and `perimeter` (2 × (width + height)) using these variables.
  3. Display them to get exactly:

  ```text
  Area: 21
  Perimeter: 20
  ```
template: |
  width = 7
  height = 3
  # Compute area and perimeter here

solution: |
  width = 7
  height = 3
  area = width * height
  perimeter = 2 * (width + height)
  print("Area:", area)
  print("Perimeter:", perimeter)
checks:
  variables:
    area: 21
    perimeter: 20
  uses: [width, height, area, perimeter]
hints:
  - "For the perimeter, the parentheses do the addition before the multiplication."
~~~

~~~exercice
type: output
description: |
  A film lasts `135` minutes. Convert this duration into hours and minutes.

  1. Create `minutes = 135`.
  2. Compute `hours` with `//` and `rest` with `%` (one hour = 60 minutes).
  3. Display exactly:

  ```text
  2 h 15 min
  ```
template: |
  minutes = 135
  # Write your code here
solution: |
  minutes = 135
  hours = minutes // 60
  rest = minutes % 60
  print(hours, "h", rest, "min")
checks:
  variables:
    hours: 2
    rest: 15
  uses: [minutes, hours, rest]
hints:
  - "`print(hours, \"h\", rest, \"min\")` puts a space between each value."
~~~

## 7. Updating a variable

You often compute a new value from the old one. The `=` is read from right to left:

```python
score = 10
score = score + 5    # on the right: 10 + 5 = 15, stored in score
print(score)
```

Displays `15`.

Python has a shortcut: `score += 5` means exactly `score = score + 5`. There are also `-=`, `*=` and `/=`.

```python
money = 20
money -= 8      # money = money - 8
money *= 2      # money = money * 2
print(money)
```

Displays `24`.

~~~exercice
type: output
description: |
  1. Create `score = 0`.
  2. Add `10` to `score` with `+=`, then `5` more with `+=`.
  3. Display `score`.

  The program must display exactly:

  ```text
  15
  ```
template: |
  score = 0
  # Write your code here
solution: |
  score = 0
  score += 10
  score += 5
  print(score)
checks:
  variables:
    score: 15
  uses: [score]
  constructs: ["+="]
hints:
  - "`score += 10` adds 10 to the current value of score."
~~~

## 8. Rounding

`round(number, digits)` rounds a number to the wanted number of digits after the decimal point:

```python
print(round(3.14159, 2))
print(round(7.6))
```

Displays `3.14`, then `8`.

~~~exercice
type: fix
description: |
  This program must compute the average of two grades, `12` and `16`, and display exactly:

  ```text
  14.0
  ```

  It displays `20.0` because of a priority problem. Fix the **third** line.
template: |
  a = 12
  b = 16
  average = a + b / 2
  print(average)
solution: |
  a = 12
  b = 16
  average = (a + b) / 2
  print(average)
checks:
  variables:
    average: 14.0
  uses: [a, b, average]
hints:
  - "Division comes before addition: you need parentheses."
~~~

## Common pitfalls

- Forgetting that `/` gives a `float`: `10 / 2` is `5.0`.
- Forgetting priorities: `a + b / 2` only divides `b`.
- Writing `x` to multiply: in Python, it is `*`.
- Writing `^` for power: in Python, it is `**`.
