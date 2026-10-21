import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import Modal from '../../components/Modal'
import MaskedInput from '../../components/MaskedInput'
import { masks } from '../../utils/masks'
import { validateFullName, validatePhone } from '../../utils/validation'
import { updateUserProfile } from './users'
import './MyAccountPage.css'

type Editing = 'fullName' | 'phone' | null

// Caixinha que abre sobre o campo para editar nome ou telefone
function EditBox({ label, error, onSave, onClose, children }: {
  label: string; error: string; onSave: () => void; onClose: () => void; children: ReactNode
}) {
  return (
    <div className="change-container">
      <div className="change-content">
        <button className="close-edit-btn" onClick={onClose} aria-label="Fechar">
          <FaTimes />
        </button>
        <p className="change-name">{label}</p>
        <div>
          {children}
          <button className="change-btn-name" onClick={onSave}>Alterar</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  )
}

// "Meus dados": nome e telefone são editados aqui; e-mail e senha têm páginas próprias
export default function MyAccountPage() {
  const { user, profile, refreshProfile } = useAuth()
  const navigate = useNavigate()
  // cópia local dos dados: as edições só vão para o banco ao clicar em "Salvar"
  const [draft, setDraft] = useState(profile)
  const [editing, setEditing] = useState<Editing>(null)
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [saveError, setSaveError] = useState('')

  if (!user || !draft) return <div className="account-page"><p className="account-loading">Carregando...</p></div>

  const openEdit = (field: Exclude<Editing, null>) => {
    setValue(draft[field])
    setError('')
    setEditing(field)
  }

  const closeEdit = () => {
    setEditing(null)
    setError('')
  }

  const applyEdit = () => {
    if (!editing) return
    const message = editing === 'fullName' ? validateFullName(value) : validatePhone(value)
    if (message) return setError(message)
    setDraft({ ...draft, [editing]: value })
    closeEdit()
  }

  const saveChanges = async () => {
    setConfirmOpen(false)
    try {
      await updateUserProfile(user.uid, { fullName: draft.fullName, phone: draft.phone })
      await refreshProfile()
      navigate('/')
    } catch (err) {
      console.error('Erro ao salvar os dados', err)
      setSaveError('Não foi possível salvar as alterações. Tente novamente.')
    }
  }

  const selectAll = (e: { currentTarget: HTMLInputElement }) => e.currentTarget.select()

  return (
    <div className="account-page">
      <div className="account-container">
        <h1 className="account-title">Meus dados</h1>
        <div className="acc-name">
          <div className="acc-content">
            <p className="data-name">Nome:</p>
            <p className="data-info">{draft.fullName}</p>
          </div>
          {editing === 'fullName' && (
            <EditBox label="Digite o nome completo" error={error} onSave={applyEdit} onClose={closeEdit}>
              <input className="change-input" type="text" value={value} onChange={(e) => setValue(e.target.value)} onClick={selectAll} />
            </EditBox>
          )}
          <button className="info-change name" onClick={() => openEdit('fullName')}>Editar</button>
        </div>
        <div className="acc-email">
          <div className="acc-content">
            <p className="data-name">Email:</p>
            <p className="data-info email">{user.email}</p>
          </div>
          <button className="info-change email" onClick={() => navigate('/emailUpdate')}>Editar</button>
        </div>
        <div className="acc-password">
          <div className="acc-content">
            <p className="data-name">Senha:</p>
            <p className="data-info">*********</p>
          </div>
          <button className="info-change password" onClick={() => navigate('/passwordUpdate')}>Editar</button>
        </div>
        <div className="acc-phone">
          <div className="acc-content">
            <p className="data-name">Telefone:</p>
            <p className="data-info">{draft.phone}</p>
          </div>
          {editing === 'phone' && (
            <EditBox label="Digite o celular" error={error} onSave={applyEdit} onClose={closeEdit}>
              <MaskedInput
                mask={masks.phone}
                className="change-input"
                placeholder="Celular"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onClick={selectAll}
              />
            </EditBox>
          )}
          <button className="info-change phone" onClick={() => openEdit('phone')}>Editar</button>
        </div>
        <div className="acc-cpf">
          <div className="acc-content">
            <p className="data-name">CPF:</p>
            <p className="data-info">{draft.cpf}</p>
          </div>
        </div>
        {saveError && <p className="error-message">{saveError}</p>}
        <button className="save-changes" onClick={() => setConfirmOpen(true)}>Salvar</button>
      </div>
      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        overlayStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
        contentStyle={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)',
          width: 250, height: 130, borderRadius: 10, overflow: 'unset',
        }}
      >
        <p className="confirm-box">Salvar as alterações?</p>
        <div className="modal-buttons">
          <button className="yes-btn" onClick={saveChanges}>Sim</button>
          <button className="no-btn" onClick={() => setConfirmOpen(false)}>Não</button>
        </div>
      </Modal>
    </div>
  )
}
