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

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function answer(selectedAnswer) {
    let question = questions[currentQuestion];
    let selectedAnswerNumber = selectedAnswer.slice(-1); //Nur letzten char anzeigen lassen bzw. weg speicher in diesem Fall hier
    console.log('Selected answer is ' + selectedAnswer);
    console.log('Current right answer number is ' + selectedAnswerNumber);

    if (selectedAnswerNumber == question['right_answer']) {
        console.log('Richtig');
    } else {
        console.log('Falsch');
    }

}