import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import { createReservation, SlotTakenError, type PendingReservation } from './reservations'
import ParticipantsInput from './ParticipantsInput'
import './ReservationsPage.css'

type Props = { reservation: PendingReservation | null; onClose: () => void }

// Painel que desliza da lateral para confirmar a reserva: participantes e pedidos extras
export default function ReservationPanel({ reservation, onClose }: Props) {
  const { user } = useAuth()
  const [emails, setEmails] = useState<string[]>([])
  const [notes, setNotes] = useState('')
  const [noEmailMsg, setNoEmailMsg] = useState('')
  const [dialogMessage, setDialogMessage] = useState('')
  const [saving, setSaving] = useState(false)

  // guarda a última reserva mostrada, para o conteúdo não sumir durante a animação de fechar
  const [shown, setShown] = useState(reservation)
  if (reservation && reservation !== shown) setShown(reservation)

  const save = async () => {
    if (!user || !reservation || saving) return
    if (emails.length === 0) {
      setNoEmailMsg('Você deve adicionar ao menos um participante!')
      return
    }

    setSaving(true)
    try {
      await createReservation(user.uid, reservation, emails, notes)
      setDialogMessage('Reserva realizada com sucesso!')
      setEmails([])
      setNotes('')
    } catch (error) {
      setDialogMessage(
        error instanceof SlotTakenError
          ? 'Esse horário acabou de ser reservado por outra pessoa. Escolha outro horário.'
          : 'Houve um erro ao tentar fazer a reserva. Por favor, tente novamente.',
      )
    } finally {
      setSaving(false)
    }
  }

  const close = () => {
    setNoEmailMsg('')
    onClose()
  }

  const closeMessage = () => {
    setDialogMessage('')
    close()
  }

  return (
    <div className={`slide-panel ${reservation ? 'open' : ''}`}>
      <h2>Reserva</h2>
      <button className="panel-close" onClick={close} aria-label="Fechar">
        <FaTimes />
      </button>
      <div className="panel-display">
        <p><strong>Local</strong>: {shown?.room}</p>
        <p><strong>Dia</strong>: {shown?.day.toLocaleDateString('pt-BR')}</p>
        <p><strong>Horário</strong>: {shown && `${shown.start} até ${shown.end}`}</p>
      </div>
      <div className="panel-form">
        <ParticipantsInput
          emails={emails}
          onChange={(list) => {
            setEmails(list)
            if (list.length > 0) setNoEmailMsg('')
          }}
        />
        <p className="needSomething-p">Precisará de algo para a ocasião?</p>
        <textarea
          className="needSomething-box"
          placeholder="Café, água..."
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <p className="error-message">{noEmailMsg}</p>
      <button className="panel-button" onClick={save} disabled={saving}>
        {saving ? 'Salvando...' : 'Concluir'}
      </button>
      {dialogMessage && (
        <div className="dialog slidePanel">
          <p>{dialogMessage}</p>
          <button onClick={closeMessage}>Fechar</button>
        </div>
      )}
    </div>
  )
}
