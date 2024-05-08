const quizData = [
    {
      question: 'When was Python Programming Language was developed?',
      options: ['Wick van Rossum','Rasmus Lerdorf','Guido van Rossum','Niene Stom'],
      answer: 'Guido van Rossum',
    },
    {
      question: 'Is Python case sensitive when dealing with identifiers?',
      options: ['no','yes','machine dependent','none of these'],
      answer: 'yes',
    },
    {
  
          question: ' All keywords in Python are in?',
      options: ['Capitalized', 'lower case', 'UPPER CASE', 'none of the above'],
      answer: 'none of the above',
    },
    {
      question: 'Which keyword is used for function in Python language?',
      options: ['Indentation', 'Key', 'Brackets', 'All of the mentioned'],
      answer: 'Indentation',
    },
    {
      question: 'Which keyword is used for function in Python language?',
      options: [
        'Function',
        'def',
        'fun',
        'define',
      ],
      answer: 'def',
    },
    {
          
      question: 'What does pip stand for python?',
      options: ['Pip Installs Python', 'Pip Installs Packages', 'Preferred Installer Program', 'All of the mentioned'],
      answer: 'Preferred Installer Program',
    },
    {
      question: 'Which of the following is not a core data type in Python programming?',
      options: [
        'Tuples',
        ' Lists',
        'Class',
        'Dictionary',
      ],
      answer: 'Class',
    },
    {
      question: 'Which one of the following is not a keyword in Python language? ',
     options: ['pass', 'eval', 'assert', 'nonlocal'],
      answer: 'eval',
    },
    {
      question: 'What are the two main types of functions in Python?',
      options: [
        'System function',
        'Custom function',
        'Built-in function & User defined function',
        'User function',
      ],
      answer: 'Built-in function & User defined function',
    },
    {
      question: ' Which of these is the definition for packages in Python?',
      options: [' A set of main modules','A folder of python modules','A number of files containing Python definitions and statements','A set of programs making use of Python modules'],
      answer: 'A folder of python modules',
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
    resultContainer.innerHTML = You scored ${score} out of ${quizData.length}!;
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
