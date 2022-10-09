//  CMSC 495 6382
//  10/1/22 William Rincon - Created Outline of color game.
//  10/6/22 William Rincon - Added sounds and buttons

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')



let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    playQuestion(question)
    questionElement.innerText = question.question;
    
    let count = 0;
    
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        
      
        
        button.innerText = answer.text
        switch(count){
            case 0:
            button.classList.add('btn1') ;  
            count ++;
            break;
            
            case 1:
            button.classList.add('btn2');
            count++;
            break;
            
            case 2:
            button.classList.add('btn3');
            count++;
            break;
            
            case 3:
            button.classList.add('btn4');
            break;
        }
       
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    playIsCorrect(correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
function playQuestion(question) {
    var audio = new Audio(question.questionAudio);
    audio.play();
}
function playIsCorrect(correct) {
    if (correct) {
        var audio = new Audio('sounds/ding.mp3');
        audio.play();
    }
    if (!correct) {
        var audio = new Audio('sounds/buzzer.mp3');
        audio.play();
    }
}
const questions = [
    {
        question: ' Please Click the red button ',
        answers: [
            { text: '1.', correct: true},
            { text: '2.', correct: false },
            { text: '3.', correct: false },
            { text: '4.', correct: false }
        ],
        questionAudio: 'sounds/redButton.mp3'
    },
    {
        question: 'Please Click the blue button',
        answers: [
            { text: '1.', correct: false},
            { text: '2.', correct: false },
            { text: '3.', correct: false },
            { text: '4.', correct: true }
        ],
        questionAudio: 'sounds/blueButton.mp3'
    },
    {
        question: 'Please Click the green button?',
        answers: [
            { text: '1.', correct: false },
            { text: '2.', correct: true },
            { text: '3.', correct: false },
            { text: '4.', correct: false }
        ],
        questionAudio: 'sounds/greenButton.mp3'
    },
    {
        question: 'Please Click the yellow button',
        answers: [
            { text: '1.', correct: false },
            { text: '2.', correct: false },
            { text: '3.', correct: true },
            { text: '4.', correct: false }
        ],
        questionAudio: 'sounds/yellowButton.mp3'
    }
]
