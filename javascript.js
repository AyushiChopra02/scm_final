const quizData = [
    {
      question: 'Javascript is which type oflanguage?',
      options: ['object oriented','object based','procedural','none of these'],
      answer: 'object oriented',
    },
    {
      question: 'Which of the following keywords is used to define a variable in Javascript?',
      options: ['var','let','both var and let','none of these'],
      answer: 'both var and let',
    },
    {
  
          question: 'Upon encountering empty statements, what does the Javascript Interpreter do?',
      options: ['throws an error', 'ignores the statement', 'gives warning', 'none of these'],
      answer: 'ignores the statement',
    },
    {
      question: 'How can a datatype be declared to be a constant type?',
      options: ['const', 'var', 'let', 'constant'],
      answer: 'const',
    },
    {
      question: '  What keyword is used to check whether a given property is valid or not?',
      options: [
        'in',
        'is in',
        'lies',
        'exists',
      ],
      answer: 'in',
    },
    {
          
      question: 'Which function is used to serialize an object into a JSON string in Javascript?',
      options: ['parse', 'convert ', 'stringify', 'none of these'],
      answer: 'stringify',
    },
    {
      question: 'Which of the following are closures in Javascript?',
      options: [
        'variables',
        'constant',
        'functions',
        'all the above',
      ],
      answer: 'all the above',
    },
    {
      question: ' What keyword is used to declare an asynchronous function in Javascript? ',
     options: ['async', 'await', 'setTimeout', 'none of the above'],
      answer: 'async',
    },
    {
      question: 'How to stop an interval timer in Javascript?',
      options: [
        'clearInterval',
        'clearTimer',
        'intervalOver',
        'None of the above',
      ],
      answer: 'clearInterval',
    },
    {
      question: ' Which object in Javascript dont have a prototype?',
      options: ['base object','all have a prototype','none of them have prototyper','none of the above'],
      answer: 'base object',
    },
  ];
  
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
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
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
