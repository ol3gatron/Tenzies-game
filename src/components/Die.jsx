function Die(props) {
  return (
    <div style={{backgroundColor: props.isHeld ? "#59E391" : "#FFF"}} className="die" onClick={props.holdDice}>{props.value}</div>
  )
}
export default Die