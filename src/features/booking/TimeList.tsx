import { useEffect, useState } from 'react'
import { FaTimes, FaUndo } from 'react-icons/fa'
import { fetchBusyIntervals, type Interval } from './reservations'
import { availableEnds, availableStarts } from './timeSlots'
import './TimePicker.css'

type Props = {
  day: Date
  room: string
  start: string
  onPick: (time: string) => void
  onBack: () => void
  onClose: () => void
}

// Lista de horários livres da sala no dia. Sem início escolhido, mostra os inícios; depois, os fins.
export default function TimeList({ day, room, start, onPick, onBack, onClose }: Props) {
  // null = carregando (antes a lista aparecia sem as reservas e dava para clicar num horário ocupado)
  const [busy, setBusy] = useState<Interval[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true
    fetchBusyIntervals(day, room)
      .then((b) => active && setBusy(b))
      .catch((error) => {
        console.error('Erro ao buscar reservas', error)
        if (active) setFailed(true)
      })
    return () => {
      active = false
    }
  }, [day, room])

  const times = busy && (start ? availableEnds(day, busy, start) : availableStarts(day, busy))

  return (
    <div className="horarios-container">
      <div className="timelist-buttons">
        {start && (
          <button className="timelist-back" title="Voltar" onClick={onBack}>
            <FaUndo />
          </button>
        )}
        <button className="timelist-close" title="Fechar" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      <div className="fromTo">{start ? 'Termina às:' : 'Começa às:'}</div>
      <div className="timesList">
        {failed ? (
          <p>Não foi possível carregar os horários. Tente novamente.</p>
        ) : !times ? (
          <p>Carregando horários...</p>
        ) : times.length > 0 ? (
          times.map((time) => (
            <button className="timelist-tags" onClick={() => onPick(time)} key={time}>
              {time}
            </button>
          ))
        ) : (
          <p>Desculpe, não há mais horários disponíveis para essa data!</p>
        )}
      </div>
    </div>
  )
}
