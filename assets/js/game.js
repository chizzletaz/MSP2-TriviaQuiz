/*jshint esversion: 6 */

const question = document.getElementById('question');
const answers = Array.from(document.getElementsByClassName('answer-text'));

const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

const category = document.getElementById('category');

const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

const musicOn = document.getElementById("music-on");
const musicOff = document.getElementById("music-off");
const soundOn = document.getElementById('sound-on');
const soundOff = document.getElementById('sound-off');

const nextQuestion = document.getElementById("next-question");
const levelText = document.getElementById('level');

let questions = [];         /* an Array of questions and answers */
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let currentQuestion = {};

let level = 1;

var object = JSON.parse(localStorage.getItem('key'));
let token = object.token;

const urlEasy = `https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple&token=${token}`;
const urlMedium = `https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple&token=${token}`;
const urlHard = `https://opentdb.com/api.php?amount=10&difficulty=hard&type=multiple&token=${token}`;

window.onload = fetchQuestions(urlEasy);

/* get questions from API - credit: James Q Quick: https://www.youtube.com/watch?v=3aKOQn2NPFs */
function fetchQuestions(url) {
    checkMusic();
    checkSound();
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(loadedQuestions => {
            questions = loadedQuestions.results.map(loadedQuestion => {   //format the data from the API to the format that we need, an Array of objects.
                const formattedQuestion = {
                    question: loadedQuestion.question                     //question object
                };

                const answerOptions = [...loadedQuestion.incorrect_answers];    //get the incorrect answers from API
                formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;   //make the index of the correct answer random
                answerOptions.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);  // add the correct answer to the array of incorrect answers

                answerOptions.forEach((option, index) => {                       //add answers to formattedQuestions object
                    formattedQuestion["option" + (index + 1)] = option;
                });

                return formattedQuestion;
            });
            switch (level) {
                case 1:
                    startGame();
                    break;
                case 2:
                    startGame2();
                    break;
                case 3:
                    startGame3();
                    break;
            }

        })
        .catch(error => {
            console.log(error);
        });
}

// Constants 
const correct_PointsL1 = 10;
const correct_PointsL2 = 20;
const correct_PointsL3 = 30;

const max_Questions = 10;    //number of questions per round.

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    loader.classList.add('hidden');
    game.classList.remove('hidden');

}

function getNewQuestion() {
    levelText.innerHTML = `${level}`;    /* update the level the user is playing */
    questionCounter++;
    questionCounterText.innerText = `Question: ${questionCounter} of ${max_Questions}`;
    // update the progress bar. credit James Q Quick: https://www.youtube.com/watch?v=4bctmtuZVcM
    progressBarFull.style.width = `${(questionCounter / max_Questions) * 100}%`;

    //get a random question from available questions
    const questionIndex = Math.floor(availableQuestions.length * Math.random());
    currentQuestion = availableQuestions[questionIndex];
    question.innerHTML = currentQuestion.question;

    //Add answers to the challenge.html page
    answers.forEach(answer => {
        const number = answer.dataset.number;
        answer.innerHTML = currentQuestion['option' + number];
    });

    //remove used question from available questions
    availableQuestions.splice(questionIndex, 1);
}

/* Add eventlistener to which answer is given */
answers.forEach(option => {
    option.addEventListener('click', event => {
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset.number;     //get the number of the selected answer.

        let classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
            if (soundOn.parentElement.classList.value === 'hidden') {
                let audioCorrect = new Audio('assets/music/correct_answer.mp3');
                audioCorrect.play();
            }
        }
        else if (soundOn.parentElement.classList.value === 'hidden') {
            let audioIncorrect = new Audio('assets/music/incorrect_answer.mp3');
            audioIncorrect.play();
        }

        if (classToApply === 'correct') {       /* increment Score according to the level the user is playing */
            switch (level) {
                case 1:
                    incrementScore(correct_PointsL1);
                    break;
                case 2:
                    incrementScore(correct_PointsL2);
                    break;
                case 3:
                    incrementScore(correct_PointsL3);
                    break;
            }
        }

        //Add green colour to correct answer and red colour to incorrect answer.
        selectedChoice.parentElement.classList.add(classToApply);

        showRightAnswer();

        //Remove green an red background from answer-containers and go to next Question.
        nextQuestion.addEventListener('click', () => {
            const numb = currentQuestion.answer;
            const choices = document.querySelectorAll('[data-number]');
            choices[numb - 1].parentElement.classList.remove('correct');

            selectedChoice.parentElement.classList.remove(classToApply);

            // go to next level when previous level is over. go to end-modal when all levels are played.
            if (availableQuestions.length === 0 || questionCounter >= max_Questions) {
                level++;
                switch (level) {
                    case 2:
                        $('#goToLevel2').modal('show');
                        break;
                    case 3:
                        $('#goToLevel3').modal('show');
                        break;
                    case 4:
                        let mostRecentScore = score;
                        const finalScore = document.getElementById('finalScore');
                        finalScore.innerText = mostRecentScore;
                        localStorage.setItem('mostRecentScore', score);
                        // go to end modal. credit: https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp
                        $("#staticBackdrop").modal('show');
                        break;
                }
            } else {
                getNewQuestion();
            }

        }, { once: true });
    });
});

function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
}

// these functions I made and worked myself:
function showRightAnswer() {
    const numb = currentQuestion.answer;
    const choices = document.querySelectorAll('[data-number]');
    choices[numb - 1].parentElement.classList.add('correct');
}

function playMusic() {
    music.play();
    musicOn.parentElement.classList.add('hidden');
    musicOff.parentElement.classList.remove('hidden');
    localStorage.setItem('music', 'on');
}

function muteMusic() {
    music.pause();
    musicOn.parentElement.classList.remove('hidden');
    musicOff.parentElement.classList.add('hidden');
    localStorage.setItem('music', 'off');
}

function playSound() {
    soundOn.parentElement.classList.add('hidden');
    soundOff.parentElement.classList.remove('hidden');
    localStorage.setItem('sound', 'on');
}

function muteSound() {
    soundOn.parentElement.classList.remove('hidden');
    soundOff.parentElement.classList.add('hidden');
    localStorage.setItem('sound', 'off');
}

// LEVEL 2
function startGame2() {
    questionCounter = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    loader.classList.add('hidden');
    game.classList.remove('hidden');
}

// LEVEL 3
function startGame3() {

    questionCounter = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    loader.classList.add('hidden');
    game.classList.remove('hidden');
}

function goToLevel2() {
    fetchQuestions(urlMedium);
}

function goToLevel3() {
    fetchQuestions(urlHard);
}

// credit: my mentor Antonio Rodriguez.
function checkMusic() {
    if ((localStorage.getItem("music") === null) || (localStorage.getItem("music") === 'off')) {
        console.log('music is off');
    }
    else {
        console.log('music is on');
        playMusic();
    }
}

function checkSound() {
    if ((localStorage.getItem("sound") === null) || (localStorage.getItem("sound") === 'off')) {
        console.log('sound is off');
    }
    else {
        console.log('sound is on');
        playSound();
    }
}