'use strict';

let currentQuestionNumber = 0;
let score = 0;

function renderAnswerChoices() {
  if (currentQuestionNumber < STORE.length) {
    $('.js-mainQuizContent').html(`<form class="questions js-questions">
    <fieldset>    
    <label class="label" for="firstChoice">${STORE[currentQuestionNumber].answers[0]}
    <input type="radio" name="philosopherName" id="firstChoice" value="${STORE[currentQuestionNumber].answers[0]}" required>
    <span class="checkmark"></span>
    </label>
    <br>
    <label class="label" for="secondChoice">${STORE[currentQuestionNumber].answers[1]}
    <input type="radio" name="philosopherName" id="secondChoice" value="${STORE[currentQuestionNumber].answers[1]}">
    <span class="checkmark"></span>
    </label>
    <br>
    <label class="label" for="thirdChoice">${STORE[currentQuestionNumber].answers[2]}
    <input type="radio" name="philosopherName" id="thirdChoice" value="${STORE[currentQuestionNumber].answers[2]}">
    <span class="checkmark"></span>
    </label>
    <br>
    <label class="label" for="fourthChoice">${STORE[currentQuestionNumber].answers[3]}
    <input type="radio" name="philosopherName" id="fourthChoice" value="${STORE[currentQuestionNumber].answers[3]}">
    <span class="checkmark"></span>
    </label>
    <br>
    </fieldset>
    <button type="submit" class="js-submit"><span>Submit Answer</span></button>
    </form>`);
  }
}

function renderQuestionNumber() {
  $('.js-questionNumber').html(`<div class="question">Question: ${STORE[currentQuestionNumber].id}/10</div>`);
}

function renderScore() {
  $('.js-score').html(`<div class="score">Score: ${score}</div>`);
}

function increaseQuestionNumber() {
  currentQuestionNumber++;
  renderQuestionNumber();
}

function increaseScore() {
  score++;
  renderScore();
}

function nextQuestion() {
  $('h1').text(STORE[currentQuestionNumber].question);
}

function handleStartQuiz() {
  //this function will be responsible for starting the quiz
  console.log('`handleStartQuiz` ran');
  $('.startQuiz').on('click', function(event) {
    $('h1').text(STORE[currentQuestionNumber].question);
    renderQuestionNumber();
    renderScore();
    renderAnswerChoices();
  });
}

function nextQuestionButton() {
  if (STORE[currentQuestionNumber].id === 10) {
    $('.js-mainQuizContent').append('<button type="button" class="showFinalScore js-showFinalScore"><span>See Final Score</span></button>');
  } else {
    $('.js-mainQuizContent').append('<button type="button" class="nextQuestion js-nextQuestion"><span>Next Question</span></button>');
  }
}

function handleUserAnswerSubmission() {
  //this function will be responsible for when users select an answer  
  console.log('`handleUserAnswerSubmission` ran');
  $('.js-mainQuizContent').on('submit', function(event) {
    event.preventDefault();
    let userAnswer = $('input:checked').val();
    let rightAnswer = STORE[currentQuestionNumber].correctAnswer;
    if (userAnswer === rightAnswer) {
      $('.js-mainQuizContent').html('<p>You got it right! Great job!</p>');
      increaseScore();
    } else { $('.js-mainQuizContent').html(`<p>Sorry, the correct answer is ${STORE[currentQuestionNumber].correctAnswer}.</p>`);
    }
    nextQuestionButton();
  });
}

function handleNextQuestion() {
  /* this function will be responsible for when a user clicks the
  button to go to the next question */
  console.log('`handleNextQuestion` ran');
  $('.js-mainQuizContent').on('click', '.js-nextQuestion', function(event) {
    increaseQuestionNumber();
    nextQuestion();
    renderAnswerChoices();
  });
}

function retakeButton() {
  $('.js-mainQuizContent').append('<br><button type="button" class="retakeQuiz js-retakeQuiz"><span>Retake Quiz</span></button>');
}

function handleFinalScoreUpdate() {
  /* this function will be responsbile for when a user clicks the
  button to see their final score */
  console.log('`handleFinalScoreUpdate` ran');
  $('.js-mainQuizContent').on('click', '.js-showFinalScore', function(event) {
    if (score >= 7) {
      $('.js-mainQuizContent').html(`<p>Congratulations! You got ${score} out of 10 questions right for a score of ${score*10}%. You passed!</p>`);
    } else {
      $('.js-mainQuizContent').html(`<p>You got ${score} out of 10 questions right for a final score of ${score*10}%, so unfortunately you didn't pass. Study up and then try again!</p>`);
    }
    retakeButton();
  });
}

function handleRetakeQuiz() {
  /* this function will be responsible for when a user wants to
  retake the quiz */
  console.log('`handleRetakeQuiz` ran');
  $('.js-mainQuizContent').on('click', '.js-retakeQuiz', function(event) {
    location.reload();
  });
}

function handlePhilosophyQuiz() {
  /* this is our callback function for when the page loads. it will
  activate all the other functions */
  handleStartQuiz();
  handleUserAnswerSubmission();
  handleNextQuestion();
  handleFinalScoreUpdate();
  handleRetakeQuiz();
}

//when the page loads call:
$(handlePhilosophyQuiz);