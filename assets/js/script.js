let timer = 60;
let newQuiz = true;
let scoreCheckLoop = true;
let questionChoosen = 0;
let quesChoosenArray = [];
let timeStop = false;
let quizComplete = 5;
let scoreboard = [
    {
        name: "empty",
        score: 1000
    },
    {
        name: "empty",
        score: 1000
    },
    {
        name: "empty",
        score: 50
    },
    {
        name: "empty",
        score: 30
    },
    {
        name: "empty",
        score: 10
    }
]

const questionsArray = [
    {
        q: "This is a test question #1",
        a: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
        ca: "Answer 1"
    },
    {
        q: "This is a test question #2",
        a: ["Answer a", "Answer b", "Answer c", "Answer d"],
        ca: "Answer b"
    },
    {
        q: "This is a test question #3",
        a: ["Answer !", "Answer @", "Answer #", "Answer $"],
        ca: "Answer #"
    },
    {
        q: "This is a test question #4",
        a: ["Answer a", "Answer b", "Answer c", "Answer d"],
        ca: "Answer c"
    },
    {
        q: "This is a test question #5",
        a: ["Answer a", "Answer b", "Answer c", "Answer d"],
        ca: "Answer d"
    }];

let startButtonEl = document.querySelector("#answer-button");
let answerOptionsEl = document.querySelector("#answer");
let answerListEl = document.querySelector("#answers-list")
let gameRulesEl = document.querySelector("#game-rules");
let questionEl = document.querySelector("#question");
let multipleChoiceEl = document.querySelector("#multiple-choice");
let setTime = document.querySelector("#time");
let mainEl = document.querySelector("#main");
let scoresheetEl = document.querySelector("#scoresheet")

let clearBoard = function () {
    answerOptionsEl.remove();
    gameRulesEl.remove();
}


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
            document.querySelector("#answer-button" + (y + 1)).value = questionsArray[choosenQuestion].a[y];
            document.querySelector("#answer-button" + (y + 1)).textContent = questionsArray[choosenQuestion].a[y];

        }
    }
}

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

let askQuestion = function () {
    randomQuestion();
    questionEl.textContent = questionsArray[questionChoosen].q;
    createMultiChoice(questionChoosen);
    answerQuestion();
}

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

let getName = function (array) {
    scoreboard[array].name = document.querySelector("#name-form").value;
}

let createNameForm = function (array) {
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

    document.querySelector("#submit").addEventListener('click', function () { getName(array) });
    document.querySelector("#submit").addEventListener('click', setHighscoreBoard);

}

let highscoreTable = function () {
    answerListEl.textContent = JSON.parse(localStorage.getItem("scoreboard"))
    
}

let saveHighscore = function () {
    localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
}

let setHighscoreBoard = function () {
    saveHighscore();
    answerListEl.textContent = "";
    highscoreTable();
}

let highscoreCheck = function () {
    if (scoreCheckLoop) {
        for (z = 0; z < 5; z++) {
            if (timer > scoreboard[z].score) {
                answerListEl.textContent = "'You got a highscore please enter name.' - Andy Droid";
                scoreboard[z].score = timer;
                createNameForm(z);
                break;
            } else {
                answerListEl.textContent = "'You did not get a highscore better luck next time.' - Andy Dorid";
            }
        }

        scoreCheckLoop = false;
    }
}

let finalScore = function () {
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
    questionEl.textContent = "Your Final Score is " + timer;
    highscoreCheck();
}

let runQuiz = function () {
    clearBoard();
    runTimer();
    askQuestion();
};


startButtonEl.addEventListener("click", runQuiz);
scoresheetEl.addEventListener('click', clearBoard);
scoresheetEl.addEventListener('click', setHighscoreBoard);