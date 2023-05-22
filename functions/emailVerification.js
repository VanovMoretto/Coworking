const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'process.env.GMAIL_USER',
    pass: 'process.env.GMAIL_PASSWORD',
  },
});

exports.sendVerificationCode = functions.https.onCall(async (data, context) => {
  // Verifique se o usuário está autenticado
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Você deve estar logado para usar esta função.');
  }

  // Gere um código de verificação e salve-o no Firestore
  
  // Use o nodemailer para enviar o código de verificação para o novo e-mail

  // Retorne uma mensagem de sucesso
});

exports.verifyCodeAndUpdateEmail = functions.https.onCall(async (data, context) => {
  // Verifique se o usuário está autenticado
  
  // Verifique se o código de verificação fornecido corresponde ao que está no Firestore
  
  // Se o código estiver correto, atualize o endereço de e-mail do usuário no Firebase Auth e no Firestore
  
  // Retorne uma mensagem de sucesso
});
