import React, { useState, useContext } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { ReservationContext } from "../utils/ReservationContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmailInput from "../utils/EmailInput";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from 'firebase/auth';
import { db } from "../Firebase";
import '../Styles/ReservationPage.css'

const SlidePanel = () => {

  const {
    reservationData = {},
    showSlidePanel, setShowSlidePanel,
    clearSelection,
  } = useContext(ReservationContext);

  const { date = '', initialTime = '', finalTime = '', room = '' } = reservationData;
  const [dialogMessage, setDialogMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const saveReservation = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        const initialDateTime = new Date(date);
        initialDateTime.setHours(parseInt(initialTime.split(":")[0]));
        initialDateTime.setMinutes(parseInt(initialTime.split(":")[1]));

        const finalDateTime = new Date(date);
        finalDateTime.setHours(parseInt(finalTime.split(":")[0]));
        finalDateTime.setMinutes(parseInt(finalTime.split(":")[1]));

        const timestampInitialTime = Timestamp.fromDate(initialDateTime);
        const timestampFinalTime = Timestamp.fromDate(finalDateTime);

        const timestampDate = Timestamp.fromDate(date);
        await addDoc(collection(db, "reservations"), {
          userId: user.uid,
          initialTime: timestampInitialTime,
          finalTime: timestampFinalTime,
          date: timestampDate,
          room: room,
        });
        clearSelection();
        setDialogMessage('Reserva realizada com sucesso!');
        setShowDialog(true);
      } catch (error) {
        setDialogMessage('Houve um erro ao tentar fazer a reserva. Por favor, tente novamente.');
        setShowDialog(true);
      }
    }
  };

  const closePanel = () => {
    setShowSlidePanel(false);
    clearSelection();
  };

  const closeMessage = () => {
    setShowDialog(false);
    closePanel();
  }

  return (
    <div className={`slide-panel ${showSlidePanel ? "open" : ""}`}>
      <h2>Reserva</h2>
      <button
        className="panel-close"
        onClick={closePanel}>
        <FontAwesomeIcon icon={faTimes}
        />
      </button>
      <p>Dia: {new Date(date).toLocaleDateString()}</p>
      <p>Horário: {initialTime} até {finalTime}</p>
      <p>Local: {room}</p>
        <EmailInput/>
      <label htmlFor="needSomething">
        Precisa de algo?
        <textarea id='needSomething' className="needSomething-box" placeholder="Café, água, etc" rows='4' cols='28' />
      </label>
      <button
        className="panel-button"
        onClick={saveReservation}>
        Concluir
      </button>
      {showDialog && (
        <div className="dialog">
          <p>{dialogMessage}</p>
          <button onClick={() => closeMessage()}>Fechar</button>
        </div>
      )}
    </div>
  )
}

export default SlidePanel;
