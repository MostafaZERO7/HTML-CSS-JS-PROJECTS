// ===== DOM Elements =====
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const progressBar = document.getElementById("progress");

// ===== Data =====
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// ===== State Variables =====
let currentIndex = 0;
let score = 0;
let progressWidth = 0;

// ===== Init =====
totalQuestionsSpan.textContent = quizQuestions.length;

// ===== Event Listeners =====
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

// ===== Functions =====

function startGame() {
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  loadQuestion();
}

function loadQuestion() {
  const currentQuestion = quizQuestions[currentIndex];

  // Update UI
  questionText.textContent = currentQuestion.question;
  currentQuestionSpan.textContent = currentIndex + 1;
  answersContainer.innerHTML = "";

  // Create answer buttons
  currentQuestion.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = answer.text;
    btn.dataset.correct = answer.correct;
    btn.addEventListener("click", handleAnswerClick);
    answersContainer.appendChild(btn);
  });
}

function handleAnswerClick(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  const buttons = document.querySelectorAll(".answer-btn");

  // Style selected
  buttons.forEach((btn) => btn.classList.add("disable"));
  selectedBtn.classList.add(isCorrect ? "correct" : "incorrect");

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  // Progress bar
  progressWidth += 100 / quizQuestions.length;
  progressBar.style.width = `${progressWidth}%`;

  // Move to next after delay
  setTimeout(() => {
    currentIndex++;
    if (currentIndex < quizQuestions.length) {
      loadQuestion();
    } else {
      endGame();
    }
  }, 1500);
}

function endGame() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  const percentage = Math.round((score / quizQuestions.length) * 100);
  resultMessage.textContent = getResultMessage(percentage);

  finalScoreSpan.textContent = score;
  maxScoreSpan.textContent = quizQuestions.length;

  // Reset for next round
  currentIndex = 0;
  progressWidth = 0;
}

function restartGame() {
  score = 0;
  scoreSpan.textContent = score;
  progressBar.style.width = "0%";
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");
  loadQuestion();
}

function getResultMessage(percentage) {
  if (percentage === 100) return "Perfect! You're a genius!";
  if (percentage >= 80) return "Great job! You know your stuff!";
  if (percentage >= 60) return "Good effort! Keep learning!";
  if (percentage >= 40) return "Not bad! Try again to improve!";
  return "Keep studying! You'll get better!";
}
