const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.checkCPFExists = functions.https.onCall(async (data, context) => {
    const cpf = data.cpf;
    const snapshot = await admin.firestore().collection('users').where('cpf', '==', cpf).get();

    if (snapshot.empty) {
        // CPF does not exist
        return { exists: false };
    } else {
        // CPF exists
        return { exists: true };
    }
});
