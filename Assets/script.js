// Variables
var quizQuestions = document.querySelector(".questions");
var startButton = document.createElement("button");
var timerEl = document.querySelector(".timer");
var secondsLeft = 101;
var createList = document.createElement("ul");
var questionIndex = 0;
var questionsCorrect = 0;
var timerInterval;

// Timer
function setTime() {
    questionIndex = 0;
    secondsLeft = 101;
    questionsCorrect = 0;
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

// Create instructions object
var instructionContent = {
    header: "Take the Code Quiz!",
    directions: "How to take the quiz: ",
}

// Render instructions on page
function renderInstructions() {
    // reset content to blank
    quizQuestions.innerHTML = "";
    createList.innerHTML = "";

    // add a header
    var dirHeader = document.createElement("h2");
    dirHeader.setAttribute("id", "dirHeader");
    dirHeader.textContent = instructionContent.header;
    // render on page
    quizQuestions.appendChild(dirHeader);

    // add a paragraph
    var initInstruct = document.createElement("p");
    initInstruct.setAttribute("id", "initInstruct");
    initInstruct.textContent = instructionContent.directions;
    // render on page
    quizQuestions.appendChild(initInstruct);

    // add the start button
    startButton.textContent = "Start";
    // render on page
    quizQuestions.appendChild(startButton);
}

// Create question objects
var questionContent = [
    {
        question: "Commonly used data types do NOT include: ___",
        choices: ["a) strings", "b) booleans", "c) alerts", "d) numbers"],
        answer: "c) alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within: ___",
        choices: ["a) quotations", "b) curly braces", "c) parentheses", "d) square brackets"],
        answer: "c) parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store: ___",
        choices: ["a) numbers", "b) other arrays", "c) booleans", "d) all of the above"],
        answer: "d) all of the above"
    },
    {
        question: "String value must be enclosed within ___ when being assigned to variables.",
        choices: ["a) commas", "b) curly braces", "c) quotations", "d) parentheses"],
        answer: "c) quotations"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is: ___",
        choices: ["a) JavaScript", "b) terminal/bash", "c) alerts", "d) console.log"],
        answer: "d) console.log"
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

    // change question content
    var currentQuestion = questionContent[questionIndex].question;
    var currentChoices = questionContent[questionIndex].choices;
    quizQuestions.textContent = currentQuestion;

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
        answerFeedback.textContent = "Correct! The answer was: " + questionContent[questionIndex].answer;
    // user chooses incorrect answer
    } else {
        secondsLeft = secondsLeft - 10;
        answerFeedback.textContent = "Incorrect! The answer was: " + questionContent[questionIndex].answer;
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

    // get initials input

    // send score and initials to local storage

    // retrieve score and initials from local storage and sort
    // use something like Array.sort(function(a,b){b-a});

    // add button to return to main screen
    var returnBtn = document.createElement("button");
    returnBtn.setAttribute("id", "returnBtn");
    returnBtn.textContent = "Try Again";
    quizQuestions.appendChild(returnBtn);

    // add event listener to call renderInstructions function
    returnBtn.addEventListener("click", function(){
        renderInstructions();
    });

    // add button to clear high scores  
}
// Show instructions on load
renderInstructions();