const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];  //get highscores from localStorage.


// Add highscores to highscore.html. Credit: James Q Quick: https://www.youtube.com/watch?v=jfOv18lCMmw
highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
})
.join("");