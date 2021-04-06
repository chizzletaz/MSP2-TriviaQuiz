/*jshint esversion: 6 */
const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];  //get highscores from localStorage.


// Add highscores to highscore.html. Credit: James Q Quick: https://www.youtube.com/watch?v=jfOv18lCMmw
highScoresTable.innerHTML = highScores.map((score, index) => {
    return `<tr class="high-score"><td class="tac"><span class="rank">${index + 1}</span> </td><td class="tal">${score.name}</td><td class="tar">${score.score}</td></tr>`;
})
    .join("");
