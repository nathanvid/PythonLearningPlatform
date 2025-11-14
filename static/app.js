// Utilitaires de stockage (définis d'abord)
function loadProgress() {
    const saved = localStorage.getItem('pythonLearningProgress');
    return saved ? JSON.parse(saved) : {};
}

function saveProgress() {
    localStorage.setItem('pythonLearningProgress', JSON.stringify(progress));
}

// État global de l'application
let editor = null;
let currentExercise = null;
let categories = [];
let progress = loadProgress();
let currentHintIndex = 0;
let allExercises = [];  // Liste plate de tous les exercices
let currentExerciseIndex = -1;  // Index de l'exercice courant

// Initialisation
document.addEventListener('DOMContentLoaded', async () => {
    await initMonacoEditor();
    await loadCategories();
    setupEventListeners();
});

// Initialiser Monaco Editor
async function initMonacoEditor() {
    return new Promise((resolve) => {
        require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' } });
        require(['vs/editor/editor.main'], function () {
            editor = monaco.editor.create(document.getElementById('editor'), {
                value: '',
                language: 'python',
                theme: 'vs-dark',
                automaticLayout: true,
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
            });

            // Sauvegarder le code à chaque modification
            editor.onDidChangeModelContent(() => {
                if (currentExercise) {
                    saveCode(currentExercise.id, editor.getValue());
                }
            });

            resolve();
        });
    });
}

// Charger les catégories depuis l'API
async function loadCategories() {
    try {
        const response = await fetch('/api/categories');
        categories = await response.json();

        // Créer une liste plate de tous les exercices pour la navigation
        allExercises = [];
        categories.forEach(category => {
            category.exercises.forEach(exercise => {
                allExercises.push(exercise);
            });
        });

        renderCategories();
        updateGlobalScore();
    } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
    }
}

// Afficher les catégories dans le sidebar
function renderCategories() {
    const container = document.getElementById('categoriesContainer');
    container.innerHTML = '';

    categories.forEach(category => {
        const categoryElement = createCategoryElement(category);
        container.appendChild(categoryElement);
    });
}

// Créer un élément de catégorie avec accordion
function createCategoryElement(category) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';

    const categoryScore = calculateCategoryScore(category);
    const completedCount = category.exercises.filter(ex =>
        progress[ex.id]?.completed || false
    ).length;

    // En-tête de catégorie (cliquable)
    const header = document.createElement('div');
    header.className = 'category-header';
    header.innerHTML = `
        <span class="category-arrow">▼</span>
        <span class="category-name">${category.name}</span>
        <span class="category-score">${categoryScore}% (${completedCount}/${category.exercises.length})</span>
    `;

    // Liste des exercices
    const exercisesList = document.createElement('div');
    exercisesList.className = 'exercises-list';

    category.exercises.forEach(exercise => {
        const exerciseItem = createExerciseItem(exercise);
        exercisesList.appendChild(exerciseItem);
    });

    // Toggle accordion
    header.addEventListener('click', () => {
        const isOpen = categoryDiv.classList.toggle('open');
        header.querySelector('.category-arrow').textContent = isOpen ? '▼' : '▶';
    });

    // Ouvrir par défaut la première catégorie
    if (categories.indexOf(category) === 0) {
        categoryDiv.classList.add('open');
    }

    categoryDiv.appendChild(header);
    categoryDiv.appendChild(exercisesList);

    return categoryDiv;
}

// Créer un élément d'exercice
function createExerciseItem(exercise) {
    const div = document.createElement('div');
    div.className = 'exercise-item';

    const exerciseProgress = progress[exercise.id] || { score: 0, completed: false };
    const icon = exerciseProgress.completed ? '✓' : '□';
    const score = Math.round(exerciseProgress.score);

    div.innerHTML = `
        <span class="exercise-icon ${exerciseProgress.completed ? 'completed' : ''}">${icon}</span>
        <span class="exercise-name">${exercise.title}</span>
        <span class="exercise-item-score">${score}%</span>
    `;

    div.addEventListener('click', () => loadExercise(exercise.id));

    return div;
}

// Charger un exercice
async function loadExercise(exerciseId) {
    try {
        const response = await fetch(`/api/exercise/${exerciseId}`);
        currentExercise = await response.json();

        // Afficher la vue d'exercice
        document.getElementById('welcomeScreen').style.display = 'none';
        document.getElementById('exerciseView').style.display = 'block';

        // Remplir les informations
        document.getElementById('exerciseTitle').textContent = currentExercise.title;
        document.getElementById('exerciseDescription').innerHTML =
            currentExercise.description.replace(/\n/g, '<br>');

        // Charger le code sauvegardé ou le template
        const savedCode = progress[exerciseId]?.code || currentExercise.template;
        editor.setValue(savedCode);

        // Afficher les hints si disponibles
        currentHintIndex = 0;
        const hintsBtn = document.getElementById('showHintsBtn');
        const hintsContainer = document.getElementById('hintsContainer');
        hintsContainer.innerHTML = '';

        if (currentExercise.hints && currentExercise.hints.length > 0) {
            hintsBtn.style.display = 'block';
        } else {
            hintsBtn.style.display = 'none';
        }

        // Mettre à jour le score de l'exercice
        updateExerciseScore();

        // Restaurer les résultats des tests si disponibles
        const savedResults = progress[exerciseId]?.lastTestResults;
        if (savedResults) {
            displayResults(savedResults);
        } else {
            // Cacher les résultats si aucun test n'a été exécuté
            document.getElementById('resultsSection').style.display = 'none';
        }

        // Mettre à jour la navigation
        updateNavigation();

    } catch (error) {
        console.error('Erreur lors du chargement de l\'exercice:', error);
    }
}

// Mettre à jour les boutons de navigation
function updateNavigation() {
    if (!currentExercise) return;

    // Trouver l'index de l'exercice courant
    currentExerciseIndex = allExercises.findIndex(ex => ex.id === currentExercise.id);

    // Mettre à jour la position
    document.getElementById('exercisePosition').textContent =
        `Exercice ${currentExerciseIndex + 1} / ${allExercises.length}`;

    // Activer/désactiver les boutons
    const prevBtn = document.getElementById('prevExerciseBtn');
    const nextBtn = document.getElementById('nextExerciseBtn');

    prevBtn.disabled = currentExerciseIndex <= 0;
    nextBtn.disabled = currentExerciseIndex >= allExercises.length - 1;
}

// Navigation vers l'exercice précédent
function goToPrevExercise() {
    if (currentExerciseIndex > 0) {
        loadExercise(allExercises[currentExerciseIndex - 1].id);
    }
}

// Navigation vers l'exercice suivant
function goToNextExercise() {
    if (currentExerciseIndex < allExercises.length - 1) {
        loadExercise(allExercises[currentExerciseIndex + 1].id);
    }
}

// Afficher un indice
function showNextHint() {
    if (!currentExercise || !currentExercise.hints) return;

    if (currentHintIndex < currentExercise.hints.length) {
        const hintsContainer = document.getElementById('hintsContainer');
        const hintDiv = document.createElement('div');
        hintDiv.className = 'hint';
        hintDiv.innerHTML = `💡 <strong>Indice ${currentHintIndex + 1}:</strong> ${currentExercise.hints[currentHintIndex]}`;
        hintsContainer.appendChild(hintDiv);
        currentHintIndex++;

        // Afficher le bouton "Cacher les indices" dès qu'il y a des indices visibles
        document.getElementById('toggleHintsBtn').style.display = 'inline-block';

        // Cacher le bouton "Voir un indice" si tous les indices sont affichés
        if (currentHintIndex >= currentExercise.hints.length) {
            document.getElementById('showHintsBtn').style.display = 'none';
        }
    }
}

// Toggle affichage des indices
function toggleHints() {
    const hintsContainer = document.getElementById('hintsContainer');
    const toggleBtn = document.getElementById('toggleHintsBtn');

    if (hintsContainer.style.display === 'none') {
        hintsContainer.style.display = 'block';
        toggleBtn.textContent = '👁️ Cacher les indices';
    } else {
        hintsContainer.style.display = 'none';
        toggleBtn.textContent = '👁️ Afficher les indices';
    }
}

// Exécuter le code
async function runCode() {
    if (!currentExercise) return;

    const code = editor.getValue();
    const runBtn = document.getElementById('runBtn');

    // Désactiver le bouton pendant l'exécution
    runBtn.disabled = true;
    runBtn.textContent = '⏳ Exécution...';

    try {
        const response = await fetch('/api/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: code,
                exercise_id: currentExercise.id
            })
        });

        const result = await response.json();
        displayResults(result);

        // Calculer et sauvegarder le score + les résultats des tests
        const score = calculateScore(result.tests);
        const completed = result.success && result.tests.every(t => t.passed);

        progress[currentExercise.id] = {
            code: code,
            score: score,
            completed: completed,
            lastTestResults: result  // Sauvegarder les résultats des tests
        };
        saveProgress();

        // Mettre à jour l'interface
        updateExerciseScore();
        updateGlobalScore();
        renderCategories();

    } catch (error) {
        console.error('Erreur lors de l\'exécution:', error);
        alert('Erreur lors de l\'exécution du code');
    } finally {
        runBtn.disabled = false;
        runBtn.textContent = '▶ Tester mon code';
    }
}

// Afficher les résultats des tests
function displayResults(result) {
    const resultsSection = document.getElementById('resultsSection');
    const resultsContainer = document.getElementById('resultsContainer');

    resultsSection.style.display = 'block';
    resultsContainer.innerHTML = '';

    // Erreur globale (syntaxe, timeout, etc.)
    if (result.error) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'result-error';
        errorDiv.innerHTML = `
            <div class="result-header">❌ ${result.error}</div>
            ${result.traceback ? `<pre class="traceback">${escapeHtml(result.traceback)}</pre>` : ''}
        `;
        resultsContainer.appendChild(errorDiv);
        return;
    }

    // Résultats des tests
    result.tests.forEach((test, index) => {
        const testDiv = document.createElement('div');
        testDiv.className = `result-item ${test.passed ? 'result-success' : 'result-failure'}`;

        let content = '';

        // Si c'est un test caché, n'afficher que le statut
        if (test.hidden) {
            content = `
                <div class="result-header">
                    <span class="result-icon">${test.passed ? '✓' : '✗'}</span>
                    <span>Test caché ${test.description ? ': ' + test.description : ''}</span>
                    <span class="hidden-badge">🔒 Caché</span>
                </div>
            `;

            // Si le test caché a échoué, donner un indice minimal
            if (!test.passed && !test.error) {
                content += `
                    <div class="result-details">
                        <div class="hidden-hint">Le résultat obtenu ne correspond pas à ce qui était attendu.</div>
                    </div>
                `;
            } else if (test.error) {
                content += `
                    <div class="result-error-detail">
                        <strong>Erreur:</strong> ${escapeHtml(test.error)}
                    </div>
                `;
            }
        } else {
            // Test visible : afficher tous les détails
            content = `
                <div class="result-header">
                    <span class="result-icon">${test.passed ? '✓' : '✗'}</span>
                    <span>Test ${index + 1}${test.description ? ': ' + test.description : ''}</span>
                </div>
                <div class="result-details">
                    <div><strong>Entrée:</strong> ${formatValue(test.input)}</div>
                    <div><strong>Attendu:</strong> ${formatValue(test.expected)}</div>
                    <div><strong>Obtenu:</strong> ${formatValue(test.actual)}</div>
                </div>
            `;

            if (test.error) {
                content += `
                    <div class="result-error-detail">
                        <strong>Erreur:</strong> ${escapeHtml(test.error)}
                    </div>
                `;
            }
        }

        testDiv.innerHTML = content;
        resultsContainer.appendChild(testDiv);
    });

    // Message de succès si tous les tests passent
    if (result.success && result.tests.every(t => t.passed)) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = '🎉 Félicitations ! Tous les tests sont réussis !';
        resultsContainer.insertBefore(successDiv, resultsContainer.firstChild);
    }
}

// Calculer le score (pourcentage de tests réussis)
function calculateScore(tests) {
    if (!tests || tests.length === 0) return 0;
    const passed = tests.filter(t => t.passed).length;
    return Math.round((passed / tests.length) * 100);
}

// Calculer le score d'une catégorie
function calculateCategoryScore(category) {
    if (!category.exercises || category.exercises.length === 0) return 0;

    let totalScore = 0;
    category.exercises.forEach(exercise => {
        totalScore += progress[exercise.id]?.score || 0;
    });

    return Math.round(totalScore / category.exercises.length);
}

// Mettre à jour le score global
function updateGlobalScore() {
    let totalExercises = 0;
    let totalScore = 0;

    categories.forEach(category => {
        category.exercises.forEach(exercise => {
            totalExercises++;
            totalScore += progress[exercise.id]?.score || 0;
        });
    });

    const globalScore = totalExercises > 0 ? Math.round(totalScore / totalExercises) : 0;

    document.getElementById('globalScore').textContent = `${globalScore}%`;
    document.getElementById('globalScoreBar').style.width = `${globalScore}%`;
}

// Mettre à jour le score de l'exercice actuel
function updateExerciseScore() {
    if (!currentExercise) return;

    const exerciseProgress = progress[currentExercise.id] || { score: 0, completed: false };
    const scoreElement = document.getElementById('exerciseScore');
    const statusElement = document.getElementById('exerciseStatus');

    scoreElement.textContent = `${Math.round(exerciseProgress.score)}%`;

    if (exerciseProgress.completed) {
        statusElement.textContent = '✓ Complété';
        statusElement.className = 'status-badge status-completed';
    } else if (exerciseProgress.score > 0) {
        statusElement.textContent = 'En cours';
        statusElement.className = 'status-badge status-in-progress';
    } else {
        statusElement.textContent = 'Pas commencé';
        statusElement.className = 'status-badge status-not-started';
    }
}

// Sauvegarder le code
function saveCode(exerciseId, code) {
    if (!progress[exerciseId]) {
        progress[exerciseId] = { code: '', score: 0, completed: false };
    }
    progress[exerciseId].code = code;
    saveProgress();
}

// Les fonctions saveProgress() et loadProgress() sont définies en haut du fichier

// Event listeners
function setupEventListeners() {
    document.getElementById('runBtn').addEventListener('click', runCode);
    document.getElementById('showHintsBtn').addEventListener('click', showNextHint);
    document.getElementById('toggleHintsBtn').addEventListener('click', toggleHints);
    document.getElementById('prevExerciseBtn').addEventListener('click', goToPrevExercise);
    document.getElementById('nextExerciseBtn').addEventListener('click', goToNextExercise);
}

// Utilitaires
function formatValue(value) {
    if (Array.isArray(value)) {
        return `[${value.join(', ')}]`;
    }
    return JSON.stringify(value);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
