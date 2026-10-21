import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { firstName, getUserProfile, type UserProfile } from '../features/account/users'

type AuthState = {
  user: User | null
  profile: UserProfile | null
  /** primeiro nome, usado no "Olá, ..." da barra de navegação */
  displayName: string
  /** true até o Firebase dizer se há alguém logado (evita mandar para o login ao recarregar a página) */
  loading: boolean
  refreshProfile: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (u: User | null) => {
    setProfile(u ? await getUserProfile(u.uid).catch(() => null) : null)
  }, [])

  useEffect(
    () =>
      onAuthStateChanged(auth, async (u) => {
        setUser(u)
        await loadProfile(u)
        setLoading(false)
      }),
    [loadProfile],
  )

  const refreshProfile = useCallback(() => loadProfile(auth.currentUser), [loadProfile])
  const logout = useCallback(() => signOut(auth), [])

  return (
    <AuthContext.Provider
      value={{ user, profile, displayName: firstName(profile?.fullName), loading, refreshProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth precisa estar dentro de <AuthProvider>')
  return ctx
}
