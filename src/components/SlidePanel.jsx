import React, { useRef, useContext, useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { ReservationContext } from "../contexts/ReservationContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmailInput from "../utils/EmailInput";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from 'firebase/auth';
import { db } from "../Firebase";
import '../Styles/ReservationPage.css'

// The SlidePanel component is responsible for handling the user's reservation and form submission. 
// It provides feedback messages, maintains form state, and manages reservation data context.
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

  // saveReservation function: responsible for validating form, creating a reservation and providing feedback to the user.
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

  // handleEmailChange function: triggers when the email input field is changed. It updates the error message based on whether or not there are emails.
  const handleEmailChange = (emails) => {
    if (emails.length > 0) {
      setNoEmailMsg('');
    }
  };

  // closePanel function: closes the slide panel and clears the current reservation selection and any error messages.
  const closePanel = () => {
    setShowSlidePanel(false);
    clearSelection();
    setNoEmailMsg('');
  };

  // closeMessage function: closes the message dialog and the slide panel.
  const closeMessage = () => {
    setShowDialog(false);
    closePanel();
  }

  // Rendering the component with its form fields and values from context and state...
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
        <div className="dialog slidePanel">
          <p>{dialogMessage}</p>
          <button onClick={() => closeMessage()}>Fechar</button>
        </div>
      )}
    </div>
  )
}

export default SlidePanel;
