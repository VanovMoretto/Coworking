import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { deleteReservation, fetchUserReservations, type Reservation } from '../booking/reservations'
import RoomCard from '../booking/RoomCard'
import { PastBooking, UpcomingBooking } from './BookingItem'
import './MyBookingsPage.css'

// "Minhas reservas": as próximas (com opção de cancelar) e o histórico (com opção de apagar)
export default function MyBookingsPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Reservation[] | null>(null)

  useEffect(() => {
    if (!user) return
    fetchUserReservations(user.uid)
      .then(setBookings)
      .catch((error) => {
        console.error('Erro ao buscar reservas', error)
        setBookings([])
      })
  }, [user])

  const remove = async (booking: Reservation, isPast: boolean) => {
    const question = isPast ? 'Deseja apagar a reserva do histórico?' : 'Tem certeza que deseja cancelar sua reserva?'
    if (!window.confirm(question)) return
    try {
      await deleteReservation(booking.id)
      setBookings((list) => list?.filter((b) => b.id !== booking.id) ?? null)
    } catch (error) {
      console.error('Erro ao cancelar reserva: ', error)
      alert('Não foi possível concluir. Tente novamente.')
    }
  }

  const now = new Date()
  // próximas em ordem de data; histórico do mais recente para o mais antigo (antes vinham sem ordem)
  const upcoming = (bookings ?? []).filter((b) => b.start > now).sort((a, b) => +a.start - +b.start)
  const past = (bookings ?? []).filter((b) => b.start <= now).sort((a, b) => +b.start - +a.start)

  return (
    <div className="booking-main-container">
      <div className="booking-title-container">
        <h2 className="booking-title">Minhas Reservas</h2>
      </div>
      {!bookings ? (
        <p className="page-loading">Carregando...</p>
      ) : (
        <>
          <div className="current-bookings-container">
            <h3 className="booking-h3">Próximas reservas</h3>
            {upcoming.map((booking) => (
              <div key={booking.id} className="booking-box">
                <div className="booking-infos">
                  <div className="booking-img">
                    <RoomCard room={booking.room} />
                  </div>
                  <div className="display-container">
                    <UpcomingBooking booking={booking} />
                    <button className="cancel-button" onClick={() => remove(booking, false)}>Cancelar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="past-bookings-container">
            <h3 className="booking-h3 past">Histórico de reservas</h3>
            {past.map((booking) => (
              <div key={booking.id} className="past-booking-box">
                <div className="past-booking-infos">
                  <div>
                    <PastBooking booking={booking} />
                  </div>
                  <button className="erase-button" onClick={() => remove(booking, true)}>Apagar</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
