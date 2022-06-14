function Game(props) {
    const incorrectAnswers = props.wrongAnswers.map(answer => {
        return <a>{atob(answer)}</a>
    })

    return (
        <div className="question-box">
            <h3>{atob(props.question)}</h3>
            <div className="question-box--answers">
                {incorrectAnswers}
                <a>{atob(props.correctAnswer)}</a>
            </div>
        </div>
    )
}

export default Game