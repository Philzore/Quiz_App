let currentQuestion = 0;
let countRightAnswers = 0;
let questionCategory = '';
let currentQuestionArray;
let AUDIO_SUCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');
let windowWidth  ;
let throttled = false ;

//window resize event listener
window.addEventListener('resize' , function() {
    if (!throttled) {
        getDimensions();
        throttled = true ;
        this.setTimeout(function(){
            throttled = false ;
        },250);
    }
});

function getDimensions(){
    windowWidth = window.innerWidth ;
    width770();
    width400();
    width325();
}

function width770(){
    if (windowWidth <= 770){
        document.getElementById('trophy-endscreen').classList.remove('ms-3') ;
    } else {
        document.getElementById('trophy-endscreen').classList.add('ms-3') ;
    }
}

function width400(){
    if (windowWidth <=400){
        document.getElementById('full-trophy').classList.remove('d-none') ;
        document.getElementById('end-Screen').classList.remove('justify-content-end') ;
        document.getElementById('end-Screen').classList.add('flex-column') ;
        document.getElementById('end-Screen').classList.add('justify-content-center') ;
        document.getElementById('question-body').classList.add('p-2') ;
    } else {
        document.getElementById('full-trophy').classList.add('d-none') ;
        document.getElementById('end-Screen').classList.add('justify-content-end') ;
        document.getElementById('end-Screen').classList.remove('flex-column') ;
        document.getElementById('end-Screen').classList.remove('justify-content-center') ;
        document.getElementById('question-body').classList.remove('p-2') ;
    }
}

function width325(){
    if (windowWidth <=325){
        document.getElementById('next-arrow').classList.remove('d-none') ;
        document.getElementById('question-body').classList.remove('d-flex') ;
        document.getElementById('question-body').classList.remove('align-items-center') ;
    } else {
        document.getElementById('next-arrow').classList.add('d-none') ;
        document.getElementById('question-body').classList.add('d-flex') ;
        document.getElementById('question-body').classList.add('align-items-center') ;
    }
}

function init() {
    document.getElementById('all-questions').innerHTML = currentQuestionArray.length;
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
    return currentQuestion >= currentQuestionArray.length;
}

function showEndScreen() {
    document.getElementById('end-Screen').style = '';
    document.getElementById('question-Body').style = 'display : none;';
    document.getElementById('right-Answers').innerHTML = countRightAnswers;
    document.getElementById('ammount-Questions').innerHTML = currentQuestionArray.length;
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / currentQuestionArray.length;
    percent = Math.round(percent * 100); //Ergebnis runden
    document.getElementById('progress-bar').innerHTML = `Frage ${(currentQuestion + 1)} `;
    document.getElementById('progress-bar').style.width = `${percent}%`;
}

function updateQuestion() {
    let question = currentQuestionArray[currentQuestion];
    document.getElementById('current-question').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer-1').innerHTML = question['answer_1'];
    document.getElementById('answer-2').innerHTML = question['answer_2'];
    document.getElementById('answer-3').innerHTML = question['answer_3'];
    document.getElementById('answer-4').innerHTML = question['answer_4'];
}

function checkCategory(category) {
    switch (category) {
        case 'Html':
            currentQuestionArray = questionsHtml ;
            break;
        case 'CSS':
            currentQuestionArray = questionsCSS ;
            break;
        case 'JS':
            currentQuestionArray = questionsJS ;
            break;
        case 'Robotic':
            currentQuestionArray = questionsRobotic ;
            break;

        default:
            break;
    }
}

function answer(selectedAnswer) {
    let question = currentQuestionArray[currentQuestion];
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
    disableAllAnswerButtons();
    document.getElementById('next-button').disabled = false;
    document.getElementById('next-arrow').disabled = false;
}

function disableAllAnswerButtons() {
    for (let i = 1; i < 5; i++) {
        const number = i;
        document.getElementById(`btn-answer-${number}`).classList.add('no-event');
    }
}

function resetAnswerFunction() {
    for (let i = 1; i < 5; i++) {
        const number = i;
        document.getElementById(`btn-answer-${number}`).classList.remove('no-event');
    }
}

function chooseRightOrWrong(selectedAnswerNumber, question) {
    return selectedAnswerNumber == question['right_answer'];
}

function nextQuestion() {
    currentQuestion++; //variable wird um eins erhöht
    document.getElementById('next-button').disabled = true;
    document.getElementById('next-arrow').disabled = true;
    resetAnswersButtons();
    showQuestion();
    resetAnswerFunction();
}

function resetAnswersButtons() {
    for (let i = 1; i < 5; i++) {
        const answerNumber = i;
        document.getElementById(`answer-${answerNumber}`).parentNode.classList.remove('bg-danger');
        document.getElementById(`answer-${answerNumber}`).parentNode.classList.remove('bg-success');
    }
}

function restartGame() {
    currentQuestion = 0;
    countRightAnswers = 0;
    document.getElementById('end-Screen').style = 'display : none !important;';
    document.getElementById('question-Body').style = '';
    init();
}

function changeCategory(category) {
    checkCategory(category);
    //remove start screen
    document.getElementById('start-screen').style = 'display : none ;';
    //show the right category
    document.getElementById('question-Body').style = '';
    init();
    //disable other categorys
    if (category == 'Html') {
        deactivateCategory('css');
        deactivateCategory('js');
        deactivateCategory('robotic');
    } else if (category == 'CSS') {
        deactivateCategory('html');
        deactivateCategory('js');
        deactivateCategory('robotic');
    } else if (category == 'JS') {
        deactivateCategory('css');
        deactivateCategory('html');
        deactivateCategory('robotic');
    } else if (category == 'Robotic') {
        deactivateCategory('css');
        deactivateCategory('js');
        deactivateCategory('html');
    }
}

function deactivateCategory(category){
    document.getElementById(`${category}-button`).disabled = true;
}

function reset() {
    document.getElementById('start-screen').style = '';
    document.getElementById('question-Body').style = 'display : none;';
    document.getElementById('end-Screen').style = 'display : none !important;';
    document.getElementById('html-button').disabled = false;
    document.getElementById('css-button').disabled = false;
    document.getElementById('js-button').disabled = false;
    document.getElementById('robotic-button').disabled = false;
    document.getElementById('progress-bar').innerHTML = `Frage1`;
    document.getElementById('progress-bar').style.width = `25%`;
    document.getElementById('next-button').disabled = true;
    document.getElementById('next-arrow').disabled = true;
    resetAnswersButtons () ;
    resetAnswerFunction () ;
    currentQuestion = 0;
    countRightAnswers = 0;
    questionCategory = '';
}