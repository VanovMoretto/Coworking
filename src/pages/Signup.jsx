import React, { useState } from 'react';
import { validateName, validateLastName, validateCPF, validateBirthDate, validateEmail, validatePhone, validatePassword, validateConfirmPassword } from '../utils/validation';
import { TextField, Button, IconButton, InputAdornment, FormHelperText, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
/* import 'react-phone-input-2/lib/style.css'; desinstalar o phone */
import '../Styles/Signup.css'

const SignUp = () => {

    const [submitAttempted, setSubmitAttempted] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordShown = () => {
        setShowPassword(!showPassword);
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        cpf: '',
        birthDate: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
        cpf: '',
        birthDate: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const validateAll = () => {
        const errors = {
            firstName: validateName(formData.firstName),
            lastName: validateLastName(formData.lastName),
            cpf: validateCPF(formData.cpf),
            birthDate: validateBirthDate(formData.birthDate),
            email: validateEmail(formData.email),
            phone: validatePhone(formData.phone),
            password: validatePassword(formData.password),
            confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword),
        };
        return errors;
    };
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
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
                // Send data to server
                console.log("Dados enviados para o servidor:", formData);
                // Redirect to another page after creation
                navigate('/');
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
        <div className='signup-page'>
            <div className="signup-container">
                <h1 className="signup-title">CRIAR CONTA</h1>
                <form className="form-container" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(formErrors.firstName)}
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
                            <FormHelperText error>{submitAttempted && formErrors.firstName}</FormHelperText>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(formErrors.lastName)}
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
                            <FormHelperText error>{submitAttempted && formErrors.lastName}</FormHelperText>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <MaskedInput
                                error={Boolean(formErrors.cpf)}
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
                            <FormHelperText error>{submitAttempted && formErrors.cpf}</FormHelperText>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <MaskedInput
                                error={Boolean(formErrors.birthDate)}
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
                            <FormHelperText error>{submitAttempted && formErrors.birthDate}</FormHelperText>
                        </Grid>
                    </Grid>
                    <FormHelperText error>{formErrors.name}</FormHelperText>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(formErrors.email)}
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
                            <FormHelperText error>{submitAttempted && formErrors.email}</FormHelperText>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <MaskedInput
                                error={Boolean(formErrors.phone)}
                                mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                render={(ref, props) => (
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Telefone"
                                        inputRef={ref}
                                        {...props}
                                        sx={{
                                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                        }}
                                    />
                                )}
                            />
                            <FormHelperText error>{submitAttempted && formErrors.phone}</FormHelperText>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(formErrors.password)}
                                fullWidth
                                margin="normal"
                                label="Senha"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => {
                                    handleChange(e)
                                    validatePassword(e.target.value);
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
                            <FormHelperText error>{submitAttempted && formErrors.password}</FormHelperText>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(formErrors.confirmPassword)}
                                fullWidth
                                margin="normal"
                                label="Confirmar"
                                name="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={(e) => {handleChange(e)}}
                                sx={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'}}
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
                            <FormHelperText error>{submitAttempted && formErrors.confirmPassword}</FormHelperText>
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
