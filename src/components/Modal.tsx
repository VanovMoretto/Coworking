import { useEffect, type CSSProperties, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'

// Estilos padrão do react-modal (que este componente substitui), para manter o visual
const baseOverlay: CSSProperties = { position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(255, 255, 255, 0.75)' }
const baseContent: CSSProperties = {
  position: 'absolute', inset: 40, border: '1px solid #ccc', background: '#fff', overflow: 'auto',
  borderRadius: 4, outline: 'none', padding: 20,
}

type Props = {
  isOpen: boolean
  onClose: () => void
  overlayStyle?: CSSProperties
  contentStyle?: CSSProperties
  children: ReactNode
}

export default function Modal({ isOpen, onClose, overlayStyle, contentStyle, children }: Props) {
  useBodyScrollLock(isOpen)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    // fecha ao clicar fora do conteúdo
    <div style={{ ...baseOverlay, ...overlayStyle }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" style={{ ...baseContent, ...contentStyle }}>
        {children}
      </div>
    </div>,
    document.body,
  )
}
