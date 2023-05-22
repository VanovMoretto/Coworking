import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, updateEmail } from "firebase/auth";
import { db } from '../../Firebase';
import Modal from 'react-modal';
import RequireLogin from '../../utils/RequireLogin';
import '../../Styles/MyAccount.css'

const MyAccount = () => {
    const [userData, setUserData] = useState(null);
    const [isRenameOpen, setRenameOpen] = useState(false);
    const [isEmailEditOpen, setEmailEditOpen] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
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
        setRenameOpen(false);
    };

    // function meant to open rename window and initalize newName
    const handleNameEdit = () => {
        setNewName(userData.fullName);
        setRenameOpen(true);
    };

    const handleEmailEdit = () => {
        setNewEmail(auth.currentUser.email);
        setEmailEditOpen(true);
    };

    const closeEdit = () => {
        setRenameOpen(false)
    }

    const closeEmailEdit = () => {
        setEmailEditOpen(false)
    }

    // function to update the name in Firestore DB
    const saveChanges = async () => {
        closeModal();

        // updates the name in Firestore DB
        const userDoc = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userDoc, {
            fullName: userData.fullName
        });
    };

    const saveEmailChanges = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('Nenhum usuário autenticado');
            }
            await updateEmail(user, newEmail);
    
            // Also updates the email in Firestore DB
            const userDoc = doc(db, "users", user.uid);
            await updateDoc(userDoc, {
                email: newEmail
            });
    
            setEmailEditOpen(false);
        } catch (error) {
            console.log("Erro ao atualizar o email: ", error);
        }
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
                        {isRenameOpen && (
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
                                        <button className='change-btn-name'
                                            onClick={() => {
                                                setUserData({ ...userData, fullName: newName });
                                                handleRenameWindow();
                                            }}
                                        >
                                            Alterar
                                        </button>
                                    </div>
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
                        {isEmailEditOpen && (
                            <div className="change-container">
                                <div className="change-content">
                                    <button className='close-edit-btn' onClick={closeEmailEdit}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                    <p className='change-name'>Digite o novo email</p>
                                    <div>
                                        <input
                                            className='change-input'
                                            type="email"
                                            value={newEmail}
                                            onChange={(e) => setNewEmail(e.target.value)}
                                            onClick={(e) => e.target.select()}
                                        />
                                        <button className='change-btn-name'
                                            onClick={saveEmailChanges}
                                        >
                                            Alterar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <button className="info-change email" onClick={handleEmailEdit}>Editar</button>
                    </div>
                    <div className="acc-phone">
                        <div className="acc-content">
                            <p className='data-name'>Telefone:</p>
                            <p className='data-info'>{userData.phone}</p>
                        </div>
                        <button className="info-change phone">Editar</button>
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