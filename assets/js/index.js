//Buttons and form inputs
const startBtn = document.querySelector('.start-btn');
const btnsSection = document.querySelector('#btns-section');
const inputSubmit = document.getElementById('input-submit');
const userName = document.querySelector('#user-name');
const goBack = document.querySelector('.go-back');
const clearScore = document.querySelector('.clear-score');
const viewHighScores = document.querySelector('.view-high-scores');

//Display Elements
const timerEl = document.querySelector('.timer-count');
const questionEl = document.querySelector('.question');
const resultEl = document.querySelector('.results');
const finalTimeEl = document.querySelector('.final-time-left');
const nav = document.querySelector('nav');
const ulDisplayHighscore = document.querySelector('.display-high-score');

//Html Sections
const startQuiz = document.querySelector('.start-quiz');
const quizSection = document.querySelector('.quiz-section');
const quizContent = document.querySelector('.quiz-content');
const finalScore = document.querySelector('.final-score');
const scoreBoard = document.querySelector('.score-board');

//set up global var
let timerCount,
  questionIndex,
  gameTimer,
  playersList = [],
  finalResult = {};

//Start challenge
function startGame() {
  showSection([nav, startQuiz, quizSection, quizContent]);
  hideSection([scoreBoard, finalScore]);

  timerCount = 0;
  questionIndex = 0;
  timerEl.textContent = timerCount;
  resultEl.textContent = '';

  startTimer();
  displayQuestion();
  // restartQuestion();
}

//start timer
function startTimer() {
  timerCount = 30;
  timerEl.textContent = timerCount;

  gameTimer = setInterval(() => {
    timerCount--;
    //End game if timer is over
    if (timerCount < 0) {
      timerEl.textContent = `Out of Time`;

      endGame();
    } else {
      timerEl.textContent = timerCount;
    }
  }, 1000);
}
//end game either when there is no time left or all the questions have been asked
function endGame() {
  //Stop timer
  clearInterval(gameTimer);

  hideSection([quizContent]);
  showSection([finalScore]);

  finalTimeEl.textContent = timerCount;
  // getUserName();
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
  'The condition in an if / else statement is enclosed with ＿＿＿＿ .': [
    'quotes',
    'curly brackets',
    'parenthesis',
    'square brackets',
    1,
  ],
  'Arrays in JavaScript can be used to store ＿＿＿＿.': [
    'numbers and strings',
    'other arrays',
    'booleans',
    'all of the above',
    3,
  ],
  'String values must be enclosed within ＿＿＿＿ when being assigned to variables.':
    ['commas', 'curly brackets', 'quotes', 'parenthesis', 2],
  'A very useful tool used during development and debugging for printing content to the debugger is:':
    ['Javascript', 'terminal/bash', 'for loops', 'console.log', 3],
};

//check length of Questions to know how many times it needs to be looped
let lengthOfQuestions = Object.keys(listOfQuestions).length;

function displayQuestion() {
  showSection([quizSection]);
  hideSection([startQuiz]);

  //Remove old btns and Questions from last round
  restartQuestion();

  let chosenQuestion = Object.keys(listOfQuestions)[questionIndex];
  let chosenChoices = listOfQuestions[chosenQuestion];
  if (!chosenChoices) return;

  //Grab last item and use array destructing
  let [correctAnswer] = chosenChoices.slice(-1);

  // console.log(chosenQuestion, chosenChoices, correctAnswer);

  //display the question
  questionEl.textContent = chosenQuestion;

  //loop thru the array and generate a button for each element

  let buttonHtml = '';

  chosenChoices.forEach((choice, index, array) => {
    // Exclude the last item in the array (which is the answer)
    // Create btn for all choice except last
    if (index !== array.length - 1) {
      let indexOfBtn = chosenChoices.indexOf(choice);

      buttonHtml += `
      <button class="btn-choice btn btn-primary mb-3 p-3" data-index="${indexOfBtn}">
        ${indexOfBtn + 1}. ${choice}
      </button>`;
    }
  });
  btnsSection.innerHTML = buttonHtml;
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
  // console.log(userAnswer, correctAnswer);

  // show results - Correct or incorrect
  if (Number(userAnswer) != correctAnswer) {
    resultEl.textContent = 'Wrong !';

    //if answer is incorrect minus
    timerCount -= 10;

    return;
  }

  //If Correct show correct
  resultEl.textContent = 'Correct !';
  //show next question
}

//show high scores display board
// function showScoreBoard() {

// }

//add click listeners on btns
goBack.addEventListener('click', function () {
  location.reload();
});

clearScore.addEventListener('click', clearBoard);
//clear high score btn
function clearBoard() {
  playersList = [];
  ulDisplayHighscore.innerHTML = '';
  localStorage.clear();
}

function hideSection(elements) {
  elements.forEach((el) => el.classList.add('d-none'));
}

function showSection(elements) {
  elements.forEach((el) => el.classList.remove('d-none'));
}

//show high score function
function showHighScore() {
  //hide quiz, nav
  hideSection([startQuiz, quizSection, nav]);
  showSection([scoreBoard]);

  //show Scoreboard

  let storedPlayersList = JSON.parse(localStorage.getItem('playersList')) || [];
  //Use the sort method to sort players by points high to small
  let sortedPlayersList = storedPlayersList.sort((player1, player2) => {
    return player2.points - player1.points;
  });
  let playerHtml = '';
  sortedPlayersList.forEach((player) => {
    playerHtml += `<li class="bg-tertiary mb-2">
                    <h6 class="mb-0 py-3 ms-4">Player Name: ${player.userName} - Points: ${player.points}</h6>
                  </li>`;
  });
  ulDisplayHighscore.innerHTML = playerHtml;
}

// at new score
function addNewScore() {
  //Hide input form
  quizSection.classList.add('d-none');

  let storedPlayersList = JSON.parse(localStorage.getItem('playersList')) || [];

  let newPlayer = {
    userName: userName.value,
    points: timerCount,
  };

  storedPlayersList.push(newPlayer);
  localStorage.setItem('playersList', JSON.stringify(storedPlayersList));
  showHighScore();
}

// Show final score
//ask user to input initials
inputSubmit.addEventListener('click', addNewScore);

startBtn.addEventListener('click', startGame);
//View high scores btn
viewHighScores.addEventListener('click', showHighScore);

//add click listenser
btnsSection.addEventListener('click', (e) => {
  // e.target.classList('')
  //Get Data index number and change from string to number
  let userAnswer = Number(e.target.dataset.index);

  showResults(userAnswer, correctAnswer);
  questionIndex++;

  if (questionIndex < lengthOfQuestions) {
    displayQuestion();
  } else {
    //No more questions
    endGame();
  }
});
//Init
function init() {
  startGame();
}
init();
