import React, { useRef, useContext, useState } from "react";
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
  const [textAreaContent, setTextAreaContent] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [noEmailMsg, setNoEmailMsg] = useState('');
  
  const emailInputRef = useRef();

  const saveReservation = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const emails = emailInputRef.current.getEmails();

    if (emails.length === 0) {
      setNoEmailMsg('Você deve adicionar ao menos um participante!');
      return;
    }

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
          emails: emailInputRef.current.getEmails(),
          text: textAreaContent,
        });
        clearSelection();
        setDialogMessage('Reserva realizada com sucesso!');
        setShowDialog(true);
        setTextAreaContent('');
        emailInputRef.current.clear();
      } catch (error) {
        setDialogMessage('Houve um erro ao tentar fazer a reserva. Por favor, tente novamente.');
        setShowDialog(true);
      }
    }
  };

  const handleEmailChange = (emails) => {
    if (emails.length > 0) {
      setNoEmailMsg('');
    }
  };

  const closePanel = () => {
    setShowSlidePanel(false);
    clearSelection();
    setNoEmailMsg('');
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
      <div className="panel-display">
        <p><strong>Local</strong>: {room}</p>
        <p><strong>Dia</strong>: {new Date(date).toLocaleDateString()}</p>
        <p><strong>Horário</strong>: {initialTime} até {finalTime}</p>
      </div>
      <div className="panel-form">
      <EmailInput ref={emailInputRef} onChange={handleEmailChange} />
        <p className="needSomething-p">Precisará de algo para a ocasião?</p>
        <textarea
          className="needSomething-box"
          placeholder="Café, água..."
          rows='4'
          value={textAreaContent}
          onChange={e => setTextAreaContent(e.target.value)}
        />
      </div>
        <p className='error-message'>{noEmailMsg ? noEmailMsg : ''}</p>
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
