import React from "react"
import { useEffect } from "react"
import { nanoid } from 'nanoid'
import './App.scss'
import StartGame from './components/StartGame'
import Game from './components/Game'

function App() {
    const [isStarted, setIsStarted] = React.useState(false)
    const [triviaData, setTriviaData] = React.useState([])
    const [selectAnswer, setSelectAnswer] = React.useState({
        id: '',
        isHeld: false
    })
    const [checkAnswers, setChceckAnswers] = React.useState(false)

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&category=18&type=multiple&encode=base64')
            .then((response) => response.json())
            .then((data) => setTriviaData(data.results))
    }, [])

    function startGame() {
        setIsStarted(true)
    }

    function handleCheckingAnswers() {
        setChceckAnswers(prevCheck => (
            !prevCheck
        ))
    }

    function holdAnswer() {
        setSelectAnswer(prevItem => {})
    }

    const triviaElements = triviaData.map(data => {
        return <Game 
            key = {nanoid()}
            id = {nanoid()}
            question = {data.question}
            wrongAnswers = {data.incorrect_answers}
            correctAnswer = {data.correct_answer}
            answerSelection = {selectAnswer}
        />
    })

    return (
        <main className = "main"> 
            <div className="main-box">
                {isStarted ? triviaElements : 
                    <StartGame 
                        handleClick = {() => startGame()}
                    />
                }
                <div className="score-checking">
                    {checkAnswers && isStarted && <p>You scored 3/5</p>}
                    {isStarted && 
                        <button className = "check-btn" onClick = {handleCheckingAnswers}>
                            {checkAnswers ? "Play Again"  : "Check Answers"}
                        </button>                    
                    }
                </div>
            </div>
        </main>
    )
}

export default App