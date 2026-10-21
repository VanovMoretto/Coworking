import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import AuthModal from '../../features/auth/AuthModal'
import logo from '../../assets/imgs/dutraLogo.png'
import './Navbar.css'

type Item =
  | { name: string; className: string; path: string }
  | { name: string; className: string; onClick: () => void }

// Barra de navegação: links das páginas, menu do usuário logado e botão de login.
// No celular (até 850px) vira um menu sanduíche, e as opções do usuário entram na lista.
export default function Navbar() {
  const { user, displayName, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width:850px)')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useBodyScrollLock(menuOpen)

  // fecha o menu do celular sempre que a página muda
  const [lastLocation, setLastLocation] = useState(location.key)
  if (location.key !== lastLocation) {
    setLastLocation(location.key)
    setMenuOpen(false)
  }

  // fecha o dropdown do usuário ao clicar fora dele
  useEffect(() => {
    const onClickOut = (e: globalThis.MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false)
    }
    document.addEventListener('mousedown', onClickOut)
    return () => document.removeEventListener('mousedown', onClickOut)
  }, [])

  const toggleMenu = (e: MouseEvent) => {
    e.stopPropagation()
    setMenuOpen((open) => !open)
  }

  const handleLogout = async () => {
    try {
      await logout()
      setDropdownOpen(false)
      navigate('/')
    } catch (error) {
      console.error('Erro ao sair: ', error)
    }
  }

  const greeting = `Olá, ${displayName}`
  const items: Item[] = [
    { name: 'Home', className: 'home', path: '/' },
    { name: 'Reservas', className: 'reservas', onClick: () => navigate(user ? '/reservas' : '/requireLogin') },
    { name: 'Sobre', className: 'sobre', onClick: () => navigate('/#about') },
  ]
  if (user && isMobile) {
    items.push(
      { name: 'Minha Conta', className: 'minhaconta', path: '/myAccount' },
      { name: 'Minhas Reservas', className: 'minhasreservas', path: '/myBookings' },
    )
  }
  items.push(
    user
      ? { name: greeting, className: 'olá dropdown ul-hidden', onClick: () => setDropdownOpen((open) => !open) }
      : { name: 'Entrar', className: 'entrar btn-entrar ul-hidden', onClick: () => { setAuthOpen(true); setMenuOpen(false) } },
  )
  if (user && isMobile) items.push({ name: 'Sair', className: 'sair logout-btn', onClick: handleLogout })

  return (
    <div className="navbar">
      <Link className="navbar-logo" to="/">
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      <nav className={`menu-section ${menuOpen ? 'on' : ''}`}>
        <div className="navbar-buttons">
          <ul className="nav-ul">
            {user && <p className="user-hidden show">{greeting}</p>}
            {items.map((item, index) => (
              <li key={item.name} style={{ '--i': index + 1 } as CSSProperties} className="nav-li">
                {'path' in item ? (
                  <Link to={item.path} className={item.className} onClick={toggleMenu}>
                    {item.name}
                  </Link>
                ) : (
                  <button className={item.className} onClick={item.onClick}>
                    {item.name}
                  </button>
                )}
              </li>
            ))}
            {dropdownOpen && (
              <div className="dropdown-menu" ref={dropdownRef}>
                <Link to="/myAccount" className="myAccount-button" onClick={() => setDropdownOpen(false)}>Minha conta</Link>
                <Link to="/myBookings" className="myBookings-button" onClick={() => setDropdownOpen(false)}>Minhas reservas</Link>
                <button className="logout-button" onClick={handleLogout}>Sair</button>
              </div>
            )}
          </ul>
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className="one"></div>
          <div className="two"></div>
          <div className="three"></div>
        </div>
      </nav>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  )
}
