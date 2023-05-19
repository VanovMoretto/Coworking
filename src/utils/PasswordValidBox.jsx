import React, { useState, useEffect } from "react";
import '../Styles/PassValidBox.css'

const ValidBox = ({ password, isPasswordFieldFocused }) => {
    const [validationStatus, setValidationStatus] = useState({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasDigit: false,
        hasSymbol: false,
    });

    useEffect(() => {
        validatePassword(password);
    }, [password]);

    const validatePassword = (password = '') => {
        setValidationStatus({
            minLength: password.length >= 8,
            hasUpperCase: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasDigit: /\d/.test(password),
            hasSymbol: /\W|_/.test(password),
        });
    };

    return (
        <div className={`valid-checks ${!isPasswordFieldFocused ? 'hide' : ''}`}>
            <ul className="checklist">
                <li className={validationStatus.minLength ? "checked" : ""}><i className={validationStatus.minLength ? "uil uil-check checked" : "uil uil-check"}></i>Pelo menos 8 caracteres</li>
                <li className={validationStatus.hasLowerCase ? "checked" : ""}><i className={validationStatus.hasLowerCase ? "uil uil-check checked" : "uil uil-check"}></i>Letra minúscula</li>
                <li className={validationStatus.hasUpperCase ? "checked" : ""}><i className={validationStatus.hasUpperCase ? "uil uil-check checked" : "uil uil-check"}></i>Letra maiúscula</li>
                <li className={validationStatus.hasDigit ? "checked" : ""}><i className={validationStatus.hasDigit ? "uil uil-check checked" : "uil uil-check"}></i>Números</li>
                <li className={validationStatus.hasSymbol ? "checked" : ""}><i className={validationStatus.hasSymbol ? "uil uil-check checked" : "uil uil-check"}></i>Símbolos</li>
            </ul>
        </div>
    )
}

export default ValidBox;
