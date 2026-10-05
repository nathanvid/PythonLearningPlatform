# CLAUDE.md

Plateforme d'apprentissage Python pour élèves : backend FastAPI + frontend statique (Monaco editor). Tout le contenu (code, exercices, messages) est en français.

## Commandes

- Lancer le serveur : `uv run main.py` (http://localhost:8000)
- Tests : `uv run pytest`
- Ajouter une dépendance : `uv add <pkg>` (dev : `uv add --dev <pkg>`) — ne pas recréer de `requirements.txt`

## Architecture

- `main.py` — app FastAPI : sert `static/`, charge les exercices YAML (mis en cache en mémoire), expose `/api/categories`, `/api/exercise/{id}`, `/api/run`.
- `runner.py` — `CodeRunner` lance `harness.py` dans un subprocess (`sys.executable`), avec un dossier temporaire comme `cwd`, timeout de 3 s, et passe `{code, tests}` en JSON via stdin.
- `harness.py` — exécute le code élève (`exec`), capture ses `print()`, appelle la **dernière fonction définie au niveau module** avec `test.input` et compare à `test.expected`. Sortie JSON sur stdout.
- `models.py` — modèles Pydantic (`Exercise`, `Test`, `RunResponse`…).
- `static/` — `index.html`, `app.js` (progression stockée en `localStorage`), `style.css`.

## Exercices

`exercises/<NN_categorie>/<NN_nom>.yaml` — le préfixe numérique du dossier fixe l'ordre et est retiré pour l'affichage. Champs : `id` (unique, globalement), `title`, `description`, `template`, `hints`, `tests` (`input` = liste d'arguments, `expected`, `description`, `hidden`). Pour une classe (POO), le template doit finir par une fonction qui l'utilise, car seule la dernière fonction `def` de niveau module est testée.

## Portabilité (macOS / Linux / Windows)

- Jamais de chemin absolu : tout est relatif à `Path(__file__).parent`.
- Subprocess en UTF-8 forcé (`encoding="utf-8"`, `PYTHONUTF8=1`) — Windows est en cp1252 par défaut.
- La CI (`.github/workflows/ci.yml`) teste sur les 3 OS avec Python 3.10 et 3.13.
