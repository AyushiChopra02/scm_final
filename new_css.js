const quizData = [
    {
      question: 'What does CSS stand for?',
      options: ['Colorful Style Sheets','Creative Style Sheets','Cascading Style Sheets','Computer Style Sheets'],
      answer:'Cascading Style Sheets' ,
    },
    {
      question: 'Where in an HTML document is the correct place to refer to an external style sheet?',
      options: ['At the end of document','In head section','In body section','In title'],
      answer:'In head section',
    },
    {
      question: 'Which HTML tag is used to define an internal style sheet?',
      options: ['css','html','style','script'],
      answer:'style' ,
    },
    {
      question: 'Which CSS property is used to change the text color of an element?',
      options: ['color','textcolor','bgcolor','fgcolor'],
      answer:'textcolor' ,
    },
    {
      question: 'Which CSS property controls the text size?',
      options: ['fontsize','fontstyle','textsize','textstyle'],
      answer:'fontsize',
    },
    {
      question: 'Which property is used to change the left margin of an element?',
      options: ['margin','marginleft','padding','leftpadding'],
      answer:'marginleft' ,
    },
    {
      question: 'What is the default value of the position property?',
      options: ['relative','static','fixed','absolute'],
      answer:'static' ,
    },
    {
      question: 'Box-Shadow is a property that allows developers to apply a ?',
      options: ['border','drop shadow','rounded corner','corner'],
      answer:'drop shadow',
    },
    {
      question: 'Which of the below CSS class is used to change the text color of CSS ?',
      options: [' background-color','color','color-background','None of the above'],
      answer:'color' ,
    },
    {
      question: 'Which element is used to represent the transparency of an element in CSS ?',
      options: ['Hover','Opacity','Transparent','Overlay'],
      answer:'Opacity' ,
    },
  ]
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `<h1>You scored ${score} out of ${quizData.length}!</h1>`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();
