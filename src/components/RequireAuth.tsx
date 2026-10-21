import type { ReactNode } from 'react'
import { useAuth } from '../contexts/AuthContext'
import RequireLoginPage from '../features/auth/RequireLoginPage'

// Protege as páginas que exigem login. Espera o Firebase restaurar a sessão
// antes de decidir: assim quem recarrega a página logado não cai na tela de login.
export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return <p className="page-loading">Carregando...</p>
  return user ? children : <RequireLoginPage />
}
