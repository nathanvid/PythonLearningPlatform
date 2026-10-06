# Python Learning Platform

[🇫🇷 Français](README.md) · 🇬🇧 English

Welcome! This platform lets you learn Python by solving interactive exercises.

## Quick start

### 1. Install uv

The project uses [uv](https://docs.astral.sh/uv/) to manage Python and its dependencies.

- **macOS / Linux**:
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```
- **Windows** (PowerShell):
  ```powershell
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
  ```

### 2. Start the platform

```bash
uv run main.py
```

uv automatically installs the right Python version and the dependencies the first time you run it.

### 3. Open it in your browser

Go to: **http://localhost:8000**

That's it!

## How does it work?

1. **Pick a category** in the menu on the left
2. **Click an exercise** to start it
3. **Write your code** in the editor (automatic syntax highlighting)
4. **Click "Test my code"** to check your solution
5. **Look at the results**:
   - ✅ Green = test passed
   - ❌ Red = test failed (with details)
   - 🔒 Hidden tests = a surprise to make sure you didn't cheat 😉

## 🌍 Language

The exercises and the interface are available in **French** and **English**: use the **FR / EN** button at the top of the menu. Your code and your progress are kept when you switch languages.

## 💡 Tips

- **Read each exercise's description carefully** before you start
- **Use the hints** if you're stuck ("Show a hint" button)
- **Read the tracebacks** when there's an error - they tell you what's wrong
- **Your code is saved automatically** in the browser
- **You can import standard Python modules** (math, random, datetime, etc.)

## Progress

- Each exercise has a **percentage score** (based on the tests that pass)
- An exercise is **completed** when **all tests pass** (100%)
- You can see your **overall score** and your score **per category** in the menu

## The 9 exercise categories

1. **Basics** - Variables, conditions, loops (6 exercises)
2. **Lists** - Working with lists + list comprehensions (7 exercises)
3. **Dictionaries** - Working with dicts (4 exercises)
4. **Functions** - Creating and using functions (6 exercises)
5. **Algorithms** - Classic algorithms (4 exercises)
6. **OOP** - Object-Oriented Programming (3 exercises)
7. **Exceptions** - Handling errors with try/except (4 exercises)
8. **Strings** - Advanced text manipulation (3 exercises)
9. **Modules** - Using math, random, datetime, json (4 exercises)

## ⚠️ Troubleshooting

### The page doesn't load

- Check that the server is running (you should see a message in the terminal)
- Make sure you're using **http://localhost:8000** (not https)

### The tests don't work

- Check that there's no syntax error in your code
- Look at the traceback at the bottom to understand the error
- Read the exercise instructions again carefully

### I want to start over from scratch

Open the browser console (F12) and type:

```javascript
localStorage.clear();
```

Then refresh the page (F5).

## 🛑 Stopping the platform

In the terminal where you ran `uv run main.py`, press **Ctrl+C**.

---

**Happy learning!** 🚀

If you have any questions, ask your teacher 😊
