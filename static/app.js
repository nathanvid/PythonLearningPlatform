// Traductions de l'interface (le contenu des exercices est traduit côté serveur)
const TRANSLATIONS = {
    fr: {
        globalScore: 'Score Global',
        welcomeTitle: 'Bienvenue sur la plateforme d\'apprentissage Python',
        welcomeText: 'Sélectionnez un exercice dans le menu à gauche pour commencer.',
        prev: '◀ Précédent',
        next: 'Suivant ▶',
        showHint: '💡 Voir un indice',
        hideHints: '👁️ Cacher les indices',
        showHints: '👁️ Afficher les indices',
        editor: 'Éditeur Python',
        run: '▶ Tester mon code',
        running: '⏳ Exécution...',
        results: 'Résultats des tests',
        exercisePosition: (i, n) => `Exercice ${i} / ${n}`,
        hint: 'Indice',
        hiddenTest: 'Test caché',
        hiddenBadge: '🔒 Caché',
        hiddenMismatch: 'Le résultat obtenu ne correspond pas à ce qui était attendu.',
        test: 'Test',
        input: 'Entrée',
        expected: 'Attendu',
        actual: 'Obtenu',
        error: 'Erreur',
        allPassed: '🎉 Félicitations ! Tous les tests sont réussis !',
        runFailed: 'Erreur lors de l\'exécution du code',
        completed: '✓ Complété',
        inProgress: 'En cours',
        notStarted: 'Pas commencé',
    },
    en: {
        globalScore: 'Overall Score',
        welcomeTitle: 'Welcome to the Python learning platform',
        welcomeText: 'Pick an exercise from the menu on the left to get started.',
        prev: '◀ Previous',
        next: 'Next ▶',
        showHint: '💡 Show a hint',
        hideHints: '👁️ Hide hints',
        showHints: '👁️ Show hints',
        editor: 'Python Editor',
        run: '▶ Test my code',
        running: '⏳ Running...',
        results: 'Test results',
        exercisePosition: (i, n) => `Exercise ${i} / ${n}`,
        hint: 'Hint',
        hiddenTest: 'Hidden test',
        hiddenBadge: '🔒 Hidden',
        hiddenMismatch: 'The result does not match what was expected.',
        test: 'Test',
        input: 'Input',
        expected: 'Expected',
        actual: 'Got',
        error: 'Error',
        allPassed: '🎉 Congratulations! All tests passed!',
        runFailed: 'Error while running the code',
        completed: '✓ Completed',
        inProgress: 'In progress',
        notStarted: 'Not started',
    },
};

// Messages d'erreur produits par runner.py / harness.py (toujours en français)
const SERVER_MESSAGES_EN = [
    [/^Erreur d'exécution$/, 'Runtime error'],
    [/^Aucune fonction trouvée dans le code$/, 'No function found in the code'],
    [/^Aucune sortie du programme$/, 'The program produced no output'],
    [/^Timeout: le code a pris plus de (\S+) secondes$/, 'Timeout: the code took more than $1 seconds'],
    [/^Erreur interne: /, 'Internal error: '],
    [/^Erreur serveur: /, 'Server error: '],
];

function loadLang() {
    const saved = localStorage.getItem('pythonLearningLang');
    return saved in TRANSLATIONS ? saved : 'fr';
}

function t(key, ...args) {
    const value = TRANSLATIONS[lang][key];
    return typeof value === 'function' ? value(...args) : value;
}

function translateServerMessage(message) {
    if (!message || lang === 'fr') return message;
    for (const [pattern, replacement] of SERVER_MESSAGES_EN) {
        if (pattern.test(message)) return message.replace(pattern, replacement);
    }
    return message;
}

// Traduire les éléments statiques de la page (attribut data-i18n)
function applyStaticTranslations() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    const toggleBtn = document.getElementById('toggleHintsBtn');
    const hintsHidden = document.getElementById('hintsContainer').style.display === 'none';
    toggleBtn.textContent = hintsHidden ? t('showHints') : t('hideHints');
}

// Changer de langue : recharger les exercices et l'exercice courant
async function setLang(newLang) {
    if (newLang === lang || !(newLang in TRANSLATIONS)) return;
    lang = newLang;
    localStorage.setItem('pythonLearningLang', lang);
    applyStaticTranslations();
    await loadCategories();
    if (currentExercise) {
        await loadExercise(currentExercise.id);
    }
}

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
let lang = loadLang();  // Langue de l'interface et des exercices

// Initialisation
document.addEventListener('DOMContentLoaded', async () => {
    applyStaticTranslations();
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
        const response = await fetch(`/api/categories?lang=${lang}`);
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
        const response = await fetch(`/api/exercise/${exerciseId}?lang=${lang}`);
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
        hintsContainer.style.display = 'block';
        document.getElementById('toggleHintsBtn').style.display = 'none';
        document.getElementById('toggleHintsBtn').textContent = t('hideHints');

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
        t('exercisePosition', currentExerciseIndex + 1, allExercises.length);

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
        hintDiv.innerHTML = `💡 <strong>${t('hint')} ${currentHintIndex + 1}:</strong> ${currentExercise.hints[currentHintIndex]}`;
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
        toggleBtn.textContent = t('hideHints');
    } else {
        hintsContainer.style.display = 'none';
        toggleBtn.textContent = t('showHints');
    }
}

// Exécuter le code
async function runCode() {
    if (!currentExercise) return;

    const code = editor.getValue();
    const runBtn = document.getElementById('runBtn');

    // Désactiver le bouton pendant l'exécution
    runBtn.disabled = true;
    runBtn.textContent = t('running');

    try {
        const response = await fetch('/api/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: code,
                exercise_id: currentExercise.id,
                lang: lang
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
        alert(t('runFailed'));
    } finally {
        runBtn.disabled = false;
        runBtn.textContent = t('run');
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
            <div class="result-header">❌ ${escapeHtml(translateServerMessage(result.error))}</div>
            ${result.traceback ? `<pre class="traceback">${escapeHtml(result.traceback)}</pre>` : ''}
        `;
        resultsContainer.appendChild(errorDiv);
        return;
    }

    // Résultats des tests
    result.tests.forEach((test, index) => {
        const testDiv = document.createElement('div');
        testDiv.className = `result-item ${test.passed ? 'result-success' : 'result-failure'}`;

        const description = currentExercise?.tests[index]?.description ?? test.description;
        const error = translateServerMessage(test.error);
        let content = '';

        // Si c'est un test caché, n'afficher que le statut
        if (test.hidden) {
            content = `
                <div class="result-header">
                    <span class="result-icon">${test.passed ? '✓' : '✗'}</span>
                    <span>${t('hiddenTest')}${description ? ': ' + description : ''}</span>
                    <span class="hidden-badge">${t('hiddenBadge')}</span>
                </div>
            `;

            // Si le test caché a échoué, donner un indice minimal
            if (!test.passed && !test.error) {
                content += `
                    <div class="result-details">
                        <div class="hidden-hint">${t('hiddenMismatch')}</div>
                    </div>
                `;
            } else if (test.error) {
                content += `
                    <div class="result-error-detail">
                        <strong>${t('error')}:</strong> ${escapeHtml(error)}
                    </div>
                `;
            }
        } else {
            // Test visible : afficher tous les détails
            content = `
                <div class="result-header">
                    <span class="result-icon">${test.passed ? '✓' : '✗'}</span>
                    <span>${t('test')} ${index + 1}${description ? ': ' + description : ''}</span>
                </div>
                <div class="result-details">
                    <div><strong>${t('input')}:</strong> ${formatValue(test.input)}</div>
                    <div><strong>${t('expected')}:</strong> ${formatValue(test.expected)}</div>
                    <div><strong>${t('actual')}:</strong> ${formatValue(test.actual)}</div>
                </div>
            `;

            if (test.error) {
                content += `
                    <div class="result-error-detail">
                        <strong>${t('error')}:</strong> ${escapeHtml(error)}
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
        successDiv.textContent = t('allPassed');
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
        statusElement.textContent = t('completed');
        statusElement.className = 'status-badge status-completed';
    } else if (exerciseProgress.score > 0) {
        statusElement.textContent = t('inProgress');
        statusElement.className = 'status-badge status-in-progress';
    } else {
        statusElement.textContent = t('notStarted');
        statusElement.className = 'status-badge status-not-started';
    }
}

// Sauvegarder le code
function saveCode(exerciseId, code) {
    if (!progress[exerciseId]) {
        progress[exerciseId] = { code: '', score: 0, completed: false };
    }
    // Code identique au template : rien à garder, pour afficher le template de la langue courante
    progress[exerciseId].code = code === currentExercise?.template ? '' : code;
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
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
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
