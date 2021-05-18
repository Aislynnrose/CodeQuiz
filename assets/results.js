// declaring variables
let score = document.querySelector("#HighScores");
let clear = document.querySelector("#clear");

// Event listener to clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Retreives local stroage 
let complete = localStorage.getItem("complete");
complete = JSON.parse(complete);

if (complete !== null) {

    for (var i = 0; i < complete.length; i++) {

        let createLi = document.createElement("li");
        createLi.textContent = complete[i].initials + " " + complete[i].score;
        score.appendChild(createLi);

    }
}