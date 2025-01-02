// Sample Questions (Replace or expand with your own questions)
const questions = [
    {
        question: "Prolonged use of _______ in COPD patients may lead to a reduction in ventilation stimulus?",
        options: ["Oxygen", "Entonox", "Glucagon", "Salbutamol"],
        answer: "Oxygen"
    },
    {
        question: "When assessing normal capillary refill, you will press the capillary bed for 5 seconds and release. Normal perfusion results in the blood returning within _______ second(s).?",
        options: ["One", "Three", "Two", "Four"],
        answer: "Two"
    },
    {
        question: "Shock caused by the failure of the nervous system to control the diameter of blood vessels is called ________ shock.",
        options: ["Cardiogenic shock", "Neurogenic shock", "reversible shock", "hypovolemic shock"],
        answer: "Neurogenic shock"
    },
    {
        question: "The term “anoxia” refers to what?",
        options: ["Oversaturation of carbon dioxide in the body tissue.", "Oversaturation of oxygen in the body tissue.", "Complete lack of oxygen in the body tissue.", "complete lack of carbon dioxide in the body tissue."],
        answer: "Complete lack of oxygen in the body tissue."
    },
    {
        question: "On the ECG, the “P” wave:",
        options: ["Represents the SA node firing.", "Represents the depolarisation of the left and right atria.", "Represents the AV node firing.", "Represents the depolarisation of the ventricle." ],
        answer: "Represents the depolarisation of the ventricle."
    },
    {
        question: "The blood vessels that carry blood from the head are the:",
        options: ["Jugular veins.", "Superior vena cava.", "Pulmonary veins.", "Pulmonary arteries." ],
        answer: "Superior vena cava."
    },
    {
        question: "Which of the following groups of organs all lie within the abdominal cavity?",
        options: ["Pancreas, vena cava and lungs.", "Kidneys, spleen and heart.", "Gall bladder, liver and pancreas.", "Oesophagus, aorta and lungs." ],
        answer: "Gall bladder, liver and pancreas."
    },
    // Add more questions up to 100...
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 45 * 60; // 45 minutes in seconds
let userAnswers = Array(questions.length).fill(null);

// Initialize Quiz
function initQuiz() {
    loadQuestion();
    startTimer();
}

// Load Question
function loadQuestion() {
    const questionContainer = document.getElementById("question-container");
    const currentQuestion = questions[currentQuestionIndex];

    questionContainer.innerHTML = `
        <div class="question">${currentQuestion.question}</div>
        <ul class="options">
            ${currentQuestion.options.map((option, index) => `
                <li class="option">
                    <label>
                        <input type="radio" name="answer" value="${option}" onclick="selectAnswer('${option}')"
                        ${userAnswers[currentQuestionIndex] === option ? "checked" : ""}>
                        ${option}
                    </label>
                </li>
            `).join('')}
        </ul>
    `;
}

// Select Answer
function selectAnswer(selectedOption) {
    userAnswers[currentQuestionIndex] = selectedOption;
}

// Next Question
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

// Previous Question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// Submit Quiz
function submitQuiz() {
    clearInterval(timer);
    calculateScore();
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("results-container").style.display = "block";
    document.getElementById("score").innerText = `Your score: ${score} / ${questions.length}`;
    displayReview();
}

// Calculate Score
function calculateScore() {
    score = questions.reduce((total, question, index) => {
        return total + (userAnswers[index] === question.answer ? 1 : 0);
    }, 0);
}

// Display Review of Questions and Answers
function displayReview() {
    const reviewContainer = document.getElementById("review-container");
    reviewContainer.innerHTML = questions.map((question, index) => `
        <div class="review-item">
            <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
            <p><strong>Your Answer:</strong> ${userAnswers[index] || "No answer selected"}</p>
            <p><strong>Correct Answer:</strong> ${question.answer}</p>
        </div>
    `).join('');
}

// Start Timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById("timer").innerText = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

// Restart Quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 45 * 60;
    userAnswers.fill(null);
    document.getElementById("results-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    initQuiz();
}

// Initialize the Quiz on Page Load
window.onload = initQuiz;
