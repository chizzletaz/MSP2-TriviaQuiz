# **Testing**

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant.   
A particularly useful form for describing your testing process is via scenarios, such as:
Contact form:
Go to the "Contact Us" page
Try to submit the empty form and verify that an error message about the required fields appears
Try to submit the form with an invalid email address and verify that a relevant error message appears
Try to submit the form with all inputs valid and verify that a success message appears.

## Testing user stories
### First time users:
**1. As a first time user, I want to navigate easily across the website.**  
1. The user can return to the landing page by either useing the 'Triviata' text on top of the challenge, practice and high scores page or use the button with the home-icon. 
1. go to any page but the landing page.  
2. click on ‘Triviata’ at the top of the page and verify that you are directed to the landing page.

Home button:  
1. Go to any page but the landing page.
2. Click on the button with the house-icon and verify that you are directed to the landing page.

Start Playing button:  
1. On the landing page, click on the ‘Start Playing’ button.
2. Click on the ‘Challenge’ button and verify that you are directed to the challenge game page.
3. Repeat step 1 and click on the 'Practice' button and verify that you are directed to the practice game page.

**2. As a first time user, I want to know what the game is about, so I can play the game with ease.**
1. On the landing page, click on the button that says ‘How to play’ and verify that a modal pops up with the explanation of the game.

**Returning users:**  

**1. As a user, I want to play the game on different screen sizes.**  
1. 
As a user, I want to have some control over the game, so I can play the game in my own pace.
As a user, I want to see/hear if my answer is correct or not.
As a user, I want to see the right answer, when I gave a wrong answer, so I can learn from my mistakes.
As a user, I want to see how many points I have.
As a user, I want to save my score and see the high scores, so I challenge myself to play better.
As a user, I want to choose different game modes, so the game is more versatile.

**developer stories:**  
As a developer I want to give feedback and control to the users before, during and after the game, for a better playing experience.
As a developer I want to challenge the user, so they will come back and play some more.
As a developer I want my users to be able to play on all devices.

## Manual testing features

## Code validation
HTML and CSS online validators.
Use Chrome Dev Tools: right click -> inspect -> search/select Lighthouse from the top screen.

## Testing browser compatibility

## Testing responsiveness
In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

## Bugs and problems

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

---
SOLVED
The user can turn on/off the sound and/or background music. The functions for this work, however,
when a user changes the default setting and refreshes the page, the user's changes don't stay and the default settings return.
Fix: with help of my tutor Antonio Rodriguez, we fixed the problem. 
By adding functions that check whether the music and sound is on or off and adding these functions to the fetchQuestion function.
The default setting is that music and sound are off. If the user changes the setings, the setting is set to localStorage.
Upon loading the challenge or practice page, the checkMusic and checkSound function check the settings and change the default
setting if neccesary.

---
SOLVED
I made three levels of the game. After the number of questions for level 1, the game automatically goes to level 2 (and from level 2
to level 3). 
However at the end the questionindicator adds another question and the progressBar goes [outside](/workspace/MSP2-TriviaQuiz/assets/documents/questionindicator-flaw.png) it's container.
Fix: I've put the condition to go the next level (if (availableQuestions.length === 0 || questionCounter >= max_Questions) {....) before the function getNewQuestion 
(inside the nextQuestion-eventListener), in stead of in the function getNewQuestion itself. This seems to have solved the problem.

---
SOLVED
I want to add a Session Token to the URL, so the user doesn't get the same question twice.
To do this I made a function that gets a Session Token from the API and adds it to the URL.
In order to get the Session Token before fetching the questions, the window.onload should load the getToken function first.
So the fetchQuestions function is put inside the getToken function.

This works, but now every time a new level is reached, a new session token is retrieved. This could still give the same questions,
because the condition that the same question is not used is valid per token.

Idea: Get the token on loading the index.html page and set to localStorage.
This works. However, everytime the user goes to the home page, a new Session Token is retrieved.

According to the API documentation, a session token is deleted (i.e. unusable) after 6 hours.
IDEA:Check the time stamp of the token: if it is older than 6 hours; get a new token. 
Else use the token in localStorage. 
Using and modifying the localStorage example with timestamp [Credit:dotspencer](https://gist.github.com/dotspencer/a99e004a31cbd93fa8f7828bece58708),
I added the a timestamp to the token and saved it as an object to localStorage.
In the game.js the token is retrieved to be used in the game.
Issue: the first time there is no key in localStorage, this gives an error. So I made a function for checking the token and invoking this function on
window.onload.
