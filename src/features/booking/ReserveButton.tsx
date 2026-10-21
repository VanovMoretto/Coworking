import './TimePicker.css'

// Só fica ativo depois que início e fim foram escolhidos
export default function ReserveButton({ enabled, onClick }: { enabled: boolean; onClick: () => void }) {
  return (
    <button className={`reserva ${enabled ? 'on' : ''}`} onClick={onClick} disabled={!enabled}>
      Reservar
    </button>
  )
}
