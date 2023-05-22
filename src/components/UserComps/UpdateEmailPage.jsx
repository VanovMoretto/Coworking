import React, { useState } from 'react';

const UpdateEmailPage = () => {
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const sendVerificationCode = async () => {
    // chamar a Firebase Function para enviar o código.
    // Posteriormente, definir codeSent como true.
    setCodeSent(true);
  };

  const verifyCodeAndUpdateEmail = async () => {
    // chamar a Firebase Function para verificar o código e atualizar o email.
    // Se o código estiver incorreto, mostre uma mensagem de erro.
  };

  return (
    <div>
      <h1>Atualizar Email</h1>
      {!codeSent ? (
        <form onSubmit={sendVerificationCode}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit">Enviar Código de Verificação</button>
        </form>
      ) : (
        <form onSubmit={verifyCodeAndUpdateEmail}>
          <input
            type="text"
            value={verificationCode}
            onChange={e => setVerificationCode(e.target.value)}
            required
          />
          <button type="submit">Verificar Código e Atualizar Email</button>
        </form>
      )}
    </div>
  );
};

export default UpdateEmailPage;
