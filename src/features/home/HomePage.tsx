import Slider from './Slider'
import InfoSlide from './InfoSlide'
import About from './About'
import Texts from '../../content/texts'
import arena from '../../assets/imgs/arena.webp'
import metodo from '../../assets/imgs/metodo.png'
import './HomePage.css'

export default function HomePage() {
  return (
    <div className="home-main">
      <div className="home-header">
        <h3 className="title-method">DUTRA</h3>
        <h1 className="title-coworking">COWORKING</h1>
        <h2 className="title-bookings">RESERVAS</h2>
      </div>
      <Slider>
        <InfoSlide image={arena} text={Texts.arenatxt} to="/arena" buttonText="Reserve já!" />
        <InfoSlide image={metodo} text={Texts.metodotxt} href="https://www.metododutra.com.br/" buttonText="Saiba mais..." />
      </Slider>
      <div id="about">
        <About />
      </div>
    </div>
  )
}
