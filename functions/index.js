const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
const Joi = require('joi');


// Campos enviados pelo formulário da Arena (src/features/arena/arenaRequest.ts).
// Antes faltavam data e horários aqui: o Joi recusa campos desconhecidos, então todo pedido falhava.
const time = Joi.string().pattern(/^\d{2}:\d{2}$/);
const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    eventDescription: Joi.string().required(),
    additionalRequests: Joi.string().allow('').optional(),
    startDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
    timeFrom: time.required(),
    timeTo: time.required(),
});

exports.sendMail = functions.https.onCall(async (data, context) => {
    // Validação do lado do servidor
    const { error } = schema.validate(data);
    if (error) {
        console.error('Validation error:', error);
        throw new functions.https.HttpsError('invalid-argument', 'Os dados fornecidos são inválidos.');
    }

    // a chave é lida só na hora de enviar: lida no carregamento do arquivo, quebrava
    // qualquer execução fora do Firebase (inclusive a análise que o deploy faz)
    sgMail.setApiKey(functions.config().sendgrid.api_key);

    // yyyy-MM-dd -> dd/MM/yyyy, sem passar por Date (evita erro de fuso horário)
    const formattedDate = data.startDate.split('-').reverse().join('/');
    const formattedTime = `${data.timeFrom} até ${data.timeTo}`;

    const msg = {
        to: 'tamires@dutracorporativo.com.br',
        from: 'dutracoworking@gmail.com',
        subject: 'Nova solicitação de reserva',
        text: `
            Nome: ${data.name}
            Email: ${data.email}
            Celular: ${data.phone}
            Dia: ${formattedDate}
            Horário: ${formattedTime}
            Descrição do evento: ${data.eventDescription}
            Pedidos adicionais: ${data.additionalRequests}
        `,
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
        // o SendGrid devolve o status HTTP em error.code (antes havia um "instanceof sgMail.SendGridError",
        // que não existe e quebrava o próprio tratamento de erro)
        if (error.code >= 400 && error.code < 500) {
            throw new functions.https.HttpsError('invalid-argument', 'Os dados fornecidos são inválidos.');
        }
        throw new functions.https.HttpsError('internal', 'Ocorreu um erro ao enviar o e-mail.');
    }
});
