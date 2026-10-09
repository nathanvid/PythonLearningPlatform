# Algorithms

An **algorithm** is a precise method, step by step, to solve a problem. You already know some: adding up the items of a list, finding the largest one… In this lesson: a few patterns that come up all the time, and a method to invent them.

## 1. A 4-step method

Before writing code, you must be able to **solve the problem by hand**:

1. **Understand**: rephrase the problem and take a small example.
2. **Solve by hand**: write down the steps you follow on your example.
3. **Translate** into Python: each step becomes one or more lines.
4. **Test** the edge cases: empty list, a single item, negative numbers…

## 2. Searching: stop as soon as it is found

To know whether a value is in a list, go through it and return `True` **as soon as you find it**. If the loop ends without finding it, return `False`:

```python
def has_negative(numbers):
    for n in numbers:
        if n < 0:
            return True      # found: no need to go on
    return False             # everything checked, nothing found

print(has_negative([4, -1, 7]))
print(has_negative([4, 1, 7]))
```

Displays `True`, then `False`.

The `return False` comes **after** the loop, not in an `else`: otherwise the function would stop at the first item.

~~~exercice
type: write
description: |
  Complete the function `contains(items, value)` so that it returns `True` if `value` is in `items`, and `False` otherwise.
  Use a `for` loop, **without** the word `in` outside the loop (no `value in items`).

  Examples:
  - `contains([3, 8, 5], 8)` returns `True`
  - `contains([3, 8, 5], 4)` returns `False`
  - `contains([], 1)` returns `False`
template: |
  def contains(items, value):
      # Write your code here
      pass
solution: |
  def contains(items, value):
      for item in items:
          if item == value:
              return True
      return False
hints:
  - "`return True` in the `if`, `return False` after the loop."
tests:
  - input: [[3, 8, 5], 8]
    expected: true
    description: "Value present"
  - input: [[3, 8, 5], 4]
    expected: false
    description: "Value missing"
  - input: [[], 1]
    expected: false
    description: "Empty list"
  - input: [[1, 2, 3], 3]
    expected: true
    description: "Value last"
~~~

## 3. Counting divisors

A number `d` **divides** `n` when the remainder `n % d` is `0`. To find all the divisors of `n`, try each number from `1` to `n`:

```python
n = 12
for d in range(1, n + 1):
    if n % d == 0:
        print(d)
```

Displays `1`, `2`, `3`, `4`, `6`, `12`.

A **prime** number is a number that has exactly two divisors: 1 and itself (2, 3, 5, 7, 11…).

~~~exercice
type: write
description: |
  Complete the function `count_divisors(n)` so that it returns the number of divisors of `n` (a whole number greater than or equal to 1).

  Examples:
  - `count_divisors(12)` returns `6` (1, 2, 3, 4, 6, 12)
  - `count_divisors(7)` returns `2` (1 and 7)
  - `count_divisors(1)` returns `1`
template: |
  def count_divisors(n):
      # Write your code here
      pass
solution: |
  def count_divisors(n):
      count = 0
      for d in range(1, n + 1):
          if n % d == 0:
              count += 1
      return count
hints:
  - "Same loop as the example, with a counter instead of the print."
tests:
  - input: [12]
    expected: 6
    description: "count_divisors(12)"
  - input: [7]
    expected: 2
    description: "count_divisors(7)"
  - input: [1]
    expected: 1
    description: "count_divisors(1)"
~~~

## 4. Comparing each item with the next one

To check a property that involves two **neighbouring** items, loop over the indexes and compare `items[i]` with `items[i + 1]`. Careful: the last index has no next item, so stop at `len(items) - 1`.

```python
numbers = [3, 5, 4]
for i in range(len(numbers) - 1):
    print(numbers[i], "then", numbers[i + 1])
```

Displays `3 then 5`, then `5 then 4`.

~~~exercice
type: write
description: |
  Complete the function `is_increasing(items)` so that it returns `True` if each item is smaller than or equal to the next one, and `False` otherwise.
  An empty list or a one-item list is increasing.

  Examples:
  - `is_increasing([1, 2, 2, 5])` returns `True`
  - `is_increasing([1, 3, 2])` returns `False`
  - `is_increasing([])` returns `True`
template: |
  def is_increasing(items):
      # Write your code here
      pass
solution: |
  def is_increasing(items):
      for i in range(len(items) - 1):
          if items[i] > items[i + 1]:
              return False
      return True
hints:
  - "As soon as an item is larger than the next one, the answer is `False`."
tests:
  - input: [[1, 2, 2, 5]]
    expected: true
    description: "Increasing with a tie"
  - input: [[1, 3, 2]]
    expected: false
    description: "Not increasing"
  - input: [[]]
    expected: true
    description: "Empty list"
  - input: [[7]]
    expected: true
    description: "A single item"
~~~

## 5. Swapping two items of a list

Many sorting algorithms **swap** two items. With a tuple, it takes one line:

```python
numbers = [5, 1, 4]
numbers[0], numbers[1] = numbers[1], numbers[0]
print(numbers)
```

Displays `[1, 5, 4]`.

**Bubble sort** repeats this idea: it goes through the list, swaps two neighbours when they are in the wrong order, and starts again until no swap is needed any more.

~~~exercice
type: predict
description: |
  This code does **a single pass** of bubble sort. What does it display?
code: |
  numbers = [4, 3, 1, 2]
  for i in range(len(numbers) - 1):
      if numbers[i] > numbers[i + 1]:
          numbers[i], numbers[i + 1] = numbers[i + 1], numbers[i]
      print(numbers)
hints:
  - "The print is inside the loop: the list is displayed after each comparison."
~~~

## 6. Tracing an algorithm

To understand a loop, draw a **table** with the value of each variable on each round. For example:

```python
n = 13
steps = 0
while n > 1:
    n = n // 2
    steps += 1
print(steps)
```

| Round | n | steps |
|---|---|---|
| start | 13 | 0 |
| 1 | 6 | 1 |
| 2 | 3 | 2 |
| 3 | 1 | 3 |

Displays `3`.

## 7. Cutting in half at each step

To guess a number between 1 and 100, the best strategy is to propose the **middle**, then keep the half where the number is. The problem is halved at each guess: 7 guesses are always enough.

**Binary search** applies this idea to a **sorted** list: look at the middle item, then carry on only in the left half or the right half.

~~~exercice
type: predict
description: |
  We look for `7` in a sorted list by cutting it in half on each round. Trace the variables `low`, `high` and `middle`. What does this code display?
code: |
  items = [1, 3, 5, 7, 9, 11, 13]
  low = 0
  high = len(items) - 1
  while low <= high:
      middle = (low + high) // 2
      print(middle, items[middle])
      if items[middle] == 7:
          print("found")
          break
      elif items[middle] < 7:
          low = middle + 1
      else:
          high = middle - 1
hints:
  - "`break` leaves the loop immediately. At the start, `low` is 0 and `high` is 6."
~~~

## Common pitfalls

- Putting the `return False` of a search in an `else` inside the loop.
- Going outside the list with `items[i + 1]`: the loop must stop at `len(items) - 1`.
- Initialising a counter or an accumulator **inside** the loop.
- Forgetting the edge cases: empty list, a single item.
