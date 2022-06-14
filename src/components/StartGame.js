function StartGame(props) {
    return (
        <div className = "start-game__box">
            <h2>Quzzical</h2>
            <h4>Description</h4>
            <button onClick = {props.handleClick}>Start Game</button>
        </div>
    )
}

export default StartGame