import React from "react";
import '../Button.css'

// reserveButton is responsible for rendering the reservation button
function ReserveButton({ initialTime, finalTime, isReserveClicked }) {
  return (
    // when clicked, it calls the function isReserveClicked to handle the reservation
    // the button is disabled if the "initialTime" and "finalTime" are not selected
    <button
      className={`reserva ${initialTime && finalTime ? "on" : ""}`}
      onClick={isReserveClicked}
      disabled={!initialTime || !finalTime}
    >
      Reservar
    </button>
  );
}

export default ReserveButton;