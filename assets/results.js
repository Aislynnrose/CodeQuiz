// declaring variables
let score = document.querySelector("#highScores");
let clear = document.querySelector("#clear");
let back = document.querySelector("#Return");

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
        score.appendChild(createLi);

    }
}
// Event listener to move to index page
back.addEventListener("click", function () {
    window.location.replace(src = "../quiz.html");
});