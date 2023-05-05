import React, { useState, useEffect } from "react";
import TimeButton from "./Button/TimeButton";
import TimeList from "./Button/TimeList";
import TimeOverlay from "./Button/TimeOverlay";
import ReserveButton from "./Button/ReserveButton";
import "./Button.css";

export default function Button(props) {


  const [showTimes, setShowTimes] = useState(false);
  const [timeSelected, setTimeSelected] = useState("");
  const [initialTime, setInitialTime] = useState("");
  const [finalTime, setFinalTime] = useState("");
  const [showBack, setShowBack] = useState(false);
  const [isHovered, setIsHovered] = useState(false);


  useEffect(() => {
    const body = document.body;

    body.style.overflow = showTimes ? "hidden" : "initial";
  }, [showTimes]);

  const isTimeClicked = (event) => {
    setShowTimes(true);
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

  const initialTimes = [];
  for (let hour = 7.5; hour <= 21.5; hour += 0.5) {
    const wholeHour = Math.floor(hour);
    const minutes = hour === wholeHour ? "00" : "30";
    initialTimes.push(`${wholeHour.toString().padStart(2, "0")}:${minutes}`);
  }

  const finalTimes = [];
  for (let hour = 8; hour <= 22; hour += 0.5) {
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

  return (
    <div className="button-container">
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
        />
      )}
      <ReserveButton initialTime={initialTime} finalTime={finalTime} isReserveClicked={isReserveCliked} />
    </div>
  );
}