// Declaring variables
let timerEl = document.querySelector("#timer");
let startEl = document.querySelector("#startQuiz");
let questionsEl = document.querySelector("#Questions");

let remainingTime = 80;
let holdInterval = 0;
let penalty = 10;
let ulCreate = document.createElement("ul");

let score = 0;
let questionIndex = 0;


let quizQuestions = [
  {
    Question: "Arrays in JavaScript can be used to store:",
    answers: ['Numbers and Strings', 'Other Arrays', 'Booleans', 'All of the above'],
    CorrectAnswer: 'All of the above'
  },
  {
    Question: "Commonly used data types DO NOT include:",
    answers: ['Strings', 'Booleans', 'Alerts', 'Numbers'],
    CorrectAnswer: 'Alerts'
  },
  {
    Question: "The condition in an if/else statement is enclosed within:",
    answers: ['Quotes', 'Curly Brackets', 'Parenthesis', 'Square Brackets'],
    CorrectAnswer: 'Parenthesis'
  },   
  {
    Question: "String values must be enclosed in _________ when being assigned to variables",
    answers: ['Commas', 'Curly Brackets', 'Quotes', 'Parenthesis'],
    CorrectAnswer: 'Quotes'
  },   
  {
    Question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ['JavaScript', 'Terminal/Bash', 'For loops', 'Console.log'],
    CorrectAnswer: 'Console.log'
  },   
];

startEl.addEventListener("click", function(){
  if (holdInterval === 0) {
    holdInterval = setInterval(function(){
      remainingTime--;
      timerEl.textContent = 'Time Remaining: ' + remainingTime;
      if (remainingTime <=0) {
        clearInterval(holdInterval);
        complete();
        timerEl.textContent = `Time's up!`
      }
    }, 1000);
  }
  render(questionIndex);
})

function render(questionIndex) {
  questionsEl.innerHTML = "Select One";
  ulCreate.innerHTML = "Select One";
  let userChoice = quizQuestions[questionIndex].answers;
  for (var i = 0; i < quizQuestions.length; i++) {
    let userQ = quizQuestions[questionIndex].Question;
    // let userChoice = quizQuestions[questionIndex].answers;
    questionsEl.textContent = userQ;
  };
  userChoice.forEach(function (newList) {
    let listItem= document.createElement("li");
    listItem.textContent = newList;
    questionsEl.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click",(compare));
  });
}

let createDiv = document.createElement("div");
function compare(event) {
  let element = event.target;
  if (element.matches("li")) {
    createDiv.setAttribute("id", "createDiv");
    if (element.textContent == quizQuestions[questionIndex].CorrectAnswer) {
      score++;
      createDiv.textContent = 'Your choice is correct!';
    } else {
      remainingTime = remainingTime - penalty;
      createDiv.textContent = "Wrong, the correct answer is" + quizQuestions[questionIndex].CorrectAnswer;
    }
  }
  questionIndex++;
  if (questionIndex >= quizQuestions.length) {
    complete();
    // createDiv.textContent = `All done! You scored ` + score `out of 5`;
  } else {
    render(questionIndex);
  }
  questionsEl.appendChild(createDiv);
}

function complete() {
  questionsEl.innerHTML = "";
  timer.innerHTML = "";
// create a header
  let createh1 = document.createElement('h1');
  createh1.setAttribute("id", "createh1");
  createh1.textContent = "You're finished!"
  questionsEl.appendChild(createh1);
// create a paragraph
  let createP = document.createElement("p")
  createP.setAttribute("id", "createP");
  questionsEl.appendChild(createP);
// if statement for when the timer runs out
  if (remainingTime >=0) {
    let timeRemaining = remainingTime;
    let createP2 = document.createElement("p")
    clearInterval(holdInterval);
  createP.textContent = `Your final score is ` + timeRemaining;
  questionsEl.appendChild(createP2);
  }
// creates a label
let createLabel = document.createElement("label");
createLabel.setAttribute("id","createLabel");
createLabel.textContent = "Enter your initials:";
questionsEl.appendChild(createLabel);
// creates an input 
let createInput = document.createElement("input");
createInput.setAttribute("id", "text");
createInput.setAttribute("id","initials");
createInput.textContent = "";
questionsEl.appendChild(createInput);
// creates a submit button
let createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
    questionsEl.appendChild(createSubmit);
// submits initials and score on click for the Highscores
    createSubmit.addEventListener("click", function () {
      let initials = createInput.value;
      if (initials === null) {
          console.log("no information recorded");
      } else {
          var complete = {
              initials: initials,
              score: remainingTime,
          }
          console.log(complete);
          let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
          // highScores.push(complete);
          localStorage.setItem("complete", JSON.stringify(complete));
          window.location.replace(href = "./results.html")
      }
    });
}
