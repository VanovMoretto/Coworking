import React, { useState, useEffect } from "react";
import { getFunctions, httpsCallable } from 'firebase/functions';
import Texts from "../utils/texts.jsx";
import MaskedInput from 'react-text-mask';
import '../Styles/Arena.css'
import arena from "../assets/imgs/arena.jpg"
import equipments from "../assets/imgs/equipments.png"
import bigscreen from "../assets/imgs/bigscreen.png"
import plateia from "../assets/imgs/plateia.png"
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt';
import "react-datepicker/dist/react-datepicker.css";

const ArenaBooking = () => {

    registerLocale('pt', pt);
    setDefaultLocale('pt');

    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        eventDescription: '',
        additionalRequests: '',
        startDate: new Date(),
        timeFrom: '07:30',
        timeTo: '22:00',
    });

    const handleDateChange = date => {
        setForm(oldForm => ({
            ...oldForm,
            startDate: date,
        }));
    };

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (!form.name || !form.email || !form.phone || !form.eventDescription) {
            setErrorMessage('Preencha os campos obrigatórios');
            return;
        }

        if (!/^[\w.-]+@[\w.-]+\.\w+$/i.test(form.email)) {
            setErrorMessage('Insira um endereço de e-mail válido');
            return;
        }

        const functions = getFunctions();
        const sendMail = httpsCallable(functions, 'sendMail');

        sendMail(form)
            .then(() => {
                setDialogMessage('Seu pedido de reserva foi enviado com sucesso!');
                setErrorMessage('');
                setShowDialog(true);
                setForm({
                    name: '',
                    email: '',
                    phone: '',
                    eventDescription: '',
                    additionalRequests: '',
                    timeFrom: '07:30',
                    timeTo: '22:00',
                });
            })
            .catch(error => {
                setErrorMessage('');
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
                    <h1 className="form-title">Reserve já nosso espaço!</h1>
                    <div className="arena form-group">
                        <div>
                            <label htmlFor="name">
                                Nome completo *
                            </label>
                            <input id="name" type="text" className="arena-name" onChange={handleChange} value={form.name} />
                        </div>
                        <div>
                            <label htmlFor="email">
                                Email de contato *
                            </label>
                            <input id="email" type="email" className="arena-email" onChange={handleChange} value={form.email} />
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
                                onChange={handleChange}
                                value={form.phone} />
                        </div>
                        <div>
                            <label htmlFor="startDate">
                                Selecionar data *
                            </label>
                            <DatePicker
                                selected={form.startDate}
                                onChange={handleDateChange}
                                id="startDate"
                                className="arena-date"
                                dateFormat="dd/MM/yyyy"
                                locale="pt"
                            />
                        </div>
                        <div className="timeFrom">
                            <label htmlFor="timeFrom">
                                De:
                            </label>
                            <input
                                type="time"
                                id="timeFrom"
                                value={form.timeFrom}
                                onChange={(e) => setForm({ ...form, timeFrom: e.target.value })}
                            />
                        </div>
                        <div className="timeTo">
                            <label htmlFor="timeTo">
                                Até:
                            </label>
                            <input
                                type="time"
                                id="timeTo"
                                value={form.timeTo}
                                onChange={(e) => setForm({ ...form, timeTo: e.target.value })}
                            />
                        </div>
                    </div>
                    <div style={{marginTop:'20px'}}>
                        <label htmlFor="eventDescription">
                            Descreva o evento *
                        </label>
                        <textarea placeholder="Dê uma breve descrição do evento..." id="eventDescription" className="event-description" rows="6" cols="55" onChange={handleChange} value={form.eventDescription} />
                    </div>
                    <div>
                        <label htmlFor="additionalRequests">
                            Pedidos adicionais
                        </label>
                        <textarea placeholder="Precisará de coffebreak ou bebidas?" id="additionalRequests" className="event-additional" rows="2" cols="55" onChange={handleChange} value={form.additionalRequests} />
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