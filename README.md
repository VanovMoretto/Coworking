# Dutra Coworking · Reservas

Site de reservas de salas do Dutra Coworking. Quem tem conta escolhe o dia e o horário em uma das salas (Térreo, Podcast e Mezanino) e confirma a reserva com a lista de participantes. A Arena, o auditório, é reservada por um formulário que envia o pedido por e-mail para a equipe.

No ar: https://dutra-coworking.vercel.app

## O que dá para fazer

- Criar conta (com validação de CPF, telefone e regras de senha), entrar e recuperar a senha
- Ver os horários livres de cada sala, de 30 em 30 minutos, e reservar
- Acompanhar as próximas reservas, cancelar e apagar o histórico
- Editar nome, telefone, e-mail e senha
- Pedir a reserva da Arena pelo formulário

## Tecnologias

| Parte | Tecnologia |
| --- | --- |
| Interface | React 19 + TypeScript, Vite |
| Rotas | React Router (HashRouter, funciona em qualquer hospedagem estática) |
| Login | Firebase Authentication (e-mail e senha) |
| Banco | Cloud Firestore (`users/` e `reservations/`) |
| E-mail da Arena | Cloud Function `sendMail` + SendGrid (`functions/`) |
| Datas | date-fns e react-datepicker |
| Ícones | react-icons |

## Estrutura

```
src/
├── App.tsx              rotas (as páginas que exigem login passam pelo RequireAuth)
├── lib/firebase.ts      conexão com o Firebase
├── contexts/            AuthContext: usuário logado e perfil, num lugar só
├── components/          peças genéricas: Modal, MaskedInput, RequireAuth
├── hooks/               useMediaQuery, useBodyScrollLock
├── layouts/             Navbar e Footer
├── content/             textos longos e a lista de salas
├── utils/               validações e máscaras
└── features/
    ├── auth/            login, cadastro, recuperar senha
    ├── booking/         página de reservas, seletor de dias e horários, painel de confirmação
    ├── account/         meus dados, minhas reservas, troca de e-mail e senha
    ├── arena/           página e formulário da Arena
    └── home/            home, carrossel, "Sobre" e página 404
```

Cada pasta de `features/` tem as telas, os estilos e o acesso aos dados daquela parte do site (por exemplo, `booking/reservations.ts` lê e grava as reservas, e `booking/timeSlots.ts` calcula os horários livres).

## Rodar no computador

```bash
npm install
npm run dev
```

Outros comandos: `npm run build` (gera o site em `dist/`), `npm run preview` (abre o build) e `npm run lint`.

## Publicação

- **Vercel**: o `vercel.json` já diz para usar o Vite e publicar a pasta `dist`.
- **GitHub Pages**: o workflow em `.github/workflows/build.yml` publica a cada push na `main`.
- **Firebase**: as regras do banco e a função de e-mail não são publicadas por esses dois. Quando mudarem:

```bash
firebase deploy --only firestore:rules
firebase deploy --only functions
```

## Licença

MIT. Veja o arquivo LICENSE.
