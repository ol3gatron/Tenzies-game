import { useState } from "react"
import Die from "./components/Die"

function App() {
  const [diceArray, setDiceArray] = useState(() => allNewDice(1, 6))

  function allNewDice(max, min) {
    const array = []
    for (let i = 0; i < 10; i++) {
      array.push(Math.floor(Math.random() * (max, min) + 1))
    }
    return array
  }

  console.log(diceArray)

  return (
    <main>
      <div className="container">
        {diceArray.map((die) => <Die value={die}/>)}
      </div>
    </main>
  )
}

export default App
