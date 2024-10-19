const questions = [
  {
    question: "Which of the following is true about a stack?",
    answers: [
      { text: " It is a non-linear data structure.", correct: false },
      {
        text: "It follows the Last-In-First-Out (LIFO) principle.",
        correct: true,
      },
      {
        text: " It follows the First-In-First-Out (FIFO) principle.",
        correct: false,
      },
      { text: "Elements can be accessed randomly.", correct: false },
    ],
  },
  {
    question: "Which operation is used to remove the top element of the stack?",
    answers: [
      { text: "Insert", correct: false },
      { text: "Delete", correct: false },
      { text: "Pop", correct: true },
      { text: "Push", correct: false },
    ],
  },
  {
    question:
      "If the elements A, B, C, and D are pushed onto a stack in sequence, what will be the sequence of elements when popped?",
    answers: [
      {
        text: "A, B, C, D",
        correct: false,
      },
      { text: "A, C, B, D", correct: false },
      {
        text: "D, C, B, A",
        correct: true,
      },
      { text: "D, B, A, C", correct: false },
    ],
  },
  {
    question:
      "What will happen if you try to pop an element from an empty stack?",
    answers: [
      { text: "Stack underflow", correct: true },
      { text: "Stack overflow", correct: false },
      { text: " Null pointer exception", correct: false },
      { text: "The operation will succeed with a value of 0", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
