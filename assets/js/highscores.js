const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];  //get highscores from localStorage.

highScores.map(score => {
    console.log(score);
});