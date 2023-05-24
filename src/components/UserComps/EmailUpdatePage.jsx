import React, { useState } from 'react';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updateEmail } from "firebase/auth";
import { updateUserDisplayName } from '../../utils/userUtils.js';
import { useNavigate } from 'react-router-dom';
import '../../Styles/UserChanges.css'

const EmailUpdate = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const successStyle = {
    color: 'green'
  };

  const errorStyle = {
    color: 'red'
  };

  const getMessageStyle = (message) => {
    if (message.startsWith('Email alterado')) {
        return successStyle;
    } else {
        return errorStyle;
    }
  }

  const getFriendlyErrorMessage = (error) => {
    switch (error.code) {
      case 'auth/wrong-password':
        return 'Senha incorreta.';
      case 'auth/invalid-email':
        return 'Formato de e-mail inválido.';
      case 'auth/email-already-in-use':
        return 'Este e-mail já está em uso.';
      default:
        return 'Ocorreu um erro. Por favor, tente novamente mais tarde.';
    }
  };

  const handleEmailUpdate = async (event) => {
    event.preventDefault();
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );

    reauthenticateWithCredential(auth.currentUser, credential)
    .then(() => {
        updateEmail(user, email)
            .then(() => {
                updateUserDisplayName(user);  // Agora você pode usar a função aqui
                setMessage('Email alterado com sucesso!');
                navigate('/myAccount'); 
            })
            .catch((error) => {
                setMessage(getFriendlyErrorMessage(error));
            });
    })
    .catch((error) => {
        setMessage(getFriendlyErrorMessage(error));
    });
  }

  return (
    <div className='update-page'>
      <div className='update-container'>
        <h2 className='update-h2'>Atualizar Email</h2>
        <form className='update-form' onSubmit={handleEmailUpdate}>
          <input
            className='update-email-input'
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Novo email"
            required
          />
          <input
            className='update-password-input'
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Senha atual"
            required
          />
          {message && <p style={getMessageStyle(message)} className='update-msg'>{message}</p>}
          <button className='update-submit' type="submit">Atualizar</button>
        </form>
      </div>
    </div>
  );
};

export default EmailUpdate;
