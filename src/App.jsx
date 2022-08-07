import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { useStopwatch  } from 'react-timer-hook'
import Confetti from 'react-confetti'
import Die from "./components/Die"

function App() {
  const [diceArray, setDiceArray] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rolls, setRolls] = useState(0)
  const [startGame, setStartGame] = useState(false)

  function checkWin() {
    const isHeldDices = diceArray.filter(item => item.isHeld)
    const sameValues = isHeldDices.filter(item => item.value === isHeldDices[0].value)
    if (sameValues.length === 10) {
      return true
    }
  }

  useEffect(() => {
    checkWin() && setTenzies(true)
    checkWin() && pause()
    checkWin() && saveStats()
  }, [diceArray])

  function generateNewDie() {
    const value = Math.ceil(Math.random() * 6)
    const isHeld = false
    const id = nanoid()
    return {value, isHeld, id}
  }

  function allNewDice() {
    const array = []
    for (let i = 0; i < 10; i++) {
      array.push(generateNewDie())
    }
    return array
  }

  function holdDice(id) {
    setDiceArray(oldDice => oldDice.map(die => {
        return die.id === id ?
            {...die, isHeld: !die.isHeld} :
            die
    }))
}

  function saveStats() {
    localStorage.setItem("stats", JSON.stringify({
      rolls: JSON.parse(localStorage.getItem("stats")) && rolls > JSON.parse(localStorage.getItem("stats")).rolls ? JSON.parse(localStorage.getItem("stats")).rolls : rolls,
      time: JSON.parse(localStorage.getItem("stats")) && seconds > JSON.parse(localStorage.getItem("stats")).time ? JSON.parse(localStorage.getItem("stats")).time : seconds,
    }))
  }

  const {seconds, isRunning, start, pause, reset} = useStopwatch({autoStart: false})

  function handleClick() {
    if (!tenzies) {
      setDiceArray(prevState => prevState.map(die => {
        return die.isHeld ? {...die} : generateNewDie()
      }))
      setRolls((prevState) => prevState + 1)
    } else {
      setTenzies(false)
      setDiceArray(allNewDice())
      setRolls(0)
      reset()
    }
  }

  function startGameFunc() {
    setStartGame(() => true)
    start()
  }

  return (
    <main>
      {startGame ?
        <>
        <p className="main--rolls">🔄 {rolls}</p>
        {startGame && <p className="main--time">⌛ {seconds}</p>}
        <h1 className="main--title">Tenzies</h1>
        <p className="main--instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="container">
          {diceArray.map((die, index) => <Die value={die.value} isHeld={die.isHeld} key={die.id} holdDice={() => holdDice(die.id)}/>)}
        </div>
        <button className="roll-btn" onClick={handleClick}>{tenzies ? "New Game" : "Roll"}</button>
        {tenzies && <Confetti height={window.height} />}
        </> :
        <>
          <h1 className="main--title">Tenzies</h1>
          <p className="main--instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="total-stats">
          {JSON.parse(localStorage.getItem("stats")) &&
            <p className="totalRolls">Best rolls: {JSON.parse(localStorage.getItem("stats")).rolls}</p>
          }
          {JSON.parse(localStorage.getItem("stats")) &&
            <p className="totalTime">Best time: {JSON.parse(localStorage.getItem("stats")).time}</p>
          }
          </div>
          <button className="roll-btn" onClick={startGameFunc}>Start game</button>
        </>
      }
    </main>
  )
}

export default App
