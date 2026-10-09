# The `while` loop

The `while` loop repeats lines **as long as** a condition is true. It is used when you don't know in advance how many rounds you will need.

## 1. Repeating as long as

Before **each** round, Python checks the condition: if it is true, it does one round; if it is false, it leaves the loop.

```python
n = 1
while n <= 3:
    print(n)
    n += 1
```

Displays `1`, `2`, `3`.

Step by step: `n` is 1 (1 <= 3, display 1), then 2 (display 2), then 3 (display 3), then 4: `4 <= 3` is false, the loop stops.

~~~exercice
type: predict
description: |
  What does this code display? Follow the value of `n` on each round.
code: |
  n = 3
  while n > 0:
      print(n)
      n -= 1
  print("End")
hints:
  - "The condition is checked before each round: when n is 0, the loop stops."
~~~

~~~exercice
type: output
description: |
  With a `while` loop (no `for`), display the numbers from `1` to `5`, one per line:

  ```text
  1
  2
  3
  4
  5
  ```
template: |
  n = 1
  # Write your while loop here
solution: |
  n = 1
  while n <= 5:
      print(n)
      n += 1
checks:
  constructs: [while]
hints:
  - "Inside the loop: display n, then increase it by 1."
~~~

## 2. Zero rounds is possible

If the condition is false from the start, the loop does **no** rounds at all:

```python
n = 10
while n < 5:
    print(n)
print("End")
```

Displays only `End`.

~~~exercice
type: predict
description: |
  What does this code display?
code: |
  n = 10
  while n < 5:
      print(n)
      n += 1
  print("Finished")
hints:
  - "Test the condition with n = 10 before the first round."
~~~

## 3. Watch out for infinite loops

If the variable in the condition never changes, the condition stays true forever: it is an **infinite loop**. The program never stops (here, the platform stops it after 3 seconds).

```python
n = 1
while n <= 3:
    print(n)
    n += 1      # without this line, n would stay at 1 forever
```

In a `while` loop, always check that one line brings the condition **closer** to `False`.

~~~exercice
type: fix
description: |
  This program must display `1`, `2`, `3`, but it never stops.
  Add the missing line in the loop so that it displays exactly:

  ```text
  1
  2
  3
  ```
template: |
  n = 1
  while n <= 3:
      print(n)
solution: |
  n = 1
  while n <= 3:
      print(n)
      n += 1
checks:
  constructs: [while]
hints:
  - "n must increase on each round, otherwise n <= 3 stays true forever."
~~~

## 4. When to use `while` rather than `for`?

- `for`: you know **how many** rounds to do ("repeat 10 times").
- `while`: you know **when to stop** ("keep going until it exceeds 100").

For example: how many times must 1 be doubled to exceed 100?

```python
value = 1
rounds = 0
while value <= 100:
    value *= 2
    rounds += 1
print(rounds, value)
```

Displays `7 128`: after 7 doublings, you get 128.

~~~exercice
type: output
description: |
  Start from `value = 1` and double it as long as it is smaller than or equal to `1000`.

  With a `while` loop, count the number of doublings in a variable `rounds`, then display:

  ```text
  It takes 10 doublings
  ```
template: |
  value = 1
  rounds = 0
  # Write your while loop here
solution: |
  value = 1
  rounds = 0
  while value <= 1000:
      value *= 2
      rounds += 1
  print("It takes", rounds, "doublings")
checks:
  variables:
    rounds: 10
  uses: [rounds]
  constructs: [while]
hints:
  - "On each round: double value and add 1 to rounds. The print comes after the loop."
~~~

~~~exercice
type: output
description: |
  You invest `100` euros, and every year your money grows by 10 % (it is multiplied by `1.1`).

  With a `while` loop, count in a variable `years` how many years it takes to have **at least** `200` euros, then display:

  ```text
  8 years
  ```
template: |
  money = 100
  years = 0
  # Write your while loop here
solution: |
  money = 100
  years = 0
  while money < 200:
      money *= 1.1
      years += 1
  print(years, "years")
checks:
  variables:
    years: 8
  uses: [money, years]
  constructs: [while]
hints:
  - "Keep going as long as `money < 200`."
~~~

## Common pitfalls

- Forgetting to change the variable in the condition: infinite loop.
- Writing the condition the wrong way round: the loop does no rounds.
- Forgetting the colon `:` at the end of the `while` line.
- Shifting the `print` of the final result: it is displayed on each round.
