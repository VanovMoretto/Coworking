import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Configuração pública do app web do Firebase (não é segredo: quem protege os dados
// são as regras do Firestore, em firestore.rules)
const firebaseConfig = {
  apiKey: 'AIzaSyBLUyWD3Krz7Ti_nLmwEYwmJulKQ3THC7g',
  authDomain: 'dutra-coworking.firebaseapp.com',
  projectId: 'dutra-coworking',
  storageBucket: 'dutra-coworking.appspot.com',
  messagingSenderId: '969417310723',
  appId: '1:969417310723:web:b04717e558ff5f68304436',
  measurementId: 'G-1HSXBJM0S3',
}

export const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
