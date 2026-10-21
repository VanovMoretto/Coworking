import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import './TimePicker.css'

type Props = { start: string; end: string; onOpen: () => void; onClear: () => void; disabled: boolean }

// Botão "Horários": abre a lista; com horário escolhido, mostra "07:30 até 09:00"
// e, ao passar o mouse, oferece limpar a seleção
export default function TimeButton({ start, end, onOpen, onClear, disabled }: Props) {
  const [hovered, setHovered] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const chosen = Boolean(start && end)

  useBodyScrollLock(confirmOpen)

  const label = hovered && chosen ? 'Limpar seleção?' : chosen ? `${start} até ${end}` : 'Horários'

  return (
    <div className="button-wrapper">
      <button
        className={`horario ${chosen ? (hovered ? 'reservado clear' : 'reservado') : ''}`}
        onClick={hovered && chosen ? () => setConfirmOpen(true) : onOpen}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        disabled={disabled}
      >
        {label}
      </button>
      {chosen && (
        <button className="clear-icon" onClick={() => setConfirmOpen(true)} aria-label="Limpar horários">
          <FaTimes />
        </button>
      )}
      {confirmOpen && (
        <div className="dialog">
          <p>Deseja apagar os horários selecionados?</p>
          <div>
            <button
              onClick={() => {
                onClear()
                setHovered(false)
                setConfirmOpen(false)
              }}
            >
              Sim
            </button>
            <button onClick={() => setConfirmOpen(false)}>Não</button>
          </div>
        </div>
      )}
    </div>
  )
}
