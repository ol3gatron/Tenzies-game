import { useState } from "react"
import Die from "./components/Die"

function App() {
  const [diceArray, setDiceArray] = useState(allNewDice())

  function allNewDice() {
    const array = []

    function createDiceObject() {
      const value = Math.ceil(Math.random() * 6)
      const isHeld = false
      return ({value, isHeld})
    }

    for (let i = 0; i < 10; i++) {
      array.push(createDiceObject())
    }
    return array
  }

  console.log(diceArray)

  function handleClick() {
    setDiceArray(() => allNewDice())
  }

  return (
    <main>
      <div className="container">
        {diceArray.map((die, index) => <Die value={die.value} isHeld={die.isHeld} key={index}/>)}
      </div>
      <button className="roll-btn" onClick={handleClick}>Roll</button>
    </main>
  )
}

export default App
