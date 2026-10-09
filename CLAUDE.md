# CLAUDE.md

Plateforme d'apprentissage Python pour élèves : backend FastAPI + frontend statique (Monaco editor). Tout le contenu (code, exercices, messages) est en français.

## Commandes

- Lancer le serveur : `uv run main.py` (http://localhost:8000)
- Tests : `uv run pytest`
- Ajouter une dépendance : `uv add <pkg>` (dev : `uv add --dev <pkg>`) — ne pas recréer de `requirements.txt`

## Architecture

- `main.py` — app FastAPI : sert `static/`, charge les exercices YAML (mis en cache en mémoire), expose `/api/categories`, `/api/exercise/{id}`, `/api/run`.
- `runner.py` — `CodeRunner` lance `harness.py` dans un subprocess (`sys.executable`), avec un dossier temporaire comme `cwd`, timeout de 3 s, et passe `{code, tests}` en JSON via stdin.
- `harness.py` — exécute le code élève (`exec`), capture ses `print()`, appelle la **dernière fonction définie au niveau module** avec `test.input` et compare à `test.expected` (`normalize()` met la valeur renvoyée sous sa forme JSON : tuples → listes, clés de dictionnaire → texte). Sortie JSON sur stdout. En cas d'erreur, renvoie `error_type`, `lineno` et un traceback limité au code élève ; si un test échoue sans exception, `diagnose()` repère une erreur de débutant (`print_not_return`, `returns_none`, `wrong_type`, `float_precision`, `no_function`).
- `feedback.py` — explications pédagogiques FR/EN par type d'exception (`ERROR_EXPLANATIONS`) et par diagnostic (`DIAGNOSTICS`) ; `explain()` ajoute le champ `feedback` dans `/api/run`. Le frontend l'affiche au-dessus du traceback (replié) et souligne la ligne fautive dans Monaco.
- `models.py` — modèles Pydantic (`Exercise`, `Test`, `RunResponse`…).
- `static/` — `index.html`, `app.js` (progression et langue stockées en `localStorage`), `style.css`. `marked` et `DOMPurify` (rendu des leçons) doivent être chargés **avant** le loader AMD de Monaco. Le serveur renvoie `Cache-Control: no-cache` sur `/` et `/static/` pour éviter de mélanger anciens et nouveaux fichiers.
- Interface (`static/`) : fond blanc, couleurs de Python (bleu `#3776ab`, jaune `#ffd43b`) en variables CSS dans `:root`, police Atkinson Hyperlegible Next / Mono, thème Monaco clair `atelier`, icônes SVG au trait (`ICON_PATHS`) et pas d'emoji dans les textes d'interface. Accueil = `renderDashboard()` (reprendre, résumé, tableau des chapitres). Au-dessus d'une leçon ou d'un exercice, `#chapterBar` affiche le fil d'Ariane et une tuile par élément du chapitre ; précédent / suivant suivent `navSequence()` (leçon puis exercices de chaque chapitre). Raccourcis : Ctrl/⌘+Entrée teste, Alt+←/→ navigue.
- Révision espacée (`app.js`) : après la première réussite, un exercice revient dans « À revoir aujourd'hui » après 1, 3, 7 puis 21 jours (`REVIEW_INTERVALS`, 5 par jour maximum) ; une révision réussie après un échec repart à 1 jour. En révision, l'exercice repart du template et un échec ne fait pas perdre la réussite.

## Exercices

`exercises/<NN_categorie>/<NN_nom>.yaml` — le préfixe numérique du dossier fixe l'ordre et est retiré pour l'affichage. Champs : `id` (unique, globalement), `title`, `description`, `template`, `hints`, `tests` (`input` = liste d'arguments, `expected`, `description`, `hidden`). Pour une classe (POO), le template doit finir par une fonction qui l'utilise, car seule la dernière fonction `def` de niveau module est testée. `data_files` (chemins relatifs au projet) copie des fichiers dans le dossier d'exécution, ex. `exercises/15_fichiers_regex/data/`. L'énoncé (`description`) est rendu en Markdown : entourer de backticks ce qui contient `__`, `<…>` ou `_` en série (`` `__init__` ``).

Progression : les catégories 01 à 06 (print et variables, types, calculs, conditions, boucle for, boucle while) n'utilisent **aucune fonction** : leurs exercices sont des `output`, `predict` et des `fix` / `parsons` sans tests. Les fonctions arrivent en 07 ; à partir de là, les exercices `write` testent une fonction. Ne pas utiliser dans un exercice une notion vue dans une catégorie suivante.

Rédaction des exercices : énoncé précis (noms de variables imposés, affichage attendu exact dans un bloc ```` ```text ```` pour les `output`, exemples d'appels et de valeurs renvoyées pour les `write`) et **un seul indice** (deux au maximum pour un exercice difficile). Les leçons avancent une idée par étape, avec un exercice intégré dès que l'élève a de quoi s'entraîner.

Chaque dossier de catégorie contient une leçon `lecon.md` (FR) et `lecon.en.md` (EN) en Markdown, renvoyée dans `Category.lesson`. Elle commence par `# Titre` ; ses blocs ```` ```python ```` sont exécutés par les tests et ne doivent pas lever d'erreur. Une leçon peut contenir des exercices interactifs : un bloc `~~~exercice` (de préférence à ```` ```exercice ````, pour que l'énoncé puisse contenir des blocs ```` ```text ````) contenant du YAML (`type` parmi `predict`, `output`, `write`, `fix`, puis `description`, `code`/`template`, `solution`, `hints`, `tests`). `main.parse_lesson()` les remplace par `<div class="lesson-exercise" data-exercise-id="<catégorie>-ex<n>">` (id selon l'ordre des blocs, identique en FR et EN) ; ils sont servis par `/api/exercise` et `/api/run` mais n'apparaissent ni dans la barre latérale ni dans le score. Les tests vérifient qu'aucun bloc n'est perdu, que FR et EN ont les mêmes exercices, que les solutions sont justes et que les templates ne le sont pas déjà.

### Types d'exercices (`type:`, défaut `write`)

Approche PRIMM : dans chaque catégorie, les exercices guidés passent avant l'écriture libre (fichiers `00a_predire_*`, `00b_puzzle_*`, `00c_debug_*`). Un `fix` ou un `parsons` **sans `tests`** est corrigé comme un `output` (comparaison de l'affichage avec celui de `solution`, `checks` possibles) : c'est `Exercise.checks_output()`, et `checksOutput()` côté frontend.

- `write` — écrire la fonction à partir du `template`.
- `fix` — le `template` contient un bug ; `solution` obligatoire. Les tests vérifient que la solution passe et que le template échoue.
- `predict` — l'élève prédit ce qu'affiche `code` (pas de `tests`, pas de `template`). `/api/run` exécute `code` (harness en mode `output`) et compare ligne à ligne avec `answer` ; la sortie réelle n'est renvoyée que si la réponse est juste ou si `reveal: true`. `steps` (optionnel) : liste de codes intermédiaires à prédire avant `code`, chacun un programme complet qui s'allonge (`step` dans `/api/run`) ; le frontend remplace le code étape par étape en surlignant les lignes nouvelles, et seule la dernière étape termine l'exercice (en révision, on refait directement la dernière).
- `output` — écrire un petit programme (sans fonction) ; `/api/run` compare ce qu'il affiche à ce qu'affiche `solution`. Idéal avant que les fonctions soient vues. Comme un simple `print` de la réponse suffirait, ajouter `checks` (`checks.py`, jamais envoyé au client) : `variables` (valeur finale attendue, ex. `ville: "Paris"`), `uses` (noms qui doivent être lus dans le code) et `constructs` (`if`, `elif`, `else`, `and`, `or`, `not`, `+=`, `for`, `while`, `def`, `return`). Les noms de variables changeant en anglais, traduire aussi `checks` dans le bloc `en:`. Les tests vérifient que la solution respecte ses checks et qu'un `print` recopiant l'affichage attendu est refusé.
- `parsons` — remettre dans l'ordre les lignes de `solution` (indentation fournie). `solution` n'est jamais envoyée au client (`Field(exclude=True)`) ; `/api/exercise/{id}` renvoie `lines`, mélangées. Le code assemblé passe par les tests normaux.

`tests/test_exercises.py::validate()` vérifie chaque exercice, YAML ou intégré à une leçon, en FR et en EN : la solution passe (tests ou affichage + checks), le template n'est pas déjà juste, un `print` recopiant l'affichage est refusé quand il y a des `checks`, et chaque étape d'un `predict` s'exécute.

### Traductions (FR / EN)

Dans les contenus FR comme EN, les **noms dans le code** (variables, fonctions, paramètres, classes, attributs) sont en anglais ; seuls les textes entre guillemets, les commentaires et les explications sont traduits. Pas d'émoji dans l'interface ni dans les contenus (les symboles ✓ / ✗ / ○ restent).

Le français est la langue de base. Chaque YAML a un bloc `en:` (`title`, `description`, `template`, `hints`, `tests`, et selon le type `code` / `solution`) ; `en.tests` est aligné sur `tests` : chaque élément est soit la description traduite, soit un dict de champs remplacés (`input`/`expected` quand la sortie attendue est du texte en français). `main.localize()` applique la traduction ; l'API prend `?lang=fr|en` (et `lang` dans `/api/run`). Les noms de catégories traduits sont dans `CATEGORY_NAMES` (`main.py`), les textes d'interface dans `TRANSLATIONS` (`static/app.js`). `tests/test_exercises.py` vérifie que chaque exercice a sa traduction complète.

## Portabilité (macOS / Linux / Windows)

- Jamais de chemin absolu : tout est relatif à `Path(__file__).parent`.
- Subprocess en UTF-8 forcé (`encoding="utf-8"`, `PYTHONUTF8=1`) — Windows est en cp1252 par défaut.
- La CI (`.github/workflows/ci.yml`) teste sur les 3 OS avec Python 3.10 et 3.13.
