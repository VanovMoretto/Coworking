import { useState, type ChangeEvent, type FormEvent } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FaTimes } from 'react-icons/fa'
import { FiAtSign, FiCreditCard, FiLock, FiPhone, FiUser } from 'react-icons/fi'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { auth } from '../../lib/firebase'
import { useAuth } from '../../contexts/AuthContext'
import { createUserProfile } from '../account/users'
import MaskedInput from '../../components/MaskedInput'
import { masks } from '../../utils/masks'
import { validateCPF, validateEmail, validateFullName, validatePassword, validatePhone } from '../../utils/validation'
import { authErrorCode, authErrorMessage } from './authErrors'
import PasswordChecklist from './PasswordChecklist'
import './SignUp.css'

type Field = 'fullName' | 'cpf' | 'email' | 'phone' | 'password'
type Form = Record<Field, string>

const empty: Form = { fullName: '', cpf: '', email: '', phone: '', password: '' }
const validators: Record<Field, (value: string) => string> = {
  fullName: validateFullName,
  cpf: validateCPF,
  email: validateEmail,
  phone: validatePhone,
  password: validatePassword,
}
const validateAll = (form: Form) =>
  Object.fromEntries(Object.entries(validators).map(([k, validate]) => [k, validate(form[k as Field])])) as Form

const noServerError = { email: '', password: '', general: '' }

export default function SignUp({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const { refreshProfile } = useAuth()
  const [form, setForm] = useState<Form>(empty)
  const [errors, setErrors] = useState<Form>(empty)
  // erros que só o Firebase consegue apontar (e-mail já usado, etc.)
  const [serverError, setServerError] = useState(noServerError)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showChecklist, setShowChecklist] = useState(false)

  // valida só o campo que mudou, já com o valor novo
  // (antes validava todos com o valor anterior: os erros ficavam um passo atrasados)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as Field
    const value = e.target.value
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((errs) => ({ ...errs, [name]: validators[name](value) }))
    setServerError(noServerError)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const allErrors = validateAll(form)
    setErrors(allErrors)
    setSubmitAttempted(true)
    if (Object.values(allErrors).some(Boolean)) return

    try {
      const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password)
      await createUserProfile(user.uid, { fullName: form.fullName, cpf: form.cpf, email: form.email, phone: form.phone })
      await refreshProfile() // para o "Olá, nome" já aparecer na barra
      onSuccess()
    } catch (error) {
      const code = authErrorCode(error)
      const message = `*${authErrorMessage(error)}`
      if (code === 'auth/email-already-in-use' || code === 'auth/invalid-email') setServerError({ ...noServerError, email: message })
      else if (code === 'auth/weak-password') setServerError({ ...noServerError, password: message })
      else setServerError({ ...noServerError, general: 'Ocorreu um erro desconhecido. Tente novamente mais tarde!' })
    }
  }

  const hasErrors = Object.values(errors).some(Boolean) || Object.values(serverError).some(Boolean)
  const fieldClass = (field: Field, serverMessage = '') => `form-style ${errors[field] || serverMessage ? 'error' : ''}`

  return (
    <form className="section" onSubmit={handleSubmit} noValidate>
      <h4 className="signup-title">CRIAR CONTA</h4>
      <button type="button" onClick={onClose} className="signup-close" aria-label="Fechar">
        <FaTimes />
      </button>
      <div className="form-group">
        <input
          placeholder="Nome Completo"
          autoComplete="name"
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          className={fieldClass('fullName')}
        />
        <i className="input-icon"><FiUser /></i>
      </div>
      <div className="form-group">
        <MaskedInput
          mask={masks.cpf}
          placeholder="CPF"
          autoComplete="off"
          id="cpf"
          name="cpf"
          value={form.cpf}
          onChange={handleChange}
          className={fieldClass('cpf')}
        />
        <i className="input-icon"><FiCreditCard /></i>
      </div>
      <div className="form-group">
        <input
          className={fieldClass('email', serverError.email)}
          placeholder="Email"
          id="email"
          name="email"
          autoComplete="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <i className="input-icon"><FiAtSign /></i>
        {serverError.email && <span className="error-message">{serverError.email}</span>}
      </div>
      <div className="form-group">
        <MaskedInput
          mask={masks.phone}
          placeholder="Celular"
          autoComplete="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className={fieldClass('phone')}
        />
        <i className="input-icon"><FiPhone /></i>
      </div>
      <div className="form-group password-group">
        <input
          placeholder="Senha"
          className={fieldClass('password', serverError.password)}
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={form.password}
          autoComplete="new-password"
          onFocus={() => setShowChecklist(true)}
          onBlur={() => setShowChecklist(false)}
          onMouseOver={() => setShowChecklist(true)}
          onMouseOut={() => setShowChecklist(false)}
          onChange={handleChange}
        />
        <i className="input-icon"><FiLock /></i>
        {serverError.password && <span className="error-message">{serverError.password}</span>}
        <button
          type="button"
          className="toggle-password"
          onClick={() => setShowPassword((s) => !s)}
          aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
        >
          {showPassword ? <MdVisibilityOff size={24} /> : <MdVisibility size={24} />}
        </button>
        <span className="error-message" style={{ visibility: submitAttempted && hasErrors ? 'visible' : 'hidden' }}>
          {serverError.general || '*Verifique os campos digitados'}
        </span>
      </div>
      <PasswordChecklist password={form.password} visible={showChecklist} />
      <button type="submit" className="sub-button">criar</button>
    </form>
  )
}
