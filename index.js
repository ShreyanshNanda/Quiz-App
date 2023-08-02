const ques = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Neppal", correct: false },
            { text: "India", correct: false },
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
        ]
    },
    {
        question: "which is the smallest continent in the world?",
        answers: [
            { text: "Aisa", correct: false },
            { text: "Australia", correct: true },
            { text: "Arctic", correct: false },
            { text: "Africa", correct: false },
        ]
    }
];

const quesElement = document.getElementById("question");
const answerBtns = document.getElementById("answerBtn");
const nextBtn = document.getElementById("nextBtn");

let currQuesIndex = 0;
let score = 0;

function startQuiz() {
    currQuesIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQues();
}

function showQues() {

    resetState();

    let currQues = ques[currQuesIndex];
    let quesNo = currQuesIndex + 1;
    quesElement.innerHTML = quesNo + "." + currQues.question;

    currQues.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerBtns.appendChild(button);
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAns);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerBtns.firstChild) {
        answerBtns.removeChild(answerBtns.firstChild);
    }
}

function selectAns(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtns.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore() {
    resetState();
    quesElement.innerHTML = `You scored ${score} out of ${ques.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn() {
    currQuesIndex++;
    if (currQuesIndex < ques.length) {
        showQues();
    }
    else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if (currQuesIndex < ques.length) {
        handleNextBtn();
    }
    else {
        startQuiz();
    }
});

startQuiz();