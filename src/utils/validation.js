export function validateName(name) {
    if (name === '') {
        return '*Coloque um nome';
    } else {
        return '';
    }
}

export function validateLastName(lastName) {
    if (lastName === '') {
        return '*Coloque um sobrenome';
    } else {
        return '';
    }
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
  
    if (cleanCPF === '') {
      return '*Este campo é obrigatório';
    }
  
    if (!isValidCPF(cleanCPF)) {
      return 'Insira um CPF válido';
    } else {
      return '';
    }
  }
  
  export function isValidBirthDate(strDate)  {
    const dateParts = strDate.split("/");
    if (dateParts.length !== 3) return false;
  
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);
  
    if (year < 1900 || year > new Date().getFullYear()) return false;
    if (month < 1 || month > 12) return false;
  
    const daysInMonth = [31, (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day < 1 || day > daysInMonth[month - 1]) return false;
  
    return true;
  };
  
  export function validateBirthDate(birthDate) {
    if (birthDate === '') {
        return '*Este campo é obrigatório';
    }

    if (!isValidBirthDate(birthDate)) {
        return '*Data de nascimento inválida';
    } else {
        return '';
    }
}

  export function validateEmail(email) {
    if (email === '') {
        return '*O campo email é obrigatório';
    } else {
        return '';
    }
}

export function validatePhone(phone) {
    if (phone === '') {
        return '*Este campo é obrigatório';
    } else {
        return '';
    }
}

export function validatePassword(password) {
    let error = '';

    if (password === '') {
        return '*O campo senha é obrigatório';
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
        return '';
    }

    if (password !== confirmPassword) {
        return '*As senhas devem ser iguais. Tente novamente';
    } else {
        return '';
    }
}

export function validatePasswordRequired(password) {
    if (password === '') {
        return '*Use uma senha';
    } else {
        return '';
    }
};