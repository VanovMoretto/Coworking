import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { FaAt, FaPhone } from 'react-icons/fa6'
import './Footer.css'

const socials = [
  { href: 'https://www.facebook.com/MetodoDutra', label: 'Facebook', Icon: FaFacebook, className: 'fa-facebook' },
  { href: 'https://www.linkedin.com/in/método-dutra-6180b361/', label: 'LinkedIn', Icon: FaLinkedin, className: 'fa-linkedin' },
  { href: 'https://wa.me/555193102082', label: 'WhatsApp', Icon: FaWhatsapp, className: 'fa-whatsapp' },
  { href: 'https://www.instagram.com/metododutra/', label: 'Instagram', Icon: FaInstagram, className: 'fa-instagram' },
]

export default function Footer() {
  return (
    <div className="main-footer">
      <div className="footer-content">
        <div className="contacts-container">
          <h3 className="contacts">Contato</h3>
          <div className="email-container">
            <FaAt className="email-icon" />
            <p className="contacts-email">
              <a href="mailto:relacionamento@metododutra.com.br">relacionamento@metododutra.com.br</a>
            </p>
          </div>
          <div className="phone-container">
            <FaPhone className="phone-icon" />
            <p className="contacts-phone">
              <a href="tel:+555135274145">(51) 3527-4145</a>
            </p>
          </div>
        </div>
        <div className="social-medias">
          <h3 className="socialmedia-title">Redes Sociais</h3>
          {socials.map(({ href, label, Icon, className }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon className={className} />
            </a>
          ))}
        </div>
      </div>
      <div className="copyright-container">
        <p className="copyright-text">
          © 2023. Todos os Direitos Reservados. Desenvolvido por{' '}
          <a href="https://github.com/VanovMoretto/" className="copyright-link">Vanov Moretto</a>
        </p>
      </div>
    </div>
  )
}
