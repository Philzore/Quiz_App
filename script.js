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
    "question": "Was heißt HTML?",
    "answer_1": "Es gibt keine ausgeschriebenen Namen",
    "answer_2": "Hypertext Markup Language",
    "answer_3": "Hyper tranfer market language",
    "answer_4": "High transfer market lithuania",
    "right_answer": 2
},
];

let questionsCSS = [{
    "question": "Für was steht CSS?",
    "answer_1": "Creative Style Sheet",
    "answer_2": "Colorful Style Sheet",
    "answer_3": "Computer Style Sheet",
    "answer_4": "Cascading Style Sheet",
    "right_answer": 4
},
{
    "question": "Was ist der richtige Weg eine externe CSS Datei einzubinden?",
    "answer_1": "<stylesheet>mystyle.css</stylesheet>",
    "answer_2": "<style src='mystyle.css'>",
    "answer_3": "<link rel='stylesheet' href='mystyle.css'",
    "answer_4": "<script src='myscript.js'></script>",
    "right_answer": 3
},
{
    "question": "Wo ist der korrekte Platz um ein externes Stylesheet einzubinden?",
    "answer_1": "Head Bereich",
    "answer_2": "Body Bereich",
    "answer_3": "Ganz am Ende",
    "answer_4": "Egal",
    "right_answer": 1
},
{
    "question": "Welcher HTML Tag ist für ein internes Stylesheet?",
    "answer_1": "<script>",
    "answer_2": "<style>",
    "answer_3": "<meta>",
    "answer_4": "Geht nicht",
    "right_answer": 2
},
]

let questionsJS = [{
    "question": "In welches HTML Element kommt JavaScript?",
    "answer_1": "<js>",
    "answer_2": "<scripting>",
    "answer_3": "<javascript>",
    "answer_4": "<script>",
    "right_answer": 4
},
{
    "question": "Was ist der korrekte Syntax um eine externe js Datei einzubinden?",
    "answer_1": "<script link='xxx.js'>",
    "answer_2": "<script href='xxx.js'>",
    "answer_3": "<script src='xxx.js'>",
    "answer_4": "<script name='xxx.js'>",
    "right_answer": 3
},
{
    "question": "Welche IF Anweisung ist richtig?",
    "answer_1": "if (i == 5){}",
    "answer_2": "if i = 5 then",
    "answer_3": "if i = 5",
    "answer_4": "if i == 5 then",
    "right_answer": 1
},
{
    "question": "Wie kann man ein Kommentar in JavaScript hinzufügen?",
    "answer_1": "'Das ist ein Kommentar'",
    "answer_2": "//Das ist ein Kommentar",
    "answer_3": "<comment>Das ist ein Kommentar</comment>",
    "answer_4": "<!--Das ist ein Kommentar-->",
    "right_answer": 2
},
]

let questionsRobotic = [
    {
        "question": "Von wem wurde KUKA gegründet?",
        "answer_1": "Kilian & Kerstin",
        "answer_2": "Köhler & Karsten",
        "answer_3": "Kahn & Keller",
        "answer_4": "Jakob Knappich & Johann Josef Keller",
        "right_answer": 4
    },
    {
        "question": "Was bedeutet KSS",
        "answer_1": "Kuka Standard System",
        "answer_2": "Kuka Safety System",
        "answer_3": "Kuka System Software",
        "answer_4": "Kuka Service System",
        "right_answer": 3
    },
    {
        "question": "Welche IF Anweisung ist richtig in KRL?",
        "answer_1": "if (i == 5){}",
        "answer_2": "if i = 5 then",
        "answer_3": "if i = 5",
        "answer_4": "if (i == 5) then...Endif",
        "right_answer": 4
    },
    {
        "question": "Wie kann man ein Kommentar in KRL hinzufügen?",
        "answer_1": "'Das ist ein Kommentar'",
        "answer_2": ";Das ist ein Kommentar",
        "answer_3": "//Das ist ein Kommentar",
        "answer_4": "<!--Das ist ein Kommentar-->",
        "right_answer": 2
    },
]

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
    return currentQuestion >= questions.length;
}

function showEndScreen() {
    document.getElementById('end-Screen').style = '';
    document.getElementById('question-Body').style = 'display : none;';
    document.getElementById('right-Answers').innerHTML = countRightAnswers;
    document.getElementById('ammount-Questions').innerHTML = questions.length;
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
    document.getElementById('answer-1').innerHTML = question['answer_1'];
    document.getElementById('answer-2').innerHTML = question['answer_2'];
    document.getElementById('answer-3').innerHTML = question['answer_3'];
    document.getElementById('answer-4').innerHTML = question['answer_4'];
}

function answer(selectedAnswer) {
    let question = questions[currentQuestion];
    let selectedAnswerNumber = selectedAnswer.slice(-1); //Nur letzten char anzeigen lassen bzw. weg speicher in diesem Fall hier

    let idOfRightAnswer = `answer-${question['right_answer']}`;

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
    return selectedAnswerNumber == question['right_answer'];
}

function nextQuestion() {
    currentQuestion++; //variable wird um eins erhöht
    document.getElementById('next-button').disabled = true;
    resetAnswersButtons();
    showQuestion();

}

function resetAnswersButtons() {
    for (let i = 1; i < 5; i++) {
        const answerNumber = i;
        document.getElementById(`answer-${answerNumber}`).parentNode.classList.remove('bg-danger');
        document.getElementById(`answer-${answerNumber}`).parentNode.classList.remove('bg-success');
    }
}

function restartGame() {
    document.getElementById('header-image').src = './img/logo.png';
    currentQuestion = 0;
    countRightAnswers = 0;
    document.getElementById('end-Screen').style = 'display : none;';
    document.getElementById('question-Body').style = '';
    init();
}

function changeCategory(category) {
    //remove start screen
    document.getElementById('start-screen').style = 'display : none ;';
    //show the right category
    document.getElementById('question-Body').style = '';
    //disable other categorys
    if (category == 'html') {
        chooseHTML();
    } else if (category == 'css') {
        chooseCSS();
    } else if (category == 'js') {
        chooseJS();
    } else if (category == 'robotic') {
        chooseRobotic();
    }
    //show question of the category
}

function chooseHTML() {
    document.getElementById('css-button').disabled = true;
    document.getElementById('js-button').disabled = true;
    document.getElementById('robotic-button').disabled = true;
}

function chooseCSS() {
    document.getElementById('html-button').disabled = true;
    document.getElementById('js-button').disabled = true;
    document.getElementById('robotic-button').disabled = true;
}

function chooseJS() {
    document.getElementById('html-button').disabled = true;
    document.getElementById('css-button').disabled = true;
    document.getElementById('robotic-button').disabled = true;
}

function chooseRobotic() {
    document.getElementById('html-button').disabled = true;
    document.getElementById('css-button').disabled = true;
    document.getElementById('js-button').disabled = true;
}


function reset() {
    document.getElementById('start-screen').style = '';
    document.getElementById('question-Body').style = 'display : none;';
    document.getElementById('html-button').disabled = false;
    document.getElementById('css-button').disabled = false;
    document.getElementById('js-button').disabled = false;
    document.getElementById('robotic-button').disabled = false;
}