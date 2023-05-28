import React, { useState, useEffect } from "react";
import '../Styles/RequireLogin.css';
import Modal from "react-modal";
import SigninSignup from "../pages/SigninSignup";


Modal.setAppElement('#root');

const RequireLogin = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        setModalIsOpen(true);
    }, []);

    useEffect(() => {
        if (modalIsOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'initial';
        }

        return () => {
            document.body.style.overflow = 'initial';
        };
    }, [modalIsOpen]);

    return (
        <div className="reqLog-page">
            <div className="reqLog-container">
                <h2 className="reqLog-h2">Ops...</h2>
                <h1 className="reqLog-h1">Parece que você ainda não fez o login!</h1>
                <h2 className="reqLog-h2">Faça o login para continuar.</h2>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)} // Fecha o modal quando o usuário clica fora dele
                style={
                    {
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'auto',
                            paddingBottom: '20px'
                        },
                        content: {
                            display: 'flex',
                            justifyContent: 'center',
                            position: 'static',
                            width: 'auto',
                            height: 'auto',
                            textAlign: 'center',
                            backgroundColor: 'transparent',
                            border: 'none'
                        }
                    }
                }
            >
                <SigninSignup closeModal={() => setModalIsOpen(false)} />
            </Modal>
        </div>
    )
}

export default RequireLogin
