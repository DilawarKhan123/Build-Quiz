const questions=[{
    question:"MS-Word is an example of _____",
    answers:[{text:"An operating system", correct:false},
             {text:"A processing device ", correct:false},
             {text:"Application software", correct:true },
             {text:"An input device",correct:false} ]},
            {question:"The staple food of the Vedic Aryan was",
            answers:[{text:"Barley and rice", correct:false},
                     {text:"Milk and its products ",correct:true},
                     {text:"Rice and pulses", correct:false },
                     {text:"Vegetables and fruits",correct:false} ]

            },{question:"Fathometer is used to measure",
            answers:[{text:"Earthquakes", correct:false},
                     {text:"Rainfall ", correct:false},
                     {text:"Ocean depth", correct:true },
                     {text:"Sound intensity",correct:false} ] },

            ];
const questionElment=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();

}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElment.innerHTML=questionNo+"."+ currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener('click',selectAnswer);

        
    });


}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);

    }
}
let selectedAnswers = [];

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    const selectedText = selectedBtn.innerText;
    selectedAnswers[currentQuestionIndex] = selectedText;
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElment.innerHTML = `You scored ${score} out of ${questions.length}`;
    questions.forEach((question, index) => {
        const selectedAnswer = question.answers.find(answer => answer.text === selectedAnswers[index]);
        const isCorrect = selectedAnswer && selectedAnswer.correct;
        const answerStatus = isCorrect ? "Correct" : "Incorrect";
        const answerClass = isCorrect ? "correct" : "incorrect";
        questionElment.innerHTML += `<br><br>Question ${index + 1}: ${question.question}<br>Your Answer:
     ${selectedAnswer ? selectedAnswer.text : "Not answered"}<br>Status: <span class="${answerClass}">${answerStatus}</span>`;
    });
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();

    }else{
        showScore();
    }
}

nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();