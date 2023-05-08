import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment, FormHelperText, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import MaskedInput from 'react-text-mask';
import '../Styles/Signup.css'

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        cpf: '',
        birthDate: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [fieldError, setFieldError] = useState({
        firstName: '',
        lastName: '',
        cpf: '',
        birthDate: '',
        email: '',
    });

    const validateName = () => {
        if (formData.firstName === '') {
            setFieldError((prevError) => ({
                ...prevError,
                firstName: '*O campo nome é obrigatório',
            }));
            return false;
        } else {
            setFieldError((prevError) => ({
                ...prevError,
                firstName: '',
            }));
            return true;
        }
    };

    const validateLast = () => {
        if (formData.lastName === '') {
            setFieldError((prevError) => ({
                ...prevError,
                lastName: '*O campo sobrenome é obrigatório',
            }));
            return false;
        } else {
            setFieldError((prevError) => ({
                ...prevError,
                lastName: '',
            }));
            return true;
        }
    };

    const validateCPF = () => {
        if (formData.cpf === '') {
            setFieldError((prevError) => ({
                ...prevError,
                cpf: '*Este campo é obrigatório',
            }));
            return false;
        } else {
            setFieldError((prevError) => ({
                ...prevError,
                cpf: '',
            }));
            return true;
        }
    };

    const validateBirthDate = () => {
        if (formData.birthDate === '') {
            setFieldError((prevError) => ({
                ...prevError,
                birthDate: '*Este campo é obrigatório',
            }));
            return false;
        } else {
            setFieldError((prevError) => ({
                ...prevError,
                birthDate: '',
            }));
            return true;
        }
    };

    const validateEmail = () => {
        if (formData.email === '') {
            setFieldError((prevError) => ({
                ...prevError,
                email: '*O campo email é obrigatório',
            }));
            return false;
        } else {
            setFieldError((prevError) => ({
                ...prevError,
                email: '',
            }));
            return true;
        }
    };

    const [passwordError, setPasswordError] = useState({
        password: '',
        confirmPassword: '',
    });

    const validatePasswordRequired = () => {
        if (formData.password === '') {
            setPasswordError((prevError) => ({
                ...prevError,
                password: '*Use uma senha',
            }));
            return false;
        } else {
            setPasswordError((prevError) => ({
                ...prevError,
                password: '',
            }));
            return true;
        }
    };

    const validatePassword = (password, field) => {
        let error = '';

        if (password === '') {
            setPasswordError((prevError) => ({ ...prevError, [field]: '' }));
            return true;
        }

        const minLength = 8;
        const maxLength = 16;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSymbol = /\W|_/.test(password);

        if (password.length < minLength) {
            error = '*Sua senha deve conter no mínimo 8 caracteres';
        } else if (password.length > maxLength) {
            error = '*Sua senha não deve conter mais do que 16 caracteres';
        } else if (!hasUpperCase || !hasLowerCase) {
            error = '*Sua senha deve conter letras maiúsculas e minúsculas';
        } else if (!hasDigit) {
            error = '*Sua senha deve conter números';
        } else if (!hasSymbol) {
            error = '*Sua senha deve conter símbolos';
        }

        setPasswordError((prevError) => ({ ...prevError, [field]: error }));
        return error === '';
    };

    const validateConfirmPassword = (confirmPassword) => {
        if (confirmPassword === '') {
            setPasswordError((prevError) => ({
                ...prevError,
                confirmPassword: '',
            }));
            return;
        }

        if (formData.password !== confirmPassword) {
            setPasswordError((prevError) => ({
                ...prevError,
                confirmPassword: '*As senhas devem ser iguais. Tente novamente',
            }));
        } else {
            setPasswordError((prevError) => ({
                ...prevError,
                confirmPassword: '',
            }));
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const isPasswordChanged = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        validatePassword(value, name);
    };

    const isPasswordShown = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const isFirstNameValid = validateName();
        const isLastNameValid = validateLast();
        const isCPFValid = validateCPF();
        const isBirthDateValid = validateBirthDate()
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePasswordRequired();

        if (!isPasswordValid || !validatePassword(formData.password, 'password')) {
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            return;
        }

        if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isCPFValid || !isBirthDateValid) {
            return;
        }

        // Implemente a lógica de registro aqui
        console.log('Dados do formulário:', formData);
    };

    return (
        <div className='signup-page'>
            <div className="signup-container">
                <h1 className="signup-title">CRIAR CONTA</h1>
                <form className="form-container" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Nome"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                sx={{
                                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                            <FormHelperText error>{fieldError.firstName}</FormHelperText>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Sobrenome"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                sx={{
                                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                            <FormHelperText error>{fieldError.lastName}</FormHelperText>
                        </Grid>
                        <Grid item xs={6}>
                            <MaskedInput
                                mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                                value={formData.cpf}
                                onChange={handleChange}
                                render={(ref, props) => (
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="CPF"
                                        name="cpf"
                                        inputRef={ref}
                                        {...props}
                                        sx={{
                                            width: '100%',
                                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                        }}
                                    />
                                )}
                            />
                            <FormHelperText error>{fieldError.cpf}</FormHelperText>
                        </Grid>
                        <Grid item xs={6}>
                            <MaskedInput
                                mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                value={formData.birthDate}
                                onChange={handleChange}
                                render={(ref, props) => (
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Data de Nascimento"
                                        name="birthDate"
                                        inputRef={ref}
                                        {...props}
                                        sx={{
                                            width: '100%',
                                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                        }}
                                    />
                                )}
                            />
                            <FormHelperText error>{fieldError.birthDate}</FormHelperText>
                        </Grid>
                    </Grid>
                    <FormHelperText error>{fieldError.name}</FormHelperText>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="E-mail"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        sx={{
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                    <FormHelperText error>{fieldError.email}</FormHelperText>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Senha"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={isPasswordChanged}
                                sx={{
                                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={isPasswordShown}>
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <FormHelperText error>{passwordError.password}</FormHelperText>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Confirmar Senha"
                                name="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={(e) => {
                                    isPasswordChanged(e);
                                    validateConfirmPassword(e.target.value);
                                }}
                                sx={{
                                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={isPasswordShown}>
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <FormHelperText error>{passwordError.confirmPassword}</FormHelperText>
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '30px', marginBottom: '20px', backgroundColor: '#4285f4' }}
                    >
                        criar
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
