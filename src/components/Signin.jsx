import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Signin.css'
import '../Styles/SigninSignup.css'

const SignIn = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();

        // verify if there are empty inputs
        if (!email.trim() || !password.trim()) {
            setErrorMessage('Os campos de email e senha não podem estar vazios.');
            return;
        }

        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            props.closeModal();
            navigate('/');
        } catch (error) {
            console.error('Erro ao fazer login', error);
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setErrorMessage('Usuário ou senha incorreto.');
            } else {
                setErrorMessage('Não foi possível conectar no momento.');
            }
        }
    };



    return (
        <form className="section text-center" onSubmit={handleSubmit}>
            <h4 className="login-title">Entrar</h4>
            <button
                type='button'
                onClick={props.closeModal}
                className="signin-close"
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>
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
            <div className="form-group mt-2">
                <input
                    className="form-style"
                    placeholder="Password"
                    autoComplete='current-password'
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setErrorMessage('');
                    }}
                />
                <i className="input-icon uil uil-lock-alt"></i>
            </div>
            {errorMessage && <p className="error-message-signin">{errorMessage}</p>}
            <button type='submit' className="sub-button">Entrar</button>
            <p className="mb-0 mt-4 text-center">
                <span className="forgot-password">Esqueceu sua senha?</span>
            </p>
        </form>
    );
};

export default SignIn;
