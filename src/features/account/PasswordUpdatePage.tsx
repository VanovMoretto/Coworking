import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth'
import { useAuth } from '../../contexts/AuthContext'
import { authErrorMessage } from '../auth/authErrors'
import { validatePassword } from '../../utils/validation'
import './AccountUpdate.css'

type Message = { text: string; ok: boolean } | null

export default function PasswordUpdatePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState<Message>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user?.email) return

    // confere a senha nova antes de pedir a reautenticação ao Firebase
    const problem = validatePassword(newPassword)
    if (problem) return setMessage({ text: problem, ok: false })

    try {
      await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, currentPassword))
      await updatePassword(user, newPassword)
      setMessage({ text: 'Senha alterada com sucesso!', ok: true })
      navigate('/myAccount')
    } catch (error) {
      setMessage({ text: authErrorMessage(error), ok: false })
    }
  }

  return (
    <div className="update-page">
      <div className="update-container">
        <h2 className="update-h2">Atualizar Senha</h2>
        <form className="update-form" onSubmit={handleSubmit}>
          {/* ajuda o gerenciador de senhas do navegador a saber de qual conta é a senha */}
          <input type="text" autoComplete="username" value={user?.email ?? ''} readOnly hidden />
          <input
            className="update-password-input"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Senha atual"
            required
          />
          <input
            className="update-password-input"
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nova senha"
            required
          />
          {message && <p className={`update-msg password ${message.ok ? 'ok' : 'fail'}`}>{message.text}</p>}
          <button className="update-submit" type="submit">Atualizar</button>
        </form>
      </div>
    </div>
  )
}
