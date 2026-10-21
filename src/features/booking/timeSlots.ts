import { addDays, addMinutes, format, isBefore, isToday, set, startOfDay, startOfWeek } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Interval } from './reservations'

// Funcionamento: reservas de 30 em 30 minutos, das 07:30 às 22:00
export const OPENING = '07:30'
export const CLOSING = '22:00'
const STEP_MINUTES = 30
const LAST_START = '21:30'

/** O dia às HH:mm */
export function atTime(day: Date, hhmm: string) {
  const [hours, minutes] = hhmm.split(':').map(Number)
  return set(startOfDay(day), { hours, minutes, seconds: 0, milliseconds: 0 })
}

function slots(day: Date, from: string, to: string) {
  const list: Date[] = []
  for (let t = atTime(day, from); t <= atTime(day, to); t = addMinutes(t, STEP_MINUTES)) list.push(t)
  return list
}

const hhmm = (d: Date) => format(d, 'HH:mm')

/** Horários em que dá para começar: não passaram e não caem dentro de uma reserva */
export function availableStarts(day: Date, busy: Interval[], now = new Date()) {
  return slots(day, OPENING, LAST_START)
    .filter((t) => !isBefore(t, now))
    .filter((t) => !busy.some((b) => t >= b.start && t < b.end))
    .map(hhmm)
}

/** Horários em que dá para terminar, depois do início escolhido e antes da próxima reserva */
export function availableEnds(day: Date, busy: Interval[], start: string) {
  const startAt = atTime(day, start)
  const next = busy.find((b) => b.start > startAt)
  return slots(day, '08:00', CLOSING)
    .filter((t) => t > startAt && (!next || t <= next.start))
    .map(hhmm)
}

// ---- semana mostrada no seletor de datas ----

/** Dia que não aceita mais reservas: já passou, ou é hoje depois do último horário */
export function isDayUnavailable(day: Date, now = new Date()) {
  if (isBefore(day, startOfDay(now))) return true
  return isToday(day) && now > atTime(day, LAST_START)
}

export const weekStart = (date: Date) => startOfWeek(date, { locale: ptBR })
export const weekDays = (start: Date) => Array.from({ length: 7 }, (_, i) => addDays(start, i))
export const firstAvailableDay = (start: Date) => weekDays(start).find((d) => !isDayUnavailable(d)) ?? null

/** Semana inicial: a atual, ou a próxima se não sobrou nenhum dia nesta (sábado à noite) */
export function initialWeek(now = new Date()) {
  const current = weekStart(now)
  return firstAvailableDay(current) ? current : addDays(current, 7)
}
