// Traductions de l'interface (le contenu des exercices est traduit côté serveur)
const TRANSLATIONS = {
    fr: {
        globalScore: 'Score Global',
        welcomeTitle: 'Bienvenue sur la plateforme d\'apprentissage Python',
        welcomeText: 'De print() aux classes, chapitre par chapitre. Chaque chapitre commence par une leçon courte, suivie d\'exercices : prédire, remettre dans l\'ordre, corriger, puis écrire. Ta progression reste dans ce navigateur.',
        shortcutRun: 'tester',
        shortcutNav: 'naviguer',
        resumeLabel: 'Reprendre ici',
        startLabel: 'Commencer',
        resumeCta: 'Continuer',
        allDoneTitle: 'Tout est terminé, bravo !',
        summaryDone: (done, total) => `${done} exercices réussis sur ${total}`,
        reviewsDue: (n) => `${n} à revoir aujourd'hui`,
        startReview: 'Réviser',
        chaptersTitle: 'Chapitres',
        chapter: (n) => `Chapitre ${n}`,
        home: 'Accueil',
        nextExercise: 'Exercice suivant',
        nextChapter: 'Chapitre suivant',
        lessonShort: 'Leçon',
        chapterPosition: (i, n) => `${i} / ${n}`,
        lessonPosition: (n) => `Leçon · ${n} exercices`,
        prev: 'Précédent',
        next: 'Suivant',
        showHint: 'Voir un indice',
        hideHints: 'Cacher les indices',
        showHints: 'Afficher les indices',
        running: 'Exécution…',
        results: 'Résultats des tests',
        exercisePosition: (i, n) => `Exercice ${i} / ${n}`,
        hint: 'Indice',
        hiddenTest: 'Test caché',
        hiddenBadge: 'Caché',
        hiddenMismatch: 'Le résultat obtenu ne correspond pas à ce qui était attendu.',
        test: 'Test',
        input: 'Entrée',
        expected: 'Attendu',
        actual: 'Obtenu',
        error: 'Erreur',
        allPassed: 'Félicitations ! Tous les tests sont réussis !',
        runFailed: 'Erreur lors de l\'exécution du code',
        completed: 'Complété',
        inProgress: 'En cours',
        notStarted: 'Pas commencé',
        explanation: 'Explication',
        atLine: (n) => `ligne ${n}`,
        technicalDetails: 'Voir le détail technique',
        typeBadge: { fix: 'Débogage', predict: 'Prédire', parsons: 'Puzzle', output: 'Affichage' },
        workspace: { write: 'Éditeur Python', fix: 'Éditeur Python', predict: 'Code à lire', parsons: 'Remets les lignes dans l\'ordre', output: 'Éditeur Python' },
        runLabel: { write: 'Tester mon code', fix: 'Tester mon code', predict: 'Vérifier ma prédiction', parsons: 'Tester cet ordre', output: 'Tester mon code' },
        lxPractice: 'À toi de jouer',
        lxPredict: 'Prédis l\'affichage',
        lxRun: 'Vérifier',
        lxCorrect: 'Bravo, c\'est juste !',
        lxWrong: 'Pas encore…',
        lxAnswerPlaceholder: 'Écris ici ce que le code va afficher',
        lxYourOutput: 'Ton programme affiche :',
        predictLabel: 'Qu\'affiche ce code ? Écris la sortie exacte, ligne par ligne :',
        predictCorrect: 'Bonne prédiction !',
        predictWrong: 'Ce n\'est pas tout à fait ça.',
        realOutput: 'Sortie réelle',
        yourAnswer: 'Ta réponse',
        revealOutput: 'Exécuter le code pour voir la vraie sortie',
        attemptsLeft: (n) => `Réessaie ! Il te reste ${n} essai${n > 1 ? 's' : ''} avant de pouvoir voir la vraie sortie.`,
        predictStep: (i, n) => `Étape ${i} / ${n}`,
        stepNewLines: 'Les lignes surlignées sont nouvelles.',
        stepCorrect: 'Bien vu ! À l\'étape suivante, le code s\'allonge.',
        nextStep: 'Étape suivante',
        prevStep: 'Étape précédente',
        moveUp: 'Monter la ligne',
        moveDown: 'Descendre la ligne',
        lesson: 'Leçon',
        showLesson: 'Revoir la leçon',
        startExercises: 'Commencer les exercices',
        reviewTitle: (n) => `À revoir aujourd'hui (${n})`,
        reviewBadge: 'Révision',
        reviewIntro: 'Révision : refais cet exercice de mémoire, sans regarder ta solution précédente. Le revoir à intervalles de plus en plus longs t\'aide à le retenir.',
        reviewNext: (n) => `Révision réussie ! Prochaine révision dans ${n} jour${n > 1 ? 's' : ''}.`,
        reviewMastered: 'Exercice acquis : plus besoin de le réviser !',
        reviewRetry: 'Réussi après quelques essais : tu le reverras demain pour bien le fixer.',
    },
    en: {
        globalScore: 'Overall Score',
        welcomeTitle: 'Welcome to the Python learning platform',
        welcomeText: 'From print() to classes, one chapter at a time. Each chapter starts with a short lesson, followed by exercises: predict, reorder, fix, then write. Your progress stays in this browser.',
        shortcutRun: 'run',
        shortcutNav: 'navigate',
        resumeLabel: 'Pick up where you left off',
        startLabel: 'Get started',
        resumeCta: 'Continue',
        allDoneTitle: 'All done, well played!',
        summaryDone: (done, total) => `${done} of ${total} exercises solved`,
        reviewsDue: (n) => `${n} to review today`,
        startReview: 'Review now',
        chaptersTitle: 'Chapters',
        chapter: (n) => `Chapter ${n}`,
        home: 'Home',
        nextExercise: 'Next exercise',
        nextChapter: 'Next chapter',
        lessonShort: 'Lesson',
        chapterPosition: (i, n) => `${i} / ${n}`,
        lessonPosition: (n) => `Lesson · ${n} exercises`,
        prev: 'Previous',
        next: 'Next',
        showHint: 'Show a hint',
        hideHints: 'Hide hints',
        showHints: 'Show hints',
        running: 'Running…',
        results: 'Test results',
        exercisePosition: (i, n) => `Exercise ${i} / ${n}`,
        hint: 'Hint',
        hiddenTest: 'Hidden test',
        hiddenBadge: 'Hidden',
        hiddenMismatch: 'The result does not match what was expected.',
        test: 'Test',
        input: 'Input',
        expected: 'Expected',
        actual: 'Got',
        error: 'Error',
        allPassed: 'Congratulations! All tests passed!',
        runFailed: 'Error while running the code',
        completed: 'Completed',
        inProgress: 'In progress',
        notStarted: 'Not started',
        explanation: 'Explanation',
        atLine: (n) => `line ${n}`,
        technicalDetails: 'Show technical details',
        typeBadge: { fix: 'Debugging', predict: 'Predict', parsons: 'Puzzle', output: 'Output' },
        workspace: { write: 'Python Editor', fix: 'Python Editor', predict: 'Code to read', parsons: 'Put the lines back in order', output: 'Python Editor' },
        runLabel: { write: 'Test my code', fix: 'Test my code', predict: 'Check my prediction', parsons: 'Test this order', output: 'Test my code' },
        lxPractice: 'Your turn',
        lxPredict: 'Predict the output',
        lxRun: 'Check',
        lxCorrect: 'Well done, that\'s right!',
        lxWrong: 'Not yet…',
        lxAnswerPlaceholder: 'Write here what the code will display',
        lxYourOutput: 'Your program displays:',
        predictLabel: 'What does this code print? Write the exact output, line by line:',
        predictCorrect: 'Correct prediction!',
        predictWrong: 'Not quite.',
        realOutput: 'Real output',
        yourAnswer: 'Your answer',
        revealOutput: 'Run the code to see the real output',
        attemptsLeft: (n) => `Try again! ${n} attempt${n > 1 ? 's' : ''} left before you can see the real output.`,
        predictStep: (i, n) => `Step ${i} / ${n}`,
        stepNewLines: 'Highlighted lines are new.',
        stepCorrect: 'Well spotted! In the next step, the code gets longer.',
        nextStep: 'Next step',
        prevStep: 'Previous step',
        moveUp: 'Move line up',
        moveDown: 'Move line down',
        lesson: 'Lesson',
        showLesson: 'Review the lesson',
        startExercises: 'Start the exercises',
        reviewTitle: (n) => `To review today (${n})`,
        reviewBadge: 'Review',
        reviewIntro: 'Review: solve this exercise again from memory, without looking at your previous solution. Seeing it again at longer and longer intervals helps you remember it.',
        reviewNext: (n) => `Review passed! Next review in ${n} day${n > 1 ? 's' : ''}.`,
        reviewMastered: 'Exercise mastered: no more reviews needed!',
        reviewRetry: 'Solved after a few tries: you will see it again tomorrow to make it stick.',
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
    document.getElementById('prevExerciseBtn').setAttribute('aria-label', t('prev'));
    document.getElementById('nextExerciseBtn').setAttribute('aria-label', t('next'));
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
    if (currentView === 'welcome') {
        renderDashboard();
    } else if (currentView === 'lesson') {
        openLesson(currentLessonId);
    } else if (currentExercise) {
        await loadExercise(currentExercise.id, { review: reviewSession?.id === currentExercise.id });
    }
}

// Utilitaires de stockage (définis d'abord)
function loadProgress() {
    const saved = localStorage.getItem('pythonLearningProgress');
    const data = saved ? JSON.parse(saved) : {};
    // Exercices réussis avant l'ajout de la révision espacée : première révision demain
    for (const entry of Object.values(data)) {
        if (entry.completed && !entry.completedAt) {
            Object.assign(entry, { completedAt: todayStr(), ...scheduleNextReview(-1, true, todayStr()) });
        }
    }
    return data;
}

function saveProgress() {
    localStorage.setItem('pythonLearningProgress', JSON.stringify(progress));
}

// État global de l'application
// --- Révision espacée ---
// Après la première réussite, un exercice revient après 1 jour, puis 3, 7 et 21 jours
// à chaque révision réussie du premier coup ; il est ensuite considéré comme acquis.
const REVIEW_INTERVALS = [1, 3, 7, 21];
const MAX_REVIEWS_PER_DAY = 5;

function formatDate(date) {
    const pad = (n) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// Date locale du jour (YYYY-MM-DD) : les révisions changent à minuit chez l'élève, pas en UTC
function todayStr() {
    return formatDate(new Date());
}

function addDays(dateStr, days) {
    const date = new Date(`${dateStr}T00:00:00`);
    date.setDate(date.getDate() + days);
    return formatDate(date);
}

// Étape suivante après une réussite (stage = -1 pour la toute première réussite).
// success = réussi du premier coup ; sinon on repart de la première étape.
function scheduleNextReview(stage, success, today) {
    const next = success ? stage + 1 : 0;
    if (next >= REVIEW_INTERVALS.length) {
        return { reviewStage: next, nextReview: null };  // acquis
    }
    return { reviewStage: next, nextReview: addDays(today, REVIEW_INTERVALS[next]) };
}

let editor = null;
let currentExercise = null;
let categories = [];
let progress = loadProgress();
let currentHintIndex = 0;
let allExercises = [];  // Liste plate de tous les exercices
let openCategories = new Set();  // Chapitres dépliés dans la barre latérale
let lang = loadLang();  // Langue de l'interface et des exercices
let currentView = 'welcome';  // welcome, lesson ou exercise
let currentLessonId = null;  // Catégorie dont la leçon est affichée
let reviewSession = null;  // { id, failed } : exercice ouvert depuis « À revoir »
let predictStep = 0;  // Étape affichée d'un exercice predict (dernière = `code`)
let stepDecorations = [];  // Lignes nouvelles surlignées dans l'éditeur
let predictMaxStep = 0;  // Étape la plus avancée atteinte (les précédentes sont déjà validées)
let stepValidated = false;  // Étape intermédiaire réussie : le bouton principal passe à l'étape suivante
let predictFailures = 0;  // Essais ratés à l'étape courante (remis à zéro à chaque étape)
const MAX_PREDICT_ATTEMPTS = 3;  // Essais avant de pouvoir afficher la vraie sortie

// Exercices à revoir aujourd'hui, les plus en retard d'abord
function dueReviews() {
    const today = todayStr();
    return allExercises
        .filter(ex => progress[ex.id]?.nextReview && progress[ex.id].nextReview <= today)
        .sort((a, b) => progress[a.id].nextReview.localeCompare(progress[b.id].nextReview))
        .slice(0, MAX_REVIEWS_PER_DAY);
}

// Corrigé sur ce que le programme affiche : output, ou fix / parsons sans tests (cf. Exercise.checks_output)
function checksOutput(exercise) {
    return exercise?.type === 'output' || (['fix', 'parsons'].includes(exercise?.type) && !exercise.tests?.length);
}

// Type de l'exercice courant : write, fix, predict ou parsons
function exerciseType() {
    return currentExercise?.type || 'write';
}

// L'éditeur contient-il le code de l'élève ? (sinon : code à lire, ou puzzle)
function editsCode() {
    return ['write', 'fix', 'output'].includes(exerciseType());
}

// Initialisation
document.addEventListener('DOMContentLoaded', async () => {
    applyStaticTranslations();
    await initMonacoEditor();
    await loadCategories();
    renderDashboard();
    setupEventListeners();
});

const EDITOR_FONT = "'Atkinson Hyperlegible Mono', Menlo, Consolas, monospace";

// Thème clair de l'éditeur, aux couleurs de la page
function defineEditorTheme() {
    monaco.editor.defineTheme('atelier', {
        base: 'vs',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '6b737c', fontStyle: 'italic' },
            { token: 'keyword', foreground: '2b5d87', fontStyle: 'bold' },
            { token: 'string', foreground: '9a4a10' },
            { token: 'number', foreground: '2a7d3f' },
            { token: 'type', foreground: '6a4fa3' },
        ],
        colors: {
            'editor.background': '#ffffff',
            'editor.foreground': '#1f2328',
            'editorLineNumber.foreground': '#a3abb3',
            'editorLineNumber.activeForeground': '#3776ab',
            'editor.lineHighlightBackground': '#f6f8fa',
            'editor.lineHighlightBorder': '#f6f8fa',
            'editor.selectionBackground': '#3776ab33',
            'editorCursor.foreground': '#1f2328',
            'editorIndentGuide.background': '#e8ebee',
        },
    });
    monaco.editor.setTheme('atelier');
}

// Initialiser Monaco Editor
async function initMonacoEditor() {
    return new Promise((resolve) => {
        require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' } });
        require(['vs/editor/editor.main'], function () {
            defineEditorTheme();
            editor = monaco.editor.create(document.getElementById('editor'), {
                value: '',
                language: 'python',
                theme: 'atelier',
                fontFamily: EDITOR_FONT,
                automaticLayout: true,
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 12, bottom: 12 },
                overviewRulerLanes: 0,
                overviewRulerBorder: false,
            });
            editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
                document.getElementById('runBtn').click();
            });
            // La police est chargée après Monaco : mesurer à nouveau la largeur des caractères
            document.fonts?.load(`14px ${EDITOR_FONT}`).then(() => monaco.editor.remeasureFonts());

            // Sauvegarder le code à chaque modification
            editor.onDidChangeModelContent(() => {
                clearErrorMarkers();
                if (currentExercise && editsCode()) {
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

        if (!openCategories.size && categories.length) openCategories.add(categories[0].id);
        renderCategories();
        updateGlobalScore();
    } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
    }
}

// Afficher les catégories dans le sidebar
function renderCategories() {
    const container = document.getElementById('categoriesContainer');
    const scroll = container.scrollTop;  // garder la position : la liste est reconstruite après chaque essai
    container.innerHTML = '';

    categories.forEach(category => {
        const categoryElement = createCategoryElement(category);
        container.appendChild(categoryElement);
    });
    container.scrollTop = scroll;
    renderReviews();
}

function renderReviews() {
    const container = document.getElementById('reviewContainer');
    const due = dueReviews();
    container.style.display = due.length ? 'block' : 'none';
    container.innerHTML = `<div class="review-header">${t('reviewTitle', due.length)}</div>`;
    for (const exercise of due) {
        const item = document.createElement('button');
        item.className = 'exercise-item review-item';
        item.innerHTML = `<span class="exercise-name">${escapeHtml(exercise.title)}</span>`;
        item.addEventListener('click', () => loadExercise(exercise.id, { review: true }));
        container.appendChild(item);
    }
}

// Créer un élément de catégorie avec accordion
function createCategoryElement(category) {
    const categoryDiv = document.createElement('div');
    const number = categories.indexOf(category) + 1;
    const categoryScore = calculateCategoryScore(category);
    const completedCount = category.exercises.filter(ex =>
        progress[ex.id]?.completed || false
    ).length;
    const done = category.exercises.length > 0 && completedCount === category.exercises.length;
    categoryDiv.className = 'category';
    categoryDiv.classList.toggle('open', openCategories.has(category.id));
    categoryDiv.classList.toggle('done', done);

    // En-tête de catégorie (cliquable) : numéro, nom, progression
    const header = document.createElement('button');
    header.className = 'category-header';
    header.setAttribute('aria-expanded', openCategories.has(category.id));
    header.innerHTML = `
        <span class="category-num">${pad2(number)}</span>
        <span class="category-text">
            <span class="category-name">${escapeHtml(capitalize(category.name))}</span>
            <span class="category-progress"><i style="width: ${categoryScore}%"></i></span>
        </span>
        <span class="category-score">${completedCount}/${category.exercises.length}</span>
        ${icon('chevron').replace('class="icon"', 'class="icon category-arrow"')}
    `;

    // Liste des exercices
    const exercisesList = document.createElement('div');
    exercisesList.className = 'exercises-list';
    const inner = document.createElement('div');
    inner.className = 'exercises-inner';
    exercisesList.appendChild(inner);

    if (category.lesson) {
        const lessonItem = document.createElement('button');
        lessonItem.className = 'exercise-item lesson-item';
        lessonItem.classList.toggle('active', currentView === 'lesson' && currentLessonId === category.id);
        lessonItem.innerHTML = `<span class="exercise-icon">${icon('lesson')}</span><span class="exercise-name">${t('lesson')}</span>`;
        lessonItem.addEventListener('click', () => openLesson(category.id));
        inner.appendChild(lessonItem);
    }

    category.exercises.forEach(exercise => {
        inner.appendChild(createExerciseItem(exercise));
    });

    // Toggle accordion
    header.addEventListener('click', () => {
        const isOpen = categoryDiv.classList.toggle('open');
        header.setAttribute('aria-expanded', isOpen);
        if (isOpen) openCategories.add(category.id);
        else openCategories.delete(category.id);
    });

    categoryDiv.appendChild(header);
    categoryDiv.appendChild(exercisesList);

    return categoryDiv;
}

// Icônes au trait (viewBox 24 × 24) : type d'exercice, leçon, réussite
const ICON_PATHS = {
    write: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
    fix: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    predict: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
    parsons: '<path d="M10 6h11M10 12h11M10 18h11M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>',
    output: '<path d="m4 17 6-6-6-6M12 19h8"/>',
    lesson: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
};

function icon(name) {
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICON_PATHS[name] || ICON_PATHS.write}</svg>`;
}

// Créer un élément d'exercice
function createExerciseItem(exercise) {
    const button = document.createElement('button');
    const exerciseProgress = progress[exercise.id] || { score: 0, completed: false };
    const score = Math.round(exerciseProgress.score);
    button.className = `exercise-item ${exerciseStatus(exercise.id)}`;
    button.classList.toggle('active', currentView === 'exercise' && currentExercise?.id === exercise.id);

    button.innerHTML = `
        <span class="exercise-icon">${icon(exerciseProgress.completed ? 'check' : exercise.type || 'write')}</span>
        <span class="exercise-name">${escapeHtml(exercise.title)}</span>
        <span class="exercise-item-score">${score > 0 && !exerciseProgress.completed ? `${score}%` : ''}</span>
    `;

    button.addEventListener('click', () => loadExercise(exercise.id));

    return button;
}

// Statut d'un exercice pour les pastilles et les tuiles : completed, partial ou ''
function exerciseStatus(exerciseId) {
    const entry = progress[exerciseId];
    if (entry?.completed) return 'completed';
    return entry?.score > 0 ? 'partial' : '';
}

// Charger un exercice
async function loadExercise(exerciseId, { review = false } = {}) {
    try {
        const response = await fetch(`/api/exercise/${exerciseId}?lang=${lang}`);
        currentExercise = await response.json();

        // Révision : on repart de zéro, sans la solution précédente
        if (review) {
            if (reviewSession?.id !== exerciseId) reviewSession = { id: exerciseId, failed: false };
        } else {
            reviewSession = null;
        }
        document.getElementById('reviewBadge').style.display = review ? 'inline-block' : 'none';
        document.getElementById('reviewNotice').style.display = review ? 'block' : 'none';

        showView('exercise');
        openCategories.add(currentExercise.category);

        // Remplir les informations
        document.getElementById('exerciseTitle').textContent = currentExercise.title;
        document.getElementById('exerciseDescription').innerHTML = renderMarkdown(currentExercise.description);

        // Espace de travail selon le type (éditeur, code à lire, puzzle)
        setupWorkspace();

        // Afficher les hints si disponibles
        currentHintIndex = 0;
        const hintsBtn = document.getElementById('showHintsBtn');
        const hintsContainer = document.getElementById('hintsContainer');
        hintsContainer.innerHTML = '';
        hintsContainer.style.display = 'block';
        document.getElementById('toggleHintsBtn').style.display = 'none';
        document.getElementById('toggleHintsBtn').textContent = t('hideHints');

        if (currentExercise.hints && currentExercise.hints.length > 0) {
            hintsBtn.style.display = 'inline-flex';
        } else {
            hintsBtn.style.display = 'none';
        }

        // Mettre à jour le score de l'exercice
        updateExerciseScore();

        // Restaurer les résultats des tests si disponibles
        const savedResults = progress[exerciseId]?.lastTestResults;
        if (savedResults && !review) {
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
    const categoryId = currentView === 'lesson' ? currentLessonId : currentExercise?.category;
    const category = categories.find(c => c.id === categoryId);
    renderCategories();
    if (!category) return;

    const number = categories.indexOf(category) + 1;
    const total = category.exercises.length;
    const exerciseIndex = currentView === 'exercise'
        ? category.exercises.findIndex(ex => ex.id === currentExercise.id)
        : -1;

    // Fil d'Ariane : Accueil / 04 Conditions / titre de l'exercice
    document.getElementById('breadcrumb').innerHTML = `
        <button type="button" data-nav="home">${t('home')}</button><span>/</span>
        <button type="button" data-nav="lesson" data-id="${category.id}">
            ${pad2(number)}. ${escapeHtml(capitalize(category.name))}
        </button>
        ${currentView === 'exercise' ? `<span>/</span><span class="crumb-current">${escapeHtml(currentExercise.title)}</span>` : ''}
    `;
    document.getElementById('exercisePosition').textContent = currentView === 'lesson'
        ? t('lessonPosition', total)
        : t('chapterPosition', exerciseIndex + 1, total);

    // Piste : une tuile pour la leçon, puis une par exercice du chapitre
    const tiles = [];
    if (category.lesson) {
        tiles.push(`<li><button type="button" class="track-tile lesson-tile ${currentView === 'lesson' ? 'active' : ''}"
            data-nav="lesson" data-id="${category.id}" title="${t('lessonShort')}" aria-label="${t('lessonShort')}">${icon('lesson')}</button></li>`);
    }
    category.exercises.forEach((exercise, i) => {
        tiles.push(`<li><button type="button" class="track-tile ${exerciseStatus(exercise.id)} ${i === exerciseIndex ? 'active' : ''}"
            data-nav="exercise" data-id="${exercise.id}" title="${escapeHtml(exercise.title)}">${i + 1}</button></li>`);
    });
    const track = document.getElementById('track');
    track.innerHTML = tiles.join('');
    const active = track.querySelector('.active');
    if (active) track.scrollLeft = active.offsetLeft - track.clientWidth / 2 + active.offsetWidth / 2;

    // Précédent / suivant : tout le parcours, d'un chapitre à l'autre
    const index = currentNavIndex();
    document.getElementById('prevExerciseBtn').disabled = index <= 0;
    document.getElementById('nextExerciseBtn').disabled = index < 0 || index >= navSequence().length - 1;

    document.querySelector('.categories .exercise-item.active')?.scrollIntoView({ block: 'nearest' });
}

// Parcours complet : la leçon de chaque chapitre, puis ses exercices
function navSequence() {
    const sequence = [];
    for (const category of categories) {
        if (category.lesson) sequence.push({ kind: 'lesson', id: category.id });
        for (const exercise of category.exercises) sequence.push({ kind: 'exercise', id: exercise.id });
    }
    return sequence;
}

function currentNavIndex() {
    return navSequence().findIndex(item => currentView === 'lesson'
        ? item.kind === 'lesson' && item.id === currentLessonId
        : item.kind === 'exercise' && item.id === currentExercise?.id);
}

function openNavItem(item) {
    if (item.kind === 'lesson') openLesson(item.id);
    else loadExercise(item.id);
}

// Bouton vers la suite du parcours, affiché quand l'exercice est réussi
function nextStepButton() {
    const next = navSequence()[currentNavIndex() + 1];
    if (!next) return null;
    const button = document.createElement('button');
    button.className = 'btn-next-exercise';
    button.textContent = next.kind === 'lesson' ? t('nextChapter') : t('nextExercise');
    button.addEventListener('click', () => openNavItem(next));
    return button;
}

// Navigation vers l'exercice précédent
function goToPrevExercise() {
    const index = currentNavIndex();
    if (index > 0) openNavItem(navSequence()[index - 1]);
}

// Navigation vers l'exercice suivant
function goToNextExercise() {
    const sequence = navSequence();
    const index = currentNavIndex();
    if (index >= 0 && index < sequence.length - 1) openNavItem(sequence[index + 1]);
}

// Afficher un indice
function showNextHint() {
    if (!currentExercise || !currentExercise.hints) return;

    if (currentHintIndex < currentExercise.hints.length) {
        const hintsContainer = document.getElementById('hintsContainer');
        const hintDiv = document.createElement('div');
        hintDiv.className = 'hint';
        hintDiv.innerHTML = `<strong>${t('hint')} ${currentHintIndex + 1}:</strong> ${formatInline(currentExercise.hints[currentHintIndex])}`;
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
async function runCode(reveal = false) {
    if (!currentExercise) return;

    const runBtn = document.getElementById('runBtn');
    const type = exerciseType();
    const request = { exercise_id: currentExercise.id, lang: lang };
    if (type === 'predict') {
        request.answer = document.getElementById('predictAnswer').value;
        request.reveal = reveal;
        request.step = predictStep;
    } else {
        request.code = type === 'parsons' ? getParsonsCode() : editor.getValue();
    }

    // Désactiver le bouton pendant l'exécution
    runBtn.disabled = true;
    runBtn.textContent = t('running');

    try {
        const response = await fetch('/api/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        });

        const result = await response.json();
        if (type === 'predict') {
            result.step = predictStep;
            if (!result.success && !reveal && !result.error) predictFailures++;
        }
        displayResults(result);

        // Calculer et sauvegarder le score + les résultats des tests
        // (predict par étapes : seule la dernière étape termine l'exercice)
        const steps = type === 'predict' ? predictSteps().length : 1;
        const lastStep = type !== 'predict' || predictStep === steps - 1;
        const score = type === 'predict'
            ? Math.round((predictStep + (result.success ? 1 : 0)) / steps * 100)
            : calculateScore(result.tests);
        const completed = lastStep && result.success && result.tests.every(t => t.passed);
        const previous = progress[currentExercise.id] || {};
        const inReview = reviewSession?.id === currentExercise.id;

        const entry = {
            ...previous,  // garde l'ordre (parsons), la réponse (predict) et le planning de révision
            code: editsCode() ? request.code : '',
            // Un essai raté en révision ne fait pas perdre un exercice déjà réussi
            score: inReview ? Math.max(score, previous.score || 0) : score,
            completed: completed || (inReview && previous.completed),
            lastTestResults: result  // Sauvegarder les résultats des tests
        };
        if (type === 'predict' && !inReview) entry.attempts = predictFailures;
        if (inReview) {
            if (completed) {
                Object.assign(entry, scheduleNextReview(previous.reviewStage ?? 0, !reviewSession.failed, todayStr()));
                showReviewOutcome(entry, !reviewSession.failed);
                reviewSession = null;
            } else {
                reviewSession.failed = true;
            }
        } else if (completed && !previous.completedAt) {
            Object.assign(entry, { completedAt: todayStr(), ...scheduleNextReview(-1, true, todayStr()) });
        }
        progress[currentExercise.id] = entry;
        saveProgress();

        // Mettre à jour l'interface
        updateExerciseScore();
        updateGlobalScore();
        updateNavigation();

    } catch (error) {
        console.error('Erreur lors de l\'exécution:', error);
        alert(t('runFailed'));
    } finally {
        runBtn.disabled = false;
        updateRunButton();
    }
}

// Afficher les résultats des tests
function displayResults(result) {
    const resultsSection = document.getElementById('resultsSection');
    const resultsContainer = document.getElementById('resultsContainer');

    resultsSection.style.display = 'block';
    resultsContainer.innerHTML = '';

    clearParsonsErrors();

    if (exerciseType() === 'predict' && !result.error) {
        resultsContainer.appendChild(renderPredictResult(result));
        return;
    }
    if (checksOutput(currentExercise) && !result.error) {
        resultsContainer.innerHTML = `<div class="result-item ${result.success ? 'result-success' : 'result-failure'}">${renderOutputResult(result)}</div>`;
        const nextButton = result.success && nextStepButton();
        if (nextButton) resultsContainer.firstElementChild.appendChild(nextButton);
        return;
    }

    // Erreur globale (syntaxe, timeout, etc.)
    if (result.error) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'result-item result-error';
        errorDiv.innerHTML = `
            <div class="result-header"><span class="result-icon">✗</span> ${escapeHtml(translateServerMessage(result.error))}</div>
            ${renderFeedback(result.feedback, result.lineno)}
            ${renderTraceback(result.traceback)}
        `;
        resultsContainer.appendChild(errorDiv);
        showErrorLines([result]);
        return;
    }

    // Une même explication n'est affichée qu'une fois (sur le premier test concerné)
    const shownFeedback = new Set();
    const feedbackOnce = (test) => {
        if (!test.feedback || shownFeedback.has(test.feedback)) return '';
        shownFeedback.add(test.feedback);
        return renderFeedback(test.feedback, test.lineno);
    };

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
            if (test.feedback) {
                content += feedbackOnce(test);
            } else if (!test.passed && !test.error) {
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
                    <div><strong>${t('input')}:</strong> ${escapeHtml(formatValue(test.input))}</div>
                    <div><strong>${t('expected')}:</strong> ${escapeHtml(formatValue(test.expected))}</div>
                    <div><strong>${t('actual')}:</strong> ${escapeHtml(formatValue(test.actual))}</div>
                </div>
            `;

            if (test.error) {
                content += `
                    <div class="result-error-detail">
                        <strong>${t('error')}:</strong> ${escapeHtml(error)}
                    </div>
                `;
            }
            content += feedbackOnce(test);
            content += renderTraceback(test.traceback);
        }

        testDiv.innerHTML = content;
        resultsContainer.appendChild(testDiv);
    });

    showErrorLines(result.tests.filter(test => !test.passed));

    // Message de succès si tous les tests passent
    if (result.success && result.tests.every(t => t.passed)) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `<span>${t('allPassed')}</span>`;
        const nextButton = nextStepButton();
        if (nextButton) successDiv.appendChild(nextButton);
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
    const globalScore = globalScoreValue();
    document.getElementById('globalScore').textContent = `${globalScore}%`;
    document.getElementById('globalScoreBar').style.width = `${globalScore}%`;
}

function globalScoreValue() {
    if (!allExercises.length) return 0;
    const total = allExercises.reduce((sum, exercise) => sum + (progress[exercise.id]?.score || 0), 0);
    return Math.round(total / allExercises.length);
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
    document.getElementById('runBtn').addEventListener('click', () => stepValidated ? goToNextStep() : runCode());
    document.getElementById('prevStepBtn').addEventListener('click', goToPrevStep);
    document.getElementById('startExercisesBtn').addEventListener('click', startLessonExercises);
    document.getElementById('showLessonBtn').addEventListener('click', () => openLesson(currentExercise?.category));
    document.getElementById('predictAnswer').addEventListener('input', () => {
        savePredictAnswer();
        fitPredictAnswer();
    });
    setupParsonsEvents();
    document.getElementById('showHintsBtn').addEventListener('click', showNextHint);
    document.getElementById('toggleHintsBtn').addEventListener('click', toggleHints);
    document.getElementById('prevExerciseBtn').addEventListener('click', goToPrevExercise);
    document.getElementById('nextExerciseBtn').addEventListener('click', goToNextExercise);
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });

    // Tuiles de la piste et fil d'Ariane
    for (const id of ['track', 'breadcrumb']) {
        document.getElementById(id).addEventListener('click', (e) => {
            const target = e.target.closest('[data-nav]');
            if (!target) return;
            if (target.dataset.nav === 'home') goHome();
            else openNavItem({ kind: target.dataset.nav, id: target.dataset.id });
        });
    }
    document.getElementById('brandLink').addEventListener('click', (e) => {
        e.preventDefault();
        goHome();
    });

    // Ctrl/⌘ + Entrée : tester ; Alt + ← / → : exercice précédent / suivant
    document.addEventListener('keydown', (e) => {
        if (e.target.closest?.('.monaco-editor')) return;  // l'éditeur gère Ctrl+Entrée lui-même
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && currentView === 'exercise') {
            e.preventDefault();
            document.getElementById('runBtn').click();
        } else if (e.altKey && ['ArrowLeft', 'ArrowRight'].includes(e.key) && currentView !== 'welcome') {
            if (e.target.closest?.('textarea, input')) return;
            e.preventDefault();
            if (e.key === 'ArrowLeft') goToPrevExercise();
            else goToNextExercise();
        }
    });

    // Petit écran : la barre latérale s'ouvre par-dessus le contenu
    document.getElementById('menuToggle').addEventListener('click', () => document.body.classList.toggle('sidebar-open'));
    document.getElementById('sidebarBackdrop').addEventListener('click', () => document.body.classList.remove('sidebar-open'));
}

// --- Vues : accueil, leçon, exercice ---

function showView(view) {
    currentView = view;
    document.getElementById('welcomeScreen').style.display = view === 'welcome' ? 'block' : 'none';
    document.getElementById('lessonView').style.display = view === 'lesson' ? 'block' : 'none';
    document.getElementById('exerciseView').style.display = view === 'exercise' ? 'block' : 'none';
    document.getElementById('chapterBar').style.display = view === 'welcome' ? 'none' : 'block';
    document.querySelector('.main-content').scrollTop = 0;
    document.body.classList.remove('sidebar-open');
}

function goHome() {
    showView('welcome');
    renderDashboard();
    renderCategories();
}

// Accueil : reprendre le parcours, statistiques, révisions et chapitres
function renderDashboard() {
    const dashboard = document.getElementById('dashboard');
    const completed = allExercises.filter(ex => progress[ex.id]?.completed).length;
    const due = dueReviews();

    // Prochain exercice non réussi ; si son chapitre n'est pas commencé, on ouvre la leçon
    const next = allExercises.find(ex => !progress[ex.id]?.completed);
    const nextCategory = next && categories.find(c => c.id === next.category);
    const chapterStarted = nextCategory?.exercises.some(ex => progress[ex.id]);
    const resume = !next ? null
        : nextCategory?.lesson && !chapterStarted ? { kind: 'lesson', id: nextCategory.id }
        : { kind: 'exercise', id: next.id };
    const started = allExercises.some(ex => progress[ex.id]);

    const resumeBlock = resume ? `
        <div class="resume">
            <div>
                <div class="resume-where">${started ? t('resumeLabel') : t('startLabel')} · ${t('chapter', categories.indexOf(nextCategory) + 1)}, ${escapeHtml(capitalize(nextCategory.name))}</div>
                <div class="resume-title">${escapeHtml(resume.kind === 'lesson' ? t('lessonShort') : next.title)}</div>
            </div>
            <button class="btn-primary" id="resumeBtn">${t('resumeCta')}</button>
        </div>
    ` : `<div class="resume"><div class="resume-title">${t('allDoneTitle')}</div></div>`;

    const rows = categories.map((category, i) => {
        const done = category.exercises.filter(ex => progress[ex.id]?.completed).length;
        const total = category.exercises.length;
        return `
            <tr class="${total && done === total ? 'done' : ''}" data-id="${category.id}">
                <td class="col-num">${pad2(i + 1)}</td>
                <td class="col-name"><a href="#" data-id="${category.id}">${escapeHtml(capitalize(category.name))}</a></td>
                <td class="col-bar"><div class="bar"><i style="width: ${calculateCategoryScore(category)}%"></i></div></td>
                <td class="col-count">${done}/${total}</td>
            </tr>
        `;
    }).join('');

    dashboard.innerHTML = `
        ${resumeBlock}
        <p class="summary">
            ${t('summaryDone', completed, allExercises.length)}
            ${due.length ? ` · ${t('reviewsDue', due.length)} · <button id="startReviewBtn">${t('startReview')}</button>` : ''}
        </p>
        <h3 class="section-title">${t('chaptersTitle')}</h3>
        <table class="chapter-table"><tbody>${rows}</tbody></table>
    `;

    if (resume) dashboard.querySelector('#resumeBtn').addEventListener('click', () => openNavItem(resume));
    dashboard.querySelector('#startReviewBtn')?.addEventListener('click', () => loadExercise(due[0].id, { review: true }));
    dashboard.querySelectorAll('.chapter-table tr').forEach(row => row.addEventListener('click', (e) => {
        e.preventDefault();
        const category = categories.find(c => c.id === row.dataset.id);
        if (category.lesson) openLesson(category.id);
        else if (category.exercises.length) loadExercise(category.exercises[0].id);
    }));
}

function openLesson(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    if (!category?.lesson) return;
    currentLessonId = categoryId;
    const content = document.getElementById('lessonContent');
    content.innerHTML = DOMPurify.sanitize(marked.parse(category.lesson));
    // Coloration syntaxique des exemples avec le thème de Monaco
    content.querySelectorAll('pre code.language-python').forEach(async (code) => {
        code.innerHTML = await monaco.editor.colorize(code.textContent.replace(/\n$/, ''), 'python', {});
    });
    showView('lesson');
    openCategories.add(categoryId);
    updateNavigation();
    renderLessonExercises(content);
}

// --- Exercices intégrés aux leçons ---
let lessonEditors = [];  // Éditeurs Monaco des exercices de la leçon affichée

async function renderLessonExercises(container) {
    lessonEditors.forEach(ed => ed.dispose());
    lessonEditors = [];
    const slots = [...container.querySelectorAll('.lesson-exercise[data-exercise-id]')];
    const exercises = await Promise.all(slots.map(slot =>
        fetch(`/api/exercise/${slot.dataset.exerciseId}?lang=${lang}`).then(r => r.ok ? r.json() : null)
    ));
    slots.forEach((slot, i) => {
        if (exercises[i]) renderLessonExercise(slot, exercises[i], i + 1);
    });
}

function renderLessonExercise(slot, exercise, number) {
    const saved = progress[exercise.id] || {};
    const isPredict = exercise.type === 'predict';
    slot.innerHTML = `
        <div class="lx-header">
            <span class="lx-title">${isPredict ? t('lxPredict') : t('lxPractice')} · ${number}</span>
            <span class="lx-done">${saved.completed ? '✓' : ''}</span>
        </div>
        <div class="lx-description">${renderMarkdown(exercise.description)}</div>
        ${isPredict
            ? `<pre class="lx-code"><code></code></pre>
               <textarea class="lx-answer" rows="3" spellcheck="false" placeholder="${t('lxAnswerPlaceholder')}"></textarea>`
            : '<div class="lx-editor"></div>'}
        <div class="lx-actions">
            <button class="btn-primary lx-run">${t('lxRun')}</button>
            ${exercise.hints.length ? `<button class="btn-hint lx-hint">${t('showHint')}</button>` : ''}
        </div>
        <div class="lx-hints"></div>
        <div class="lx-result"></div>
    `;

    let lessonEditor = null;
    if (isPredict) {
        monaco.editor.colorize(exercise.code.replace(/\n$/, ''), 'python', {})
            .then(html => { slot.querySelector('.lx-code code').innerHTML = html; });
        const answer = slot.querySelector('.lx-answer');
        answer.value = saved.answer || '';
        answer.addEventListener('input', () => {
            progress[exercise.id] = { ...progress[exercise.id], answer: answer.value };
            saveProgress();
        });
    } else {
        const container = slot.querySelector('.lx-editor');
        lessonEditor = monaco.editor.create(container, {
            value: saved.code || exercise.template,
            language: 'python',
            theme: 'atelier',
            fontFamily: EDITOR_FONT,
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbersMinChars: 2,
            padding: { top: 8, bottom: 8 },
        });
        // L'éditeur grandit avec le code
        const fit = () => {
            container.style.height = `${(Math.max(4, lessonEditor.getModel().getLineCount() + 1)) * 19 + 16}px`;
            lessonEditor.layout();
        };
        fit();
        lessonEditor.onDidChangeModelContent(() => {
            fit();
            setErrorMarkers([], lessonEditor);
            progress[exercise.id] = { ...progress[exercise.id], code: lessonEditor.getValue() };
            saveProgress();
        });
        lessonEditors.push(lessonEditor);
    }

    slot.querySelector('.lx-run').addEventListener('click', () => runLessonExercise(slot, exercise, lessonEditor));
    let hintIndex = 0;
    slot.querySelector('.lx-hint')?.addEventListener('click', (e) => {
        const hint = document.createElement('div');
        hint.className = 'hint';
        hint.innerHTML = `<strong>${t('hint')} ${hintIndex + 1}:</strong> ${formatInline(exercise.hints[hintIndex])}`;
        slot.querySelector('.lx-hints').appendChild(hint);
        hintIndex++;
        if (hintIndex >= exercise.hints.length) e.target.style.display = 'none';
    });
}

async function runLessonExercise(slot, exercise, lessonEditor, reveal = false) {
    const button = slot.querySelector('.lx-run');
    const request = { exercise_id: exercise.id, lang: lang };
    if (exercise.type === 'predict') {
        request.answer = slot.querySelector('.lx-answer').value;
        request.reveal = reveal;
    } else {
        request.code = lessonEditor.getValue();
    }
    button.disabled = true;
    try {
        const response = await fetch('/api/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });
        const result = await response.json();
        if (exercise.type === 'predict' && !result.success && !reveal && !result.error) {
            slot.dataset.failures = Number(slot.dataset.failures || 0) + 1;
        }
        request.failures = Number(slot.dataset.failures || 0);
        const resultDiv = slot.querySelector('.lx-result');
        resultDiv.className = `lx-result ${result.success ? 'lx-success' : 'lx-failure'}`;
        resultDiv.innerHTML = renderLessonResult(result, exercise, request);
        resultDiv.querySelector('.predict-reveal')?.addEventListener('click', () => runLessonExercise(slot, exercise, lessonEditor, true));
        if (lessonEditor) {
            setErrorMarkers(result.error ? [result] : result.tests.filter(test => !test.passed), lessonEditor);
        }
        if (result.success) {
            progress[exercise.id] = { ...progress[exercise.id], completed: true };
            saveProgress();
            slot.querySelector('.lx-done').textContent = '✓';
        }
    } catch (error) {
        console.error('Erreur lors de l\'exécution:', error);
        alert(t('runFailed'));
    } finally {
        button.disabled = false;
    }
}

function renderLessonResult(result, exercise, request) {
    if (result.error) {
        return `
            <div class="result-header"><span class="result-icon">✗</span> ${escapeHtml(translateServerMessage(result.error))}</div>
            ${renderFeedback(result.feedback, result.lineno)}
            ${renderTraceback(result.traceback)}
        `;
    }
    if (checksOutput(exercise)) return renderOutputResult(result);

    if (exercise.type === 'predict') {
        let html = `
            <div class="result-header">
                <span class="result-icon">${result.success ? '✓' : '✗'}</span>
                <span>${result.success ? t('lxCorrect') : t('lxWrong')}</span>
            </div>
            ${renderFeedback(result.tests[0]?.feedback)}
        `;
        if (result.output != null) {
            html += `
                <div class="predict-compare">
                    <div><strong>${t('yourAnswer')}</strong><pre>${escapeHtml(request.answer)}</pre></div>
                    <div><strong>${t('realOutput')}</strong><pre>${escapeHtml(result.output)}</pre></div>
                </div>
            `;
        } else {
            html += renderPredictRetry(request.failures);
        }
        return html;
    }

    // write / fix : une ligne par test, et l'explication du premier échec
    const failed = result.tests.find(test => !test.passed && test.feedback);
    const lines = result.tests.map(test => `
        <div class="lx-test">
            <span class="result-icon">${test.passed ? '✓' : '✗'}</span>
            ${escapeHtml(test.description || '')}
            ${!test.passed && !test.hidden && !test.error
                ? `<span class="lx-test-detail">— ${t('expected')} : ${escapeHtml(formatValue(test.expected))}, ${t('actual')} : ${escapeHtml(formatValue(test.actual))}</span>`
                : ''}
        </div>
    `).join('');
    return `
        <div class="result-header">
            <span class="result-icon">${result.success ? '✓' : '✗'}</span>
            <span>${result.success ? t('lxCorrect') : t('lxWrong')}</span>
        </div>
        ${lines}
        ${failed ? renderFeedback(failed.feedback, failed.lineno) : ''}
    `;
}

function startLessonExercises() {
    const category = categories.find(c => c.id === currentLessonId);
    if (category?.exercises.length) loadExercise(category.exercises[0].id);
}

// Message affiché après une révision réussie
function showReviewOutcome(entry, firstTry) {
    document.getElementById('reviewBadge').style.display = 'none';
    document.getElementById('reviewNotice').style.display = 'none';
    let message;
    if (!firstTry) message = t('reviewRetry');
    else if (entry.nextReview === null) message = t('reviewMastered');
    else message = t('reviewNext', REVIEW_INTERVALS[entry.reviewStage]);
    const div = document.createElement('div');
    div.className = 'review-outcome';
    div.textContent = message;
    const container = document.getElementById('resultsContainer');
    container.insertBefore(div, container.firstChild);
}

// Préparer l'espace de travail selon le type d'exercice
function setupWorkspace() {
    const type = exerciseType();
    // En révision, on ignore le code, l'ordre et la réponse sauvegardés
    const saved = reviewSession ? {} : (progress[currentExercise.id] || {});

    const badge = document.getElementById('exerciseType');
    badge.textContent = t('typeBadge')[type] || '';
    badge.style.display = type === 'write' ? 'none' : 'inline-block';
    badge.className = `type-badge type-${type}`;
    document.getElementById('workspaceTitle').textContent = t('workspace')[type];
    stepValidated = false;
    updateRunButton();

    document.getElementById('editor').style.display = type === 'parsons' ? 'none' : 'block';
    document.getElementById('parsonsContainer').style.display = type === 'parsons' ? 'block' : 'none';
    document.getElementById('predictContainer').style.display = type === 'predict' ? 'block' : 'none';

    // Code à lire : pas de barre de défilement, la molette fait défiler la page
    editor.updateOptions({
        readOnly: type === 'predict',
        scrollbar: type === 'predict'
            ? { vertical: 'hidden', horizontal: 'auto', alwaysConsumeMouseWheel: false }
            : { vertical: 'auto', horizontal: 'auto', alwaysConsumeMouseWheel: true },
    });
    document.querySelector('.editor-section').classList.toggle('fit-code', type === 'predict');
    if (type !== 'predict') document.getElementById('editor').style.height = '';
    if (type === 'predict') {
        // En révision, on refait directement la dernière étape (le code complet)
        const last = predictSteps().length - 1;
        predictStep = reviewSession ? last : Math.min(saved.step ?? (saved.completed ? last : 0), last);
        predictMaxStep = Math.max(predictStep, reviewSession ? 0 : Math.min(saved.maxStep ?? 0, last));
        predictFailures = saved.attempts || 0;
        showPredictStep();
        document.getElementById('predictAnswer').value = saved.answer || '';
        fitPredictAnswer();
    } else {
        // Les étapes n'existent que pour un predict
        document.getElementById('predictSteps').style.display = 'none';
        document.getElementById('prevStepBtn').style.display = 'none';
        stepDecorations = editor.deltaDecorations(stepDecorations, []);
        if (type === 'parsons') renderParsons(validParsonsOrder(saved.order) || currentExercise.lines);
        else editor.setValue(saved.code || currentExercise.template);
    }
}

// --- Predict ---

function savePredictAnswer() {
    if (!currentExercise) return;
    progress[currentExercise.id] = { ...progress[currentExercise.id], answer: document.getElementById('predictAnswer').value };
    saveProgress();
}

// Code à lire : l'éditeur prend juste la hauteur du code, pour garder la réponse et le bouton visibles
function fitEditorToCode() {
    document.getElementById('editor').style.height = `${editor.getContentHeight() + 4}px`;
    editor.layout();
}

// La case de réponse grandit avec le nombre de lignes écrites
function fitPredictAnswer() {
    const textarea = document.getElementById('predictAnswer');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight + 2}px`;
}

// Codes successifs à prédire : étapes intermédiaires puis code complet
function predictSteps() {
    return [...(currentExercise.steps || []), currentExercise.code];
}

// Afficher le code de l'étape courante (il remplace celui de l'étape précédente)
function showPredictStep() {
    const steps = predictSteps();
    const code = steps[predictStep].replace(/\n+$/, '');  // sans la ligne vide finale du YAML
    editor.setValue(code);
    fitEditorToCode();

    // Une étape déjà franchie est validée : le bouton principal mène directement à la suivante
    stepValidated = predictStep < predictMaxStep;
    updateRunButton();
    const prevBtn = document.getElementById('prevStepBtn');
    prevBtn.style.display = steps.length > 1 ? 'inline-block' : 'none';
    prevBtn.disabled = predictStep === 0;

    const bar = document.getElementById('predictSteps');
    bar.style.display = steps.length > 1 ? 'flex' : 'none';
    const added = predictStep > 0 ? addedLines(steps[predictStep - 1], code) : [];
    if (steps.length > 1) {
        const dots = steps.map((_, i) =>
            `<span class="step-dot ${i < predictStep ? 'done' : i === predictStep ? 'current' : ''}"></span>`).join('');
        bar.innerHTML = `
            <span class="step-label">${t('predictStep', predictStep + 1, steps.length)}</span>
            <span class="step-dots">${dots}</span>
            ${added.length ? `<span class="step-note">${t('stepNewLines')}</span>` : ''}
        `;
    }
    stepDecorations = editor.deltaDecorations(stepDecorations, added.map(line => ({
        range: new monaco.Range(line, 1, line, 1),
        options: { isWholeLine: true, className: 'step-new-line', linesDecorationsClassName: 'step-new-gutter' },
    })));

    // Petite animation : le nouveau bloc de code remplace l'ancien
    const editorDiv = document.getElementById('editor');
    editorDiv.classList.remove('step-enter');
    void editorDiv.offsetWidth;
    editorDiv.classList.add('step-enter');
}

// Numéros (à partir de 1) des lignes de `next` absentes de `prev` (plus longue sous-suite commune)
function addedLines(prev, next) {
    const a = prev.split('\n'), b = next.split('\n');
    const lcs = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
    for (let i = a.length - 1; i >= 0; i--) {
        for (let j = b.length - 1; j >= 0; j--) {
            lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
        }
    }
    const added = [];
    let i = 0, j = 0;
    while (j < b.length) {
        if (i < a.length && a[i] === b[j]) { i++; j++; }
        else if (i < a.length && lcs[i + 1][j] >= lcs[i][j + 1]) i++;
        else { if (b[j].trim()) added.push(j + 1); j++; }
    }
    return added;
}

// Bouton principal : « Vérifier ma prédiction », ou « Étape suivante » une fois l'étape validée
function updateRunButton() {
    const runBtn = document.getElementById('runBtn');
    runBtn.textContent = stepValidated ? t('nextStep') : t('runLabel')[exerciseType()];
    runBtn.classList.toggle('btn-next-step', stepValidated);
}

// Passer à l'étape suivante : le code s'allonge, la réponse repart de zéro
function goToNextStep() {
    changeStep(predictStep + 1);
}

function goToPrevStep() {
    if (predictStep > 0) changeStep(predictStep - 1);
}

// Afficher une autre étape : la réponse et les essais repartent de zéro
function changeStep(step) {
    predictStep = step;
    predictMaxStep = Math.max(predictMaxStep, step);
    predictFailures = 0;
    const entry = { ...progress[currentExercise.id], answer: '', lastTestResults: null, attempts: 0 };
    // En révision, on ne touche pas à l'étape sauvegardée
    if (!reviewSession) Object.assign(entry, { step: predictStep, maxStep: predictMaxStep });
    progress[currentExercise.id] = entry;
    saveProgress();
    document.getElementById('predictAnswer').value = '';
    fitPredictAnswer();
    document.getElementById('resultsSection').style.display = 'none';
    showPredictStep();
    document.getElementById('predictSteps').scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    document.getElementById('predictAnswer').focus({ preventScroll: true });
}

// Après une erreur : nombre d'essais restants, puis (au bout de 3 essais) le bouton pour voir la sortie
function renderPredictRetry(failures) {
    if (failures < MAX_PREDICT_ATTEMPTS) {
        return `<div class="predict-attempts">${t('attemptsLeft', MAX_PREDICT_ATTEMPTS - failures)}</div>`;
    }
    return `<button class="btn-hint-secondary predict-reveal">${t('revealOutput')}</button>`;
}

function renderPredictResult(result) {
    const test = result.tests[0] || {};
    const step = result.step ?? predictStep;
    const hasNextStep = result.success && step < predictSteps().length - 1;
    stepValidated = hasNextStep || step < predictMaxStep;
    updateRunButton();
    const div = document.createElement('div');
    div.className = `result-item ${result.success ? 'result-success' : 'result-failure'}`;
    let content = `
        <div class="result-header">
            <span class="result-icon">${result.success ? '✓' : '✗'}</span>
            <span>${hasNextStep ? t('stepCorrect') : result.success ? t('predictCorrect') : t('predictWrong')}</span>
        </div>
        ${renderFeedback(test.feedback)}
    `;
    if (result.output != null) {
        content += `
            <div class="predict-compare">
                <div><strong>${t('yourAnswer')}</strong><pre>${escapeHtml(document.getElementById('predictAnswer').value)}</pre></div>
                <div><strong>${t('realOutput')}</strong><pre>${escapeHtml(result.output)}</pre></div>
            </div>
        `;
    } else {
        content += renderPredictRetry(predictFailures);
    }
    div.innerHTML = content;
    div.querySelector('.predict-reveal')?.addEventListener('click', () => runCode(true));
    const nextButton = result.success && step === predictSteps().length - 1 && nextStepButton();
    if (nextButton) div.appendChild(nextButton);
    return div;
}

// --- Parsons ---

function renderParsons(lines) {
    const container = document.getElementById('parsonsContainer');
    container.innerHTML = '';
    for (const line of lines) {
        const li = document.createElement('li');
        li.className = 'parsons-line';
        li.draggable = true;
        li.innerHTML = `
            <span class="parsons-handle" aria-hidden="true">⋮⋮</span>
            <code>${escapeHtml(line)}</code>
            <span class="parsons-moves">
                <button type="button" data-move="-1" title="${t('moveUp')}" aria-label="${t('moveUp')}">▲</button>
                <button type="button" data-move="1" title="${t('moveDown')}" aria-label="${t('moveDown')}">▼</button>
            </span>
        `;
        container.appendChild(li);
    }
}

function parsonsLines() {
    return [...document.querySelectorAll('#parsonsContainer .parsons-line code')].map(c => c.textContent);
}

function getParsonsCode() {
    return parsonsLines().join('\n') + '\n';
}

// L'ordre sauvegardé n'est valable que s'il contient exactement les mêmes lignes
// (les lignes changent avec la langue ou si l'exercice est modifié)
function validParsonsOrder(order) {
    if (!Array.isArray(order)) return null;
    const sorted = (lines) => [...lines].sort().join('\n');
    return sorted(order) === sorted(currentExercise.lines) ? order : null;
}

function saveParsonsOrder() {
    clearParsonsErrors();
    progress[currentExercise.id] = { ...progress[currentExercise.id], order: parsonsLines() };
    saveProgress();
}

function setupParsonsEvents() {
    const container = document.getElementById('parsonsContainer');
    let dragged = null;

    container.addEventListener('dragstart', (e) => {
        dragged = e.target.closest('.parsons-line');
        dragged?.classList.add('dragging');
    });
    container.addEventListener('dragend', () => {
        dragged?.classList.remove('dragging');
        dragged = null;
        saveParsonsOrder();
    });
    container.addEventListener('dragover', (e) => {
        if (!dragged) return;
        e.preventDefault();
        // Insérer avant la première ligne dont le milieu est sous le curseur
        const after = [...container.querySelectorAll('.parsons-line:not(.dragging)')]
            .find(li => e.clientY < li.getBoundingClientRect().top + li.offsetHeight / 2);
        container.insertBefore(dragged, after || null);
    });

    // Boutons ▲ / ▼ : alternative au glisser-déposer (clavier, écrans tactiles)
    container.addEventListener('click', (e) => {
        const button = e.target.closest('button[data-move]');
        if (!button) return;
        const li = button.closest('.parsons-line');
        if (button.dataset.move === '-1' && li.previousElementSibling) {
            container.insertBefore(li, li.previousElementSibling);
        } else if (button.dataset.move === '1' && li.nextElementSibling) {
            container.insertBefore(li.nextElementSibling, li);
        }
        button.focus();
        saveParsonsOrder();
    });
}

function clearParsonsErrors() {
    document.querySelectorAll('.parsons-line.parsons-error').forEach(li => li.classList.remove('parsons-error'));
}

// Montrer les lignes en erreur : dans l'éditeur, ou dans le puzzle
function showErrorLines(errors) {
    const type = exerciseType();
    if (editsCode()) {
        setErrorMarkers(errors);
    } else if (type === 'parsons') {
        const items = document.querySelectorAll('#parsonsContainer .parsons-line');
        for (const err of errors) {
            items[err.lineno - 1]?.classList.add('parsons-error');
        }
    }
}

// Explication pédagogique d'une erreur (texte avec `code` et **gras**)
// Énoncé en Markdown : un retour à la ligne simple reste un retour à la ligne
function renderMarkdown(text) {
    return DOMPurify.sanitize(marked.parse(text, { breaks: true }));
}

// Texte court avec `code` et **gras** (explications, indices)
function formatInline(text) {
    return escapeHtml(text)
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code>$1</code>');
}

// Résultat d'un exercice output : explication + ce que le programme a affiché
function renderOutputResult(result) {
    const test = result.tests[0] || {};
    let html = `
        <div class="result-header">
            <span class="result-icon">${result.success ? '✓' : '✗'}</span>
            <span>${result.success ? t('lxCorrect') : t('lxWrong')}</span>
        </div>
        ${renderFeedback(test.feedback)}
    `;
    if (result.output) {
        html += `<div class="lx-output"><strong>${t('lxYourOutput')}</strong><pre>${escapeHtml(result.output)}</pre></div>`;
    }
    return html;
}

function renderFeedback(feedback, lineno) {
    if (!feedback) return '';
    const text = formatInline(feedback);
    const where = lineno ? ` <span class="feedback-line">(${t('atLine', lineno)})</span>` : '';
    return `
        <div class="feedback">
            <div class="feedback-title">${t('explanation')}${where}</div>
            <div>${text}</div>
        </div>
    `;
}

// Traceback replié : utile pour aller plus loin, mais secondaire pour un débutant
function renderTraceback(traceback) {
    if (!traceback) return '';
    return `
        <details class="traceback-details">
            <summary>${t('technicalDetails')}</summary>
            <pre class="traceback">${escapeHtml(traceback)}</pre>
        </details>
    `;
}

// Souligner dans l'éditeur les lignes en erreur
function setErrorMarkers(errors, target = editor) {
    if (!target) return;
    const model = target.getModel();
    const markers = [];
    const seen = new Set();
    for (const err of errors) {
        if (!err.lineno || seen.has(err.lineno) || err.lineno > model.getLineCount()) continue;
        seen.add(err.lineno);
        markers.push({
            severity: monaco.MarkerSeverity.Error,
            message: err.feedback || translateServerMessage(err.error) || '',
            startLineNumber: err.lineno,
            startColumn: model.getLineFirstNonWhitespaceColumn(err.lineno) || 1,
            endLineNumber: err.lineno,
            endColumn: model.getLineMaxColumn(err.lineno),
        });
    }
    monaco.editor.setModelMarkers(model, 'python-errors', markers);
}

function clearErrorMarkers() {
    if (editor) monaco.editor.setModelMarkers(editor.getModel(), 'python-errors', []);
}

// Utilitaires
// Valeur (venue du JSON) écrite comme Python l'afficherait avec repr() : None, True, 'texte', {'clé': 1}
function formatValue(value) {
    if (value === null || value === undefined) return 'None';
    if (typeof value === 'boolean') return value ? 'True' : 'False';
    if (typeof value === 'string') {
        // Comme Python : guillemets doubles si le texte contient une apostrophe (et pas de guillemet)
        const quote = value.includes("'") && !value.includes('"') ? '"' : "'";
        const body = value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/\t/g, '\\t')
            .replaceAll(quote, `\\${quote}`);
        return quote + body + quote;
    }
    if (Array.isArray(value)) return `[${value.map(formatValue).join(', ')}]`;
    if (typeof value === 'object') {
        return `{${Object.entries(value).map(([k, v]) => `${formatValue(k)}: ${formatValue(v)}`).join(', ')}}`;
    }
    return String(value);
}

function pad2(n) {
    return String(n).padStart(2, '0');
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
