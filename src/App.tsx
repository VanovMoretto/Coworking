import { lazy, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import RequireAuth from './components/RequireAuth'
import ScrollManager from './components/ScrollManager'
import Navbar from './layouts/Navbar/Navbar'
import Footer from './layouts/Footer/Footer'
import HomePage from './features/home/HomePage'
import NotFoundPage from './features/home/NotFoundPage'
import RequireLoginPage from './features/auth/RequireLoginPage'

// As demais páginas só são baixadas quando a pessoa entra nelas (o site abre mais rápido)
const ArenaPage = lazy(() => import('./features/arena/ArenaPage'))
const ReservationsPage = lazy(() => import('./features/booking/ReservationsPage'))
const MyAccountPage = lazy(() => import('./features/account/MyAccountPage'))
const MyBookingsPage = lazy(() => import('./features/account/MyBookingsPage'))
const EmailUpdatePage = lazy(() => import('./features/account/EmailUpdatePage'))
const PasswordUpdatePage = lazy(() => import('./features/account/PasswordUpdatePage'))
const ForgotPasswordPage = lazy(() => import('./features/auth/ForgotPasswordPage'))

// HashRouter: as URLs ficam como /#/reservas, o que funciona em qualquer hospedagem estática
export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="pages-container">
          <ScrollManager />
          <Navbar />
          <Suspense fallback={<p className="page-loading">Carregando...</p>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/arena" element={<ArenaPage />} />
              <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
              <Route path="/requireLogin" element={<RequireLoginPage />} />

              {/* só para quem está logado */}
              <Route path="/reservas" element={<RequireAuth><ReservationsPage /></RequireAuth>} />
              <Route path="/myAccount" element={<RequireAuth><MyAccountPage /></RequireAuth>} />
              <Route path="/myBookings" element={<RequireAuth><MyBookingsPage /></RequireAuth>} />
              <Route path="/emailUpdate" element={<RequireAuth><EmailUpdatePage /></RequireAuth>} />
              <Route path="/passwordUpdate" element={<RequireAuth><PasswordUpdatePage /></RequireAuth>} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </HashRouter>
    </AuthProvider>
  )
}
