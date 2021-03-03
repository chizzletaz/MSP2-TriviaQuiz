const question = document.getElementById('question');
const answers = Array.from(document.getElementsByClassName('answer-text')); 

fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
    .then(response =>{
        console.log(response);
    })


