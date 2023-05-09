function validateRequired(value, errorMessage) {
    if (value === '') {
        return errorMessage;
    } else {
        return '';
    }
}

function unmask(value) {
    return value.replace(/\D+/g, '');
}


export function validateName(name) {
    return validateRequired(name, '*Use um nome')
}

export function validateLastName(lastName) {
    return validateRequired(lastName, '*use um sobrenome')
}

const allDigitsAreEqual = (str) => {
    const firstDigit = str[0];
    for (let i = 1; i < str.length; i++) {
        if (str[i] !== firstDigit) return false;
    }
    return true;
};

export function isValidCPF(strCPF) {
    let sum;
    let rest;
    sum = 0;

    if (allDigitsAreEqual(strCPF)) return false;

    for (let i = 1; i <= 9; i++)
        sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(strCPF.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++)
        sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(strCPF.substring(10, 11))) return false;
    return true;
}

export function validateCPF(cpf) {
    const cleanCPF = cpf.replace(/[^\d]/g, "");

    if (validateRequired(cleanCPF, '*Este campo é obrigatório') !== '') {
        return validateRequired(cleanCPF, '*Este campo é obrigatório');
    } else if (!isValidCPF(cleanCPF)) {
        return 'Insira um CPF válido';
    } else {
        return '';
    }
}

export function isValidBirthDate(strDate) {
    if (strDate.includes("_")) return false;

    const dateParts = strDate.split("/");
    if (dateParts.length !== 3) return false;

    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);

    if (year < 1920 || year > new Date().getFullYear()) return false;
    if (month < 1 || month > 12) return false;

    const daysInMonth = [31, (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day < 1 || day > daysInMonth[month - 1]) return false;

    return true;
};

export function validateBirthDate(birthDate) {
    if (validateRequired(birthDate, '*Este campo é obrigatório') !== '') {
        return validateRequired(birthDate, '*Este campo é obrigatório');
    } else if (!isValidBirthDate(birthDate)) {
        return '*Data de nascimento inválida';
    } else {
        return '';
    }
}

export function validateEmail(email) {
    if (email === '') {
        return '*Este campo é obrigatório'
    }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return '*Formato de email inválido';
        }
        return '';
    }




    export function validatePhone(phone) {
        if (phone === '') {
            return '*Este campo é obrigatório';
        } else {
            const unmasked = unmask(phone);
            if (unmasked.length < 11) {
                return '*Insira um número válido';
            } else {
                return '';
            }
        }
    }

    export function validatePassword(password) {
        let error = '';

        if (password === '') {
            return '*Use uma senha';
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

        return error;
    }

    export function validateConfirmPassword(password, confirmPassword) {
        if (confirmPassword === '') {
            return '*Confirme sua senha';
        }
    
        if (password !== confirmPassword) {
            return '*As senhas devem ser iguais. Tente novamente';
        } else {
            return '';
        }
    }
    