# Tuples and sets

Two more ways to store several values: the **tuple**, a sequence that can't be changed, and the **set**, a collection without duplicates.

## 1. The tuple

A tuple is written between **parentheses**. It is read like a list: indexes, `len`, `for` loop…

```python
point = (3, 4)
print(point[0])
print(len(point))
```

Displays `3`, then `2`.

## 2. A tuple can't be changed

You can neither change an item of a tuple nor add one: `point[0] = 5` causes an error (`TypeError`).

A tuple is used for values that go **together** and must not change: the coordinates of a point, a date…

```python
date = (14, 7, 1789)
print(date[2])
```

Displays `1789`.

~~~exercice
type: predict
description: |
  What does this code display?
code: |
  colour = (255, 128, 0)
  print(colour[1])
  print(colour[-1])
  print(len(colour))
  print(colour[0] + colour[2])
hints:
  - "A tuple is read exactly like a list."
~~~

## 3. Storing each value in a variable

**Unpacking** stores the items of a tuple in several variables at once. You need as many variables as items:

```python
point = (3, 4)
x, y = point
print(x)
print(y)
```

Displays `3`, then `4`.

~~~exercice
type: output
description: |
  1. In **a single line**, store the three values of the tuple `date` in three variables `day`, `month` and `year`.
  2. Display them with an f-string to get exactly:

  ```text
  14/7/1789
  ```
template: |
  date = (14, 7, 1789)
  # Write your code here
solution: |
  date = (14, 7, 1789)
  day, month, year = date
  print(f"{day}/{month}/{year}")
checks:
  variables:
    day: 14
    month: 7
    year: 1789
  uses: [date, day, month, year]
hints:
  - "`day, month, year = date`"
~~~

## 4. Swapping two variables

Thanks to tuples, you can swap two variables in one line, without a temporary variable:

```python
a = 1
b = 2
a, b = b, a
print(a, b)
```

Displays `2 1`. On the right, Python builds the tuple `(2, 1)`, then unpacks it into `a` and `b`.

## 5. Returning several values

A function can return a tuple: that is the way to return **several values** at once.

```python
def min_max(numbers):
    return (min(numbers), max(numbers))

low, high = min_max([4, 1, 9])
print(low, high)
```

Displays `1 9`.

~~~exercice
type: write
description: |
  Complete the function `rectangle(width, height)` so that it returns the tuple `(perimeter, area)` of the rectangle.

  Examples:
  - `rectangle(3, 4)` returns `(14, 12)`
  - `rectangle(5, 5)` returns `(20, 25)`
template: |
  def rectangle(width, height):
      # Write your code here
      pass
solution: |
  def rectangle(width, height):
      return (2 * (width + height), width * height)
hints:
  - "`return (perimeter, area)`, computing both values."
tests:
  - input: [3, 4]
    expected: [14, 12]
    description: "rectangle(3, 4)"
  - input: [5, 5]
    expected: [20, 25]
    description: "rectangle(5, 5)"
  - input: [10, 1]
    expected: [22, 10]
    description: "rectangle(10, 1)"
~~~

## 6. The set

A **set** is written between **braces** `{ }`. It has two special features:

- it **never keeps duplicates**;
- its items have **no order** (so no indexes).

```python
colours = {"red", "green", "red"}
print(len(colours))
print("green" in colours)
```

Displays `2`, then `True`: the second `"red"` was not kept.

For an empty set, write `set()`: `{}` creates something else (a dictionary, seen in the next lesson).

## 7. Removing duplicates from a list

`set(items)` turns a list into a set, which removes the duplicates. `sorted` then returns a sorted list:

```python
grades = [12, 15, 12, 9, 15]
print(sorted(set(grades)))
print(len(set(grades)))
```

Displays `[9, 12, 15]`, then `3`.

You add an item with `add`:

```python
seen = set()
seen.add("cat")
seen.add("cat")
print(len(seen))
```

Displays `1`.

~~~exercice
type: predict
description: |
  What does this code display?
code: |
  s = {3, 1, 3, 2, 1}
  print(len(s))
  print(2 in s)
  s.add(5)
  s.add(3)
  print(sorted(s))
hints:
  - "A set keeps each value only once."
~~~

~~~exercice
type: write
description: |
  Complete the function `count_distinct(values)` so that it returns the number of **different** values in the list, using a set.

  Examples:
  - `count_distinct([1, 2, 2, 3, 3, 3])` returns `3`
  - `count_distinct([])` returns `0`
template: |
  def count_distinct(values):
      # Write your code here
      pass
solution: |
  def count_distinct(values):
      return len(set(values))
hints:
  - "`set(values)` removes the duplicates; you just need to count."
tests:
  - input: [[1, 2, 2, 3, 3, 3]]
    expected: 3
    description: "count_distinct([1, 2, 2, 3, 3, 3])"
  - input: [[]]
    expected: 0
    description: "count_distinct([])"
  - input: [["a", "b", "a"]]
    expected: 2
    description: "count_distinct([\"a\", \"b\", \"a\"])"
~~~

## 8. Combining two sets

| Written | Result |
|---|---|
| `a & b` | the items found in `a` **and** in `b` (intersection) |
| `a \| b` | the items found in `a` **or** in `b` (union) |
| `a - b` | the items of `a` **not found** in `b` (difference) |

```python
a = {1, 2, 3}
b = {2, 3, 4}
print(sorted(a & b))
print(sorted(a | b))
print(sorted(a - b))
```

Displays `[2, 3]`, `[1, 2, 3, 4]`, then `[1]`.

~~~exercice
type: write
description: |
  Complete the function `common_letters(word1, word2)` so that it returns the **sorted** list of the letters found in both words, each one only once.

  Examples:
  - `common_letters("cat", "act")` returns `["a", "c", "t"]`
  - `common_letters("abc", "xyz")` returns `[]`
template: |
  def common_letters(word1, word2):
      # Write your code here
      pass
solution: |
  def common_letters(word1, word2):
      return sorted(set(word1) & set(word2))
hints:
  - "`set(\"cat\")` gives the set of the word's letters."
tests:
  - input: ["cat", "act"]
    expected: ["a", "c", "t"]
    description: "common_letters(\"cat\", \"act\")"
  - input: ["abc", "xyz"]
    expected: []
    description: "common_letters(\"abc\", \"xyz\")"
  - input: ["banana", "ananas"]
    expected: ["a", "n"]
    description: "common_letters(\"banana\", \"ananas\")"
~~~

## Common pitfalls

- Trying to change a tuple: you have to create a new one.
- Unpacking with the wrong number of variables: `x, y = (1, 2, 3)` causes an error.
- Writing `{}` for an empty set: you need `set()`.
- Using an index on a set: `s[0]` causes an error, use `sorted(s)` if you need an order.
