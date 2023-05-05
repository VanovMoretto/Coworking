import React from "react";

function TimeOverlay({ showTimes, isCloseClicked }) {
  return showTimes ? <div className="overlay" onClick={isCloseClicked}></div> : null;
}

export default TimeOverlay;