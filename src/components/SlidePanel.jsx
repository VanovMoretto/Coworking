import React, { useState } from "react";
import { db } from "../Firebase";
import { getAuth } from 'firebase/auth';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { collection, addDoc, Timestamp } from "firebase/firestore"
import '../Styles/ReservationPage.css'

const SlidePanel = ({ isVisible, closePanel, reservationData = {}, clearSelection }) => {
  const { date = '', initialTime = '', finalTime = '', room = '' } = reservationData;
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');


  const closeBox = () => {
    closePanel();
    setShowDialog(false)
  }

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
        setShowDialog(true);
        setDialogMessage('Reserva realizada com sucesso!');
      } catch (error) {
        setDialogMessage('Houve um erro ao tentar fazer a reserva. Por favor, tente novamente.');
        setShowDialog(true);
      }
    }
  };

  return (
    <div className={`slide-panel ${isVisible ? "open" : ""}`}>
      <h2 className="panel-h2">Reserva</h2>
      <button className="panel-close" onClick={closePanel}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className="panel-display">
        <p>Local: {room}</p>
        <p>Dia: {new Date(date).toLocaleDateString()}</p>
        <p>Horário: {initialTime} até {finalTime}</p>
      </div>
      <div className="panel-form">
        <label>
          Pessoas que irão participar:
          <input className="panel form-style" type="text" placeholder="Digite os e-mails separados por vírgula" />
        </label>
        <label htmlFor="needSomething">
          Precisará de algo?
          <textarea className="panel form-style" id="needSomething" rows="5" cols="23" placeholder="Café, água, etc" />
        </label>
      </div>
      <button className="panel-button" onClick={saveReservation}>Concluir</button>
      {showDialog && (
        <div className="dialog">
          <p>{dialogMessage}</p>
          <button onClick={closeBox}>Fechar</button>
        </div>
      )}
    </div>
  )
}

export default SlidePanel;
