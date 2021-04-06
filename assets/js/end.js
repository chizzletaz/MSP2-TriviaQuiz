/*jshint esversion: 6 */
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");

const highScores = JSON.parse(localStorage.getItem('highScores')) || []; //items in localStorage are strings -> user JSON.parse() credit: James Q Quick: https://www.youtube.com/watch?v=DFhmNLKwwGw

//remove disables from Save-button when user types in name.
//credit: James Q Quick: https://www.youtube.com/watch?v=o3MF_JmQxYg
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;  /* if nothing is typed in the inputbox, the saveScoreBtn is disabled.*/
});

// Credit: James Q Quick: https://www.youtube.com/watch?v=DFhmNLKwwGw
function saveHighScore(event) {
    event.preventDefault();
    const mostRecentScore = localStorage.getItem('mostRecentScore');
    //create an object with keys of 'score' and 'name'
    const score = {
        score: mostRecentScore,
        name: username.value
    };

    highScores.push(score);     //add score to highScores array.
    highScores.sort((a, b) => b.score - a.score);    //sort the scores from high to low. 
    highScores.splice(5);   //cut off at the highest 5 scores.

    localStorage.setItem('highScores', JSON.stringify(highScores));     //stringify because localStorage has to be a string.
    window.location.assign('index.html');   //go home after saving the score.
    alert('Your score has been saved!');
}