// Variables
var quizQuestions = document.querySelector(".questions");
var startButton = document.querySelector(".start");
var timerEl = document.querySelector(".timer");
var secondsLeft = 100;
var createList = document.createElement("ul");
var questionIndex = 0;
var questionsCorrect = 0;
var timerInterval;

// Timer
function setTime() {
    timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = secondsLeft + " seconds remaining";

        if (secondsLeft === 0) {
            //stop timer
            clearInterval(timerInterval);
            scorePage();
            timerEl.textContent = "Time is up!"
        }
    }, 1000);

    renderQuestions(questionIndex);
}

// Create question objects
var questionContent = [
    {
        question: "Commonly used data types do NOT include: ___",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within: ___",
        choices: ["quotations", "curly braces", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store: ___",
        choices: ["numbers", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String value must be enclosed within ___ when being assigned to variables.",
        choices: ["commas", "curly braces", "quotations", "parentheses"],
        answer: "quotations"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is: ___",
        choices: ["JavaScript", "terminal/bash", "alerts", "console.log"],
        answer: "console.log"
    },
]

// Add event listener to start button
startButton.addEventListener("click", function(){
    setTime();
});

// Render questions to corresponding "questions" div
function renderQuestions(questionIndex) {
    // reset content to blank
    quizQuestions.innerHTML = "";
    createList.innerHTML = "";

    // for loop to parse all info in array to change question content
    // for (let i = 0; i < questionContent.length; i++) {
        var currentQuestion = questionContent[questionIndex].question;
        var currentChoices = questionContent[questionIndex].choices;
        quizQuestions.textContent = currentQuestion;
    // }

    // create list items for each string in choices array and render to page
    currentChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        quizQuestions.appendChild(createList);
        createList.appendChild(listItem);

        // add listener to call event target
        listItem.addEventListener("click", checkAnswer);
    })
}

// Check if proper answer selected using events
function checkAnswer(event) {
    var element = event.target;
    // if target event is a list item
    if (element.matches("li")) {
    // create the space where right/wrong answer appears
    var answerFeedback = document.createElement("div");
    answerFeedback.setAttribute("id", "answerFeedback");

    // user chooses correct answer
    if (element.textContent == questionContent[questionIndex].answer) {
        questionsCorrect++;
        answerFeedback.textContent = "Correct! The answer is: " + questionContent[questionIndex].answer;
    // user chooses incorrect answer
    } else {
        answerFeedback.textContent = "Incorrect! The answer is: " + questionContent[questionIndex].answer;
    }
    }

    // increase question index so user can move to next question
    questionIndex++;

    // if question index is larger than our array length, show score page
    if (questionIndex >= questionContent.length) {
        scorePage();
        answerFeedback.textContent = "You've finished the quiz! You selected " + questionsCorrect + "/" + questionContent.length + " correct answers.";
    // otherwise show next question
    } else {
        renderQuestions(questionIndex);
    }

    // update on page
    quizQuestions.appendChild(answerFeedback);
}

// Update the final score page
function scorePage() {
    // clear divs
    quizQuestions.innerHTML = "";
    timerEl.innerHTML = "";

    // add a header
    var endHeader = document.createElement("h2");
    endHeader.setAttribute("id", "endHeader");
    endHeader.textContent = "End of Quiz!";
    // render on page
    quizQuestions.appendChild(endHeader);

    // add a paragraph to show score
    var scoreContent = document.createElement("p");
    scoreContent.setAttribute("id", "scoreContent");
    quizQuestions.appendChild(scoreContent);

    // set score and add to paragraph
    if (secondsLeft >= 0) {
        var timeLeft = secondsLeft;
        clearInterval(timerInterval);
        scoreContent.textContent = "Your final score is: " + timeLeft;
    }
}