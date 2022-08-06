import { useState } from "react"
import { nanoid } from "nanoid"
import Die from "./components/Die"

function App() {
  const [diceArray, setDiceArray] = useState(allNewDice())

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
    setDiceArray(prevState => prevState.map(die => {
      return die.isHeld ? {...die} : generateNewDie()
    }))
  }



  return (
    <main>
      <div className="container">
        {diceArray.map((die, index) => <Die value={die.value} isHeld={die.isHeld} key={die.id} holdDice={() => holdDice(die.id)}/>)}
      </div>
      <button className="roll-btn" onClick={handleClick}>Roll</button>
    </main>
  )
}

export default App
