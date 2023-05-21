import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from '../../Firebase';
import Modal from 'react-modal';
import RequireLogin from '../../utils/RequireLogin';
import '../../Styles/MyAccount.css'

const MyAccount = () => {
    const [userData, setUserData] = useState(null);
    const [isRenameOpen, setRenameOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [newName, setNewName] = useState("");
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
    const handleEdit = () => {
        setNewName(userData.fullName);
        setRenameOpen(true);
    };

    // function to update the name in DB
    const saveChanges = async () => {
        closeModal();

        // updates the name in DB
        const userDoc = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userDoc, {
            fullName: userData.fullName
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
                        {isRenameOpen && (
                            <div className="change-container">
                                <div className="change-content">
                                    <p>Digite o nome completo</p>
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                    />
                                    <button
                                        onClick={() => {
                                            setUserData({ ...userData, fullName: newName });
                                            handleRenameWindow();
                                        }}
                                    >
                                        Alterar
                                    </button>
                                </div>
                            </div>
                        )}
                        <button className="info-change" onClick={handleEdit}>Editar</button>
                    </div>
                    <div className="acc-email">
                        <div className="acc-content">
                            <p className='data-name'>Email:</p>
                            <p className='data-info'>{userData.email}</p>
                        </div>
                        <button className="info-change">Editar</button>
                    </div>
                    <div className="acc-phone">
                        <div className="acc-content">
                            <p className='data-name'>Telefone:</p>
                            <p className='data-info'>{userData.phone}</p>
                        </div>
                        <button className="info-change">Editar</button>
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
                            borderRadius:'10px',
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