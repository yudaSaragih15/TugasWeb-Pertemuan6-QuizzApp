(function() {
    'use strict';

    // ----- DATA SOAL (10 pertanyaan) -----
    const QUESTIONS = [{
        category: 'Sejarah',
        question: 'Siapa presiden pertama Indonesia?',
        options: ['Soekarno', 'Soeharto', 'Habibie', 'Megawati'],
        correct: 0
    }, {
        category: 'Geografi',
        question: 'Ibu kota Australia adalah?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
        correct: 2
    }, {
        category: 'Sains',
        question: 'Planet terbesar di tata surya kita adalah?',
        options: ['Saturnus', 'Jupiter', 'Neptunus', 'Uranus'],
        correct: 1
    }, {
        category: 'Budaya Pop',
        question: 'Film dengan tokoh "Harry Potter" diciptakan oleh?',
        options: ['J.R.R. Tolkien', 'J.K. Rowling', 'George R.R. Martin', 'Suzanne Collins'],
        correct: 1
    }, {
        category: 'Teknologi',
        question: 'Apa singkatan dari HTML?',
        options: [
            'HyperText Markup Language',
            'HighTech Machine Language',
            'Hyper Transfer Markup Language',
            'Home Tool Markup Language'
        ],
        correct: 0
    }, {
        category: 'Sejarah',
        question: 'Tahun berapa Indonesia merdeka?',
        options: ['1942', '1945', '1948', '1950'],
        correct: 1
    }, {
        category: 'Geografi',
        question: 'Gunung tertinggi di dunia adalah?',
        options: ['Everest', 'K2', 'Kangchenjunga', 'Lhotse'],
        correct: 0
    }, {
        category: 'Sains',
        question: 'Apa unsur kimia dengan simbol O?',
        options: ['Oksigen', 'Osmium', 'Oganeson', 'Oksida'],
        correct: 0
    }, {
        category: 'Budaya Pop',
        question: 'Siapa tokoh utama di serial "The Mandalorian"?',
        options: ['Luke Skywalker', 'Din Djarin', 'Boba Fett', 'Grogu'],
        correct: 1
    }, {
        category: 'Teknologi',
        question: 'Bahasa pemrograman apa yang digunakan untuk membuat halaman web interaktif?',
        options: ['Python', 'Java', 'JavaScript', 'C++'],
        correct: 2
    }];

    // ----- STATE -----
    let currentQuestions = [];
    let currentIndex = 0;
    let score = 0;
    let answered = false;
    let timerInterval = null;
    let timeLeft = 15;
    const TIME_LIMIT = 15;
    let quizFinished = false;
    let highScore = parseInt(localStorage.getItem('quizHighScore')) || 0;

    // DOM refs
    const questionSection = document.getElementById('questionSection');
    const resultScreen = document.getElementById('resultScreen');
    const questionCounter = document.getElementById('questionCounter');
    const categoryLabel = document.getElementById('categoryLabel');
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const nextBtn = document.getElementById('nextBtn');
    const timerDisplay = document.getElementById('timerDisplay');
    const timerBox = document.getElementById('timerBox');
    const progressFill = document.getElementById('progressFill');
    const finalScore = document.getElementById('finalScore');
    const resultDetail = document.getElementById('resultDetail');
    const restartBtn = document.getElementById('restartBtn');
    const highScoreBadge = document.getElementById('highScoreBadge');
    const darkToggle = document.getElementById('darkToggle');

    // ----- UTILITY -----
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // ----- RENDER SOAL -----
    function renderQuestion(index) {
        const q = currentQuestions[index];
        if (!q) return;

        questionCounter.textContent = `Soal ${index + 1} / ${currentQuestions.length}`;
        categoryLabel.textContent = `Kategori: ${q.category}`;
        questionText.textContent = q.question;

        optionsContainer.innerHTML = '';
        const letters = ['A', 'B', 'C', 'D'];
        q.options.forEach((opt, i) => {
            const div = document.createElement('div');
            div.className = 'option-item';
            div.dataset.index = i;

            const letterSpan = document.createElement('span');
            letterSpan.className = 'option-letter';
            letterSpan.textContent = letters[i];
            div.appendChild(letterSpan);

            const textSpan = document.createElement('span');
            textSpan.textContent = opt;
            div.appendChild(textSpan);

            optionsContainer.appendChild(div);
        });

        answered = false;
        nextBtn.disabled = true;
        document.querySelectorAll('.option-item').forEach(el => {
            el.classList.remove('correct', 'wrong', 'disabled');
        });
        resetTimer();
        startTimer();

        const progress = ((index) / currentQuestions.length) * 100;
        progressFill.style.width = progress + '%';

        questionSection.classList.remove('slide-in');
        void questionSection.offsetWidth;
        questionSection.classList.add('slide-in');
    }

    // ----- TIMER -----
    function resetTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        timeLeft = TIME_LIMIT;
        timerDisplay.textContent = timeLeft;
        timerBox.classList.remove('warning');
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 5) {
                timerBox.classList.add('warning');
            }
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                if (!answered && !quizFinished) {
                    handleTimeout();
                }
            }
        }, 1000);
    }

    function handleTimeout() {
        if (answered || quizFinished) return;
        answered = true;
        document.querySelectorAll('.option-item').forEach(el => {
            el.classList.add('disabled');
        });
        const q = currentQuestions[currentIndex];
        const correctIdx = q.correct;
        const options = document.querySelectorAll('.option-item');
        if (options[correctIdx]) {
            options[correctIdx].classList.add('correct');
        }
        nextBtn.disabled = false;
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    // ----- HANDLE JAWABAN (Event Delegation) -----
    function handleOptionClick(e) {
        const optionItem = e.target.closest('.option-item');
        if (!optionItem) return;
        if (answered || quizFinished) return;
        if (optionItem.classList.contains('disabled')) return;

        const selectedIndex = parseInt(optionItem.dataset.index);
        const q = currentQuestions[currentIndex];
        const isCorrect = (selectedIndex === q.correct);

        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        const allOptions = document.querySelectorAll('.option-item');
        allOptions.forEach(el => el.classList.add('disabled'));

        allOptions.forEach((el, idx) => {
            if (idx === q.correct) {
                el.classList.add('correct');
            } else if (idx === selectedIndex && !isCorrect) {
                el.classList.add('wrong');
            }
        });

        if (isCorrect) {
            score++;
        }

        answered = true;
        nextBtn.disabled = false;
    }

    // ----- NEXT / SELESAI -----
    function goToNext() {
        if (quizFinished) return;
        if (!answered) return;

        if (currentIndex < currentQuestions.length - 1) {
            currentIndex++;
            renderQuestion(currentIndex);
        } else {
            finishQuiz();
        }
    }

    // ----- FINISH QUIZ -----
    function finishQuiz() {
        quizFinished = true;
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        progressFill.style.width = '100%';

        questionSection.classList.add('hidden');
        resultScreen.classList.add('active');

        finalScore.textContent = score;
        resultDetail.textContent = `Jawaban benar: ${score} dari ${currentQuestions.length}`;

        if (score > highScore) {
            highScore = score;
            localStorage.setItem('quizHighScore', highScore);
        }
        highScoreBadge.textContent = `🏆 ${highScore}`;
    }

    // ----- RESTART -----
    function restartQuiz() {
        quizFinished = false;
        currentIndex = 0;
        score = 0;
        answered = false;
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        currentQuestions = shuffleArray([...QUESTIONS]);

        resultScreen.classList.remove('active');
        questionSection.classList.remove('hidden');

        renderQuestion(0);
    }

    // ----- HIGH SCORE INIT -----
    function updateHighScoreBadge() {
        highScoreBadge.textContent = `🏆 ${highScore}`;
    }

    // ----- DARK MODE TOGGLE -----
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        darkToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('quizDarkMode', isDark ? 'dark' : 'light');
    }

    function loadDarkMode() {
        const saved = localStorage.getItem('quizDarkMode');
        if (saved === 'dark') {
            document.body.classList.add('dark-mode');
            darkToggle.textContent = '☀️';
        } else {
            document.body.classList.remove('dark-mode');
            darkToggle.textContent = '🌙';
        }
    }

    // ----- INIT -----
    function init() {
        currentQuestions = shuffleArray([...QUESTIONS]);
        updateHighScoreBadge();
        loadDarkMode();

        optionsContainer.addEventListener('click', handleOptionClick);
        nextBtn.addEventListener('click', goToNext);
        restartBtn.addEventListener('click', restartQuiz);
        darkToggle.addEventListener('click', toggleDarkMode);

        renderQuestion(0);
    }

    init();
})();