Making a function: when clicking 'next question'-button, the green and red backgrounds of the answers 
are removed and a new question is loaded.

function goToNextQuestion() {
    nextQuestion.addEventListener('click', () => {
        let answers = document.getElementsByClassName('answer-container')
        answers.forEach(answer => {
            answer.classList.remove('correct');
            answer.classList.remove('incorrect');
        });
        getNewQuestion();
    }); 
}
Doesn't work.

function goToNextQuestion() {
    nextQuestion.addEventListener('click', () => {
        const numb = currentQuestion.answer;
        const choices = document.querySelectorAll('[data-number]');
        choices[numb -1].parentElement.classList.remove('correct');
        getNewQuestion();
    }); 
}

function is working partially. The red background (incorrect answer) isn't removed.

putting the eventListener inside the eventListener to which answer is given:
nextQuestion.addEventListener('click', () => {
            const numb = currentQuestion.answer;
            const choices = document.querySelectorAll('[data-number]');
            choices[numb -1].parentElement.classList.remove('correct');

            selectedChoice.parentElement.classList.remove(classToApply);
            
            getNewQuestion();
});

This works, but the end-modal is shown 1 question too soon (after 2 instead of 3 questions).
