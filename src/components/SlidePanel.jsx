import React, { useState } from "react";
import '../Styles/ReservationPage.css'
import { db } from "../Firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { getAuth } from 'firebase/auth';

const SlidePanel = ({ isVisible, closePanel, reservationData = {}, clearSelection }) => {
  const { date = '', initialTime = '', finalTime = '', room = '' } = reservationData;
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const dialog = showDialog ? (
    <div className="dialog">
      <p>{dialogMessage}</p>
      <button onClick={() => setShowDialog(false)}>Fechar</button>
    </div>
  ) : null;

  console.log("Rendering - showDialog: ", showDialog);
  


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
        closePanel();
        clearSelection();
        setDialogMessage('Reserva realizada com sucesso!');
        setShowDialog(true);
        console.log("dialogMessage: ", dialogMessage);
        console.log("showDialog: ", showDialog);

      } catch (error) {
        setDialogMessage('Houve um erro ao tentar fazer a reserva. Por favor, tente novamente.');
        setShowDialog(true);
      }
    }
  };

  return (
    <div className={`slide-panel ${isVisible ? "open" : ""}`}>
      <h2>Reserva</h2>
      <button onClick={closePanel}>Fechar</button>
      <p>Dia: {new Date(date).toLocaleDateString()}</p>
      <p>Horário: {initialTime} até {finalTime}</p>
      <p>Local: {room}</p>
      <label>
        Pessoas que irão participar:
        <input className="form-style" type="text" placeholder="Digite os e-mails separados por vírgula" />
      </label>
      <label>
        Precisa de algo?
        <input className="form-style" type="text" placeholder="Café, água, etc" />
      </label>
      <button onClick={saveReservation}>Concluir</button>
      {dialog}
    </div>
  )
}

export default SlidePanel;
