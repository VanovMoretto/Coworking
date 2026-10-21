import { Link } from 'react-router-dom'
import notFoundImg from '../../assets/imgs/e404.png'
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <img src={notFoundImg} alt="Erro 404" />
      <p>
        Oooops! Parece que você está <span className="destaque">perdido</span>, a pagina{' '}
        <span className="destaque">não foi encontrada!</span>
      </p>
      <p>
        Você pode retornar para a home clicando <Link to="/">aqui</Link>.
      </p>
    </div>
  )
}
