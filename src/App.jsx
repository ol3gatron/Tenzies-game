import Die from "./components/Die"

function App() {
  function allNewDice(max, min) {
    const array = []
    for (let i = 0; i < 10; i++) {
      array.push(Math.floor(Math.random() * (max, min) + 1))
    }
    return array
  }

  console.log(allNewDice(1, 6))

  return (
    <main>
      <div className="container">
        <Die value={3}/>
        <Die value={5}/>
        <Die value={2}/>
        <Die value={1}/>
        <Die value={6}/>
        <Die value={9}/>
        <Die value={2}/>
        <Die value={2}/>
        <Die value={4}/>
        <Die value={5}/>
      </div>
    </main>
  )
}

export default App
