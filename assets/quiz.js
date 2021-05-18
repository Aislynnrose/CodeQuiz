// Declaring variables
let timerEl = document.querySelector("#timer");
let startEl = document.querySelector("#startQuiz");
let questionsEl = document.querySelector("#Questions");

let remainingTime = 80;
let holdInterval = 0;
let penalty = 10;
let ulCreate = document.createAttribute("ul");

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

function compare(event) {
  let element = event.target;
  if (element.matches("li")) {
    let createDiv = document.createAttribute("div");
    createDiv.setAttribure("id", "createDiv");
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
    createDiv.textContent = `All done! You scored ` + score `out of 5`;
  } else {
    render(questionIndex);
  }
  questionsEl.appendChild(createDiv);
}

function complete() {
  questionsEl.innerHTML = "";
  timer.innerHTML = "";
// create a header
  let createh1 = document.createAttribute('h1');
  createh1.setAttribure("id", "createh1");
  createh1.textContent = "You're finished!"
  questionsEl.appendChild(createh1);
// create a paragraph
  let createP = $('<p>');
  createP.setAttribure("id", "createP");
  questionsEl.appendChild(createP);
// if statement for when the timer runs out
  if (remainingTime >=0) {
    let timeRemaining = remainingTime;
    let createP2 = $('<p');
    clearInterval(holdInterval);
  createP.textContent = `Your final score is ` + timeRemaining;
  questionsEl.appendChild(createP2);
  }
// creates a label
let createLabel = document.createAttribute("label");
createLabel.setAttribute("id","createLabel");
createLabel.textContent = "Enter your initials:";
questionsEl.appendChild(createLabel);
// creates an input 
let createInput = document.createElement("input");
createInput.setAttribure("id", "text");
createInput.setAttribure("id","initials");
createInput.textContent = "";
questionsEl.appendChild(createInput);
// creates a submit button
let createSubmit = document.createAttribute("button");
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
              score: timeRemaining
          }
          console.log(complete);
          let highScores = localStorage.getItem("highScores");
          if (highScores === null) {
            highScores == [];
          } else {
            highScores = JSON.parse(highScores);
          }
          complete.push(complete);
          let newScore = JSON.stringify(complete);
          localStorage.setItem("complete", newScore);
          window.location.replace(href = "./results.html")
      }
    });
}
