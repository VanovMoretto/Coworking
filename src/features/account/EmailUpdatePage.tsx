import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, verifyBeforeUpdateEmail } from 'firebase/auth'
import { useAuth } from '../../contexts/AuthContext'
import { authErrorCode, authErrorMessage } from '../auth/authErrors'
import { updateUserProfile } from './users'
import './AccountUpdate.css'

type Message = { text: string; ok: boolean } | null

export default function EmailUpdatePage() {
  const { user, refreshProfile } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<Message>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user?.email) return

    try {
      // o Firebase exige a senha de novo antes de trocar o e-mail
      await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, password))
    } catch (error) {
      return setMessage({ text: authErrorMessage(error), ok: false })
    }

    try {
      await updateEmail(user, email)
      await updateUserProfile(user.uid, { email }) // antes o e-mail salvo em users/ ficava desatualizado
      await refreshProfile()
      setMessage({ text: 'Email alterado com sucesso!', ok: true })
      navigate('/myAccount')
    } catch (error) {
      // projetos com "proteção contra enumeração de e-mail" (padrão nos novos) não aceitam a troca direta:
      // é preciso confirmar pelo link enviado ao novo endereço
      if (authErrorCode(error) === 'auth/operation-not-allowed') {
        try {
          await verifyBeforeUpdateEmail(user, email)
          setMessage({ text: 'Enviamos um link de confirmação para o novo email. A troca vale depois que você clicar nele.', ok: true })
        } catch (err) {
          setMessage({ text: authErrorMessage(err), ok: false })
        }
        return
      }
      setMessage({ text: authErrorMessage(error), ok: false })
    }
  }

  return (
    <div className="update-page">
      <div className="update-container">
        <h2 className="update-h2">Atualizar Email</h2>
        <form className="update-form" onSubmit={handleSubmit}>
          <input
            className="update-email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Novo email"
            required
          />
          <input
            className="update-password-input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha atual"
            required
          />
          {message && <p className={`update-msg ${message.ok ? 'ok' : 'fail'}`}>{message.text}</p>}
          <button className="update-submit" type="submit">Atualizar</button>
        </form>
      </div>
    </div>
  )
}
