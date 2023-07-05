import React, { useContext } from "react";
import { ReservationContext } from "../../contexts/ReservationContext";
import "../../Styles/Button.css";

// ReserveButton component that is responsible for the reservation functionality.
function ReserveButton({ initialTime, finalTime, selectedDate, room, clearTimeSelection }) {
  
  // Destructuring setReservationData and setShowSlidePanel from the context of ReservationContext.
  const {
    setReservationData,
    setShowSlidePanel,
  } = useContext(ReservationContext);

  // Function that runs when the reserve button is clicked. It checks if initialTime and finalTime are set.
  // If they are, it calls setReservationData with the selected data, makes the slide panel visible and clears the time selection.
  const isReserveClicked = () => {
    if (initialTime && finalTime) {
      setReservationData({ date: selectedDate, initialTime, finalTime, room });
      setShowSlidePanel(true);
      clearTimeSelection(); 
    }
  };

  // Rendering a button that is clickable only when both initialTime and finalTime are set. 
  // It calls the isReserveClicked function when clicked.
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
