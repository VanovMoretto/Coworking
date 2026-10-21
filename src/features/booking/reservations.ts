import { addDoc, collection, deleteDoc, doc, getDocs, query, Timestamp, where } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { atTime } from './timeSlots'

// Formato de cada documento em reservations/ (o mesmo da versão anterior do app,
// então as reservas já existentes continuam funcionando)
type ReservationDoc = {
  userId: string
  room: string
  date: Timestamp // o dia, à meia-noite
  initialTime: Timestamp
  finalTime: Timestamp
  emails: string[]
  text: string
}

export type Reservation = {
  id: string
  userId: string
  room: string
  start: Date
  end: Date
  emails: string[]
  text: string
}

/** O que a pessoa escolheu na tela, antes de confirmar no painel */
export type PendingReservation = { room: string; day: Date; start: string; end: string }

export type Interval = { start: Date; end: Date }

const reservationsRef = collection(db, 'reservations')

const toReservation = (id: string, d: ReservationDoc): Reservation => ({
  id,
  userId: d.userId,
  room: d.room,
  start: d.initialTime.toDate(),
  end: d.finalTime.toDate(),
  emails: d.emails ?? [],
  text: d.text ?? '',
})

/** Horários já ocupados de uma sala num dia, em ordem */
export async function fetchBusyIntervals(day: Date, room: string): Promise<Interval[]> {
  const q = query(reservationsRef, where('date', '==', Timestamp.fromDate(day)), where('room', '==', room))
  const snap = await getDocs(q)
  return snap.docs
    .map((d) => toReservation(d.id, d.data() as ReservationDoc))
    .map(({ start, end }) => ({ start, end }))
    .sort((a, b) => a.start.getTime() - b.start.getTime())
}

export class SlotTakenError extends Error {}

export async function createReservation(userId: string, pending: PendingReservation, emails: string[], text: string) {
  const start = atTime(pending.day, pending.start)
  const end = atTime(pending.day, pending.end)

  // confere de novo antes de gravar: alguém pode ter reservado enquanto o painel estava aberto
  const busy = await fetchBusyIntervals(pending.day, pending.room)
  if (busy.some((b) => start < b.end && end > b.start)) throw new SlotTakenError()

  const data: ReservationDoc = {
    userId,
    room: pending.room,
    date: Timestamp.fromDate(pending.day),
    initialTime: Timestamp.fromDate(start),
    finalTime: Timestamp.fromDate(end),
    emails,
    text,
  }
  await addDoc(reservationsRef, data)
}

export async function fetchUserReservations(userId: string): Promise<Reservation[]> {
  const snap = await getDocs(query(reservationsRef, where('userId', '==', userId)))
  return snap.docs.map((d) => toReservation(d.id, d.data() as ReservationDoc))
}

export const deleteReservation = (id: string) => deleteDoc(doc(db, 'reservations', id))
