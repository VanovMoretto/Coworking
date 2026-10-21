import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'

// Dados extras do usuário, guardados em users/{uid} (e-mail e senha ficam no Firebase Auth)
export type UserProfile = {
  fullName: string
  cpf: string
  email: string
  phone: string
}

const userDoc = (uid: string) => doc(db, 'users', uid)

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(userDoc(uid))
  return snap.exists() ? (snap.data() as UserProfile) : null
}

export function createUserProfile(uid: string, profile: UserProfile) {
  return setDoc(userDoc(uid), profile)
}

export function updateUserProfile(uid: string, changes: Partial<UserProfile>) {
  return updateDoc(userDoc(uid), changes)
}

export const firstName = (fullName = '') => fullName.trim().split(' ')[0]
