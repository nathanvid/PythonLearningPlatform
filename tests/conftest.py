import sys
from pathlib import Path

# Rendre les modules à la racine du projet importables (main, runner, models)
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
