// Cada função devolve a mensagem de erro, ou '' quando o valor é válido

const onlyDigits = (value: string) => value.replace(/\D+/g, '')

export function validateFullName(fullName: string) {
  if (fullName.trim() === '') return '*O campo nome é obrigatório'
  if (fullName.trim().split(/\s+/).length < 2) return '*Insira tanto o nome quanto o sobrenome'
  return ''
}

export function isValidCPF(cpf: string) {
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false

  const checkDigit = (length: number) => {
    let sum = 0
    for (let i = 0; i < length; i++) sum += Number(cpf[i]) * (length + 1 - i)
    const rest = (sum * 10) % 11
    return rest === 10 ? 0 : rest
  }

  return checkDigit(9) === Number(cpf[9]) && checkDigit(10) === Number(cpf[10])
}

export function validateCPF(cpf: string) {
  const digits = onlyDigits(cpf)
  if (digits === '') return '*Este campo é obrigatório'
  if (!isValidCPF(digits)) return 'Insira um CPF válido'
  return ''
}

export const isEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export function validateEmail(email: string) {
  if (email === '') return '*O campo email é obrigatório'
  if (!isEmail(email)) return '*Formato de email inválido'
  return ''
}

export function validatePhone(phone: string) {
  if (phone === '') return '*O campo telefone é obrigatório'
  if (onlyDigits(phone).length < 11) return '*Insira um número válido'
  return ''
}

// Regras de senha, usadas na validação e no checklist que aparece ao digitar
export const passwordRules = [
  { key: 'minLength', label: 'Pelo menos 8 caracteres', test: (p: string) => p.length >= 8 },
  { key: 'hasLowerCase', label: 'Letra minúscula', test: (p: string) => /[a-z]/.test(p) },
  { key: 'hasUpperCase', label: 'Letra maiúscula', test: (p: string) => /[A-Z]/.test(p) },
  { key: 'hasDigit', label: 'Números', test: (p: string) => /\d/.test(p) },
  { key: 'hasSymbol', label: 'Símbolos', test: (p: string) => /\W|_/.test(p) },
]

export function validatePassword(password: string) {
  if (password === '') return '*Use uma senha'
  if (password.length < 8) return 'Sua senha deve conter no mínimo 8 caracteres.'
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) return 'Sua senha deve conter letras maiúsculas e minúsculas.'
  if (!/\d/.test(password)) return 'Sua senha deve conter números.'
  if (!/\W|_/.test(password)) return 'Sua senha deve conter símbolos.'
  return ''
}
