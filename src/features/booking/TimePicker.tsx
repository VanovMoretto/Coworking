import { useState } from 'react'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import type { PendingReservation } from './reservations'
import TimeButton from './TimeButton'
import TimeList from './TimeList'
import ReserveButton from './ReserveButton'
import './TimePicker.css'

type Props = { day: Date | null; room: string; onReserve: (r: PendingReservation) => void }

// Escolha de horário de uma sala: primeiro o início, depois o fim, e então "Reservar"
export default function TimePicker({ day, room, onReserve }: Props) {
  const [listOpen, setListOpen] = useState(false)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  useBodyScrollLock(listOpen)

  const clear = () => {
    setStart('')
    setEnd('')
  }

  const closeList = () => {
    setListOpen(false)
    if (!end) clear() // fechou no meio da escolha: começa do zero na próxima vez
  }

  const pick = (time: string) => {
    if (!start) return setStart(time)
    setEnd(time)
    setListOpen(false)
  }

  const reserve = () => {
    if (!day || !start || !end) return
    onReserve({ room, day, start, end })
    clear()
  }

  return (
    <div className="button-container">
      {listOpen && <div className="overlay" onClick={closeList}></div>}
      <TimeButton start={start} end={end} onOpen={() => setListOpen(true)} onClear={clear} disabled={!day} />
      {listOpen && day && (
        <TimeList day={day} room={room} start={start} onPick={pick} onBack={() => setStart('')} onClose={closeList} />
      )}
      <ReserveButton enabled={Boolean(day && start && end)} onClick={reserve} />
    </div>
  )
}
