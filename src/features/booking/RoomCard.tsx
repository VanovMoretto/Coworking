import { roomImage } from '../../content/rooms'
import './ReservationsPage.css'

// Foto da sala com o nome por cima (o nome é opcional: em "Minhas reservas" aparece só a foto)
export default function RoomCard({ room, title }: { room: string; title?: string }) {
  return (
    <div className="sala">
      <h1 className="sala-title">{title}</h1>
      <img src={roomImage(room)} alt={`Sala ${room}`} />
    </div>
  )
}
