import { useState, type TouchEvent } from 'react'
import { addDays, format, isSameDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { firstAvailableDay, initialWeek, isDayUnavailable, weekDays } from './timeSlots'
import './WeekDatePicker.css'

type Props = { selected: Date | null; onSelect: (day: Date | null) => void }

// Seletor de dias da semana, com setas para trocar de semana (não volta para semanas passadas)
export default function WeekDatePicker({ selected, onSelect }: Props) {
  const [firstWeek] = useState(initialWeek)
  const [week, setWeek] = useState(firstWeek)
  const canGoBack = week > firstWeek

  const changeWeek = (offset: number) => {
    const next = addDays(week, offset)
    setWeek(next)
    onSelect(firstAvailableDay(next))
  }

  // feedback visual rápido ao tocar nas setas, no celular
  const flash = (e: TouchEvent<HTMLButtonElement>) => {
    const el = e.currentTarget
    el.classList.add('touched')
    setTimeout(() => el.classList.remove('touched'), 200)
  }

  return (
    <div className="week-date-picker">
      <button
        className={`left-arrow${canGoBack ? '' : ' off'}`}
        onClick={() => changeWeek(-7)}
        disabled={!canGoBack}
        aria-label="Semana anterior"
        onTouchStart={flash}
      >
        <MdArrowBackIos size="1.5rem" />
      </button>
      {weekDays(week).map((day) => {
        const unavailable = isDayUnavailable(day)
        return (
          <button
            key={day.toISOString()}
            className={`week-container ${unavailable ? 'disabled-day' : ''} ${selected && isSameDay(selected, day) ? 'selected-day' : ''}`}
            // aria-disabled em vez de disabled: o CSS global pinta todo botão desabilitado de cinza,
            // e os dias passados sempre foram transparentes (o clique já é bloqueado pelo CSS)
            onClick={() => !unavailable && onSelect(day)}
            aria-disabled={unavailable}
            tabIndex={unavailable ? -1 : undefined}
          >
            <span className="year">{format(day, 'yyyy')}</span>
            <span className="month">{format(day, 'MMM', { locale: ptBR })}</span>
            <span className="day">{format(day, 'dd')}</span>
          </button>
        )
      })}
      <button className="right-arrow" onClick={() => changeWeek(7)} aria-label="Próxima semana" onTouchStart={flash}>
        <MdArrowForwardIos size="1.5rem" />
      </button>
    </div>
  )
}
