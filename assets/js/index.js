const startBtn = document.querySelector('.start-btn');

//Html Sections
const startQuiz = document.querySelector('.start-quiz');
const quizContent = document.querySelector('.quiz-content');
const finalScore = document.querySelector('.final-score');
const highScores = document.querySelector('.high-scores');

let timerCount;

//Start challenge
function startGame() {
  startBtn.addEventListener('click', () => {
    startQuiz.classList.add('d-none');
    quizContent.classList.remove('d-none');
    timerCount = 70;
    startTimer();
  });
}

//start timer
function startTimer() {
  const gameTimer = setInterval(() => {
    timerCount--;
  }, 5000);
}
//ClearInterval
// clearInterval(gameTimer);

//show one question from the array of objects

//display 4 possible answer

// check if user input is correct

// show results - Correct or incorrect

//if correct continue

//if answer is incorrect minus timer

//show next question

//end game either when there is no time left or all the questions have been asked

//stop game

// Show final score

//ask user to input initials

//store user name and points in local storage

//show high scores display board

//compare all users score and display highest point up to the top

//go back btn
//clear high score function

//Init
function init() {
  startGame();
}
init();
