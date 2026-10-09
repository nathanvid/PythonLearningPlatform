# Functions

A **function** is a piece of code that you give a **name**, so that you can reuse it as many times as you want. In this lesson: what it is for, how to create one, and how it gives back a result.

## 1. Why functions?

Imagine you have to greet three people with the same three-line message. Without a function, you copy the same lines three times: it is long, and if you want to change the message, you have to fix it in three places.

A function solves this problem: you write the lines **only once**, give them a name, and use that name whenever you need it.

You already use some without knowing it: `print`, `type`, `int` or `round` are functions written by others.

## 2. Defining a function

You create a function with the word `def` (for "define"):

```python
def say_hello():
    print("Hello!")
    print("Welcome.")
```

- `def` announces a new function;
- `say_hello` is its name (same rules as for a variable);
- the parentheses `()` and the colon `:` are mandatory;
- the lines of the function are **shifted by 4 spaces**.

Careful: this code displays **nothing**. `def` only stores the lines under a name, without running them.

## 3. Calling a function

To run the code of a function, you **call** it: write its name followed by parentheses.

```python
def say_hello():
    print("Hello!")

say_hello()
say_hello()
```

Displays `Hello!` twice. On each call, Python "jumps" into the function, runs its lines, then comes back right after the call.

~~~exercice
type: predict
description: |
  Follow Python's path line by line. What does this code display?
code: |
  def say_hello():
      print("Hello")

  print("Start")
  say_hello()
  say_hello()
  print("End")
hints:
  - "The lines of the function only run when it is called, in the order of the program."
~~~

~~~exercice
type: output
description: |
  1. Define a function `greet` (without parameters) that displays `Hello!`.
  2. Call it **twice**.

  The program must display exactly:

  ```text
  Hello!
  Hello!
  ```
template: |
  # Define the function here

  # Call it here
solution: |
  def greet():
      print("Hello!")

  greet()
  greet()
checks:
  uses: [greet]
  constructs: [def]
hints:
  - "A call is written with parentheses: `greet()`."
~~~

## 4. Parameters

A **parameter** is a value you give the function when you call it. Inside the function, it is used like a variable.

```python
def greet(name):
    print("Hello", name)

greet("Ada")
greet("Leo")
```

Displays `Hello Ada`, then `Hello Leo`. On the first call, `name` is `"Ada"`; on the second, it is `"Leo"`.

~~~exercice
type: predict
description: |
  What does this code display? Note the value of the parameter `n` on each call.
code: |
  def show_double(n):
      print(n, "->", n * 2)

  show_double(3)
  show_double(10)
hints:
  - "With `show_double(3)`, n is 3 during the whole call."
~~~

## 5. Several parameters

Parameters are separated by commas. The values are given **in the same order**.

```python
def introduce(name, age):
    print(name, "is", age, "years old")

introduce("Ada", 36)
```

Displays `Ada is 36 years old`: `name` gets `"Ada"` and `age` gets `36`.

## 6. Giving back a result: `return`

Often, you want a function to **compute** something and **give** you the result. For that, use `return`:

```python
def square(n):
    return n * n

result = square(4)
print(result)
```

Displays `16`. The call `square(4)` is **replaced** by the returned value: the line becomes `result = 16`.

~~~exercice
type: write
description: |
  Complete the function `triple(n)` so that it **returns** `n` multiplied by 3.

  Examples:
  - `triple(2)` returns `6`
  - `triple(-4)` returns `-12`
template: |
  def triple(n):
      # Write your code here
      pass
solution: |
  def triple(n):
      return n * 3
hints:
  - "Replace `pass` with a line that starts with `return`."
tests:
  - input: [2]
    expected: 6
    description: "triple(2)"
  - input: [0]
    expected: 0
    description: "triple(0)"
  - input: [-4]
    expected: -12
    description: "triple(-4)"
~~~

## 7. `return` or `print`?

They are two different things:

- `print` **displays** a value on the screen, then the value is lost;
- `return` **gives the value back** to where the call was made, so it can be used.

A function without `return` gives back a special value: `None` ("nothing").

```python
def double_print(n):
    print(n * 2)

def double_return(n):
    return n * 2

a = double_print(5)      # displays 10
b = double_return(5)     # displays nothing
print(a, b)
```

The last line displays `None 10`: `a` holds nothing, `b` really holds `10`.

~~~exercice
type: fix
description: |
  The function `double(n)` must **return** the double of `n`, for example `double(4)` must return `8`.
  It displays the right result, but doesn't return it: fix it.
template: |
  def double(n):
      print(n * 2)
solution: |
  def double(n):
      return n * 2
hints:
  - "The tests look at what the function returns, not at what it displays."
tests:
  - input: [4]
    expected: 8
    description: "double(4)"
  - input: [0]
    expected: 0
    description: "double(0)"
  - input: [-3]
    expected: -6
    description: "double(-3)"
~~~

## 8. `return` stops the function

As soon as a `return` runs, the function stops: the following lines don't run.

```python
def test():
    return 1
    print("Never displayed")

print(test())
```

Displays only `1`.

## 9. Using the result

A returned value is used like any other value: in a calculation, in a `print`, in a condition…

```python
def square(n):
    return n * n

print(square(3) + square(4))     # 9 + 16
if square(5) > 20:
    print("Big square")
```

Displays `25`, then `Big square`.

~~~exercice
type: write
description: |
  Complete the function `rectangle_area(width, height)` so that it returns the area of the rectangle (width × height).

  Examples:
  - `rectangle_area(3, 4)` returns `12`
  - `rectangle_area(10, 2)` returns `20`
template: |
  def rectangle_area(width, height):
      # Write your code here
      pass
solution: |
  def rectangle_area(width, height):
      return width * height
hints:
  - "Use both parameters in the calculation."
tests:
  - input: [3, 4]
    expected: 12
    description: "rectangle_area(3, 4)"
  - input: [10, 2]
    expected: 20
    description: "rectangle_area(10, 2)"
  - input: [5, 0]
    expected: 0
    description: "rectangle_area(5, 0)"
~~~

## 10. Conditions and loops inside a function

A function can contain everything you have learnt: conditions, loops… Just shift their lines by 4 more spaces.

```python
def sign(n):
    if n >= 0:
        return "positive"
    else:
        return "negative"

print(sign(-3))
```

Displays `negative`.

~~~exercice
type: write
description: |
  Complete the function `is_adult(age)` so that it returns `True` if `age` is greater than or equal to 18, and `False` otherwise.

  Examples:
  - `is_adult(20)` returns `True`
  - `is_adult(12)` returns `False`
template: |
  def is_adult(age):
      # Write your code here
      pass
solution: |
  def is_adult(age):
      if age >= 18:
          return True
      else:
          return False
hints:
  - "Each case of the if / else has its own `return`."
tests:
  - input: [20]
    expected: true
    description: "is_adult(20)"
  - input: [18]
    expected: true
    description: "is_adult(18)"
  - input: [12]
    expected: false
    description: "is_adult(12)"
~~~

~~~exercice
type: write
description: |
  Complete the function `sum_up_to(n)` so that it returns the sum of the numbers from 1 to `n`, computed with a `for` loop.

  Examples:
  - `sum_up_to(3)` returns `6` (1 + 2 + 3)
  - `sum_up_to(10)` returns `55`
template: |
  def sum_up_to(n):
      # Write your code here
      pass
solution: |
  def sum_up_to(n):
      total = 0
      for i in range(1, n + 1):
          total += i
      return total
hints:
  - "The `return` goes after the loop, once the sum is finished."
tests:
  - input: [3]
    expected: 6
    description: "sum_up_to(3)"
  - input: [10]
    expected: 55
    description: "sum_up_to(10)"
  - input: [1]
    expected: 1
    description: "sum_up_to(1)"
~~~

## 11. A function's variables stay inside the function

A variable created in a function exists **only** during the call. Outside, Python doesn't know it.

```python
def compute():
    result = 42
    return result

value = compute()
print(value)        # 42
```

Writing `print(result)` on the last line would cause an error: `result` only exists in `compute`. To get a value out, use `return`.

## 12. How the exercises are checked

In function exercises, you write **only the function**. The tests call it with different values and compare what it **returns** with the expected result. For example:

| Input | Expected | Got |
|---|---|---|
| `[3]` | `6` | what `triple(3)` returns |

So:

- use `return`, not `print`, to give the result;
- use the parameters, not values typed by hand: the tests try several values.

## Common pitfalls

- Defining a function without ever calling it: nothing happens.
- Forgetting the parentheses when calling: `greet` instead of `greet()`.
- Using `print` instead of `return`: the function returns `None`.
- Leaving `pass` from the template: the function returns `None`.
- Writing code after a `return` in the same block: it never runs.
