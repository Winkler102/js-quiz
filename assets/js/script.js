//Global Variables
let timer = 60;
let newQuiz = true;
let scoreCheckLoop = true;
let questionChoosen = 0;
let quesChoosenArray = [];
let timeStop = false;
let quizComplete = 5;
let scoreboard = [];

//Questions
const questionsArray = [
    {
        q: "'What data types are used for JavaScript' - Andy Droid",
        a: ["Boolean", "String", "Number", "All Choices"],
        ca: "All Choices"
    },
    {
        q: "'What is JavaScript' - Andy Droid",
        a: ["JavaScript is a programming language", "A Tasty Taco", "A type of writing", "My favorite animal"],
        ca: "JavaScript is a programming language"
    },
    {
        q: "'What allows you to repeat a section of code a certain number of times' - Andy Droid'",
        a: ["function();", "if(){};", "for(){};", "var x = y;"],
        ca: "for(){}"
    },
    {
        q: "'Which HTML element allows for JavaScript to be run in the HTML document.' - Andy Droid",
        a: ["<script>", "<js>", "<animate>", "<style>"],
        ca: "<script>"
    },
    {
        q: "'What Document method returns the first element within the document that matches the specified selector' - Andy Droid",
        a: [".compatMode", ".activeElement", ".querySelector();", ".cookie;"],
        ca: ".querySelector(selectors);"
    }];

// QuerSelectors
let startButtonEl = document.querySelector("#answer-button");
let answerOptionsEl = document.querySelector("#answer");
let answerListEl = document.querySelector("#answers-list")
let gameRulesEl = document.querySelector("#game-rules");
let questionEl = document.querySelector("#question");
let multipleChoiceEl = document.querySelector("#multiple-choice");
let setTime = document.querySelector("#time");
let mainEl = document.querySelector("#main");
let scoresheetEl = document.querySelector("#scoresheet")

// Empty page for new content
let clearBoard = function () {
    answerOptionsEl.remove();
    gameRulesEl.remove();
}

// Generates answer buttons
let createMultiChoice = function (choosenQuestion) {
    if (newQuiz) {
        for (o = 0; o < questionsArray[choosenQuestion].a.length; o++) {
            let answerChoices = document.createElement("li")
            answerChoices.className = "answer";
            answerChoices.id = "answer";
            let answerOption = document.createElement("button");
            answerOption.className = "answer-button";
            answerOption.id = "answer-button" + (o + 1);
            answerOption.value = questionsArray[choosenQuestion].a[o];
            answerOption.textContent = questionsArray[choosenQuestion].a[o];
            answerChoices.appendChild(answerOption);
            multipleChoiceEl.appendChild(answerChoices);
        }
        newQuiz = false;
    } else {
        for (y = 0; y < questionsArray[choosenQuestion].a.length; y++) {
            const answerButton = document.querySelector("#answer-button" + (y + 1));

            if (answerButton !== null) {
                answerButton.value = questionsArray[choosenQuestion].a[y];
                answerButton.textContent = questionsArray[choosenQuestion].a[y];
            }
        }
    }
}

// Checks if answer is correct
let checkAnswer = function (event) {
    let selectedAnswer = event.target.value;
    if (selectedAnswer === questionsArray[questionChoosen].ca) {
        timer += 10;
    } else {
        if (timer > 5) {
            timer -= 5;
        } else {
            timer = 0;
        }
    }
    quizComplete--;
}

// Makes answer buttons work
let answerQuestion = function () {
    if (quizComplete > 0) {
        document.querySelector("#answer-button1").addEventListener("click", checkAnswer)
        document.querySelector("#answer-button2").addEventListener("click", checkAnswer);
        document.querySelector("#answer-button3").addEventListener("click", checkAnswer);
        document.querySelector("#answer-button4").addEventListener("click", checkAnswer);
        document.querySelector("#answer-button1").addEventListener("click", askQuestion);
        document.querySelector("#answer-button2").addEventListener("click", askQuestion);
        document.querySelector("#answer-button3").addEventListener("click", askQuestion);
        document.querySelector("#answer-button4").addEventListener("click", askQuestion);
    }
}

// Randmizes the question order
let randomQuestion = function () {
    questionChoosen = Math.floor(Math.random() * (questionsArray.length));
    if (quizComplete < 1) {
        finalScore();
    } else if (quesChoosenArray.includes(questionChoosen)) {
        randomQuestion();
    } else {
        quesChoosenArray.push(questionChoosen);
    }

}

//displays selected question
let askQuestion = function () {
    randomQuestion();
    questionEl.textContent = questionsArray[questionChoosen].q;
    createMultiChoice(questionChoosen);
    answerQuestion();
}

// run timer
let runTimer = function () {
    let timeTraker = setInterval(function () {
        if (timer < 1 || timeStop) {
            setTime.textContent = timer;
            clearInterval(timeTraker);
            finalScore();
        } else {
            setTime.textContent = timer;
            timer--
        }
    }, 1000);
}

// reset page
let resetButton = function () {
    saveHighscore();
    scoreCheckLoop = true;
    window.location.reload();
}

// creates Highscore table

let highscoreTable = function () {
    let scoreTable = document.createElement("table")
    scoreTable.className = "score-table";
    scoreTable.id = "score-table"
    for (let g = 0; g < scoreboard.length; g++) {
        let tableRow = document.createElement("tr");
        let tableName = document.createElement("th");
        tableName.textContent = scoreboard[g].name;
        let tableScore = document.createElement("th");
        tableScore.textContent = scoreboard[g].score;
        if (g % 2 == 0) {
            tableRow.className = "colored-background";
        }
        tableRow.appendChild(tableName);
        tableRow.appendChild(tableScore);
        scoreTable.appendChild(tableRow);
    }

    mainEl.appendChild(scoreTable);

    let oneReset = true
    if (oneReset) {
        let reset = document.createElement("button")
        reset.className = "answer-button reset-button";
        reset.id = "reset-button";
        reset.textContent = "Reset";
        mainEl.appendChild(reset);
        oneReset = false;
    }

    document.querySelector("#reset-button").addEventListener("click", resetButton);

}

//Orders the highscores
let orderHighscore = function () {
    scoreboard.sort((a, b) => (a.score < b.score) ? 1 : -1);
    if (scoreboard.length > 5) {
        scoreboard.length = 5;
    }
}

// Setups highscore page
let setHighscoreBoard = function () {
    scoresheetEl.textContent = "";
    clearBoard();
    orderHighscore();
    questionEl.textContent = "Highscores";
    answerListEl.textContent = "";
    highscoreTable();
}

// create name entry box when getting highscore
let createNameForm = function () {
    let nameForm = document.createElement("input")
    nameForm.className = "name-form";
    nameForm.id = "name-form";
    nameForm.type = "text";
    nameForm.placeholder = "Your name Here";

    let submitName = document.createElement("input")
    submitName.className = "submit";
    submitName.id = "submit";
    submitName.type = "submit";
    submitName.value = "enter";

    let newLine = document.createElement("br")
    answerListEl.appendChild(newLine)
    answerListEl.appendChild(nameForm);
    answerListEl.appendChild(submitName);
}

// gets name from entry box
let getName = function () {
    return document.querySelector("#name-form").value;
}

// adds highscore to scoreboard array
let addNewHighscore = function () {
    newScore = {
        name: getName(),
        score: timer
    };
    scoreboard.push(newScore);

}

// checks for a highscore
let highscoreCheck = function () {
    if (scoreboard.length < 5) {
        answerListEl.textContent = "'You got a highscore please enter name.' - Andy Droid";
        createNameForm();
        const submitSelect = document.querySelector("#submit");
        submitSelect.addEventListener("click", addNewHighscore)
        submitSelect.addEventListener("click", setHighscoreBoard)
    } else {
        for (z = 0; z < 5; z++) {
            if (timer > scoreboard[z].score) {
                answerListEl.textContent = "'You got a highscore please enter name.' - Andy Droid";
                createNameForm();
                const submitSelect = document.querySelector("#submit");
                submitSelect.addEventListener("click", addNewHighscore)
                submitSelect.addEventListener("click", setHighscoreBoard)
                break;
            } else {
                answerListEl.textContent = "'You did not get a highscore better luck next time.' - Andy Dorid";
            }
        }
    }
}

// reads final quiz score and clears board
let finalScore = function () {
    questionEl.textContent = "Your Final Score is " + timer;
    if (scoreCheckLoop) {
        clearBoard();
        if (document.querySelector("#answer-button1") != null ||
            document.querySelector("#answer-button2") != null ||
            document.querySelector("#answer-button3") != null ||
            document.querySelector("#answer-button4") != null) {
            document.querySelector("#answer-button1").remove();
            document.querySelector("#answer-button2").remove();
            document.querySelector("#answer-button3").remove();
            document.querySelector("#answer-button4").remove();
        }

        timeStop = true;
        highscoreCheck();
        scoreCheckLoop = false;
    }
}

// runs the quiz
let runQuiz = function () {
    clearBoard();
    runTimer();
    askQuestion();
};

// save and load from local storage

let saveHighscore = function () {
    let storedScoreboard = scoreboard;
    localStorage.setItem("scoreboard", JSON.stringify(storedScoreboard));
}

let loadHighscores = function () {
    scoreboard = localStorage.getItem("scoreboard")
    if (scoreboard === null) {
        scoreboard = [];
    } else {
        scoreboard = JSON.parse(scoreboard);
    }
}

loadHighscores();

startButtonEl.addEventListener("click", runQuiz);
scoresheetEl.addEventListener('click', setHighscoreBoard);