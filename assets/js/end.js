const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");

const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById('finalScore');
finalScore.innerText = mostRecentScore;

//remove disables from Save-button when user types in name.
//credit: James Q Quick: https://www.youtube.com/watch?v=o3MF_JmQxYg
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value; //if nothing is typed in the inputbox, the saveScoreBtn is disabled.
})

function saveHighScore(event) {
    console.log("clicked the saved button");
    event.preventDefault();
}