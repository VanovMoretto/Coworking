import { FiCheck } from 'react-icons/fi'
import { passwordRules } from '../../utils/validation'
import './PasswordChecklist.css'

// Lista das regras de senha, que vão ficando azuis conforme a pessoa digita
export default function PasswordChecklist({ password, visible }: { password: string; visible: boolean }) {
  return (
    <div className={`valid-checks ${visible ? '' : 'hide'}`}>
      <ul className="checklist">
        {passwordRules.map((rule) => {
          const ok = rule.test(password)
          return (
            <li key={rule.key} className={ok ? 'checked' : ''}>
              <i className={`check-icon ${ok ? 'checked' : ''}`}><FiCheck /></i>
              {rule.label}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
