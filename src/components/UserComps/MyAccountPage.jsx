import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from '../../Firebase';
import { validatePhone, validateFullName } from '../../utils/validation';
import MaskedInput from 'react-text-mask';
import Modal from 'react-modal';
import RequireLogin from '../../utils/RequireLogin';
import '../../Styles/MyAccount.css'

const MyAccount = () => {
    const [userData, setUserData] = useState(null);
    const [editNameBox, setEditNameBox] = useState(false);
    const [editPhoneBox, setEditPhoneBox] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [phoneError, setPhoneError] = useState("")
    const [nameError, setNameError] = useState("");
    const auth = getAuth();
    const navigate = useNavigate()

    function openModal() {
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }

    // function meant to close rename window
    const handleRenameWindow = () => {
        setEditNameBox(false);
    };

    const handlePhoneEditWindow = () => {
        setEditPhoneBox(false)
    }

    // function meant to open rename window and initalize newName
    const handleNameEdit = () => {
        setNewName(userData.fullName);
        setEditNameBox(true);
    };

    const saveNameEdit = () => {
        const errorMessage = validateFullName(newName);
        if (errorMessage !== '') {
            setNameError(errorMessage);
        } else {
            setUserData({ ...userData, fullName: newName });
            handleRenameWindow();
            setNameError("");
        }
    }

    const handlePhoneEdit = () => {
        setNewPhone(userData.phone);
        setEditPhoneBox(true)
    }

    const closeEdit = () => {
        setEditNameBox(false)
        setEditPhoneBox(false)
        setNameError("");
        setPhoneError("");
    }

    const savePhoneEdit = () => {
        const errorMessage = validatePhone(newPhone);
        if (errorMessage !== '') {
            setPhoneError(errorMessage);
        } else {
            setUserData({ ...userData, phone: newPhone });
            handlePhoneEditWindow();
            setPhoneError("");
        }
    }


    // function to update the name in Firestore DB
    const saveChanges = async () => {
        closeModal();
        navigate('/');

        // updates the name in Firestore DB
        const userDoc = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userDoc, {
            fullName: userData.fullName,
            phone: userData.phone,
        });
    };

    useEffect(() => {
        if (auth.currentUser) {
            const fetchUserData = async () => {
                const userDoc = doc(db, "users", auth.currentUser.uid);
                const docSnap = await getDoc(userDoc);

                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            };

            fetchUserData();
        } else {
            navigate("/requireLogin");
        }
    }, [auth, navigate]);

    // Verify if user is logged in before rendering the component
    if (!auth.currentUser) {
        return <RequireLogin />;
    }

    return (
        <div className="account-page">
            {userData ? (
                <div className='account-container'>
                    <h1 className='account-title'>Meus dados</h1>
                    <div className="acc-name">
                        <div className="acc-content">
                            <p className='data-name'>Nome:</p>
                            <p className='data-info'>{userData.fullName}</p>
                        </div>
                        {editNameBox && (
                            <div className="change-container">
                                <div className="change-content">
                                    <button className='close-edit-btn' onClick={closeEdit}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                    <p className='change-name'>Digite o nome completo</p>
                                    <div>
                                        <input
                                            className='change-input'
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            onClick={(e) => e.target.select()}
                                        />
                                        <button
                                            className='change-btn-name'
                                            onClick={saveNameEdit}>
                                            Alterar
                                        </button>
                                    </div>
                                    {nameError && <p className='error-message'>{nameError}</p>}
                                </div>
                            </div>
                        )}
                        <button className="info-change name" onClick={handleNameEdit}>Editar</button>
                    </div>
                    <div className="acc-email">
                        <div className="acc-content">
                            <p className='data-name'>Email:</p>
                            <p className='data-info email'>{auth.currentUser.email}</p>
                        </div>
                        <button className="info-change email" onClick={() => navigate('/emailUpdate')}>Editar</button>
                    </div>
                    <div className="acc-password">
                        <div className="acc-content">
                            <p className='data-name'>Senha:</p>
                            <p className='data-info'>*********</p>
                        </div>
                        <button className="info-change password" onClick={() => navigate('/passwordUpdate')}>Editar</button>
                    </div>
                    <div className="acc-phone">
                        <div className="acc-content">
                            <p className='data-name'>Telefone:</p>
                            <p className='data-info'>{userData.phone}</p>
                        </div>
                        {editPhoneBox && (
                            <div className="change-container">
                                <div className="change-content">
                                    <button className='close-edit-btn' onClick={closeEdit}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                    <p className='change-name'>Digite o celular</p>
                                    <div>
                                        <MaskedInput
                                            mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                            className='change-input'
                                            placeholder="Celular"
                                            guide={false}
                                            value={newPhone}
                                            onChange={(e) => setNewPhone(e.target.value)}
                                            onClick={(e) => e.target.select()}
                                        />
                                        <button className='change-btn-name'
                                            onClick={savePhoneEdit}
                                        >
                                            Alterar
                                        </button>
                                    </div>
                                    {phoneError && <p className='error-message'>{phoneError}</p>}
                                </div>
                            </div>
                        )}
                        <button className="info-change phone" onClick={handlePhoneEdit} >Editar</button>
                    </div>
                    <div className="acc-cpf">
                        <div className="acc-content">
                            <p className='data-name'>CPF:</p>
                            <p className='data-info'>{userData.cpf}</p>
                        </div>
                    </div>
                    <button className="save-changes" onClick={openModal}>Salvar</button>
                </div>
            ) : (
                <p className='account-loading'>Carregando...</p>
            )}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={
                    {
                        overlay: {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        },
                        content: {
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            width: '250px',
                            height: '130px',
                            borderRadius: '10px',
                            overflow: 'unset'
                        }
                    }
                }
            >
                <p className='confirm-box'>Salvar as alterações?</p>
                <div className='modal-buttons'>
                    <button className='yes-btn' onClick={saveChanges}>Sim</button>
                    <button className='no-btn' onClick={closeModal}>Não</button>
                </div>
            </Modal>

        </div>
    );
};

export default MyAccount;