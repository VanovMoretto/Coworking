import { useState, type ChangeEvent, type FormEvent } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FirebaseError } from 'firebase/app'
import 'react-datepicker/dist/react-datepicker.css'
import Texts from '../../content/texts'
import MaskedInput from '../../components/MaskedInput'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { masks } from '../../utils/masks'
import { isEmail } from '../../utils/validation'
import { sendArenaRequest } from './arenaRequest'
import arena from '../../assets/imgs/arena.webp'
import equipments from '../../assets/imgs/equipments.webp'
import bigscreen from '../../assets/imgs/bigscreen.webp'
import plateia from '../../assets/imgs/plateia.webp'
import './ArenaPage.css'

registerLocale('pt', ptBR)

type Form = {
  name: string
  email: string
  phone: string
  eventDescription: string
  additionalRequests: string
  startDate: Date
  timeFrom: string
  timeTo: string
}

const emptyForm = (): Form => ({
  name: '',
  email: '',
  phone: '',
  eventDescription: '',
  additionalRequests: '',
  startDate: new Date(),
  timeFrom: '07:30',
  timeTo: '22:00',
})

const highlights = [
  { className: 'bigscreen', image: bigscreen, alt: 'Telão da Arena', text: Texts.bigscreentxt },
  { className: 'equipments', image: equipments, alt: 'Mesa de som e luz', text: Texts.equipmentstxt },
  { className: 'seats', image: plateia, alt: 'Plateia da Arena', text: Texts.seatstxt },
]

// Página da Arena (auditório): apresentação do espaço e formulário de pedido de reserva
export default function ArenaPage() {
  const [form, setForm] = useState<Form>(emptyForm)
  const [errorMessage, setErrorMessage] = useState('')
  const [dialogMessage, setDialogMessage] = useState('')
  const [sending, setSending] = useState(false)

  useBodyScrollLock(Boolean(dialogMessage))

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.eventDescription) {
      return setErrorMessage('Preencha os campos obrigatórios')
    }
    if (!isEmail(form.email)) return setErrorMessage('Insira um endereço de e-mail válido')
    if (form.timeTo <= form.timeFrom) return setErrorMessage('O horário final deve ser depois do inicial')

    setErrorMessage('')
    setSending(true)
    try {
      await sendArenaRequest({ ...form, startDate: format(form.startDate, 'yyyy-MM-dd') })
      setDialogMessage('Seu pedido de reserva foi enviado com sucesso!')
      setForm(emptyForm()) // antes a data sumia ao limpar o formulário
    } catch (error) {
      console.error(error)
      setDialogMessage(
        error instanceof FirebaseError && error.code === 'functions/invalid-argument'
          ? 'Por favor, verifique as informações que você inseriu e tente novamente.'
          : 'Ocorreu um erro ao enviar seu pedido de reserva. Por favor, tente novamente mais tarde.',
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="arena-page">
      <div className="containers-holder">
        <div className="arena-screen">
          <img src={arena} alt="Arena" />
        </div>
        <div className="description">{Texts.arenapagetxt}</div>
        <div className="cards-holder">
          {highlights.map((h) => (
            <div className={h.className} key={h.className}>
              <img src={h.image} alt={h.alt} />
              <div className="short-text">{h.text}</div>
            </div>
          ))}
        </div>
        <form className="booking-container" onSubmit={handleSubmit}>
          <h1 className="form-title">Reserve já nosso espaço!</h1>
          <div className="arena form-group">
            <div>
              <label htmlFor="name">Nome completo *</label>
              <input id="name" type="text" className="arena-name" autoComplete="name" onChange={handleChange} value={form.name} />
            </div>
            <div>
              <label htmlFor="email">Email de contato *</label>
              <input id="email" type="email" className="arena-email" autoComplete="email" onChange={handleChange} value={form.email} />
            </div>
            <div>
              <label htmlFor="phone">Celular de contato *</label>
              <MaskedInput mask={masks.phone} className="arena-phone" id="phone" type="tel" autoComplete="tel" onChange={handleChange} value={form.phone} />
            </div>
            <div>
              <label htmlFor="startDate">Selecionar data *</label>
              <DatePicker
                selected={form.startDate}
                onChange={(date: Date | null) => date && setForm((f) => ({ ...f, startDate: date }))}
                id="startDate"
                className="arena-date"
                dateFormat="dd/MM/yyyy"
                locale="pt"
                minDate={new Date()}
              />
            </div>
            <div className="timeFrom">
              <label htmlFor="timeFrom">De:</label>
              <input type="time" id="timeFrom" value={form.timeFrom} onChange={handleChange} />
            </div>
            <div className="timeTo">
              <label htmlFor="timeTo">Até:</label>
              <input type="time" id="timeTo" value={form.timeTo} onChange={handleChange} />
            </div>
          </div>
          <div className="event-description-group">
            <label htmlFor="eventDescription">Descreva o evento *</label>
            <textarea
              placeholder="Dê uma breve descrição do evento..."
              id="eventDescription"
              className="event-description"
              rows={6}
              cols={55}
              onChange={handleChange}
              value={form.eventDescription}
            />
          </div>
          <div>
            <label htmlFor="additionalRequests">Pedidos adicionais</label>
            <textarea
              placeholder="Precisará de coffebreak ou bebidas?"
              id="additionalRequests"
              className="event-additional"
              rows={2}
              cols={55}
              onChange={handleChange}
              value={form.additionalRequests}
            />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="arena-submit" disabled={sending}>
            {sending ? 'Enviando...' : 'Enviar'}
          </button>
          {dialogMessage && (
            <div className="dialog">
              <p>{dialogMessage}</p>
              {/* type="button": antes este botão enviava o formulário de novo ao fechar */}
              <button type="button" onClick={() => setDialogMessage('')}>Fechar</button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
