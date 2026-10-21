import { useState, type ClipboardEvent, type KeyboardEvent } from 'react'
import { isEmail } from '../../utils/validation'
import './ParticipantsInput.css'

type Props = { emails: string[]; onChange: (emails: string[]) => void }

const VISIBLE = 2 // quantos e-mails aparecem antes do botão "Mais N"

// Campo de e-mails dos participantes: cada e-mail vira uma etiqueta ao apertar Enter, Tab ou vírgula
export default function ParticipantsInput({ emails, onChange }: Props) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [hovered, setHovered] = useState<string | null>(null)
  const [focused, setFocused] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const add = (email: string, showErrors = true) => {
    const problem = emails.includes(email)
      ? `${email} já foi adicionado.`
      : !isEmail(email)
        ? `${email} não é um endereço de email válido.`
        : ''
    if (problem) {
      if (showErrors) setError(problem)
      return
    }
    onChange([...emails, email])
    setValue('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!['Enter', 'Tab', ','].includes(e.key)) return
    e.preventDefault()
    if (value.trim()) add(value.trim())
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').match(/[\w\dç.-]+@[\w\dç.-]+\.[\w\dç.-]+/g) ?? []
    onChange([...new Set([...emails, ...pasted])])
  }

  // ao sair do campo, um e-mail válido que ficou digitado também entra na lista
  // (antes ele era descartado e a reserva acusava "nenhum participante")
  const handleBlur = () => {
    setFocused(false)
    if (value.trim()) add(value.trim(), false)
  }

  return (
    <>
      <div className="tag-container">
        <div className={`tag-items ${showAll ? 'expanded' : ''}`}>
          {emails
            .filter((_, index) => showAll || focused || index < VISIBLE)
            .map((email) => (
              <div className={`tag-item ${email === hovered ? 'hovered' : ''}`} key={email}>
                <div className="item-email">{email}</div>
                <button
                  className="deleteEmail-button"
                  aria-label={`Remover ${email}`}
                  onMouseEnter={() => setHovered(email)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={(e) => {
                    e.stopPropagation()
                    onChange(emails.filter((x) => x !== email))
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
        </div>
        {!focused && emails.length > VISIBLE && (
          <div className="moreBtn-container">
            <button className="seeMore-button" onClick={() => setShowAll((s) => !s)}>
              {showAll ? 'Menos' : `Mais ${emails.length - VISIBLE}`}
            </button>
          </div>
        )}
      </div>
      <div className="email-area">
        <p>Quem irá participar?<span> (incluir você)*</span></p>
        <input
          className="panel-email"
          type="email"
          value={value}
          placeholder="Digite o email dos participantes..."
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setValue(e.target.value)
            setError('')
          }}
          onPaste={handlePaste}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
        />
        <p className="error-message">{error}</p>
      </div>
    </>
  )
}
