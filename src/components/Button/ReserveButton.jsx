import React from "react";

function ReserveButton({ initialTime, finalTime, isReserveClicked }) {
  return (
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