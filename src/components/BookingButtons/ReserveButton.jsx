import React, { useState } from "react";
import SlidePanel from "../SlidePanel";
import "../../Styles/Button.css";

// reserveButton is responsible for rendering the reservation button
function ReserveButton({ initialTime, finalTime, selectedDate, room, clearSelection }) {
  const [showSlidePanel, setShowSlidePanel] = useState(false);

  const isReserveClicked = () => {
    if (initialTime && finalTime) {
      setShowSlidePanel(true);
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
      {showSlidePanel && (
        <SlidePanel
          isVisible={showSlidePanel}
          closePanel={() => setShowSlidePanel(false)}
          reservationData={{ date: selectedDate, initialTime, finalTime, room }}
          clearSelection={clearSelection}
        />
      )}
    </>
  );
}

export default ReserveButton;
