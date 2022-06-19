import { nanoid } from 'nanoid'

function Game(props) {
    const heldColor = {
        backgroundColor: props.isHeld && "#D6DBF5",
        boxShadow: props.isHeld && "1px 1px 1px rgba(0, 0, 0, .2)",
        transform: props.isHeld && "scale(.98)"
    }

    const incorrectAnswers = props.wrongAnswers.map(answer => {
        return <a 
                    key = {nanoid()} 
                    id = {nanoid()}
                    onClick = {props.handleClick}
                    style = {heldColor}
                >{atob(answer)}</a>
    })

    return (
        <div className="question-box">
            <h3>{atob(props.question)}</h3>
            <div className="question-box--answers">
                {incorrectAnswers}
                <a 
                    key = {nanoid()} 
                    id = {nanoid()}
                    onClick = {props.handleClick}
                    style = {heldColor}
                >{atob(props.correctAnswer)}</a>
            </div>
        </div>
    )
}

export default Game