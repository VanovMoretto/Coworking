import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthModal from './AuthModal'
import './RequireLoginPage.css'

// Aparece no lugar das páginas que exigem login, já com o modal de login aberto
export default function RequireLoginPage() {
  const [modalOpen, setModalOpen] = useState(true)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // depois de entrar, a pessoa continua na página que queria abrir
  // (vindo do botão "Reservas" da barra, segue para as reservas)
  const afterLogin = () => {
    if (pathname === '/requireLogin') navigate('/reservas')
  }

  return (
    <div className="reqLog-page">
      <div className="reqLog-container">
        <h2 className="reqLog-h2">Ops...</h2>
        <h1 className="reqLog-h1">Parece que você ainda não fez o login!</h1>
        <h2 className="reqLog-h2">Faça o login para continuar.</h2>
      </div>
      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSuccess={afterLogin} />
    </div>
  )
}
