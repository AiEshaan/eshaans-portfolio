import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from "firebase/auth";

/**
 * Sign in using email and password.
 */
export async function signIn(email: string, pass: string): Promise<User> {
  const credential = await signInWithEmailAndPassword(auth, email, pass);
  return credential.user;
}

/**
 * Log out the current administrative session.
 */
export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

/**
 * Subscribe to authentication state updates.
 */
export function monitorAuthState(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}
