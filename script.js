const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainer = document.getElementById('question-container')
const questionElement = document.getElementById('questions')
const answerButtonsElement = document.getElementById('answer')

let shuffledQuestions, currentQuestionIndex

// start game button event
startButton.addEventListener('click', startGame)
// next button event
nextButton.addEventListener('click', () => {
    currentQuestionIndex++ // increment
    setNextQuestion()
})

//{Start Game}
function startGame() {
    startButton.classList.add('hide') //hide start button after click
    // to randomize the questions' order
    shuffledQuestions = questions.sort( () => Math.random() - .5)
    currentQuestionIndex = 0 // to start on the first question
    questionContainer.classList.remove('hide') // show question container after start button is clicked
    setNextQuestion() // show the next questions after next button is clicked
}

//{Next Question}
function setNextQuestion() {
    resetState()
    // make the questions go random
    showQuestion (shuffledQuestions[currentQuestionIndex])
}

//{Show All Question}
function showQuestion(question) {
    // show the actual questions
    questionElement.innerText = question.question
    // show answer options
    question.answers.forEach( answer => {
        const button = document.createElement('button')
        button.innerText = answer.text // set the real answer
        button.classList.add('btn') // add btn class
        // to check if user answer clicked the right answer
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        // go to selectedAnswer function when answer button is clicked
        button.addEventListener('click', selectedAnswer)
        // append the answers
        answerButtonsElement.appendChild(button)
    })
}

//{Reset Everything after Question is Answered}
function resetState() {
    clearStatusClass(document.body) //reset background after each question
    nextButton.style.setProperty('visibility', 'hidden')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}


function selectedAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        // next button
        nextButton.style.setProperty('visibility', 'visible')
    } else {
        // End game
        window.location.href = "/again.html"
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct-ans')
    } else {
        element.classList.add('wrong-ans')
    }
}

//{Remove Class after Every Question}
function clearStatusClass(element) {
    element.classList.remove('correct-ans')
    element.classList.remove('wrong-ans')
}


let questions = []

fetch("questions.json").then( res => {
    return res.json();
    }).then(loadedQuestions => {
        console.log(loadedQuestions)
        questions = loadedQuestions
        
    })