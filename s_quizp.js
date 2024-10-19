const questions = [
  {
    question: "Which of the following best describes the LIFO principle?",
    answers: [
      { text: "First In, First Out.", correct: false },
      {
        text: "Last In, First Out.",
        correct: true,
      },
      {
        text: "Random Access",
        correct: false,
      },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "Which of the following statements is true about stacks?",
    answers: [
      {
        text: "Stacks can be implemented using arrays or linked lists.",
        correct: true,
      },
      { text: "Stacks do not allow duplicate elements.", correct: false },
      { text: "Stacks can grow indefinitely in size.", correct: false },
      { text: "All of the above.", correct: false },
    ],
  },
  {
    question: "What method checks whether a stack is empty?",
    answers: [
      {
        text: "isTop()",
        correct: false,
      },
      { text: "empty()", correct: false },
      {
        text: "isEmpty()",
        correct: true,
      },
      { text: " size()", correct: false },
    ],
  },
  {
    question: "Which of the following is NOT a valid operation on a stack?",
    answers: [
      { text: " insert()", correct: true },
      { text: "pop()", correct: false },
      { text: "push()", correct: false },
      { text: "peek()", correct: false },
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
