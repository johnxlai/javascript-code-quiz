const startBtn = document.querySelector('.start-btn');
const btnsSection = document.querySelector('.btns-section');

//Display Elements
const timerEl = document.querySelector('.timer-count');
const questionEl = document.querySelector('.question');
const resultEl = document.querySelector('.results');

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
  ABC: ['one', 'two', 'three', 'four', 1],
  // BCD: ['one', 'two', 'three', 'four', 2],
  // CDE: ['one', 'two', 'three', 'four', 3],
};

//check length of Questions to know how many times it needs to be looped
let lengthOfQuestions = Object.keys(listOfQuestions).length;

let n = 0;
while (n < lengthOfQuestions) {
  let chosenQuestion = Object.keys(listOfQuestions)[n];
  let chosenChoices = listOfQuestions[chosenQuestion];
  let correctAnswer = chosenChoices.pop();
  n++;

  console.log(chosenQuestion, chosenChoices, correctAnswer);

  //display the question
  questionEl.textContent = chosenQuestion;

  //loop thru the array and generate a button for each element
  chosenChoices.forEach((choice) => {
    let indexOfBtn = chosenChoices.indexOf(choice);
    let button = document.createElement('button');
    //Add btn style
    button.setAttribute('class', 'btn btn-primary mb-3 p-3');

    //set index number in the array
    button.setAttribute('data-index', indexOfBtn);
    //Add correct text for each btn
    button.appendChild(document.createTextNode(`${indexOfBtn + 1}. ${choice}`));
    btnsSection.appendChild(button);
    console.log(choice);

    //add click listenser
    button.addEventListener('click', function () {
      //Get Data index number and change from string to number
      let userAnswer = Number(button.getAttribute('data-index'));

      //pass arguements to check user result
      checkUserAnswer(userAnswer, correctAnswer);
    });
  });
}
function goToNextQuestion() {}
// check if user input is correct

function checkUserAnswer(userAnswer, correctAnswer) {
  console.log(userAnswer, correctAnswer);

  if (Number(userAnswer) != correctAnswer) {
    resultEl.textContent = 'Wrong !';
    return;
  }
  resultEl.textContent = 'Correct !';
}

function showResults() {
  // show results - Correct or incorrect
  //if correct continue
  //if answer is incorrect minus timer
  //show next question
}

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
