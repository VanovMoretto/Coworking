const functions = require('firebase-functions');
const sgMail = require('@sendgrid/mail');
const Joi = require('joi');

sgMail.setApiKey(functions.config().sendgrid.api_key);

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    eventDescription: Joi.string().required(),
    additionalRequests: Joi.string().allow('').optional(),
});

exports.sendMail = functions.https.onCall(async (data, context) => {
    // Validação do lado do servidor
    const { error } = schema.validate(data);
    if (error) {
        console.error('Validation error:', error);
        throw new functions.https.HttpsError('invalid-argument', 'Os dados fornecidos são inválidos.');
    }

    const msg = {
        to: 'dutracoworking@gmail.com',
        from: 'dutracoworking@gmail.com',
        subject: 'Nova solicitação de reserva',
        text: `
            Nome: ${data.name}
            Email: ${data.email}
            Celular: ${data.phone}
            Descrição do evento: ${data.eventDescription}
            Pedidos adicionais: ${data.additionalRequests}
        `,
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
        if (error instanceof sgMail.SendGridError) {

            if (error.code >= 400 && error.code < 500) {
                throw new functions.https.HttpsError('invalid-argument', 'Os dados fornecidos são inválidos.');
            } else {
                throw new functions.https.HttpsError('internal', 'Ocorreu um erro ao enviar o e-mail.');
            }
        } else {
            throw new functions.https.HttpsError('internal', 'Ocorreu um erro ao enviar o e-mail.');
        }
    }
});
