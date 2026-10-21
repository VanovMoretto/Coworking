import terreo from '../assets/imgs/reunioes.webp'
import podcast from '../assets/imgs/podcast.webp'
import mezanino from '../assets/imgs/mezanino.webp'
import arena from '../assets/imgs/arena.webp'

// As salas do coworking. O nome é gravado em cada reserva no Firestore: não renomeie
// sem migrar as reservas antigas. A Arena não tem horários: é reservada por formulário.
export const rooms = [
  { name: 'Térreo', image: terreo },
  { name: 'Podcast', image: podcast },
  { name: 'Mezanino', image: mezanino },
  { name: 'Arena', image: arena, byRequest: true },
] as const

export type RoomName = (typeof rooms)[number]['name']

export const roomImage = (name: string) => rooms.find((r) => r.name === name)?.image ?? arena
