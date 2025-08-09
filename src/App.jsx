import { useEffect, useState } from 'react'
import useWordle from './hooks/useWordle'
import './App.css'
import Grid from './components/Grid'
import Keypad from './components/Keypad'

function App() {
  const [solution, setSolution] = useState(null)
  const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup } = useWordle(solution)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }

    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup, isCorrect, turn])

  useEffect(() => {
    fetch('https://api.frontendexpert.io/api/fe/wordle-words')
      .then(res => res.json())
      .then(json => {
        const randomSolution = json[Math.floor(Math.random() * json.length)]
        setSolution(randomSolution)
      })
  }, [])

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution &&
        <div>
          <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
          <Keypad usedKeys={usedKeys} />
          {showModal &&
            <div className="modal">
              <div>
                <h1>{isCorrect ? 'You Win!' : 'You Lose!'}</h1>
                <p className="solution">{solution}</p>
              </div>
            </div>
          }
        </div>}
    </div>
  )
}

export default App
