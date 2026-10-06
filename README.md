# Plateforme d'apprentissage Python

🇫🇷 Français · [🇬🇧 English](README.en.md)

Bienvenue ! Cette plateforme te permet d'apprendre Python en résolvant des exercices interactifs.

## Démarrage rapide

### 1. Installer uv

Le projet utilise [uv](https://docs.astral.sh/uv/) pour gérer Python et les dépendances.

- **macOS / Linux** :
  ```bash
  curl -LsSf https://astral.sh/uv/install.sh | sh
  ```
- **Windows** (PowerShell) :
  ```powershell
  powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
  ```

### 2. Lancer la plateforme

```bash
uv run main.py
```

uv installe automatiquement la bonne version de Python et les dépendances au premier lancement.

### 3. Ouvrir dans ton navigateur

Va sur : **http://localhost:8000**

C'est tout !

## Comment ça marche ?

1. **Choisis une catégorie** dans le menu à gauche
2. **Clique sur un exercice** pour le commencer
3. **Écris ton code** dans l'éditeur (coloration syntaxique automatique)
4. **Clique sur "Tester mon code"** pour vérifier ta solution
5. **Regarde les résultats** :
   - ✅ Vert = test réussi
   - ❌ Rouge = test échoué (avec détails)
   - 🔒 Tests cachés = surprise pour vérifier que tu n'as pas triché 😉

## 🌍 Langue

Les exercices et l'interface existent en **français** et en **anglais** : utilise le bouton **FR / EN** en haut du menu. Ton code et ta progression sont conservés quand tu changes de langue.

## 💡 Astuces

- **Lis bien la description** de chaque exercice avant de commencer
- **Utilise les indices** si tu es bloqué (bouton "Voir un indice")
- **Lis les tracebacks** quand il y a une erreur - ils t'expliquent ce qui ne va pas
- **Ton code est sauvegardé automatiquement** dans le navigateur
- **Tu peux importer des modules** Python standards (math, random, datetime, etc.)

## Progression

- Chaque exercice a un **score en pourcentage** (basé sur les tests réussis)
- Un exercice est **complété** quand **tous les tests passent** (100%)
- Tu peux voir ton **score global** et par **catégorie** dans le menu

## Les 9 catégories d'exercices

1. **Bases** - Variables, conditions, boucles (6 exercices)
2. **Listes** - Manipuler des listes + list comprehensions (7 exercices)
3. **Dictionnaires** - Travailler avec des dicts (4 exercices)
4. **Fonctions** - Créer et utiliser des fonctions (6 exercices)
5. **Algorithmie** - Algorithmes classiques (4 exercices)
6. **POO** - Programmation Orientée Objet (3 exercices)
7. **Exceptions** - Gérer les erreurs avec try/except (4 exercices)
8. **Strings** - Manipulation avancée de texte (3 exercices)
9. **Modules** - Utiliser math, random, datetime, json (4 exercices)

## ⚠️ En cas de problème

### La page ne se charge pas

- Vérifie que le serveur tourne (tu dois voir un message dans le terminal)
- Assure-toi d'utiliser **http://localhost:8000** (pas https)

### Les tests ne marchent pas

- Vérifie qu'il n'y a pas d'erreur de syntaxe dans ton code
- Regarde le traceback en bas pour comprendre l'erreur
- Relis bien la consigne de l'exercice

### Je veux recommencer à zéro

Ouvre la console du navigateur (F12) et tape :

```javascript
localStorage.clear();
```

Puis rafraîchis la page (F5).

## 🛑 Arrêter la plateforme

Dans le terminal où tu as lancé `uv run main.py`, appuie sur **Ctrl+C**.

---

**Bon apprentissage !** 🚀

Si tu as des questions, demande à ton prof 😊
