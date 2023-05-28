import React, { useState, useEffect } from "react";
import { getFunctions, httpsCallable } from 'firebase/functions';
import Texts from "../utils/Texts.jsx";
import MaskedInput from 'react-text-mask';
import '../Styles/Arena.css'
import arena from "../imgs/arena.jpg"
import equipments from "../imgs/equipments.png"
import bigscreen from "../imgs/bigscreen.png"
import plateia from "../imgs/plateia.png"



const ArenaBooking = () => {

    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        eventDescription: '',
        additionalRequests: '',
    });

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        });
    };

    // No seu componente React
    const handleSubmit = e => {
        e.preventDefault();

        // 1. Validação do lado do cliente
        if (!form.name || !form.email || !form.phone || !form.eventDescription) {
            setErrorMessage('Preencha os campos obrigatórios');
            return;
        }

        if (!/^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/i.test(form.email)) {
            setErrorMessage('Insira um endereço de e-mail válido');
            return;
        }

        const functions = getFunctions();
        const sendMail = httpsCallable(functions, 'sendMail');

        sendMail(form)
            .then(() => {
                setDialogMessage('Seu pedido de reserva foi enviado com sucesso!');
                setShowDialog(true);
                setForm({
                    name: '',
                    email: '',
                    phone: '',
                    eventDescription: '',
                    additionalRequests: '',
                });
            })
            .catch(error => {
                console.error(error);
                if (error.code === 'internal') {
                    setDialogMessage('Ocorreu um erro ao enviar seu pedido de reserva. Por favor, tente novamente mais tarde.');
                } else {
                    setDialogMessage('Por favor, verifique as informações que você inseriu e tente novamente.');
                }
                setShowDialog(true);
            });
    };

    useEffect(() => {
        const body = document.body;
    
        body.style.overflow = showDialog ? "hidden" : "initial";
      }, [showDialog]);

    return (
        <div className="arena-page">
            <div className="containers-holder">
                <div className="arena-screen">
                    <img src={arena} alt="arena" />
                </div>
                <div className="description">
                    {Texts.arenapagetxt}
                </div>
                <div className="cards-holder">
                    <div className="bigscreen">
                        <img src={bigscreen} alt="bigscreen" />
                        <div className="short-text">
                            {Texts.bigscreentxt}
                        </div>
                    </div>
                    <div className="equipments">
                        <img src={equipments} alt="equipments" />
                        <div className="short-text">
                            {Texts.equipmentstxt}
                        </div>
                    </div>
                    <div className="seats">
                        <img src={plateia} alt="plateia" />
                        <div className="short-text">
                            {Texts.seatstxt}
                        </div>
                    </div>
                </div>
                <form className="booking-container" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">
                            Nome completo *
                        </label>
                        <input id="name" type="text" className="arena-name" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="email">
                            Email de contato *
                        </label>
                        <input id="email" type="email" className="arena-email" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="phone">
                            Celular de contato *
                        </label>
                        <MaskedInput
                            mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                            className="arena-phone"
                            id="phone"
                            type="tel"
                            guide={false}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="eventDescription">
                            Descreva o evento *
                        </label>
                        <textarea placeholder="Dê uma breve descrição do evento..." id="eventDescription" className="event-description" rows="4" cols="50" onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="additionalRequests">
                            Pedidos adicionais
                        </label>
                        <textarea placeholder="Precisará de coffebreak ou bebidas?" id="additionalRequests" className="event-additional" rows="2" cols="50" onChange={handleChange} />
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <button type="submit" className="arena-submit">Enviar</button>
                    {showDialog && (
                        <div className="dialog">
                            <p>{dialogMessage}</p>
                            <button onClick={() => setShowDialog(false)}>Fechar</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ArenaBooking