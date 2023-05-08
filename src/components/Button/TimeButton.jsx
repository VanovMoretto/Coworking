import React, {useState, useEffect} from "react";
import "../../Styles/Button.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


// TimeButton is responsible for rendering the button that displays available times.
function TimeButton({ isHovered, initialTime, finalTime, timeSelected, clearSelection, isTimeClicked, setIsHovered }) {
  const isTouchStarted = () => {
    if (initialTime && finalTime) {
      setIsHovered(true);
    }
  };

  const isTouchEnded = () => {
    if (isHovered) {
      setIsHovered(false);
    }
  };
  
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    const body = document.body;

    body.style.overflow = showDialog ? "hidden" : "initial";
}, [showDialog]);


  

  return (
  <div className="button-wrapper">
    <button
      className={`horario ${initialTime && finalTime ? (isHovered ? "reservado clear" : "reservado") : ""}`}
      onClick={isHovered && initialTime && finalTime ? clearSelection : isTimeClicked}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={isTouchStarted}
      onTouchEnd={isTouchEnded}
    >
      {isHovered && initialTime && finalTime ? "Limpar seleção?" : timeSelected || "Horários"}
    </button>
    {initialTime && finalTime && (
      <button className="clear-icon" onClick={() => setShowDialog(true)}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
  )}
  {showDialog && (
    <div className="dialog">
      <p>Deseja apagar os horários selecionados?</p>
      <button onClick={() => { clearSelection(); setShowDialog(false); }}>Sim</button>
      <button onClick={() => setShowDialog(false)}>Não</button>
    </div>
  )}
</div>
);
}

export default TimeButton;