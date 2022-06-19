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
    const [points, setPoints] = React.useState(0)

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&category=18&type=multiple&encode=base64')
            .then((response) => response.json())
            .then((data) => setTriviaData(data.results))
    }, [])

    function startGame() {
        setIsStarted(true)
    }

    function holdAnswer() {
        setSelectAnswer(prevItem => ({
                ...prevItem,
                isHeld: !prevItem.isHeld
            }
        ))
    }

    function handleCheckingAnswers() {
        setChceckAnswers(prevCheck => (
            !prevCheck
        ))

        setPoints(0)

        if(!checkAnswers) {
            for(let i = 0; i < 5; i++) {
                console.log(triviaData[i].correct_answer)
                setPoints(prevVal => (
                    prevVal += 1
                ))
        }}
    }

    const triviaElements = triviaData.map(data => {
        return <Game 
            key = {nanoid()}
            id = {nanoid()}
            question = {data.question}
            wrongAnswers = {data.incorrect_answers}
            correctAnswer = {data.correct_answer}
            isHeld = {selectAnswer.isHeld}
            handleClick = {() => holdAnswer()}
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
                    {checkAnswers && isStarted && <p>You scored {points} / 5 points</p>}
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