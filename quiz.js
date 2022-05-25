import { generateAnswer, calcQuiz } from "./utils.js";
const first_num = document.querySelector(".first-number");
const second_num = document.querySelector(".second-number");
const operation_ui = document.querySelector(".operation");
const answers_ui = document.querySelectorAll(".answer");
const quiz_round = document.querySelector(".quiz-round");
const quiz_timer = document.querySelector(".quiz-timer");
const points = document.querySelector(".points");
const operations = ["*", "-", "+"];
const quizzes = [];
const classOfStatus = ["fail", "success", "timeout"];
let MAX_ROUND = 15;
let MAX_TIME = 5;

let timer = MAX_TIME;
let intervalId;
//------
//------

let game_zone = document.querySelector(".game-zone");
let login_zone = document.querySelector(".login-zone");
let select_zone = document.querySelector(".select-zone");
let login_btn = document.querySelector(".login-btn");
let selected_btn = document.querySelectorAll(".selected-btn");
let header = document.querySelector(".header");
let userName = document.querySelector("#userName");
// let userLasName = document.querySelector("#userLasName");
let user_name = document.querySelector("#user_name");
let user_sigin_name = document.querySelector("#user_sigin_name");
let logo_user = document.querySelector("#logo_user");
let users_info = [];
let max_time_count = [16, 11, 6];
let max_round_count = [6, 11, 16];
let app;
let soncha = [30,50, 100];
//------
//------

login_btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (userName.value !== "") {
    users_info.push(userName.value);
    user_name.innerText = users_info[0];
    user_sigin_name.innerText = users_info[0];
    logo_user.innerText = users_info[0].substr(0, 1)
    login_zone.classList.add("hide");
    select_zone.classList.remove("hide");
  } else alert("Loginni kiriting!")

});

selected_btn.forEach((item, idx) => {
  item.addEventListener("click", () => {
    login_zone.classList.add("hide");
    select_zone.classList.add("hide");
    game_zone.classList.remove('hide');
    header.classList.remove('hide');
    let idxs = idx;
    MAX_TIME = max_time_count[idxs];
    MAX_ROUND = max_round_count[idxs];
    app = soncha[idx];
    init();
  });
});



// // LOGIC FUNCTIONS

const generateAnswers = (corAnswer) => {
  const answers = [corAnswer];
  for (let i = 1; i < 4; i++) answers[i] = generateAnswer(corAnswer);
  const mixedAnswers = answers.sort(() => Math.random() - 0.5);
  return mixedAnswers;
};

function generateQuiz() {
  const firstNum = Math.ceil(Math.random() * app); // 40
  const secondNum = Math.ceil(Math.random() * app); // 33
  const ranOpIdx = Math.floor(Math.random() * operations.length);
  const operation = operations[ranOpIdx]; // +
  const correctAnswer = calcQuiz(firstNum, secondNum, operation);
  const answers = generateAnswers(correctAnswer);
  const selectedIdx = null;
  const quiz = {
    firstNum,
    secondNum,
    operation,
    correctAnswer,
    answers,
    selectedIdx,
  };
  quizzes.push(quiz);
  quiz_round.innerText = quizzes.length;
  return quiz;
}

function nextQuiz() {
  const newQuiz = generateQuiz();
  renderQuiz(newQuiz);
}

function checkTimer() {
  if (timer === 0) {
    timer = MAX_TIME;
    quiz_timer.innerText = timer + "s";

    renderPoint(classOfStatus[2]);
    nextQuiz();

    checkFinish();
  }
}

function checkFinish() {
  if (quizzes.length === MAX_ROUND) {
    alert("Oyin tugadi");
    return clearInterval(intervalId);
  }
}



// UI FUNCTIONS

function renderQuiz(quiz) {
  const { operation, firstNum, secondNum, answers, correctAnswer } = quiz;
  first_num.innerText = firstNum;
  second_num.innerText = secondNum;
  operation_ui.innerText = operation;

  answers_ui.forEach((answer_ui, idx) => {
    answer_ui.innerText = answers[idx];
    answer_ui.id = idx;
    answer_ui.addEventListener("click", onSelectAnswer);
  });
}

// EVENT HANDLER FUNCTIONS
function onSelectAnswer({ target }) {
  const currentQuiz = quizzes[quizzes.length - 1]; // currentQuiz
  currentQuiz.selectedIdx = target.id;
  const isCorrect = currentQuiz.correctAnswer == +target.innerText;
  if (quizzes.length === MAX_ROUND) {
    alert("Oyin tugadi");
    return clearInterval(intervalId);
  }

  if (isCorrect) {
    timer += 5;
    quiz_timer.innerText = timer + "s";
  }
  const classIdx = isCorrect ? 1 : 0;
  renderPoint(classOfStatus[classIdx]);
  nextQuiz();
}


// function answer(quiz) {
//   let a = quizzes.correctAnswer;
//   console.log(quizzes[0].correctAnswer);
// }
// let son = 0;
// function selected_Correct_Answer(num1, num2) {
//   if (num1 == num2) {
//     let btn1 = document.createElement("button");
//     btn1.setAttribute("class", "point point--success");
//     points.appendChild(btn1);
//   }
//   else {
//     let btn2 = document.createElement("button");
//     btn2.setAttribute("class", "point point--fail");
//     points.appendChild(btn2);
//   }


// }
function renderPoint(suffix) {
  const className = `point point--${suffix}`;
  const btn = document.createElement("button");
  btn.className = className;
  btn.innerText = quizzes.length;
  btn.disabled = true;
  points.appendChild(btn);
}

function init() {
  const firstQuiz = generateQuiz();
  renderQuiz(firstQuiz);
  createInterval();
}
function createInterval() {
  intervalId = setInterval(() => {
    timer--;
    quiz_timer.innerText = timer + "s";
    checkTimer();
  }, 1000);

}





