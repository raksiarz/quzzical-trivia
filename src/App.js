import React from "react"
import './App.scss'
import StartGame from './components/StartGame'

function App() {
    const [isStarted, setIsStarted] = React.useState(false)

    return (
        <main className = "main"> 
            <StartGame />
        </main>
    )
}

export default App