import React, { useState } from 'react';
import { validateFullName, validateCPF, validateEmail, validatePhone, validatePassword } from '../utils/validation';
import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../Firebase';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import '../Styles/Signup.css'


const SignUp = (props) => {

    const [submitAttempted, setSubmitAttempted] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordShown = () => {
        setShowPassword(!showPassword);
    };

    const [formData, setFormData] = useState({
        fullName: '',
        cpf: '',
        email: '',
        phone: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({
        fullName: '',
        cpf: '',
        email: '',
        phone: '',
        password: '',
        createUserEmail: '',
        createUserPassword: '',
    });

    const validateAll = () => {
        const errors = {
            fullName: validateFullName(formData.fullName),
            cpf: validateCPF(formData.cpf),
            email: validateEmail(formData.email),
            phone: validatePhone(formData.phone),
            password: validatePassword(formData.password),
        };
        return errors;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        const errors = validateAll();
        setFormErrors(errors);
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const isFilled = Object.values(formData).every((value) => value !== '');
        if (isFilled) {
            const errors = validateAll();
            setFormErrors(errors);
            setSubmitAttempted(true);

            // Verify if all inputs are correct before sending
            const isValid = Object.values(errors).every((error) => error === '');
            if (isValid) {
                // Create the user with Firebase Authentication
                const auth = getAuth();
                createUserWithEmailAndPassword(auth, formData.email, formData.password)
                    .then(async (userCredential) => {
                        // User was created successfully.
                        console.log("User created: ", userCredential.user);

                        // Save additional user data in Firestore
                        const userDoc = doc(db, "users", userCredential.user.uid);
                        await setDoc(userDoc, {
                            fullName: formData.fullName,
                            cpf: formData.cpf,
                            email: formData.email,
                            phone: formData.phone,
                        });

                        // Redirect to another page after creation
                        navigate('/');
                        props.closeModal();
                    })
                    .catch((error) => {
                        // ...
                        let errorMessage = '';
                        switch (error.code) {
                            case 'auth/email-already-in-use':
                                errorMessage = '*Este email já está em uso.';
                                setFormErrors((prevErrors) => ({ ...prevErrors, createUserEmail: errorMessage }));
                                break;
                            case 'auth/invalid-email':
                                errorMessage = '*O email fornecido é inválido.';
                                setFormErrors((prevErrors) => ({ ...prevErrors, createUserEmail: errorMessage }));
                                break;
                            case 'auth/weak-password':
                                errorMessage = '*A senha usada é muito fraca.';
                                setFormErrors((prevErrors) => ({ ...prevErrors, createUserPassword: errorMessage }));
                                break;
                            default:
                                errorMessage = 'Ocorreu um erro desconhecido. Tente novamente mais tarde!';
                                alert(errorMessage);
                                break;
                        }
                    });
            } else {
                console.log("Erros de validação:", formErrors);
                // show interface errors
            }
        } else {
            const errors = validateAll();
            setFormErrors(errors);
            setSubmitAttempted(true);
        }
    };


    return (
        <form className="section text-center" onSubmit={handleSubmit}>
            <h4 className="signup-title">CRIAR CONTA</h4>
            <button
                onClick={props.closeModal}
                className="signup-close"
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="form-group">
                <input
                    placeholder='Nome Completo'
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`form-style ${formErrors.fullName ? "error" : ""}`}
                />
                <i className="input-icon uil uil-user"></i>
            </div>
            <div className="form-group mt-2">
                <MaskedInput
                    mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                    value={formData.cpf}
                    onChange={handleChange}
                    render={(ref, props) => (
                        <input
                            placeholder='CPF'
                            id="cpf"
                            name="cpf"
                            ref={ref}
                            className={`form-style ${formErrors.cpf ? "error" : ""}`}
                            {...props}
                        />
                    )}
                />
                <i className="input-icon uil uil-credit-card"></i>
            </div>
            <div className='form-group mt-2'>
                <input
                    className={`form-style ${formErrors.email || formErrors.createUserEmail ? "error" : ""}`}
                    placeholder='Email'
                    id="email"
                    name="email"
                    autoComplete='username'
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <i className="input-icon uil uil-at"></i>
                {formErrors.createUserEmail && <span className="error-message">{formErrors.createUserEmail}</span>}
            </div>
            <div className='form-group mt-2'>
                <MaskedInput
                    mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    render={(ref, props) => (
                        <input
                            placeholder='Telefone'
                            id="phone"
                            name="phone"
                            ref={ref}
                            className={`form-style ${formErrors.phone ? "error" : ""}`}
                            {...props}
                        />
                    )}
                />
                <i className="input-icon uil uil-phone"></i>
            </div>
            <div className='form-group mt-2' style={{ position: 'relative' }}>
                <input
                    placeholder='Senha'
                    className={`form-style ${formErrors.password || formErrors.createUserPassword ? "error" : ""}`}
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    autoComplete='current-password'
                    onChange={(e) => {
                        handleChange(e)
                        validatePassword(e.target.value);
                    }}
                    style={{ paddingRight: '50px' }}
                />
                <i className="input-icon uil uil-lock-alt"></i>
                {formErrors.createUserPassword && <span className="error-message">{formErrors.createUserPassword}</span>}
                <button
                    type="button"
                    onClick={isPasswordShown}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '33%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                    }}
                >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
                <span className="error-message" style={{ visibility: submitAttempted && Object.values(formErrors).some((error) => error !== '') ? "visible" : "hidden" }}>
                    *Verifique os campos digitados
                </span>
            </div>
            <button
                type="submit"
                className='sub-button'
            >
                criar
            </button>
        </form>
    );
};

export default SignUp;
