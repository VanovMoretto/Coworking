import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import logo from '../../assets/imgs/dutraLogo.png'
import '../../Styles/ForgotPassword.css'

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email.trim()) {
            setErrorMessage('Por favor, preencha o campo de email');
            return;
        }

        const auth = getAuth();
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Um email de recuperação de senha foi enviado. Verifique sua caixa de entrada');
        } catch (error) {
            console.error('Erro ao enviar email de recuperação', error);
            if (error.code === 'auth/user-not-found') {
                setErrorMessage('Não existe uma conta com este email.');
            } else {
                setErrorMessage('Ocorreu um erro, tente novamente mais tarde');
            }
        }
    };

    return (
        <div className="fg-pass-page">
            <form className="fg-pass-form" onSubmit={handleSubmit}>
                <img className="smalllogo" src={logo} alt="Logo" />
                <h2 className="fg-pass-title">Recuperar senha</h2>
                <p className="fg-pass-subtitle">Digite seu email abaixo para recuperar sua senha</p>
                <div className="form-group">
                    <input
                        className="form-style"
                        placeholder="Email"
                        autoComplete='email'
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setErrorMessage('');
                        }}
                    />
                    <i className="input-icon uil uil-at"></i>
                </div>
                <div className="msgs-container">
                    {errorMessage && <p className="fg-pass-msg err">{errorMessage}</p>}
                    {message && <p className="fg-pass-msg">{message}</p>}
                </div>
                <button type='submit' className="sub-button">Enviar</button>
            </form>
        </div>
    );
};

export default PasswordReset;
