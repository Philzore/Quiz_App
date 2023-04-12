let questions = [{
    "question": "Wer hat HTML erfunden?",
    "answer_1": "Robbie Williams",
    "answer_2": "Lady Gaga",
    "answer_3": "Tim Berners-Lee",
    "answer_4": "Justin Bieber",
    "right_answer": 3
},
{
    "question": "Was bedeutet das HTML Tag <a>?",
    "answer_1": "Link",
    "answer_2": "Fett",
    "answer_3": "Kursiv",
    "answer_4": "Container",
    "right_answer": 1
},
{
    "question": "Zu was sind div Container da?",
    "answer_1": "Einfach nur so",
    "answer_2": "Um Bilder einzufügen",
    "answer_3": "Für Spiele",
    "answer_4": "Um sie anzuordnen",
    "right_answer": 4
},
{
    "question": "Wie bindet man ein stylesheet ein?",
    "answer_1": "mit <script>",
    "answer_2": "mit <link>",
    "answer_3": "mit <meta>",
    "answer_4": "Geht nicht",
    "right_answer": 2
},
];

let currentQuestion = 0;
let countRightAnswers = 0;
let AUDIO_SUCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {

    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length ;
}

function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display : none;';
    document.getElementById('rightAnswers').innerHTML = countRightAnswers;
    document.getElementById('ammountQuestions').innerHTML = questions.length;
    document.getElementById('header-image').src = './img/trophy.png';
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100); //Ergebnis runden
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style.width = `${percent}%`;
}

function updateQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('current-question').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selectedAnswer) {
    let question = questions[currentQuestion];
    let selectedAnswerNumber = selectedAnswer.slice(-1); //Nur letzten char anzeigen lassen bzw. weg speicher in diesem Fall hier

    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (chooseRightOrWrong(selectedAnswerNumber, question)) {
        AUDIO_SUCESS.play();
        document.getElementById(selectedAnswer).parentNode.classList.add('bg-success'); //.parentNode = Übergeordnete div
        countRightAnswers++;
    } else {
        AUDIO_FAIL.play();
        document.getElementById(selectedAnswer).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    }
    document.getElementById('next-button').disabled = false;
}

function chooseRightOrWrong(selectedAnswerNumber, question) {
    return selectedAnswerNumber == question['right_answer'] ;
}

function nextQuestion() {
    currentQuestion++; //variable wird um eins erhöht
    document.getElementById('next-button').disabled = true;
    resetAnswersButtons();
    showQuestion();

}

function resetAnswersButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('header-image').src = './img/logo.png';
    currentQuestion = 0;
    countRightAnswers = 0;
    document.getElementById('endScreen').style = 'display : none;';
    document.getElementById('questionBody').style = '';
    init();
}