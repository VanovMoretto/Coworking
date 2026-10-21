import { getFunctions, httpsCallable } from 'firebase/functions'
import { app } from '../../lib/firebase'

// Pedido de reserva da Arena: vai por e-mail para a equipe do coworking,
// pela Cloud Function "sendMail" (functions/index.js)
export type ArenaRequest = {
  name: string
  email: string
  phone: string
  eventDescription: string
  additionalRequests: string
  /** yyyy-MM-dd (um Date não sobrevive à viagem até a função: chegava como {}) */
  startDate: string
  timeFrom: string
  timeTo: string
}

// fica aqui (e não em lib/firebase) para o SDK de Functions só ser baixado na página da Arena
export const sendArenaRequest = (data: ArenaRequest) => httpsCallable<ArenaRequest>(getFunctions(app), 'sendMail')(data)
