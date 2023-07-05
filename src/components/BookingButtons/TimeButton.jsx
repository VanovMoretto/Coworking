import React, { useState, useEffect } from "react";
import "../../Styles/Button.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// The TimeButton component displays the available times and handles time selection and deletion.
function TimeButton({ isHovered, initialTime, finalTime, timeSelected, clearTimeSelection, isTimeClicked, setIsHovered }) {
  
  // Local state for showing a dialog (initially set to false, meaning the dialog is hidden).
  const [showDialog, setShowDialog] = useState(false)

  // useEffect hook to handle the overflow of the body element depending on whether the dialog is shown or not.
  useEffect(() => {
    const body = document.body;
    body.style.overflow = showDialog ? "hidden" : "initial";
  }, [showDialog]);

  // Rendering a button that displays available times and a dialog for clearing the selected time.
  return (
    <div className="button-wrapper">
      <button
        className={`horario ${initialTime && finalTime ? (isHovered ? "reservado clear" : "reservado") : ""}`} 
        onClick={isHovered && initialTime && finalTime ? () => setShowDialog(true) : isTimeClicked} 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)} 
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
          <div>
            <button onClick={() => { clearTimeSelection(); setShowDialog(false); }}>Sim</button> 
            <button onClick={() => setShowDialog(false)}>Não</button> 
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeButton;
