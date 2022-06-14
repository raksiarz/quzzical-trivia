import React from "react"
import { useEffect } from "react"
import './App.scss'
import StartGame from './components/StartGame'
import Game from './components/Game'

function App() {
    const [isStarted, setIsStarted] = React.useState(false)
    const [triviaData, setTriviaData] = React.useState([])
    const [selectAnswer, setSelectAnswer] = React.useState({
        value: '',
        isHold: false
    })
    const [checkAnswers, setChceckAnswers] = React.useState(false)

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&category=18&type=multiple&encode=base64')
            .then((response) => response.json())
            .then((data) => setTriviaData(data.results))
    }, [])

    console.log(triviaData)

    const triviaElements = triviaData.map(data => {
        return <Game 
            question = {data.question}
            wrongAnswers = {data.incorrect_answers}
            correctAnswer = {data.correct_answer}
            answerSelection = {selectAnswer}
        />
    })

    function startGame() {
        setIsStarted(true)
    }

    function handleCheckingAnswers() {
        setChceckAnswers(prevCheck => (
            !prevCheck
        ))
    }

    return (
        <main className = "main"> 
            <div className="main-box">
                {isStarted ? triviaElements : <StartGame handleClick = {() => startGame()}/>}
                <div>
                    {checkAnswers && isStarted && <p>You sccored 3/5</p>}
                    {isStarted && <button className = "check-btn" onClick = {handleCheckingAnswers}>{checkAnswers ? "Play Again"  : "Check Answers"}</button>}
                </div>
            </div>
        </main>
    )
}

export default App