const username = document.getElementById("username");

username.addEventListener('keyup', () => {
    console.log(username.value);
})

function saveHighScore(event) {
    console.log("clicked the saved button");
    event.preventDefault();
}