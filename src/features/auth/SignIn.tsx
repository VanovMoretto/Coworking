import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FiAtSign, FiLock } from 'react-icons/fi'
import { FaTimes } from 'react-icons/fa'
import { auth } from '../../lib/firebase'
import { authErrorMessage } from './authErrors'
import './SignIn.css'

export default function SignIn({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Os campos de email e senha não podem estar vazios.')
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
      onSuccess()
    } catch (error) {
      console.error('Erro ao fazer login', error)
      setErrorMessage(authErrorMessage(error, 'Não foi possível conectar no momento.'))
    }
  }

  const goToForgotPassword = () => {
    onClose()
    navigate('/forgotPassword')
  }

  return (
    <form className="section" onSubmit={handleSubmit}>
      <h4 className="login-title">ENTRAR</h4>
      <button type="button" onClick={onClose} className="signin-close" aria-label="Fechar">
        <FaTimes />
      </button>
      <div className="form-group">
        <input
          className="form-style"
          placeholder="Email"
          autoComplete="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setErrorMessage('')
          }}
        />
        <i className="input-icon"><FiAtSign /></i>
      </div>
      <div className="form-group">
        <input
          className="form-style"
          placeholder="Senha"
          autoComplete="current-password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setErrorMessage('')
          }}
        />
        <i className="input-icon"><FiLock /></i>
      </div>
      {errorMessage && <p className="error-message-signin">{errorMessage}</p>}
      <button type="submit" className="sub-button">Entrar</button>
      <p>
        <button type="button" className="forgot-password" onClick={goToForgotPassword}>Esqueceu sua senha?</button>
      </p>
    </form>
  )
}
