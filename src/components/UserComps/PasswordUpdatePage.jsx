import React, { useState } from 'react';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { validatePassword } from '../../utils/validation';
import '../../Styles/UserChanges.css'

const PasswordUpdate = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();  

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const successStyle = {
    color: 'green'
  };

  const errorStyle = {
    color: 'red'
  };

  const getMessageStyle = (message) => {
    if (message.startsWith('Senha alterada')) {
        return successStyle;
    } else {
        return errorStyle;
    }
  }

  const getFriendlyErrorMessage = (error) => {
    switch (error.code) {
      case 'auth/wrong-password':
        return 'Senha atual incorreta.';
      case 'auth/weak-password':
        return 'A nova senha parece fraca demais.';
      default:
        return 'Ocorreu um erro. Por favor, tente novamente mais tarde.';
    }
  };

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();

    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );

    reauthenticateWithCredential(auth.currentUser, credential)
    .then(() => {
        const newPasswordValidationMessage = validatePassword(newPassword);

        if (newPasswordValidationMessage !== '') {
            setMessage(newPasswordValidationMessage);
            return;
        }

        updatePassword(user, newPassword)
            .then(() => {
                setMessage('Senha alterada com sucesso!');
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
        <h2 className='update-h2'>Atualizar Senha</h2>
        <form className='update-form' onSubmit={handlePasswordUpdate}>
        <input type="text" autoComplete="username" style={{display:'none'}}/>
          <input
            className='update-password-input'
            type="password"
            autoComplete="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            placeholder="Senha atual"
            required
          />
          <input
            className='update-password-input'
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Nova senha"
            required
          />
          {message && <p style={getMessageStyle(message)} className='update-msg password'>{message}</p>}
          <button className='update-submit' type="submit">Atualizar</button>
        </form>
      </div>
    </div>
  );
};

export default PasswordUpdate;
