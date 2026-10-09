# Dictionaries

A **dictionary** links **keys** to **values**, just as a real dictionary links a word to its definition, or a phone book a name to a number.

## 1. Creating a dictionary

A dictionary is written between braces `{ }`, with `key: value` pairs separated by commas:

```python
ages = {"Ada": 36, "Alan": 41}
print(ages)
print(len(ages))
```

Displays `{'Ada': 36, 'Alan': 41}`, then `2`: there are two pairs.

Keys are often text, but can also be numbers. A key appears **only once**.

## 2. Reading a value

You read a value with its **key** between square brackets (not with an index):

```python
ages = {"Ada": 36, "Alan": 41}
print(ages["Ada"])
```

Displays `36`.

If the key doesn't exist, `ages["Grace"]` causes an error (`KeyError`).

## 3. Reading safely: `get`

`d.get(key, default)` returns the value if the key exists, and `default` otherwise, without an error:

```python
ages = {"Ada": 36}
print(ages.get("Ada", 0))
print(ages.get("Grace", 0))
```

Displays `36`, then `0`.

~~~exercice
type: predict
description: |
  What does this code display?
code: |
  capitals = {"France": "Paris", "Italy": "Rome", "Japan": "Tokyo"}
  print(capitals["Italy"])
  print(len(capitals))
  print(capitals.get("China", "unknown"))
  print(capitals.get("Japan", "unknown"))
hints:
  - "get returns the default value only if the key doesn't exist."
~~~

## 4. Adding or changing a value

You assign a value to a key. If the key doesn't exist, it is **added**; if it exists, its value is **replaced**:

```python
stock = {"apples": 3}
stock["pears"] = 5       # add
stock["apples"] = 10     # change
print(stock)
```

Displays `{'apples': 10, 'pears': 5}`.

You delete a pair with `del`: `del stock["pears"]`.

~~~exercice
type: output
description: |
  1. Create a dictionary `grades` that links `"Ada"` to `18` and `"Alan"` to `15`.
  2. Add the student `"Grace"` with the grade `17`.
  3. Change the grade of `"Alan"` to `16`.
  4. Display `grades`.

  The program must display exactly:

  ```text
  {'Ada': 18, 'Alan': 16, 'Grace': 17}
  ```
template: |
  # Write your code here
solution: |
  grades = {"Ada": 18, "Alan": 15}
  grades["Grace"] = 17
  grades["Alan"] = 16
  print(grades)
checks:
  variables:
    grades: {"Ada": 18, "Alan": 16, "Grace": 17}
  uses: [grades]
hints:
  - "`grades[\"Grace\"] = 17` adds a pair; the same syntax replaces an existing value."
~~~

## 5. Checking whether a key exists

`in` looks among the **keys** (not among the values):

```python
ages = {"Ada": 36}
print("Ada" in ages)
print(36 in ages)
```

Displays `True`, then `False`.

~~~exercice
type: write
description: |
  Complete the function `translate(word, dico)` so that it returns the translation of `word` found in the dictionary `dico`,
  or `"?"` if the word isn't there.

  Examples:
  - `translate("cat", {"cat": "chat", "dog": "chien"})` returns `"chat"`
  - `translate("wolf", {"cat": "chat"})` returns `"?"`
template: |
  def translate(word, dico):
      # Write your code here
      pass
solution: |
  def translate(word, dico):
      return dico.get(word, "?")
hints:
  - "`get` lets you give a default value."
tests:
  - input: ["cat", {"cat": "chat", "dog": "chien"}]
    expected: "chat"
    description: "Known word"
  - input: ["wolf", {"cat": "chat"}]
    expected: "?"
    description: "Unknown word"
  - input: ["dog", {"cat": "chat", "dog": "chien"}]
    expected: "chien"
    description: "Another known word"
~~~

## 6. Looping over a dictionary

A `for` loop over a dictionary goes through its **keys**:

```python
ages = {"Ada": 36, "Alan": 41}
for name in ages:
    print(name, ages[name])
```

Displays `Ada 36`, then `Alan 41`.

With `.items()`, you directly get the key **and** the value on each round:

```python
ages = {"Ada": 36, "Alan": 41}
for name, age in ages.items():
    print(name, "is", age)
```

Displays `Ada is 36`, then `Alan is 41`.

`.values()` gives only the values: `sum(ages.values())` is `77`.

~~~exercice
type: predict
description: |
  What does this code display?
code: |
  stock = {"apples": 3, "pears": 0, "kiwis": 7}
  for fruit, quantity in stock.items():
      if quantity > 0:
          print(fruit, quantity)
  print(sum(stock.values()))
hints:
  - "The pairs are visited in the order they were added."
~~~

~~~exercice
type: write
description: |
  Complete the function `best(grades)`: it receives a dictionary that links first names to grades, and returns the **first name** with the best grade.
  The dictionary is never empty, and there is never a tie.

  Examples:
  - `best({"Ada": 18, "Alan": 15})` returns `"Ada"`
  - `best({"Leo": 9, "Zoe": 14, "Lou": 11})` returns `"Zoe"`
template: |
  def best(grades):
      # Write your code here
      pass
solution: |
  def best(grades):
      winner = None
      for name, grade in grades.items():
          if winner is None or grade > grades[winner]:
              winner = name
      return winner
hints:
  - "Loop over `grades.items()`, keeping the name of the best grade seen so far."
tests:
  - input: [{"Ada": 18, "Alan": 15}]
    expected: "Ada"
    description: "Two students"
  - input: [{"Leo": 9, "Zoe": 14, "Lou": 11}]
    expected: "Zoe"
    description: "Three students"
  - input: [{"Max": 12}]
    expected: "Max"
    description: "A single student"
~~~

## 7. Counting with a dictionary

A very common use: counting how many times each value appears. For each item, create its key at `0` if it doesn't exist yet, then add 1:

```python
count = {}
for fruit in ["apple", "kiwi", "apple"]:
    if fruit not in count:
        count[fruit] = 0
    count[fruit] += 1
print(count)
```

Displays `{'apple': 2, 'kiwi': 1}`.

~~~exercice
type: write
description: |
  Complete the function `count_words(sentence)` so that it returns a dictionary that links each word of `sentence` to its number of appearances.
  Words are separated by spaces.

  Examples:
  - `count_words("the cat and the dog")` returns `{"the": 2, "cat": 1, "and": 1, "dog": 1}`
  - `count_words("")` returns `{}`
template: |
  def count_words(sentence):
      # Write your code here
      pass
solution: |
  def count_words(sentence):
      count = {}
      for word in sentence.split():
          if word not in count:
              count[word] = 0
          count[word] += 1
      return count
hints:
  - "Same pattern as the example, looping over `sentence.split()`."
tests:
  - input: ["the cat and the dog"]
    expected: {"the": 2, "cat": 1, "and": 1, "dog": 1}
    description: "A repeated word"
  - input: [""]
    expected: {}
    description: "Empty sentence"
  - input: ["yes yes yes"]
    expected: {"yes": 3}
    description: "A single word, three times"
~~~

## Common pitfalls

- Reading a missing key with `d[key]`: use `in` or `get` if it may be missing.
- Searching for a value with `in`: `in` only looks at the keys.
- Using an index: `ages[0]` looks for the **key** `0`, not the first item.
- Forgetting `.items()` to loop over keys and values together.
