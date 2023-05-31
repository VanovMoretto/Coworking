import React from "react";
import SlidePanel from "../SlidePanel";
import "../../Styles/Button.css";

// reserveButton is responsible for rendering the reservation button
function ReserveButton({ initialTime, finalTime, selectedDate, room, onClick, isUserLoggedIn }) {
  const [showSlidePanel, setShowSlidePanel] = React.useState(false);

  const isReserveClicked = () => {
    if (initialTime && finalTime && isUserLoggedIn) { // only open the slide panel if user is logged in
        setShowSlidePanel(true);
    }
    onClick();
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
        />
      )}
    </>
  );
}

export default ReserveButton;
