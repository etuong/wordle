import { useState } from 'react'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)])
  const [history, setHistory] = useState([])
  const [isCorrect, setIsCorrect] = useState(false)
  const [notification, setNotification] = useState('')
  const [usedKeys, setUsedKeys] = useState({}) // {a: 'grey', b: 'green', c: 'yellow'} etc

  const formatGuess = () => {
    let solutionArray = [...solution]
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l.toUpperCase(), color: 'grey' }
    })

    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        formattedGuess[i].color = 'green'
        solutionArray[i] = null
      }
    })

    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow'
        solutionArray[solutionArray.indexOf(l.key)] = null
      }
    })

    return formattedGuess
  }

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true)
    }

    setGuesses(prevGuesses => {
      let newGuesses = [...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })

    setHistory(prevHistory => {
      return [...prevHistory, currentGuess]
    })

    setTurn(prevTurn => {
      return prevTurn + 1
    })

    setUsedKeys(prevUsedKeys => {
      formattedGuess.forEach(l => {
        const currentColor = prevUsedKeys[l.key]

        if (l.color === 'green') {
          prevUsedKeys[l.key] = 'green'
          return
        }

        if (l.color === 'yellow' && currentColor !== 'green') {
          prevUsedKeys[l.key] = 'yellow'
          return
        }

        if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
          prevUsedKeys[l.key] = 'grey'
          return
        }
      })

      return prevUsedKeys
    })

    setCurrentGuess('')
  }

  const handleKeyup = async ({ key }) => {
    if (key === 'Enter') {
      if (turn > 5) {
        setNotification('You used all your guesses!')
        return
      }

      if (history.includes(currentGuess)) {
        setNotification('You already tried this word!')
        return
      }

      if (currentGuess.length !== 5) {
        setNotification('Word must be 5 characters!')
        return
      }

      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${currentGuess}`);
      if (!res.ok) {
        setNotification('This is not a real word!')
        return
      }

      setNotification('')
      const formatted = formatGuess()
      addNewGuess(formatted)
    }

    if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1))
      return
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess(prev => prev + key)
      }
    }
  }

  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup, notification }
}

export default useWordle