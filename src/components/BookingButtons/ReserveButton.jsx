import React, { useContext } from "react";
import { ReservationContext } from "../../utils/ReservationContext";
import "../../Styles/Button.css";

function ReserveButton({ initialTime, finalTime, selectedDate, room, clearTimeSelection }) {
  const {
    setReservationData,
    setShowSlidePanel,
  } = useContext(ReservationContext);

  const isReserveClicked = () => {
    if (initialTime && finalTime) {
      setReservationData({ date: selectedDate, initialTime, finalTime, room });
      setShowSlidePanel(true);
      clearTimeSelection(); // clear time selection when a reservation is made
    }
  };

  return (
    <>
      <button
        className={`reserva ${initialTime && finalTime ? "on" : ""}`}
        onClick={isReserveClicked}
        disabled={!initialTime || !finalTime}
      >
        Reservar
      </button>
    </>
  );
}

export default ReserveButton;