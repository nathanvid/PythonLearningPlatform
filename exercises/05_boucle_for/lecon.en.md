# The `for` loop

A **loop** repeats lines several times, without copying them. The `for` loop is used when you know **how many times** to repeat.

## 1. Repeating an action

```python
for i in range(3):
    print("Hi")
```

Displays `Hi` three times. `range(3)` means "3 rounds".

As with `if`, the `for` line ends with a colon `:` and the lines to repeat are **shifted by 4 spaces**.

~~~exercice
type: output
description: |
  With a `for` loop, display the word `Bravo` **3 times**, one per line:

  ```text
  Bravo
  Bravo
  Bravo
  ```
template: |
  # Write your loop here
solution: |
  for i in range(3):
      print("Bravo")
checks:
  constructs: [for]
hints:
  - "A single print, shifted by 4 spaces under the for line."
~~~

## 2. The loop variable

On each round, the variable `i` takes a new value. `range(3)` gives `0`, then `1`, then `2`: it starts at **0** and stops **before** 3.

```python
for i in range(3):
    print(i)
```

Displays:

```text
0
1
2
```

~~~exercice
type: predict
description: |
  What does this code display? Compute `i * 10` on each round.
code: |
  for i in range(4):
      print(i * 10)
hints:
  - "range(4) gives 0, 1, 2 and 3."
~~~

## 3. During the loop, and after

The shifted lines are repeated. The first line that is no longer shifted runs **only once**, after the loop.

```python
for i in range(2):
    print("Round", i)
print("Done")
```

Displays `Round 0`, `Round 1`, then `Done`.

## 4. Choosing the start and the end

`range(start, end)` starts at `start` and stops **before** `end`.

```python
for i in range(1, 4):
    print(i)
```

Displays `1`, `2`, `3`.

~~~exercice
type: output
description: |
  With a `for` loop and `range`, display the numbers from `1` to `5`, one per line:

  ```text
  1
  2
  3
  4
  5
  ```
template: |
  # Write your loop here
solution: |
  for i in range(1, 6):
      print(i)
checks:
  constructs: [for]
hints:
  - "The end of range is excluded: to go up to 5, write 6."
~~~

## 5. Moving by several at a time

A third number gives the **step**: how much you move forward on each round.

```python
for i in range(0, 10, 2):
    print(i)
```

Displays `0`, `2`, `4`, `6`, `8`.

With a negative step, you count down: `range(3, 0, -1)` gives `3`, `2`, `1`.

~~~exercice
type: predict
description: |
  What does this code display?
code: |
  for i in range(2, 11, 3):
      print(i)
hints:
  - "Start at 2 and add 3 on each round, as long as you stay before 11."
~~~

## 6. Adding up in a loop

To compute a sum, prepare a variable **before** the loop, then add a number to it **on each round**:

```python
total = 0
for i in range(1, 4):
    total += i
print(total)
```

Step by step: `total` is 0, then 0 + 1 = 1, then 1 + 2 = 3, then 3 + 3 = 6. Displays `6`.

This variable is called an **accumulator**.

~~~exercice
type: output
description: |
  With a `for` loop, compute the sum of all the numbers from `1` to `100` in a variable `total`, then display `total`.

  The program must display exactly:

  ```text
  5050
  ```
template: |
  total = 0
  # Write your loop here
solution: |
  total = 0
  for i in range(1, 101):
      total += i
  print(total)
checks:
  variables:
    total: 5050
  uses: [total]
  constructs: [for]
hints:
  - "The print must come after the loop (not shifted), to display only the final result."
~~~

~~~exercice
type: fix
description: |
  This program must compute `1 + 2 + 3 + 4` and display exactly:

  ```text
  10
  ```

  It displays `4`. Find the extra line and delete it.
template: |
  total = 0
  for i in range(1, 5):
      total = 0
      total += i
  print(total)
solution: |
  total = 0
  for i in range(1, 5):
      total += i
  print(total)
checks:
  variables:
    total: 10
  uses: [total]
  constructs: [for]
hints:
  - "One line resets total to 0 on each round."
~~~

## 7. A condition inside a loop

You can put an `if` inside a loop. For example, to count the even numbers from 1 to 10:

```python
count = 0
for i in range(1, 11):
    if i % 2 == 0:
        count += 1
print(count)
```

Displays `5`. The lines of the `if` are shifted by **8 spaces**: 4 for the loop, 4 more for the `if`.

~~~exercice
type: output
description: |
  With a `for` loop, display the multiplication table of `7`, from `7 x 1` to `7 x 10`.
  Use the loop variable for the second number and for the calculation.

  The program must display exactly:

  ```text
  7 x 1 = 7
  7 x 2 = 14
  7 x 3 = 21
  7 x 4 = 28
  7 x 5 = 35
  7 x 6 = 42
  7 x 7 = 49
  7 x 8 = 56
  7 x 9 = 63
  7 x 10 = 70
  ```
template: |
  # Write your loop here
solution: |
  for i in range(1, 11):
      print(7, "x", i, "=", 7 * i)
checks:
  constructs: [for]
hints:
  - "`print(7, \"x\", i, \"=\", 7 * i)` displays one line of the table."
~~~

## Common pitfalls

- Forgetting that `range(n)` starts at 0 and stops before `n`.
- Creating the accumulator **inside** the loop: it restarts from 0 on each round.
- Shifting the final `print`: it is then displayed on each round instead of once.
- Forgetting the colon `:` at the end of the `for` line.
