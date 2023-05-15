import React from 'react';
import SignUp from '../pages/Signup';
import '../Styles/SigninSignup.css';

const LoginForm = () => (
    <div className="section text-center">
        <h4 className="login-title">Log In</h4>
        <div className="form-group">
            <input type="email" className="form-style" placeholder="Email" />
            <i className="input-icon uil uil-at"></i>
        </div>
        <div className="form-group mt-2">
            <input type="password" className="form-style" placeholder="Password" />
            <i className="input-icon uil uil-lock-alt"></i>
        </div>
        <a href="https://www.web-leb.com/code" className="sub-button">Login</a>
        <p className="mb-0 mt-4 text-center">
            <span className="forgot-password">Forgot your password?</span>
        </p>
    </div>
);



const SigninSignup = ({ closeModal}) => (
    <div className="section">
        <div className="container">
            <div className="row full-height justify-content-center">
                <div className="col-12 text-center align-self-center py-5">
                    <div className="section pb-5 pt-5 pt-sm-2 text-center">
                        <h6 className="sign-in-up"><span>Entrar </span><span>Cadastrar</span></h6>
                        <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                        <label htmlFor="reg-log"></label>
                        <div className="card-3d-wrap mx-auto">
                            <div className="card-3d-wrapper">
                                <div className="card-front">
                                    <div className="center-wrap">
                                        <LoginForm />
                                    </div>
                                </div>
                                <div className="card-back">
                                    <div className="center-wrap">
                                        <SignUp closeModal={closeModal}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default SigninSignup;

