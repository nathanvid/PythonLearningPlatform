# Running a project

A project brings together everything you have learnt. The challenge is no longer the syntax but the **organisation**: how to break a big problem into small, easy pieces. In this lesson, we build the engine of a **hangman game** step by step.

## 1. Breaking the problem down

Facing a big problem, you don't start by writing code: you make the **list of sub-problems**. For hangman:

1. Display the word with `_` instead of the letters not found yet.
2. Know whether the word is fully found.
3. Compute the remaining lives after a guess.
4. Chain the guesses until the end of the game.

Each sub-problem becomes a **small function**, written and tested **on its own**, before moving on to the next.

## 2. First piece: masking the word

The letters already guessed are kept in a **set** `found`. To mask the word, go through its letters and build a new text:

```python
word = "cat"
found = {"c", "t"}
result = ""
for letter in word:
    if letter in found:
        result += letter
    else:
        result += "_"
print(result)
```

Displays `c_t`.

~~~exercice
type: write
description: |
  Turn the example into a function: complete `mask(word, found)` so that it returns `word` with each letter that is **not** in `found` replaced by `_`.

  Examples:
  - `mask("cat", ["c", "t"])` returns `"c_t"`
  - `mask("cat", [])` returns `"___"`
template: |
  def mask(word, found):
      # Write your code here
      pass
solution: |
  def mask(word, found):
      result = ""
      for letter in word:
          if letter in found:
              result += letter
          else:
              result += "_"
      return result
hints:
  - "Reuse the loop of the example and end with `return result`."
tests:
  - input: ["cat", ["c", "t"]]
    expected: "c_t"
    description: "Two letters found"
  - input: ["cat", []]
    expected: "___"
    description: "No letters"
  - input: ["banana", ["a", "n"]]
    expected: "_anana"
    description: "Repeated letters"
~~~

## 3. Second piece: is the word found?

The word is found when **all** its letters are in `found`. You can check it with the previous function: the masked word then holds no `_` at all.

~~~exercice
type: write
description: |
  Complete `won(word, found)` so that it returns `True` if all the letters of `word` are in `found`, and `False` otherwise.
  The function `mask` from the previous step is already written: use it.

  Examples:
  - `won("cat", ["c", "a", "t"])` returns `True`
  - `won("cat", ["c", "a"])` returns `False`
template: |
  def mask(word, found):
      result = ""
      for letter in word:
          if letter in found:
              result += letter
          else:
              result += "_"
      return result

  def won(word, found):
      # Write your code here
      pass
solution: |
  def mask(word, found):
      result = ""
      for letter in word:
          if letter in found:
              result += letter
          else:
              result += "_"
      return result

  def won(word, found):
      return "_" not in mask(word, found)
hints:
  - "The word is found when `\"_\"` is not in `mask(word, found)`."
tests:
  - input: ["cat", ["c", "a", "t"]]
    expected: true
    description: "All letters"
  - input: ["cat", ["c", "a"]]
    expected: false
    description: "Letters missing"
  - input: ["aaa", ["a"]]
    expected: true
    description: "A single repeated letter"
~~~

## 4. Third piece: lives

A guess costs a life only if the letter is **not** in the word **and** has **not** been guessed already. Writing this rule in a separate function lets you test it with precise cases.

~~~exercice
type: write
description: |
  Complete `lives_left(word, already_guessed, letter, lives)` so that it returns the number of lives **after** guessing `letter`:
  - `lives` unchanged if `letter` is in `word` or has already been guessed (it is in `already_guessed`);
  - `lives - 1` otherwise.

  Examples:
  - `lives_left("cat", [], "z", 6)` returns `5`
  - `lives_left("cat", [], "c", 6)` returns `6`
  - `lives_left("cat", ["z"], "z", 5)` returns `5`
template: |
  def lives_left(word, already_guessed, letter, lives):
      # Write your code here
      pass
solution: |
  def lives_left(word, already_guessed, letter, lives):
      if letter in word or letter in already_guessed:
          return lives
      return lives - 1
hints:
  - "A single condition with `or` is enough."
tests:
  - input: ["cat", [], "z", 6]
    expected: 5
    description: "Missing letter"
  - input: ["cat", [], "c", 6]
    expected: 6
    description: "Letter present"
  - input: ["cat", ["z"], "z", 5]
    expected: 5
    description: "Letter already guessed"
~~~

## 5. Putting the pieces together

Once each piece is tested, put them together in a loop. The main program becomes short and readable, because each detail is stored in its function:

```python
def mask(word, found):
    return "".join(l if l in found else "_" for l in word)

word = "code"
found = set()
lives = 6
for letter in ["e", "z", "c", "o", "d"]:
    if letter not in word and letter not in found:
        lives -= 1
    found.add(letter)
    print(mask(word, found), lives)
```

Displays `___e 6`, `___e 5`, `c__e 5`, `co_e 5`, then `code 5`.

~~~exercice
type: predict
description: |
  What does this code display? Follow `found` and `lives` on each round.
code: |
  word = "map"
  found = set()
  lives = 3
  for letter in ["a", "z", "z", "p", "m"]:
      if letter not in word and letter not in found:
          lives -= 1
      found.add(letter)
  print(lives)
  print(sorted(found))
hints:
  - "The second `\"z\"` is already in `found`: it doesn't cost a life."
~~~

## 6. Moving step by step

- Write **one** function, test it right away (with a few `print` calls or with the tests), then move on to the next.
- Start with a simple version that works, then improve it.
- Think about edge cases: empty list, one-letter word, no guesses…
- Run the tests often: a failing test tells you exactly what is left to do.

## 7. Choosing data structures

| Need | Structure |
|---|---|
| An ordered sequence of items | list |
| Quickly know if an item is there, no duplicates | set |
| Link information to a key | dictionary |
| Values that go together and don't change | tuple |
| Group the data and actions of one "thing" | class |

In hangman: a **set** for the guessed letters (no duplicates, fast `in` test), and a **tuple** to return the result `(masked_word, lives, status)`.

## 8. A tool for the Caesar cipher: modulo

The Caesar cipher project shifts letters in the alphabet, going back to the start after `z`. The remainder `%` does exactly that: `(position + shift) % 26` always stays between 0 and 25.

```python
alphabet = "abcdefghijklmnopqrstuvwxyz"
position = alphabet.index("y")
print(position)
print(alphabet[(position + 3) % 26])
```

Displays `24`, then `b`: after `z`, you go back to `a`.

~~~exercice
type: predict
description: |
  What does this code display? In Python, the remainder of a division by 26 is always between 0 and 25, even for a negative number.
code: |
  print((24 + 3) % 26)
  print((0 - 1) % 26)
  print((5 + 26) % 26)
hints:
  - "`-1 % 26` is 25: going back one step from the start lands at the end."
~~~

## When you are stuck

- Re-read the instructions and examples: what is the input, what is the expected output?
- Test your function on the smallest possible example.
- Read the error explanation and the line it points to.
- Use the hints, one at a time.
