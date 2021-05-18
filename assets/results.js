// declaring variables
let results = document.querySelector("#Highscores");
let clear = document.querySelector("#clear");

// Event listener to clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Retreives local stroage 
let highScores = localStorage.getItem("highScores");
highScores = JSON.parse(highScores);

if (highScores !== null) {

    for (var i = 0; i < highScores.length; i++) {
        let createLi = document.createElement("li");
        createLi.textContent = highScores[i].initials + " " + highScores[i].score;
        results.appendChild(createLi);
    }
}