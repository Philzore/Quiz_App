let questions = [{
    "question" : "Wer hat HTML erfunden?",
    "answer1" : "Robbie Williams", 
    "answer2" : "Lady Gaga" ,
    "answer3" : "Tim Berners-Lee" ,
    "answer4" : "Justin Bieber" ,
    "right_answer" : 3
},
{
    "question" : "Was bedeutet das HTML Tag <a>?",
    "answer1" : "Link", 
    "answer2" : "Fett" ,
    "answer3" : "Kursiv" ,
    "answer4" : "Container" ,
    "right_answer" : 1
},
{
    "question" : "Zu was sind div Container da?",
    "answer1" : "Einfach nur so", 
    "answer2" : "Um Bilder einzufügen" ,
    "answer3" : "Für Spiele" ,
    "answer4" : "Um sie anzuordnen" ,
    "right_answer" : 4
},
{
    "question" : "Wie bindet man ein stylesheet ein?",
    "answer1" : "mit <script>", 
    "answer2" : "mit <link>" ,
    "answer3" : "mit <meta>" ,
    "answer4" : "Geht nicht" ,
    "right_answer" : 2
},
] ;

let currentQuestion = 0 ;

function init() {
    document.getElementById('all-questions').innerHTML = questions.length ;
    
}

function showQuestion () {
    let question = questions[currentQuestion];
}