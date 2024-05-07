const quizData = [
    {
      question: 'What does HTML stands for ?',
      options: ['Hyper type multi language','Hyper text multiple language','Hyper text markup language','Home text markup language'],
      answer: 'Hyper text markup language',
    },
    {
      question: 'The correct sequence of HTML tags for starting a webpage is ?',
      options: ['Head, Title, HTML, body', 'HTML, Body, Title, Head', 'HTML, Head, Title, Body', 'HTML, Head, Title, Body'],
      answer: 'HTML, Head, Title, Body',
    },
    {
  
          question: 'Which tag do we use to define the options present in the drop-down selection lists?',
      options: ['list', 'option', 'dropdown', 'select'],
      answer: 'option',
    },
    {
      question: 'Which HTML tag do we use to display text along with a scrolling effect?',
      options: ['div', 'scroll', 'marquee', 'None of the above'],
      answer: 'marquee',
    },
    {
      question: 'Which of the following attribute is used to provide a unique name to an element?',
      options: [
        'class',
        'id',
        'type',
        'None of the above',
      ],
      answer: 'id',
    },
    {
          
      question: 'In HTML, the tags are __________.',
      options: ['in upper case', ' case-sensitive', 'in lowercase', 'not case sensitive'],
      answer: 'not case sensitive',
    },
    {
      question: 'Which one is the HTML document root tag?',
      options: [
        'head',
        'body',
        'title',
        'html',
      ],
      answer: 'html',
    },
    {
      question: 'What are the types of unordered or bulleted list in HTML?',
      options: ['disc, square, triangle', 'polygon, triangle, circle', 'disc, circle, square', 'all the above'],
      answer: 'disc, circle, square',
    },
    {
      question: 'A program in HTML can be rendered and read by?',
      options: [
        'Web browser',
        'Server',
        'Interpreter',
        'None of the above',
      ],
      answer: ' Web browser',
    },
    {
      question: 'Which of the following are the attributes of the tag?',
      options: ['method','action','both method and action','none of the above'],
      answer: '<br>',
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
