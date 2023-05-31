import React, { useState, useEffect } from "react";
import TimeButton from "./TimeButton";
import TimeList from "./TimeList";
import TimeOverlay from "./TimeOverlay";
import ReserveButton from "./ReserveButton";
import { getAuth } from 'firebase/auth';
import "../../Styles/Button.css";

// Button component serves as the parent container for managing the reservation process
const BookingButton = ({ selectedDate, room }) => {


  const [showTimes, setShowTimes] = useState(false);
  const [timeSelected, setTimeSelected] = useState("");
  const [initialTime, setInitialTime] = useState("");
  const [finalTime, setFinalTime] = useState("");
  const [showBack, setShowBack] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // useEffect to manage body overflow when the TimeList is shown
  useEffect(() => {
    const body = document.body;

    body.style.overflow = showTimes ? "hidden" : "initial";
  }, [showTimes]);

  // Function to handle TimeButton click event
  const isTimeClicked = (event) => {
    setShowTimes(true);
  };

  // Function to handle selecting a time from TimeList
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

  // Function to handle closing TimeList overlay
  const isCloseCliked = () => {
    setShowTimes(false);
    setInitialTime("");
    setFinalTime("");
  };

  // Function to handle reserve button click event
  // Function to handle reserve button click event
  const isReserveClicked = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        setIsUserLoggedIn(false);
        setShowLoginDialog(true);
        console.log('showLoginDialog set to true');
        return;
    }
    setIsUserLoggedIn(true); // user is logged in
    // Removed the call to saveReservation
    setTimeSelected("");
    setInitialTime("");
    setFinalTime("");
  };


  // Function to handle back button click event in TimeList
  const isBackClicked = () => {
    setShowBack(false);
    setInitialTime("");
  }

  // Function to clear the selected times
  const clearSelection = () => {
    setIsHovered(false);
    setTimeSelected("");
    setInitialTime("");
    setFinalTime("");
    setShowBack(false);
  };

  // Initializing the initialTimes and finalTimes arrays for TimeList component

  const initialTimes = [];

  // Generating the initialTimes and finalTimes arrays
  for (let hour = 7.5; hour <= 21.5; hour += 0.5) {
    // ... initialTimes code
    const wholeHour = Math.floor(hour);
    const minutes = hour === wholeHour ? "00" : "30";
    initialTimes.push(`${wholeHour.toString().padStart(2, "0")}:${minutes}`);
  }

  const finalTimes = [];
  for (let hour = 8; hour <= 22; hour += 0.5) {
    // ... finalTimes code
    const wholeHour = Math.floor(hour);
    const minutes = hour === wholeHour ? "00" : "30";
    finalTimes.push(`${wholeHour.toString().padStart(2, "0")}:${minutes}`);
  }

  const times = [];

  for (let hour = 7.5; hour <= 22; hour += 0.5) {
    const wholeHour = Math.floor(hour);
    const minutes = hour === wholeHour ? "00" : "30";
    times.push(`${wholeHour.toString().padStart(2, "0")}:${minutes}`);
  }

  useEffect(() => {
    const body = document.body;

    body.style.overflow = showLoginDialog ? "hidden" : "initial";
  }, [showLoginDialog]);





  return (
    <div className="button-container">
      {/* Render TimeOverlay, TimeButton, TimeList, and ReserveButton components */}
      <TimeOverlay showTimes={showTimes} isCloseClicked={isCloseCliked} />
      <TimeButton
        isHovered={isHovered}
        initialTime={initialTime}
        finalTime={finalTime}
        timeSelected={timeSelected}
        clearSelection={clearSelection}
        isTimeClicked={isTimeClicked}
        setIsHovered={setIsHovered}
      />
      {showTimes && (
        <TimeList
          initialTime={initialTime}
          finalTime={finalTime}
          showBack={showBack}
          isTimeSelected={isTimeSelected}
          isCloseClicked={isCloseCliked}
          isBackClicked={isBackClicked}
          selectedDate={selectedDate}
          room={room}
        />
      )}
      <ReserveButton
         initialTime={initialTime}
         finalTime={finalTime}
         selectedDate={selectedDate}
         room={room}
         isUserLoggedIn={isUserLoggedIn}
         onClick={isReserveClicked}
      />
      {showLoginDialog && (
        <div className="dialog">
          <p>Você precisa logar na sua conta para concluir a reserva.</p>
          <button onClick={() => setShowLoginDialog(false)}>Fechar</button>
        </div>
      )}
    </div>
  );
}

export default BookingButton