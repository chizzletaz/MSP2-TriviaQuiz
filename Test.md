SOLVED
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
When using console.log(availableQuestions.length), after question 1 the number is 9, after question 2, 
the number is 8 and goes directly to 7. 
After consulting with Tutor assistance, the issue seemed that after each question I was adding another
eventListener. 
The solution was to remove the eventListener after use. 
According to [Developer.Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
you can add {once: true}, this indicates that the listener should be invoked at most once after being added. 
If true, the listener would be automatically removed when invoked.

----------------------
UNSOLVED
The user can turn on/off the sound and/or background music. The functions for this work, however,
when a user changes the default setting and refreshes the page, the user's changes don't stay and the default settings return.



----------------------
SOLVED
I made three levels of the game. After the number of questions for level 1, the game automatically goes to level 2 (and from level 2
to level 3). 
However at the end the questionindicator adds another question and the progressBar goes [outside](/workspace/MSP2-TriviaQuiz/assets/documents/questionindicator-flaw.png) it's container.
Fix: I've put the condition to go the next level (if (availableQuestions.length === 0 || questionCounter >= max_Questions) {....) before the function getNewQuestion 
(inside the nextQuestion-eventListener), in stead of in the function getNewQuestion itself. This seems to have solved the problem.

----------------------

