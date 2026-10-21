import { useState } from 'react'
import { rooms } from '../../content/rooms'
import type { PendingReservation } from './reservations'
import { firstAvailableDay, initialWeek } from './timeSlots'
import WeekDatePicker from './WeekDatePicker'
import RoomCard from './RoomCard'
import TimePicker from './TimePicker'
import ArenaButton from './ArenaButton'
import ReservationPanel from './ReservationPanel'
import './ReservationsPage.css'

// Página de reservas: escolhe o dia, depois o horário de uma sala, e confirma no painel lateral.
// (O acesso só para quem está logado fica no RequireAuth, em App.tsx.)
export default function ReservationsPage() {
  const [day, setDay] = useState<Date | null>(() => firstAvailableDay(initialWeek()))
  const [pending, setPending] = useState<PendingReservation | null>(null)

  return (
    <div className="parent-container">
      <div className="main-container">
        <ReservationPanel reservation={pending} onClose={() => setPending(null)} />
        <WeekDatePicker selected={day} onSelect={setDay} />
        <div className="cards-container">
          {rooms.map((room) => (
            <div className="card" key={room.name}>
              <RoomCard room={room.name} title={room.name} />
              {'byRequest' in room ? (
                <ArenaButton />
              ) : (
                // a key com o dia zera a seleção ao trocar de dia
                // (antes o horário escolhido num dia continuava valendo para o outro)
                <TimePicker key={`${room.name}-${day?.toDateString()}`} day={day} room={room.name} onReserve={setPending} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
