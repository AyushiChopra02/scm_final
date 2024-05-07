const startBtn = document.querySelector('.start-btn');
const popupInfo=documnt.querySelector('.popup-info');
const exitBtn=document.querySelector('.exit-btn');
const main=document.querySelector('main');
const continueBtn=document.querySelector('continue-btn'); 
const quizSection=document.querySelector('quiz-section');
const quizBox= document.querySelector('.quiz-section');

startBtn.onclick=() => {
    popupInfo.Info.classList.add('active');
    main.classList.add('active')
}

exitBtn.onclick=() => {
    popupInfo.Info.classList.remove('active');
    main.classList.remove('active')
}

continueBtn.onclick=() => {
    quizsection.classList.add('active');
    popupinfo.classList.remove('active');
    main.classList.remove('active');
}

let questionCount=0;
const nextBtn=document.querySelector('.next-btn');
nextBtn.onclick= () => {
    questionCount++;
    showQuestions(questionCount);
}
//getting ques and options from array
function showQuestions(index)
{
    const queestionText=document.querySelector('.question-text');
    questiontText.textcontent='${questions[index].numb}. ${questions[index].question}';
}



