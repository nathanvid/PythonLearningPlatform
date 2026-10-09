# Strings

A **string** (`str`) is text: a sequence of characters between quotes. In this lesson: reading a character, slicing, transforming and looping over a text.

## 1. A sequence of characters

A string is a sequence of characters: letters, digits, spaces, punctuation… `len` gives the number of characters:

```python
word = "Python"
print(len(word))
print(len("Hel lo"))
```

Displays `6`, then `6`: the space counts as a character.

## 2. Reading a character: indexes

Each character has a **position**, called an **index**. The first one is at index **0**.

```text
 P   y   t   h   o   n
 0   1   2   3   4   5
```

```python
word = "Python"
print(word[0])
print(word[3])
```

Displays `P`, then `h`.

## 3. Counting from the end

A negative index starts from the end: `-1` is the last character, `-2` the one before…

```python
word = "Python"
print(word[-1])
print(word[-2])
```

Displays `n`, then `o`.

Careful: an index that is too large causes an error (`IndexError`). In `"Python"`, the last index is `5`, not `6`.

~~~exercice
type: predict
description: |
  What does this code display?
code: |
  word = "Welcome"
  print(len(word))
  print(word[0])
  print(word[-1])
  print(word[2])
hints:
  - "The first character is at index 0."
~~~

~~~exercice
type: write
description: |
  Complete the function `first_last(word)` so that it returns the first letter of `word` joined to its last letter.

  Examples:
  - `first_last("Python")` returns `"Pn"`
  - `first_last("cat")` returns `"ct"`
template: |
  def first_last(word):
      # Write your code here
      pass
solution: |
  def first_last(word):
      return word[0] + word[-1]
hints:
  - "The last letter is `word[-1]`, whatever the length of the word."
tests:
  - input: ["Python"]
    expected: "Pn"
    description: "first_last(\"Python\")"
  - input: ["cat"]
    expected: "ct"
    description: "first_last(\"cat\")"
  - input: ["ok"]
    expected: "ok"
    description: "first_last(\"ok\")"
~~~

## 4. Slicing a piece

`word[start:end]` returns the piece from index `start` up to `end` **not included** (like `range`).

```python
word = "Python"
print(word[0:2])    # indexes 0 and 1
print(word[2:6])    # indexes 2 to 5
```

Displays `Py`, then `thon`.

You can leave out one of the two numbers: `word[:2]` starts at the beginning, `word[2:]` goes to the end.

```python
word = "Python"
print(word[:2])
print(word[2:])
```

Displays `Py`, then `thon`.

## 5. Reversing a string

As with `range`, a third number gives the **step**. With a step of `-1`, the string is read backwards:

```python
print("Python"[::-1])
```

Displays `nohtyP`.

~~~exercice
type: predict
description: |
  What does this code display?
code: |
  word = "programme"
  print(word[0:3])
  print(word[3:])
  print(word[:1] + word[-1])
  print(word[::-1])
hints:
  - "The end of a slice is never included."
~~~

~~~exercice
type: write
description: |
  Complete the function `capitalize_first(word)` so that it returns `word` with its **first letter** in capitals, the rest unchanged.
  Use an index, a slice and the `upper()` method (seen just after: `"a".upper()` gives `"A"`).

  Examples:
  - `capitalize_first("ada")` returns `"Ada"`
  - `capitalize_first("python")` returns `"Python"`
template: |
  def capitalize_first(word):
      # Write your code here
      pass
solution: |
  def capitalize_first(word):
      return word[0].upper() + word[1:]
hints:
  - "Join the first letter in capitals (`word[0].upper()`) and the rest of the word (`word[1:]`)."
tests:
  - input: ["ada"]
    expected: "Ada"
    description: "capitalize_first(\"ada\")"
  - input: ["python"]
    expected: "Python"
    description: "capitalize_first(\"python\")"
  - input: ["a"]
    expected: "A"
    description: "capitalize_first(\"a\")"
~~~

## 6. Methods: transforming a text

A **method** is a function attached to a value. You call it with a dot: `text.method()`.

```python
name = "Ada Lovelace"
print(name.upper())     # all in capitals
print(name.lower())     # all in lowercase
```

Displays `ADA LOVELACE`, then `ada lovelace`.

A string can **never be changed**: a method returns a **new** string. To keep the result, store it: `name = name.upper()`.

## 7. Cleaning and replacing

- `strip()` removes the spaces at the start and at the end;
- `replace(old, new)` replaces a piece with another, everywhere.

```python
typed = "   hello   "
print(typed.strip())
print("banana".replace("a", "o"))
```

Displays `hello`, then `bonono`.

## 8. Searching in a text

- `piece in text` is `True` if the piece is in the text;
- `text.count(piece)` counts how many times it appears.

```python
sentence = "the cat and the dog"
print("cat" in sentence)
print(sentence.count("the"))
```

Displays `True`, then `2`.

~~~exercice
type: predict
description: |
  What does this code display?
code: |
  text = "  Hello  "
  print(text.strip())
  print(text.strip().upper())
  print("banana".replace("an", "AN"))
  print("banana".count("a"))
  print("z" in "banana")
hints:
  - "Methods can be chained: `text.strip().upper()` applies strip, then upper to the result."
~~~

## 9. Looping over a text letter by letter

A `for` loop can go through a string: on each round, the variable holds **one character**.

```python
for letter in "abc":
    print(letter)
```

Displays `a`, `b`, then `c`.

By adding an `if`, you can count the `a` letters, for example:

```python
count = 0
for letter in "banana":
    if letter == "a":
        count += 1
print(count)
```

Displays `3`.

~~~exercice
type: write
description: |
  Complete the function `count_letter(text, letter)` so that it returns how many times `letter` appears in `text`.
  Use a `for` loop that goes through `text` (without the `count` method).

  Examples:
  - `count_letter("banana", "a")` returns `3`
  - `count_letter("python", "z")` returns `0`
template: |
  def count_letter(text, letter):
      # Write your code here
      pass
solution: |
  def count_letter(text, letter):
      count = 0
      for character in text:
          if character == letter:
              count += 1
      return count
hints:
  - "A counter before the loop, `+= 1` in the `if`, and `return` after the loop."
tests:
  - input: ["banana", "a"]
    expected: 3
    description: "count_letter(\"banana\", \"a\")"
  - input: ["python", "z"]
    expected: 0
    description: "count_letter(\"python\", \"z\")"
  - input: ["aaa", "a"]
    expected: 3
    description: "count_letter(\"aaa\", \"a\")"
~~~

## 10. Building a text in a loop

Just as you add numbers in an accumulator, you can **join** characters into a string that starts empty (`""`):

```python
result = ""
for letter in "abc":
    result = result + letter.upper()
print(result)
```

Displays `ABC`.

~~~exercice
type: write
description: |
  Complete the function `without_spaces(text)` so that it returns `text` without any space.
  Build the result with a `for` loop: join each character that is not a space.

  Examples:
  - `without_spaces("hel lo")` returns `"hello"`
  - `without_spaces(" a b c ")` returns `"abc"`
template: |
  def without_spaces(text):
      # Write your code here
      pass
solution: |
  def without_spaces(text):
      result = ""
      for character in text:
          if character != " ":
              result += character
      return result
hints:
  - "Start from `result = \"\"` and join only the characters different from `\" \"`."
tests:
  - input: ["hel lo"]
    expected: "hello"
    description: "without_spaces(\"hel lo\")"
  - input: [" a b c "]
    expected: "abc"
    description: "without_spaces(\" a b c \")"
  - input: ["python"]
    expected: "python"
    description: "without_spaces(\"python\")"
~~~

## 11. Inserting values: f-strings

An **f-string** is a string preceded by an `f`. Everything between braces `{}` is replaced by its value:

```python
name = "Ada"
age = 36
print(f"{name} is {age} years old")
print(f"In 10 years: {age + 10}")
```

Displays `Ada is 36 years old`, then `In 10 years: 46`. No need for `str()` or `+`: the f-string handles everything.

~~~exercice
type: output
description: |
  The variables `item` and `price` already exist. With **an f-string** that uses both variables, display exactly:

  ```text
  The pen costs 2 euros
  ```
template: |
  item = "pen"
  price = 2
  # Display the sentence with an f-string
solution: |
  item = "pen"
  price = 2
  print(f"The {item} costs {price} euros")
checks:
  uses: [item, price]
hints:
  - "`f\"The {item} ...\"`: the value of item replaces `{item}`."
~~~

## 12. Splitting into words and joining back

`split()` cuts a text into **pieces** at each space. The result is a **list** of words (lists are the topic of the next lesson); `len` gives the number of pieces:

```python
sentence = "the cat sleeps"
words = sentence.split()
print(words)
print(len(words))
```

Displays `['the', 'cat', 'sleeps']`, then `3`.

The other way round, `"separator".join(words)` joins the pieces back with the chosen separator:

```python
words = "the cat sleeps".split()
print("-".join(words))
```

Displays `the-cat-sleeps`.

~~~exercice
type: write
description: |
  Complete the function `number_of_words(sentence)` so that it returns the number of words in `sentence`, with `split()` and `len()`.
  `split()` ignores extra spaces: `"a   b"` holds 2 words.

  Examples:
  - `number_of_words("the cat sleeps")` returns `3`
  - `number_of_words("")` returns `0`
template: |
  def number_of_words(sentence):
      # Write your code here
      pass
solution: |
  def number_of_words(sentence):
      return len(sentence.split())
hints:
  - "`sentence.split()` gives the list of words; you just need to count its items."
tests:
  - input: ["the cat sleeps"]
    expected: 3
    description: "number_of_words(\"the cat sleeps\")"
  - input: [""]
    expected: 0
    description: "number_of_words(\"\")"
  - input: ["  a   b  "]
    expected: 2
    description: "number_of_words(\"  a   b  \")"
~~~

## Common pitfalls

- Forgetting that the first index is `0`, and the last one is `len(text) - 1`.
- Forgetting that the end of a slice `[start:end]` is not included.
- Believing that a method changes the string: `name.upper()` alone doesn't change `name`.
- Forgetting the `f` before an f-string: the braces are then displayed as they are.
- Writing `text[0] = "B"`: a string can't be changed, build a new one instead.
