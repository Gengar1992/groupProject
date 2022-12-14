//  CMSC 495 6382
//  10/2/22 Jonas Theriot - Created Outline of Shape game.
//  10/5/22 Jonas Theriot - Added Sounds, Pictures and functions to display imgs and play audio. 

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
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('img')
        button.src = answer.text
        button.classList.add('btn')
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
        question: 'Click the Rectangle',
        answers: [
            { text: 'images/rectangle.jpg', correct: true },
            { text: 'images/circle.jpg', correct: false },
            { text: 'images/ellipse.jpg', correct: false },
            { text: 'images/parallelogram.jpg', correct: false }
        ],
        questionAudio: 'sounds/rectangle.mp3'
    },
    {
        question: 'Click the Circle',
        answers: [
            { text: 'images/ellipse.jpg', correct: false },
            { text: 'images/parallelogram.jpg', correct: false },
            { text: 'images/rectangle.jpg', correct: false },
            { text: 'images/circle.jpg', correct: true }
        ],
        questionAudio: 'sounds/circle.mp3'
    },
    {
        question: 'Click the Ellipse',
        answers: [
            { text: 'images/parallelogram.jpg', correct: false },
            { text: 'images/ellipse.jpg', correct: true },
            { text: 'images/rectangle.jpg', correct: false },
            { text: 'images/circle.jpg', correct: false }
        ],
        questionAudio: 'sounds/ellipse.mp3'
    },
    {
        question: 'Click the Parallelogram',
        answers: [
            { text: 'images/rectangle.jpg', correct: false },
            { text: 'images/ellipse.jpg', correct: false },
            { text: 'images/parallelogram.jpg', correct: true },
            { text: 'images/circle.jpg', correct: false }
        ],
        questionAudio: 'sounds/parallelogram.mp3'
    }
]
