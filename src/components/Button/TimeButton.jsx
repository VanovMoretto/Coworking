import React from "react";
import '../Button.css'

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

  return (
    <button
      className={`horario ${isHovered && initialTime && finalTime ? "clear" : ""}`}
      onClick={isHovered && initialTime && finalTime ? clearSelection : isTimeClicked}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={isTouchStarted}
      onTouchEnd={isTouchEnded}
    >
      {isHovered && initialTime && finalTime ? "Limpar seleção?" : timeSelected || "Horários"}
    </button>
  );
}

export default TimeButton;