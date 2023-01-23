const startBtn = document.querySelector('.start-btn');
const btnsSection = document.querySelector('.btns-section');
const inputForm = document.getElementById('input-form');
const submitBtn = inputForm.querySelector('#input-submit');
const userName = inputForm.querySelector('#user-name');
const goBack = document.querySelector('.go-back');
const clearScore = document.querySelector('.clear-score');
const displayUser = document.querySelector('.display-user');
const displayScore = document.querySelector('.display-score');
const viewHighScores = document.querySelector('.view-high-scores');

//Display Elements
const timerEl = document.querySelector('.timer-count');
const questionEl = document.querySelector('.question');
const resultEl = document.querySelector('.results');
const finalTimeEl = document.querySelector('.final-time-left');
const nav = document.querySelector('nav');

//Html Sections
const startQuiz = document.querySelector('.start-quiz');
const quizSection = document.querySelector('.quiz-section');
const quizContent = document.querySelector('.quiz-content');
const finalScore = document.querySelector('.final-score');
const scoreBoard = document.querySelector('.score-board');

//Global Vars
let timerCount,
  questionIndex,
  finalResult = {};

//Start challenge
function startGame() {
  //start timer
  //restart question
  //display question
  startQuiz.classList.remove('d-none');
  nav.classList.remove('d-none');
  scoreBoard.classList.add('d-none');

  timerCount = 0;
  questionIndex = 0;
  timerEl.textContent = timerCount;
  resultEl.textContent = '';
  restartQuestion();

  startBtn.addEventListener('click', () => {
    startTimer();
    displayQuestion();
  });
}

//View high scores btn
viewHighScores.addEventListener('click', function () {
  nav.classList.add('d-none');
  showScoreBoard();
});

//start timer
function startTimer() {
  timerCount = 100;
  timerEl.textContent = timerCount;

  const gameTimer = setInterval(() => {
    timerCount--;
    timerEl.textContent = timerCount;

    //End game if timer is over
    if (timerCount < 0) {
      timerEl.textContent = `Out of Time`;

      //Stop timer
      clearInterval(gameTimer);
      //end game
    }
  }, 1000);
}
//end game either when there is no time left or all the questions have been asked
function endGame() {
  quizContent.classList.add('d-none');
  finalScore.classList.remove('d-none');
  finalResult = {
    points: timerCount,
  };

  finalTimeEl.textContent = finalResult.points;
  getInputvalue();
}

//show one question from the objects
const listOfQuestions = {
  'Commonly used data types DO Not Include': [
    'strings',
    'booleans',
    'alert',
    'numbers',
    2,
  ],
  'The condition in an if / else statement is enclosed with _______.': [
    'quotes',
    'curly brackets',
    'parenthesis',
    'square brackets',
    1,
  ],
  'Arrays in JavaScript can be used to store': [
    'numbers and strings',
    'other arrays',
    'booleans',
    'all of the above',
    3,
  ],
};

//check length of Questions to know how many times it needs to be looped
let lengthOfQuestions = Object.keys(listOfQuestions).length;

//any of these buttons click check results

function displayQuestion() {
  startQuiz.classList.add('d-none');
  quizSection.classList.remove('d-none');
  restartQuestion();

  let chosenQuestion = Object.keys(listOfQuestions)[questionIndex];
  let chosenChoices = listOfQuestions[chosenQuestion];
  let correctAnswer = chosenChoices.pop();

  console.log(chosenQuestion, chosenChoices, correctAnswer);

  //display the question
  questionEl.textContent = chosenQuestion;

  //loop thru the array and generate a button for each element
  chosenChoices.forEach((choice) => {
    let indexOfBtn = chosenChoices.indexOf(choice);
    let button = document.createElement('button');

    //Add btn style and data index
    button.setAttribute('class', 'btn-choice btn btn-primary mb-3 p-3');
    button.setAttribute('data-index', indexOfBtn);

    //Add correct text for each btn
    button.appendChild(document.createTextNode(`${indexOfBtn + 1}. ${choice}`));
    btnsSection.appendChild(button);
    console.log(choice);

    //add click listenser
    button.addEventListener('click', () => {
      //Get Data index number and change from string to number
      let userAnswer = Number(button.getAttribute('data-index'));

      showResults(userAnswer, correctAnswer);
      questionIndex++;

      if (questionIndex < lengthOfQuestions) {
        displayQuestion();
      } else {
        //No more questions
        console.log('end of game');
        endGame();
      }
    });
  });
}

//Remove Old question and btns
function restartQuestion() {
  questionEl.textContent = '';
  document.querySelectorAll('.btn-choice').forEach((btn) => {
    btn.remove();
  });
}

// check if user input is correct
function showResults(userAnswer, correctAnswer) {
  console.log(userAnswer, correctAnswer);

  // show results - Correct or incorrect
  if (Number(userAnswer) != correctAnswer) {
    resultEl.textContent = 'Wrong !';

    //if answer is incorrect minus mb-0 py-3 ms-4

    timerCount -= 10;
    timerEl.textContent = timerCount;
    return;
  }

  //If Correct show correct
  resultEl.textContent = 'Correct !';
  //show next question
}

//show high scores display board
function showScoreBoard() {
  startQuiz.classList.add('d-none');
  scoreBoard.classList.remove('d-none');
  displayUser.textContent = finalResult.userName;
  displayScore.textContent = finalResult.points;
  goBack.addEventListener('click', startGame);
  clearScore.addEventListener('click', clearBoard);
}

// Show final score
//ask user to input initials
function getInputvalue() {
  inputForm.addEventListener('submit', function (e) {
    e.preventDefault();

    //Ad UserName to object
    finalResult['userName'] = userName.value;
    console.log(finalResult);
    storeUserInfo(finalResult);
  });
}

//store user name and points in local storage
function storeUserInfo(playerInfo) {
  localStorage.setItem('playerList', JSON.stringify(playerInfo));
}

//compare all users score and display highest point up to the top

//go back btn
//clear high score function
function clearBoard() {
  displayUser.textContent = '';
  displayScore.textContent = '';
  finalResult['userName'] = '';
  finalResult['points'] = '';
  localStorage.clear();
}

//Init
function init() {
  let storedPlayerList = JSON.parse(localStorage.getItem('playerList'));

  if (storedPlayerList !== null) {
    playerInfo = storedPlayerList;
  }
  startGame();
}
init();
