import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyD1TZwksD77yLmIzElKO9QZv7kPqfUlf_I',
  authDomain: 'pickside-e4cb5.firebaseapp.com',
  projectId: 'pickside-e4cb5',
  storageBucket: 'pickside-e4cb5.firebasestorage.app',
  messagingSenderId: '678113323932',
  appId: '1:678113323932:web:d4ddbf79c973f5fca6b659',
  measurementId: 'G-D5DCTS5RZ0'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()