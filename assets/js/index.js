const startBtn = document.querySelector('.start-btn');

const timerEl = document.querySelector('.timer-count');

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
    timerCount = 5;
    timerEl.textContent = timerCount;
    startTimer();
  });
}

//start timer
function startTimer() {
  const gameTimer = setInterval(() => {
    timerCount--;
    timerEl.textContent = timerCount;

    //End game if timer is over
    if (timerCount === 0) {
      timerEl.textContent = `Out of Time`;

      //Stop timer
      clearInterval(gameTimer);
      //end game
    }
  }, 1000);
}

//show one question from the objects
const listOfQuestions = {
  ABC: ['one', 'two', 'three', 1],
  BCD: ['one', 'two', 'three', 2],
  CDE: ['one', 'two', 'three', 3],
};

//check lenghth of Questions to know how many times it needs to be looped
let lengthOfQuestions = Object.keys(listOfQuestions).length;
console.log(lengthOfQuestions);

//display 4 possible answer
for (const question in listOfQuestions) {
  console.log(`${question} : ${listOfQuestions[question]}`);
  let [correctAnswer] = listOfQuestions[question].slice(-1);
  console.log(correctAnswer);
}
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
  // startGame();
}
init();
