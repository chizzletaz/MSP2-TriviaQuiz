const question = document.getElementById('question');
const answers = Array.from(document.getElementsByClassName('answer-text')); 

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
    .then(response => {
        return response.json()
    })
    .then(loadedQuestions => {
        questions = loadedQuestions.results.map(loadedQuestion => {    //format the info from API to the 
            const formattedQuestion  = {                    // format that we need, an object.
                question: loadedQuestion.question
            };
        console.log(formattedQuestion)
    });
});