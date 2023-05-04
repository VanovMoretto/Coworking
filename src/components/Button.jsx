import React, { useState, useEffect } from "react";
import "./Button.css";

export default function Button(props) {

  
  const [showTimes, setShowTimes] = useState(false);
  const [timeSelected, setTimeSelected] = useState("");
  const [initialTime, setInitialTime] = useState("");
  const [finalTime, setFinalTime] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showBack, setShowBack] = useState(false);
  const [isHovered, setIsHovered] = useState(false);


  useEffect(() => {
    const body = document.body;

    body.style.overflow = showTimes ? "hidden" : "initial";
}, [showTimes]);

  const isTimeClicked = (event) => {
    setShowTimes(true);
    const rect = event.target.getBoundingClientRect();
    setPosition({ x: rect.left, y: rect.top - rect.height - 10 });
  };
  

  const isTimeSelected = (time) => {
    if (!initialTime) {
      setInitialTime(time);
      setShowBack(true) // update showBack
    } else if (!finalTime) {
      setFinalTime(time);
      setShowTimes(false);
      setTimeSelected(`${initialTime} até ${time}`);
    }
  };

  const isCloseCliked = () => {
    setShowTimes(false);
    setInitialTime("");
    setFinalTime("");
  };

  const isReserveCliked = () => {
    if (initialTime && finalTime) {
      alert("Reserva realizada com sucesso!");
      setTimeSelected("");
      setInitialTime("");
      setFinalTime("");
    } else {
      alert("Selecione os dois horários antes de reservar.");
    }
  };

  const isBackClicked = () => {
    setShowBack(false);
    setInitialTime("");
  }

  const clearSelection = () => {
    setIsHovered(false);
    setTimeSelected("");
    setInitialTime("");
    setFinalTime("");
    setShowBack(false);
  };

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
  
  

  const times = [];
  for (let hour = 7.5; hour <= 22; hour += 0.5) {
    const wholeHour = Math.floor(hour);
    const minutes = hour === wholeHour ? "00" : "30";
    times.push(`${wholeHour.toString().padStart(2, "0")}:${minutes}`);
  }

  return (
    <div className="button-container">
      {showTimes && <div className="overlay" onClick={isCloseCliked}></div>}
      <div className="button-wrapper">
        <button
         className={`horario ${isHovered && initialTime && finalTime ? "clear" : ""}`}
          onClick={isHovered && initialTime && finalTime ? clearSelection: isTimeClicked}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={isTouchStarted}
          onTouchEnd={isTouchEnded}>
          {isHovered && initialTime && finalTime ? "Limpar seleção?" : timeSelected || "Horários"}
        </button>
      </div>
      {showTimes && (
        <div className="horarios-container" style={{ left: position.x, top: position.y }}>
          <span
           className={`fechar ${showBack ? " voltar" : ""}`} onClick={showBack ? isBackClicked : isCloseCliked}>
            {showBack ? "Voltar" : "X"}
           </span>
          {times
            .filter((time) => {
              if (!initialTime) {
                return true;
              } else {
                const [hour, minutes] = time.split(":").map(Number);
                const [firstHour, firstMinutes] = initialTime.split(":").map(Number);
                const firstMinutesInHour = firstHour * 60 + firstMinutes;
                const hourInMinutes = hour * 60 + minutes;
                return hourInMinutes > firstMinutesInHour + 30;
              }
            })
            .map((time, index) => (
              <button className="btn-horario" key={index} onClick={() => isTimeSelected(time)}>
                {time}
              </button>
            ))}
        </div>
      )}
      <div className="button-wrapper">
        <button className={`${timeSelected && finalTime ? "reserva on" : "reserva"}`} onClick={isReserveCliked} disabled={!initialTime || !finalTime}>
Reservar
</button>
</div>
</div>
);
}
