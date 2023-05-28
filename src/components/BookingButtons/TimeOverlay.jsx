import React from "react";
import "../../Styles/Button.css";


// TimeOverlay is responsible for rendering a dark overlay when the time list is open

function TimeOverlay({ showTimes, isCloseClicked }) {
  // it shows a dark overlay when "showTimes" is true and call the function isCloseClicked when clicked
  return showTimes ? <div className="overlay" onClick={isCloseClicked}></div> : null;
}

export default TimeOverlay;