# Files and regular expressions

Until now, data disappeared at the end of the program. With **files**, you save it on the disk. With **regular expressions**, you search for patterns in a text (dates, e-mail addresses…).

## 1. Opening a file

You open a file with `open(name, mode, encoding="utf-8")`, in a `with` block that **closes it automatically** at the end:

```python
with open("message.txt", "w", encoding="utf-8") as f:
    f.write("Hello\n")
```

- `"message.txt"` is the file's name;
- `"w"` ("write") opens the file for **writing**: it is created, or **emptied** if it existed;
- `f` is the variable that stands for the open file;
- `encoding="utf-8"` writes accented characters correctly on every computer.

## 2. Writing

`f.write(text)` writes text into the file. Careful: it does **not** add a line break. Write it yourself with `"\n"`:

```python
with open("shopping.txt", "w", encoding="utf-8") as f:
    f.write("bread\n")
    f.write("milk\n")
```

The file now holds two lines: `bread` and `milk`.

## 3. Reading the whole file

Without a mode (or with `"r"`), the file is opened for **reading**. `f.read()` returns its whole content as text:

```python
with open("shopping.txt", "w", encoding="utf-8") as f:
    f.write("bread\nmilk\n")

with open("shopping.txt", encoding="utf-8") as f:
    content = f.read()
print(content)
```

Displays `bread`, then `milk`.

~~~exercice
type: output
description: |
  1. Write the two lines `Hello` and `Goodbye` into the file `message.txt`.
  2. Read the file back with `read()` and display its content with `print(content.strip())`.

  The program must display exactly:

  ```text
  Hello
  Goodbye
  ```
template: |
  # 1. Write the file

  # 2. Read it back and display its content
solution: |
  with open("message.txt", "w", encoding="utf-8") as f:
      f.write("Hello\n")
      f.write("Goodbye\n")

  with open("message.txt", encoding="utf-8") as f:
      content = f.read()
  print(content.strip())
checks:
  uses: [open]
hints:
  - "Remember the `\"\\n\"` at the end of each written line."
~~~

## 4. Reading line by line

A `for` loop over an open file goes through its **lines**. Each line keeps its final `"\n"`: `strip()` removes it.

```python
with open("shopping.txt", "w", encoding="utf-8") as f:
    f.write("bread\nmilk\n")

with open("shopping.txt", encoding="utf-8") as f:
    for line in f:
        print("-", line.strip())
```

Displays `- bread`, then `- milk`.

~~~exercice
type: write
description: |
  The file `eleves.csv` is available. It holds:

  ```text
  nom,note
  Alice,14
  Bob,9
  Chloé,17
  David,12
  ```

  Complete the function `count_lines(filename)` so that it returns the number of lines in the file.

  Example:
  - `count_lines("eleves.csv")` returns `5`
template: |
  def count_lines(filename):
      # Write your code here
      pass
solution: |
  def count_lines(filename):
      count = 0
      with open(filename, encoding="utf-8") as f:
          for line in f:
              count += 1
      return count
hints:
  - "A counter, and a `for line in f` loop."
data_files:
  - "exercises/15_fichiers_regex/data/eleves.csv"
tests:
  - input: ["eleves.csv"]
    expected: 5
    description: "count_lines(\"eleves.csv\")"
~~~

## 5. Adding at the end

The `"a"` mode ("append") opens the file to **add** text at the end, without erasing what is already there:

```python
with open("log.txt", "w", encoding="utf-8") as f:
    f.write("monday\n")
with open("log.txt", "a", encoding="utf-8") as f:
    f.write("tuesday\n")
with open("log.txt", encoding="utf-8") as f:
    print(f.read().strip())
```

Displays `monday`, then `tuesday`.

~~~exercice
type: predict
description: |
  Watch the `"w"` and `"a"` modes! What does this code display?
code: |
  with open("test.txt", "w", encoding="utf-8") as f:
      f.write("A\n")
  with open("test.txt", "a", encoding="utf-8") as f:
      f.write("B\n")
  with open("test.txt", "w", encoding="utf-8") as f:
      f.write("C\n")
  with open("test.txt", "a", encoding="utf-8") as f:
      f.write("D\n")
  with open("test.txt", encoding="utf-8") as f:
      print(f.read().strip())
hints:
  - "`\"w\"` empties the file before writing; `\"a\"` adds at the end."
~~~

## 6. Splitting a line

Many files store several values per line, separated by a character (`,` or `;`). You separate them with `split`:

```python
line = "Alice,14\n"
name, grade = line.strip().split(",")
print(name, int(grade) + 1)
```

Displays `Alice 15`. Values read from a file are always **text**: convert them with `int` to calculate.

~~~exercice
type: write
description: |
  Complete the function `total_grades(filename)` so that it returns the sum of the grades in the file `eleves.csv` (the same as in step 4).
  The first line (`nom,note`) is a header: it holds no grade.

  Example:
  - `total_grades("eleves.csv")` returns `52`
template: |
  def total_grades(filename):
      # Write your code here
      pass
solution: |
  def total_grades(filename):
      total = 0
      with open(filename, encoding="utf-8") as f:
          for line in f:
              name, grade = line.strip().split(",")
              if grade != "note":
                  total += int(grade)
      return total
hints:
  - "For each line: `name, grade = line.strip().split(\",\")`, skipping the header line."
data_files:
  - "exercises/15_fichiers_regex/data/eleves.csv"
tests:
  - input: ["eleves.csv"]
    expected: 52
    description: "total_grades(\"eleves.csv\")"
~~~

## 7. The `csv` module

For CSV files (comma-separated values), the `csv` module does the splitting for you. `csv.DictReader` uses the first line as a header and turns each line into a dictionary:

```python
import csv

with open("grades.csv", "w", encoding="utf-8") as f:
    f.write("name,grade\nAda,18\nAlan,15\n")

with open("grades.csv", encoding="utf-8") as f:
    for student in csv.DictReader(f):
        print(student["name"], student["grade"])
```

Displays `Ada 18`, then `Alan 15`.

## 8. Regular expressions

A **regular expression** (or regex) describes a text **pattern**. For example, `\d` means "a digit". The `re` module searches for these patterns. Write patterns as `r"..."` so that Python doesn't transform the `\`.

| Pattern | Meaning |
|---|---|
| `\d` | a digit |
| `\w` | a letter, a digit or `_` |
| `.` | any character |
| `[abc]` | one character among `a`, `b`, `c` |
| `+` | the previous item, once or more |
| `{3}` | the previous item, exactly 3 times |

- `re.findall(pattern, text)` returns the list of all the matching pieces;
- `re.fullmatch(pattern, text)` checks that the **whole** text matches (result different from `None`);
- `re.sub(pattern, replacement, text)` replaces all the matching pieces.

```python
import re

print(re.findall(r"\d+", "3 cats and 12 fish"))
print(re.fullmatch(r"\d{4}", "2026") is not None)
print(re.sub(r"\d", "#", "a1b22"))
```

Displays `['3', '12']`, `True`, then `a#b##`.

~~~exercice
type: predict
description: |
  What does this code display?
code: |
  import re
  print(re.findall(r"\d", "a1b22"))
  print(re.findall(r"\d+", "a1b22"))
  print(re.findall(r"[aeiou]", "python"))
  print(re.fullmatch(r"\w+", "hello") is not None)
  print(re.fullmatch(r"\w+", "hel lo") is not None)
hints:
  - "`\\d+` takes all consecutive digits at once; `\\w` doesn't match a space."
~~~

~~~exercice
type: write
description: |
  Complete the function `is_postcode(text)` so that it returns `True` if `text` is made of **exactly 5 digits**, and `False` otherwise.
  Use `re.fullmatch`.

  Examples:
  - `is_postcode("75001")` returns `True`
  - `is_postcode("7500")` returns `False`
  - `is_postcode("75A01")` returns `False`
template: |
  import re

  def is_postcode(text):
      # Write your code here
      pass
solution: |
  import re

  def is_postcode(text):
      return re.fullmatch(r"\d{5}", text) is not None
hints:
  - "The pattern `\\d{5}` matches 5 digits."
tests:
  - input: ["75001"]
    expected: true
    description: "Five digits"
  - input: ["7500"]
    expected: false
    description: "Four digits"
  - input: ["75A01"]
    expected: false
    description: "With a letter"
  - input: ["750011"]
    expected: false
    description: "Six digits"
~~~

~~~exercice
type: write
description: |
  Complete the function `hide_digits(text)` so that it returns `text` with **each digit** replaced by `*`, using `re.sub`.

  Examples:
  - `hide_digits("Code: 1234")` returns `"Code: ****"`
  - `hide_digits("abc")` returns `"abc"`
template: |
  import re

  def hide_digits(text):
      # Write your code here
      pass
solution: |
  import re

  def hide_digits(text):
      return re.sub(r"\d", "*", text)
hints:
  - "`re.sub(pattern, replacement, text)` with the pattern of a digit."
tests:
  - input: ["Code: 1234"]
    expected: "Code: ****"
    description: "hide_digits(\"Code: 1234\")"
  - input: ["abc"]
    expected: "abc"
    description: "No digit"
  - input: ["a1b2"]
    expected: "a*b*"
    description: "Mixed digits"
~~~

## Common pitfalls

- Opening with `"w"` a file you wanted to complete: its content is erased. To add, use `"a"`.
- Forgetting `"\n"` with `write`: everything is written on a single line.
- Forgetting that lines read keep their `"\n"`: use `strip()`.
- Forgetting to convert with `int` the numbers read from a file.
- Forgetting the `r` before a regex pattern: `"\d"` may be misread.
