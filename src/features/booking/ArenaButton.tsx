import { useNavigate } from 'react-router-dom'

// A Arena não tem horários na tela: o botão leva para o formulário de pedido
export default function ArenaButton() {
  const navigate = useNavigate()
  return (
    <div>
      <button className="arena-btn" onClick={() => navigate('/arena')}>
        Reservar Já!
      </button>
    </div>
  )
}
