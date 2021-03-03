const question = document.getElementById('question');
const answers = Array.from(document.getElementsByClassName('answer-text')); 

let questions = [];         // an Array of questions and answers

fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
    .then(response => {
        return response.json()
    })                                                //credit: James Q Quick: https://www.youtube.com/watch?v=3aKOQn2NPFs
    .then(loadedQuestions => {                         
        questions = loadedQuestions.results.map(loadedQuestion => {   //format the data from API to the format that we need, an Array of objects.
            const formattedQuestion  = {                     
                question: loadedQuestion.question                   //question object
            };
        
            const answers = [...loadedQuestion.incorrect_answers];
            console.log(answers);
    });
});