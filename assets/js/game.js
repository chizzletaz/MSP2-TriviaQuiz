const question = document.getElementById('question');
const answers = Array.from(document.getElementsByClassName('answer-text')); 



let questions = [];         // an Array of questions and answers

// get questions from API - credit: James Q Quick: https://www.youtube.com/watch?v=3aKOQn2NPFs
fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
    .then(response => {
        return response.json()
    })                                                
    .then(loadedQuestions => {                                        
        questions = loadedQuestions.results.map(loadedQuestion => {   //format the data from the API to the format that we need, an Array of objects.
            const formattedQuestion  = {                     
                question: loadedQuestion.question                     //question object
            };
            
            const answersOption = [...loadedQuestion.incorrect_answers];    //get the incorrect answers from API
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;   //make the index of the correct answer random
            answersOption.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);  // add the correct answer to the array of incorrect answers
            
            answersOption.forEach((option, index) => {                       //add answers to formattedQuestions object
                formattedQuestion["option" + (index + 1)] = option;
            });
            
            return formattedQuestion;
    })
    .catch(error => {
        console.log(error);
});

function startGame() {
    counter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

function getNewQuestion() {
    
}