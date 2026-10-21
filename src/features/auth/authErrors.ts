import { FirebaseError } from 'firebase/app'

// Traduz os códigos de erro do Firebase Auth para mensagens em português.
// "auth/invalid-credential" é o código atual para usuário ou senha errados
// (as versões novas do Firebase não dizem mais qual dos dois está errado).
const messages: Record<string, string> = {
  'auth/invalid-credential': 'Usuário ou senha incorreto.',
  'auth/wrong-password': 'Senha incorreta.',
  'auth/user-not-found': 'Não existe uma conta com este email.',
  'auth/invalid-email': 'Formato de e-mail inválido.',
  'auth/email-already-in-use': 'Este e-mail já está em uso.',
  'auth/weak-password': 'A senha usada é muito fraca.',
  'auth/too-many-requests': 'Muitas tentativas. Aguarde alguns minutos e tente de novo.',
  'auth/requires-recent-login': 'Por segurança, entre novamente na sua conta e repita a operação.',
}

export function authErrorMessage(error: unknown, fallback = 'Ocorreu um erro. Por favor, tente novamente mais tarde.') {
  return error instanceof FirebaseError ? (messages[error.code] ?? fallback) : fallback
}

export const authErrorCode = (error: unknown) => (error instanceof FirebaseError ? error.code : '')
