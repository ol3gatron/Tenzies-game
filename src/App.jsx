import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'
import Die from "./components/Die"

function App() {
  const [diceArray, setDiceArray] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  function checkWin() {
    const isHeldDices = diceArray.filter(item => item.isHeld)
    const sameValues = isHeldDices.filter(item => item.value === isHeldDices[0].value)
    if (sameValues.length === 10) {
      return true
    }
  }

  useEffect(() => {
    checkWin() && setTenzies(true)
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



  function handleClick() {
    if (!tenzies) {
      setDiceArray(prevState => prevState.map(die => {
        return die.isHeld ? {...die} : generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDiceArray(allNewDice())
    }
  }



  return (
    <main>
      <h1 className="main--title">Tenzies</h1>
      <p className="mait--instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="container">
        {diceArray.map((die, index) => <Die value={die.value} isHeld={die.isHeld} key={die.id} holdDice={() => holdDice(die.id)}/>)}
      </div>
      <button className="roll-btn" onClick={handleClick}>{tenzies ? "New Game" : "Roll"}</button>
      {tenzies && <Confetti height={window.innerHeight} />}
    </main>
  )
}

export default App
