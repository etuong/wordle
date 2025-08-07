import { useState, useEffect } from 'react'
import Wordle from './components/Wordle'
import './App.css'

function App() {
  const [solution, setSolution] = useState(null)

  useEffect(() => {
    fetch('https://random-word-api.herokuapp.com/word?length=5')
      .then(res => res.json())
      .then(json => {
        const randomSolution = json[0]
        setSolution(randomSolution)
      })
  }, [])

  return (
    <div className="App">
      <h1>Sarah's and Ethan's Unlimited Wordle</h1>
      {solution && <Wordle solution={solution} />}
    </div>
  )
}

export default App
