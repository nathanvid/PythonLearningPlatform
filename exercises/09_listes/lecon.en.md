# Lists

A **list** stores several values, in a specific order, under a single name. In this lesson: reading, changing, looping over and building lists.

## 1. Creating a list

A list is written between **square brackets** `[ ]`, with values separated by commas. `len` gives the number of items:

```python
grades = [12, 15, 9]
fruits = ["apple", "kiwi"]
empty = []
print(grades)
print(len(grades))
print(len(empty))
```

Displays `[12, 15, 9]`, `3`, then `0`.

## 2. Reading an item

As with strings, each item has an **index** that starts at **0**, and `-1` refers to the last one:

```python
grades = [12, 15, 9]
print(grades[0])
print(grades[-1])
```

Displays `12`, then `9`. An index that is too large causes an `IndexError`.

~~~exercice
type: predict
description: |
  What does this code display?
code: |
  animals = ["cat", "dog", "rabbit", "fish"]
  print(len(animals))
  print(animals[1])
  print(animals[-1])
  print(animals[0] + animals[2])
hints:
  - "The first item is at index 0."
~~~

~~~exercice
type: write
description: |
  Complete the function `last(items)` so that it returns the last item of `items` (the list is never empty).

  Examples:
  - `last([3, 8, 5])` returns `5`
  - `last(["a"])` returns `"a"`
template: |
  def last(items):
      # Write your code here
      pass
solution: |
  def last(items):
      return items[-1]
hints:
  - "A negative index starts from the end."
tests:
  - input: [[3, 8, 5]]
    expected: 5
    description: "last([3, 8, 5])"
  - input: [["a"]]
    expected: "a"
    description: "last([\"a\"])"
  - input: [[1, 2, 3, 4, 5, 6]]
    expected: 6
    description: "last([1, 2, 3, 4, 5, 6])"
~~~

## 3. Changing an item

Unlike strings, a list **can be changed**. You replace an item by assigning to its index:

```python
grades = [12, 15, 9]
grades[2] = 10
print(grades)
```

Displays `[12, 15, 10]`.

## 4. Adding and removing

- `items.append(x)` adds `x` **at the end**;
- `items.remove(x)` removes the first value equal to `x`;
- `items.pop()` removes the last item (and returns it).

```python
shopping = ["bread", "milk"]
shopping.append("eggs")
shopping.remove("bread")
print(shopping)
```

Displays `['milk', 'eggs']`.

~~~exercice
type: predict
description: |
  What does this code display? Follow the content of the list after each line.
code: |
  numbers = [4, 7, 1]
  numbers[0] = 5
  numbers.append(9)
  print(numbers)
  numbers.remove(7)
  print(numbers)
  print(len(numbers))
hints:
  - "append adds at the end; remove removes the given value, not an index."
~~~

## 5. Checking whether a value is in the list

```python
fruits = ["apple", "kiwi"]
print("kiwi" in fruits)
print("banana" in fruits)
```

Displays `True`, then `False`.

## 6. Looping over a list

A `for` loop goes through the list: on each round, the variable holds **one item**.

```python
fruits = ["apple", "kiwi", "pear"]
for fruit in fruits:
    print(fruit)
```

Displays `apple`, `kiwi`, then `pear`.

As with `range`, you can accumulate while looping:

```python
total = 0
for grade in [12, 15, 9]:
    total += grade
print(total)
```

Displays `36`.

~~~exercice
type: write
description: |
  Complete the function `total(numbers)` so that it returns the sum of the items of `numbers`, with a `for` loop (without the `sum` function).

  Examples:
  - `total([1, 2, 3])` returns `6`
  - `total([])` returns `0`
template: |
  def total(numbers):
      # Write your code here
      pass
solution: |
  def total(numbers):
      result = 0
      for n in numbers:
          result += n
      return result
hints:
  - "Accumulator at 0 before the loop, `return` after it."
tests:
  - input: [[1, 2, 3]]
    expected: 6
    description: "total([1, 2, 3])"
  - input: [[]]
    expected: 0
    description: "total([])"
  - input: [[10, -5, 3]]
    expected: 8
    description: "total([10, -5, 3])"
~~~

## 7. Building a new list

To make a list from another one, start from an **empty** list and `append` inside the loop:

```python
doubles = []
for n in [1, 2, 3]:
    doubles.append(n * 2)
print(doubles)
```

Displays `[2, 4, 6]`.

The pattern is always the same: empty list **before** the loop, `append` **inside** the loop, result **after** it.

~~~exercice
type: write
description: |
  Complete the function `positives(numbers)` so that it returns a **new** list holding only the strictly positive numbers of `numbers`, in the same order.

  Examples:
  - `positives([3, -1, 0, 5])` returns `[3, 5]`
  - `positives([-2, -8])` returns `[]`
template: |
  def positives(numbers):
      # Write your code here
      pass
solution: |
  def positives(numbers):
      result = []
      for n in numbers:
          if n > 0:
              result.append(n)
      return result
hints:
  - "Empty list before the loop; `append` only if `n > 0`."
tests:
  - input: [[3, -1, 0, 5]]
    expected: [3, 5]
    description: "positives([3, -1, 0, 5])"
  - input: [[-2, -8]]
    expected: []
    description: "positives([-2, -8])"
  - input: [[]]
    expected: []
    description: "positives([])"
~~~

## 8. Ready-made functions

Python provides functions for lists of numbers:

```python
grades = [12, 15, 9]
print(sum(grades))    # sum: 36
print(min(grades))    # smallest: 9
print(max(grades))    # largest: 15
```

And for sorting:

- `sorted(items)` **returns** a new sorted list, without touching the original;
- `items.sort()` sorts the list **itself**.

```python
grades = [12, 15, 9]
print(sorted(grades))
print(grades)
grades.sort()
print(grades)
```

Displays `[9, 12, 15]`, `[12, 15, 9]`, then `[9, 12, 15]`.

~~~exercice
type: write
description: |
  Complete the function `average(grades)` so that it returns the average of the grades (the list is never empty), with `sum` and `len`.

  Examples:
  - `average([10, 20])` returns `15.0`
  - `average([12, 15, 9])` returns `12.0`
template: |
  def average(grades):
      # Write your code here
      pass
solution: |
  def average(grades):
      return sum(grades) / len(grades)
hints:
  - "The average is the sum divided by the number of grades."
tests:
  - input: [[10, 20]]
    expected: 15.0
    description: "average([10, 20])"
  - input: [[12, 15, 9]]
    expected: 12.0
    description: "average([12, 15, 9])"
  - input: [[7]]
    expected: 7.0
    description: "average([7])"
~~~

## 9. Slicing a list

Slicing works exactly as for strings:

```python
numbers = [10, 20, 30, 40, 50]
print(numbers[1:3])
print(numbers[:2])
print(numbers[::-1])
```

Displays `[20, 30]`, `[10, 20]`, then `[50, 40, 30, 20, 10]`.

## 10. Two names for the same list

Careful: `b = a` does **not** copy the list. `a` and `b` refer to **the same** list: changing one changes the other.

```python
a = [1, 2]
b = a
b.append(3)
print(a)
```

Displays `[1, 2, 3]`. For a real copy, write `b = a[:]` or `b = list(a)`.

~~~exercice
type: predict
description: |
  Careful, it's a trap! What does this code display?
code: |
  a = [1, 2, 3]
  b = a
  c = a[:]
  b.append(4)
  c.append(5)
  print(a)
  print(b)
  print(c)
hints:
  - "`b = a`: same list. `c = a[:]`: an independent copy."
~~~

## 11. List comprehensions

Python has a short way to write the "empty list + loop + append" pattern: the **list comprehension**.

```python
doubles = [n * 2 for n in [1, 2, 3]]
print(doubles)
```

Displays `[2, 4, 6]`. It reads: "`n * 2` for each `n` of the list".

You can add a condition at the end to **filter**:

```python
big = [n for n in [4, 9, 2, 7] if n > 5]
print(big)
```

Displays `[9, 7]`.

~~~exercice
type: write
description: |
  Complete the function `squares(numbers)` so that it returns the list of the squares of the items of `numbers`, with a **list comprehension** (a single line).

  Examples:
  - `squares([1, 2, 3])` returns `[1, 4, 9]`
  - `squares([])` returns `[]`
template: |
  def squares(numbers):
      # Write your code here
      pass
solution: |
  def squares(numbers):
      return [n * n for n in numbers]
hints:
  - "`[... for n in numbers]`, replacing the dots with what each `n` becomes."
tests:
  - input: [[1, 2, 3]]
    expected: [1, 4, 9]
    description: "squares([1, 2, 3])"
  - input: [[]]
    expected: []
    description: "squares([])"
  - input: [[-2, 5]]
    expected: [4, 25]
    description: "squares([-2, 5])"
~~~

## Common pitfalls

- Forgetting that the first index is `0`.
- Writing `items = items.append(x)`: `append` changes the list and returns `None`.
- Creating the result list **inside** the loop: it is emptied on each round.
- Believing that `b = a` makes a copy.
- Mixing up `sorted(items)` (returns a sorted copy) and `items.sort()` (sorts the list itself).
