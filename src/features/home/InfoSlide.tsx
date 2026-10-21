import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import './HomePage.css'

type Props = {
  image: string
  text: ReactNode
  buttonText: string
} & ({ to: string; href?: never } | { href: string; to?: never }) // rota interna ou link externo

// Um slide da home: imagem, texto e botão. No celular a imagem vira fundo do slide.
export default function InfoSlide({ image, text, buttonText, to, href }: Props) {
  const isSmall = useMediaQuery('(max-width: 449px)')

  return (
    <div className="info-container" style={isSmall ? { backgroundImage: `url(${image})` } : undefined}>
      <div className="info-img" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="info-text">{text}</div>
      <div className="info-btn-container">
        {to ? (
          <Link className="info-button" to={to}>{buttonText}</Link>
        ) : (
          <a className="info-button" href={href} target="_blank" rel="noopener noreferrer">{buttonText}</a>
        )}
      </div>
    </div>
  )
}
