import { format } from 'date-fns'
import type { Reservation } from '../booking/reservations'

const day = (d: Date) => format(d, 'dd/MM/yyyy')
const time = (d: Date) => format(d, 'HH:mm')

export function UpcomingBooking({ booking }: { booking: Reservation }) {
  return (
    <div className="booking-display">
      <p className="booking-roomName">Sala de reuniões: {booking.room}</p>
      <p className="booking-day">Dia: {day(booking.start)}</p>
      <p className="booking-time">Horário: {time(booking.start)} até {time(booking.end)}</p>
    </div>
  )
}

export function PastBooking({ booking }: { booking: Reservation }) {
  return (
    <div className="past-booking-display">
      <p className="past-roomName"><strong>Local:</strong> {booking.room} -</p>
      <p className="past-day">&nbsp;<strong>Dia:</strong> {day(booking.start)}</p>
      <p className="past-time">&nbsp;- {time(booking.start)}<strong> até </strong>{time(booking.end)}</p>
    </div>
  )
}
