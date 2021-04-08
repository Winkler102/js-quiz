let timer = 60;
let newQuiz = true;
let questionChoosen = 0;
let quesChoosenArray = [];
let timeStop = false;
let quizComplete = 3;

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
    }];

let startButtonEl = document.querySelector("#answer-button");
let answerOptionsEl = document.querySelector("#answer");
let gameRulesEl = document.querySelector("#game-rules");
let questionEl = document.querySelector("#question");
let multipleChoiceEl = document.querySelector("#multiple-choice");
let setTime = document.querySelector("#time");

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
        console.log("correct");
        timer += 10;
    } else {
        console.log("incorrect");
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
    console.log(quizComplete)

    if (quizComplete < 1) {
        finalScore();
    } else if (quesChoosenArray.includes(questionChoosen)) {
        randomQuestion();
    } else {
        quesChoosenArray.push(questionChoosen);
    }
    console.log("in random question")
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
    } else {
        console.log("if outside")
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
    questionEl.textContent = "Your Final Score is " + timer;

}

let runQuiz = function () {
    clearBoard();
    runTimer();
    askQuestion();
};


startButtonEl.addEventListener("click", runQuiz);