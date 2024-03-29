//Buttons and form inputs
const startBtn = document.querySelector('.start-btn');
const btnsSection = document.querySelector('.btns-section');
const inputForm = document.getElementById('input-form');
const userName = inputForm.querySelector('#user-name');
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
  nav.classList.remove('d-none');
  startQuiz.classList.remove('d-none');
  //Hide quiz section and scoreboard
  quizSection.classList.add('d-none');
  scoreBoard.classList.add('d-none');

  timerCount = 0;
  questionIndex = 0;
  timerEl.textContent = timerCount;
  resultEl.textContent = '';
  restartQuestion();

  startBtn.addEventListener('click', () => {
    quizSection.classList.remove('d-none');
    quizContent.classList.remove('d-none');
    finalScore.classList.add('d-none');

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
  timerCount = 70;
  timerEl.textContent = timerCount;

  gameTimer = setInterval(() => {
    timerCount--;
    timerEl.textContent = timerCount;

    //End game if timer is over
    if (timerCount <= 0) {
      timerEl.textContent = `Out of Time`;
      //Avoid negative points
      timerCount = 0;
      endGame();
    }
  }, 1000);
}
//end game either when there is no time left or all the questions have been asked
function endGame() {
  //Stop timer
  clearInterval(gameTimer);

  quizContent.classList.add('d-none');
  finalScore.classList.remove('d-none');

  //Add time left to the finalResults obj
  finalResult = {
    points: timerCount,
  };

  finalTimeEl.textContent = finalResult.points;
  getUserName();
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
  //Hide unwanted sections
  startQuiz.classList.add('d-none');

  //Show quiz
  quizSection.classList.remove('d-none');

  //Remove old btns and Questions from last round
  restartQuestion();

  let chosenQuestion = Object.keys(listOfQuestions)[questionIndex];
  let chosenChoices = listOfQuestions[chosenQuestion];
  //Grab last item and use array destructing
  let [correctAnswer] = chosenChoices.slice(-1);

  // console.log(chosenQuestion, chosenChoices, correctAnswer);

  //display the question
  questionEl.textContent = chosenQuestion;

  //loop thru the array and generate a button for each element
  chosenChoices.forEach((choice, index, array) => {
    // Exclude the last item in the array (which is the answer)
    // Create btn for all choice except last
    if (index !== array.length - 1) {
      let indexOfBtn = chosenChoices.indexOf(choice);
      let button = document.createElement('button');

      //Add btn style and data index
      button.setAttribute('class', 'btn-choice btn btn-primary mb-3 p-3');
      button.setAttribute('data-index', indexOfBtn);

      //Add correct text for each btn
      button.appendChild(
        document.createTextNode(`${indexOfBtn + 1}. ${choice}`)
      );
      btnsSection.appendChild(button);
      // console.log(choice);

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
          endGame();
        }
      });
    }
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
  // console.log(userAnswer, correctAnswer);

  // show results - Correct or incorrect
  if (Number(userAnswer) != correctAnswer) {
    resultEl.textContent = 'Wrong !';

    //if answer is incorrect minus
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
  //hide quiz, nav
  startQuiz.classList.add('d-none');
  quizSection.classList.add('d-none');
  nav.classList.add('d-none');

  //show Scoreboard
  scoreBoard.classList.remove('d-none');

  //Use the sort method to sort players by points high to small
  let sortedPlayersList = playersList.sort((player1, player2) => {
    return player2.finalResult.points - player1.finalResult.points;
  });

  sortedPlayersList.forEach((player) => {
    let li = document.createElement('li');
    li.setAttribute('class', 'bg-tertiary mb-2');

    let h6 = document.createElement('h6');
    h6.setAttribute('class', 'mb-0 py-3 ms-4');

    li.appendChild(h6).appendChild(
      document.createTextNode(
        `Player Name: ${player.finalResult.userName} - Points: ${player.finalResult.points}`
      )
    );

    ulDisplayHighscore.appendChild(li);
  });
}

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

// Show final score
//ask user to input initials
function getUserName() {
  inputForm.addEventListener('submit', function (e) {
    e.preventDefault();

    //Hide input form
    quizSection.classList.add('d-none');
    //Add UserName to object
    finalResult['userName'] = userName.value;

    playersList.push({ finalResult });
    storeUserInfo();

    userName.value = '';

    //show high score board
    showScoreBoard();
  });
}

//store user name and points in local storage
function storeUserInfo() {
  localStorage.setItem('playersList', JSON.stringify(playersList));
}

//Init
function init() {
  let storedPlayersList = JSON.parse(localStorage.getItem('playersList'));

  // If playersList were retrieved from localStorage, update the playersList array to it
  if (storedPlayersList !== null) {
    playersList = storedPlayersList;
  }

  startGame();
}
init();
