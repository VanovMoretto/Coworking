import { useNavigate } from 'react-router-dom'
import Modal from '../../components/Modal'
import SignIn from './SignIn'
import SignUp from './SignUp'
import './AuthModal.css'

type Props = {
  isOpen: boolean
  onClose: () => void
  /** o que fazer depois de entrar ou criar a conta; sem isso, volta para a home */
  onSuccess?: () => void
}

// Modal de login/cadastro: um cartão que gira entre "Entrar" (frente) e "Criar" (verso).
// O giro é feito só com CSS, pelo checkbox #reg-log.
export default function AuthModal({ isOpen, onClose, onSuccess }: Props) {
  const navigate = useNavigate()
  const done = () => {
    onClose()
    if (onSuccess) onSuccess()
    else navigate('/')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      overlayStyle={{
        backgroundColor: 'rgb(0 0 0 / 0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center',
        overflow: 'auto', paddingBottom: 20,
      }}
      contentStyle={{
        display: 'flex', justifyContent: 'center', position: 'static', width: 'auto', height: 'auto',
        textAlign: 'center', backgroundColor: 'transparent', border: 'none', overflow: 'hidden',
      }}
    >
      <div className="section">
        <div className="row">
          <div className="col-12">
            <div className="section">
              <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
              <label htmlFor="reg-log">
                <span className="switch-in">Entrar</span>
                <span className="switch-up">Criar</span>
              </label>
              <div className="card-3d-wrap">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <SignIn onClose={onClose} onSuccess={done} />
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <SignUp onClose={onClose} onSuccess={done} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
