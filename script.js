(function() {
    'use strict';

    const QUESTION_POOL = [
        { category: 'Teknologi', question: 'Sistem operasi buatan Google untuk mobile?', options: ['iOS', 'Android', 'Windows Phone', 'Symbian'], correct: 1 },
        { category: 'Teknologi', question: 'Apa singkatan dari RAM?', options: ['Read Access Memory', 'Random Access Memory', 'Run Application Module', 'Real-time Arithmetic Memory'], correct: 1 },
        { category: 'Teknologi', question: 'Siapa pendiri Microsoft?', options: ['Steve Jobs', 'Bill Gates', 'Mark Zuckerberg', 'Elon Musk'], correct: 1 },
        { category: 'Teknologi', question: 'Bahasa pemrograman untuk web interaktif?', options: ['Python', 'Java', 'JavaScript', 'C++'], correct: 2 },
        { category: 'Teknologi', question: 'Kepanjangan dari HTTP?', options: ['HyperText Transfer Protocol', 'High-Tech Transfer Protocol', 'Hyper Transfer Text Protocol', 'Home Text Transfer Protocol'], correct: 0 },
        { category: 'Teknologi', question: 'Perusahaan pembuat iPhone?', options: ['Samsung', 'Apple', 'Google', 'Microsoft'], correct: 1 },
        { category: 'Teknologi', question: 'Apa kepanjangan dari CPU?', options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Personal Unit', 'Control Processing Unit'], correct: 0 },
        { category: 'Teknologi', question: 'Bahasa markup standar untuk halaman web?', options: ['XML', 'HTML', 'JSON', 'CSS'], correct: 1 },

        { category: 'Sains', question: 'Planet "Bintang Kejora" adalah?', options: ['Mars', 'Jupiter', 'Venus', 'Saturnus'], correct: 2 },
        { category: 'Sains', question: 'Jumlah tulang manusia dewasa?', options: ['206', '208', '210', '212'], correct: 0 },
        { category: 'Sains', question: 'Unsur kimia dengan simbol O?', options: ['Oksigen', 'Osmium', 'Oganeson', 'Oksida'], correct: 0 },
        { category: 'Sains', question: 'Planet terbesar di tata surya?', options: ['Saturnus', 'Jupiter', 'Neptunus', 'Uranus'], correct: 1 },
        { category: 'Sains', question: 'Kecepatan cahaya (km/detik) kira-kira?', options: ['300.000', '150.000', '500.000', '100.000'], correct: 0 },
        { category: 'Sains', question: 'Simbol kimia untuk air?', options: ['H2O', 'CO2', 'NaCl', 'HCl'], correct: 0 },
        { category: 'Sains', question: 'Planet yang dikenal sebagai "Planet Merah"?', options: ['Venus', 'Mars', 'Merkurius', 'Jupiter'], correct: 1 },
        { category: 'Sains', question: 'Proses tumbuhan membuat makanan disebut?', options: ['Respirasi', 'Fotosintesis', 'Fermentasi', 'Oksidasi'], correct: 1 },

        { category: 'Sejarah', question: 'Perang Dunia II berakhir tahun?', options: ['1943', '1944', '1945', '1946'], correct: 2 },
        { category: 'Sejarah', question: 'Penemu mesin cetak?', options: ['Johannes Gutenberg', 'Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla'], correct: 0 },
        { category: 'Sejarah', question: 'Presiden pertama Indonesia?', options: ['Soekarno', 'Soeharto', 'Habibie', 'Megawati'], correct: 0 },
        { category: 'Sejarah', question: 'Tahun Indonesia merdeka?', options: ['1942', '1945', '1948', '1950'], correct: 1 },
        { category: 'Sejarah', question: 'Perang Dingin antara AS dan?', options: ['Uni Soviet', 'China', 'Jerman', 'Inggris'], correct: 0 },
        { category: 'Sejarah', question: 'Bangsa yang menjajah Indonesia 350 tahun?', options: ['Inggris', 'Belanda', 'Jepang', 'Portugis'], correct: 1 },
        { category: 'Sejarah', question: 'Wakil presiden pertama Indonesia?', options: ['Soeharto', 'Mohammad Hatta', 'BJ Habibie', 'Adam Malik'], correct: 1 },
        { category: 'Sejarah', question: 'Tembok Berlin runtuh pada tahun?', options: ['1987', '1988', '1989', '1990'], correct: 2 },

        { category: 'Budaya Pop', question: 'Penulis novel "Dune"?', options: ['Isaac Asimov', 'Frank Herbert', 'Arthur C. Clarke', 'Philip K. Dick'], correct: 1 },
        { category: 'Budaya Pop', question: 'Sutradara "The Godfather"?', options: ['Martin Scorsese', 'Francis Ford Coppola', 'Steven Spielberg', 'Quentin Tarantino'], correct: 1 },
        { category: 'Budaya Pop', question: 'Tokoh utama "The Mandalorian"?', options: ['Luke Skywalker', 'Din Djarin', 'Boba Fett', 'Grogu'], correct: 1 },
        { category: 'Budaya Pop', question: 'Pencipta Harry Potter?', options: ['J.R.R. Tolkien', 'J.K. Rowling', 'George R.R. Martin', 'Suzanne Collins'], correct: 1 },
        { category: 'Budaya Pop', question: 'Penyanyi lagu "Thriller"?', options: ['Michael Jackson', 'Prince', 'Madonna', 'Whitney Houston'], correct: 0 },
        { category: 'Budaya Pop', question: 'Sutradara film "Titanic"?', options: ['James Cameron', 'Steven Spielberg', 'Christopher Nolan', 'Peter Jackson'], correct: 0 },
        { category: 'Budaya Pop', question: 'Nama asli Iron Man?', options: ['Bruce Wayne', 'Tony Stark', 'Steve Rogers', 'Peter Parker'], correct: 1 },
        { category: 'Budaya Pop', question: 'Penyanyi lagu "Bad Guy"?', options: ['Ariana Grande', 'Billie Eilish', 'Taylor Swift', 'Dua Lipa'], correct: 1 },

        { category: 'Geografi', question: 'Negara dengan populasi terbanyak?', options: ['India', 'China', 'Amerika Serikat', 'Indonesia'], correct: 0 },
        { category: 'Geografi', question: 'Benua terkecil di dunia?', options: ['Eropa', 'Australia', 'Antartika', 'Amerika Selatan'], correct: 1 },
        { category: 'Geografi', question: 'Ibu kota Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], correct: 2 },
        { category: 'Geografi', question: 'Gunung tertinggi di dunia?', options: ['Everest', 'K2', 'Kangchenjunga', 'Lhotse'], correct: 0 },
        { category: 'Geografi', question: 'Negara terluas di dunia?', options: ['Rusia', 'Kanada', 'China', 'Amerika Serikat'], correct: 0 },
        { category: 'Geografi', question: 'Ibu kota Jepang?', options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'], correct: 2 },
        { category: 'Geografi', question: 'Sungai terpanjang di dunia?', options: ['Amazon', 'Nil', 'Yangtze', 'Mississippi'], correct: 1 },
        { category: 'Geografi', question: 'Samudra terluas di dunia?', options: ['Atlantik', 'Hindia', 'Pasifik', 'Arktik'], correct: 2 }
    ];

    const QUESTIONS_PER_SESSION = 10;

    let usedQuestionIndices = [];   
    let currentQuestions = [];
    let currentIndex = 0;
    let score = 0;
    let answered = false;
    let timerInterval = null;
    let timeLeft = 15;
    const TIME_LIMIT = 15;
    let quizFinished = false;
    let quizStarted = false;      
    let highScore = parseInt(localStorage.getItem('quizHighScore')) || 0;

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
    const startBtn = document.getElementById('startBtn');
    const highScoreBadge = document.getElementById('highScoreBadge');
    const darkToggle = document.getElementById('darkToggle');

    function shuffleArray(arr) {
        const array = [...arr];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function pickRandomQuestions() {
        if (usedQuestionIndices.length + QUESTIONS_PER_SESSION > QUESTION_POOL.length) {
            usedQuestionIndices = [];
        }

        const available = [];
        for (let i = 0; i < QUESTION_POOL.length; i++) {
            if (!usedQuestionIndices.includes(i)) {
                available.push(i);
            }
        }

        shuffleArray(available);
        const pickedIndices = available.slice(0, QUESTIONS_PER_SESSION);

        usedQuestionIndices.push(...pickedIndices);

        return pickedIndices.map(idx => {
            const q = QUESTION_POOL[idx];
            const correctText = q.options[q.correct];
            const shuffledOptions = shuffleArray(q.options);
            return {
                category: q.category,
                question: q.question,
                options: shuffledOptions,
                correct: shuffledOptions.indexOf(correctText)
            };
        });
    }

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
        if (quizStarted) {
            startTimer();
        }

        const progress = (index / currentQuestions.length) * 100;
        progressFill.style.width = progress + '%';

        questionSection.classList.remove('slide-in');
        void questionSection.offsetWidth;
        questionSection.classList.add('slide-in');
    }

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
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 5) timerBox.classList.add('warning');
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                if (!answered && !quizFinished) handleTimeout();
            }
        }, 1000);
    }

    function handleTimeout() {
        if (answered || quizFinished) return;
        answered = true;
        document.querySelectorAll('.option-item').forEach(el => el.classList.add('disabled'));
        const q = currentQuestions[currentIndex];
        const correctIdx = q.correct;
        const options = document.querySelectorAll('.option-item');
        if (options[correctIdx]) options[correctIdx].classList.add('correct');
        nextBtn.disabled = false;
    }

    function handleOptionClick(e) {
        if (!quizStarted) return;

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
            if (idx === q.correct) el.classList.add('correct');
            else if (idx === selectedIndex && !isCorrect) el.classList.add('wrong');
        });

        if (isCorrect) score++;
        answered = true;
        nextBtn.disabled = false;
    }

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

    function finishQuiz() {
        quizFinished = true;
        quizStarted = false; 
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

    function startNewSession() {
        quizFinished = false;
        currentIndex = 0;
        score = 0;
        answered = false;
        quizStarted = true;   

        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        currentQuestions = pickRandomQuestions();

        resultScreen.classList.remove('active');
        questionSection.classList.remove('hidden');

        renderQuestion(0);
    }

    function updateHighScoreBadge() {
        highScoreBadge.textContent = `🏆 ${highScore}`;
    }

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

    function init() {
        currentQuestions = pickRandomQuestions();
        updateHighScoreBadge();
        loadDarkMode();

        optionsContainer.addEventListener('click', handleOptionClick);
        nextBtn.addEventListener('click', goToNext);
        restartBtn.addEventListener('click', startNewSession);   
        startBtn.addEventListener('click', startNewSession);     
        darkToggle.addEventListener('click', toggleDarkMode);

        renderQuestion(0);
    }

    init();
})();