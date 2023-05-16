import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '../Styles/SigninSignup.css'

const SignIn = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');  // navegar para a página principal após o login bem-sucedido
        } catch (error) {
            console.error('Erro ao fazer login', error);
            // implemente a lógica de exibição de erro para o usuário
        }
    };

    return (
        <form className="section text-center" onSubmit={handleSubmit}>
            <h4 className="login-title">Log In</h4>
            <div className="form-group">
                <input
                    className="form-style"
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <i className="input-icon uil uil-at"></i>
            </div>
            <div className="form-group mt-2">
                <input
                    className="form-style"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <i className="input-icon uil uil-lock-alt"></i>
            </div>
            <button className="sub-button">Entrar</button>
            <p className="mb-0 mt-4 text-center">
                <span className="forgot-password">Forgot your password?</span>
            </p>
        </form>
    );
};

export default SignIn;
