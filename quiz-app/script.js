const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("Question-container");
const questionElement = document.getElementById("questions");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "what is 2+2",
    answers: [
      { text: "4", correct: true },
      { text: "14", correct: false },
      { text: "24", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "what is 5+6",
    answers: [
      { text: "4", correct: false },
      { text: "11", correct: true },
      { text: "24", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "what is 10+14",
    answers: [
      { text: "4", correct: false },
      { text: "14", correct: false },
      { text: "24", correct: true },
      { text: "6", correct: false },
    ],
  },
  {
    question: "what is 7+7",
    answers: [
      { text: "4", correct: false },
      { text: "14", correct: true },
      { text: "24", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "what is 4+2",
    answers: [
      { text: "4", correct: false },
      { text: "14", correct: false },
      { text: "24", correct: false },
      { text: "6", correct: true },
    ],
  },
  {
    question: "what is 12+12",
    answers: [
      { text: "4", correct: false },
      { text: "14", correct: false },
      { text: "24", correct: true },
      { text: "6", correct: false },
    ],
  },
];
