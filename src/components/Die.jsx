function Die(props) {
  const style = {
    backgroundColor: props.isHeld ? "#59E391" : "#FFF",
  }


  return (
    <div
      style={style}
      className={`die die-${props.value}`}
      onClick={props.holdDice}
    >
      {props.value === 1 &&
        <span className="die-1--first"></span>
      }
      {props.value === 2 &&
        <>
          <span className="die-2--first"></span>
          <span className="die-2--second"></span>
        </>
      }
      {props.value === 3 &&
        <>
          <span className="die-3--first"></span>
          <span className="die-3--second"></span>
          <span className="die-3--third"></span>
        </>
      }
      {props.value === 4 &&
        <>
          <span className="die-4--first"></span>
          <span className="die-4--second"></span>
          <span className="die-4--third"></span>
          <span className="die-4--fourth"></span>
        </>
      }
      {props.value === 5 &&
        <>
          <span className="die-5--first"></span>
          <span className="die-5--second"></span>
          <span className="die-5--third"></span>
          <span className="die-5--fourth"></span>
          <span className="die-5--fifth"></span>
        </>
      }
      {props.value === 6 &&
        <>
          <span className="die-6--first"></span>
          <span className="die-6--second"></span>
          <span className="die-6--third"></span>
          <span className="die-6--fourth"></span>
          <span className="die-6--fifth"></span>
          <span className="die-6--sixth"></span>
        </>
      }
    </div>
  )
}
export default Die