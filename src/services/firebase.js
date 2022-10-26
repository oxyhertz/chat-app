// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAknXHBnddudyWGSmF47PPo_iz7uaQKB2E',
  authDomain: 'chat-d95a3.firebaseapp.com',
  projectId: 'chat-d95a3',
  storageBucket: 'chat-d95a3.appspot.com',
  messagingSenderId: '730726821451',
  appId: '1:730726821451:web:0eb90b0721f4174947e7ce',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()

export async function uploadUserImg({ user }, displayName, file) {
  const date = new Date().getTime()
  const storageRef = ref(storage, `${displayName + date}`)

  await uploadBytesResumable(storageRef, file).then(() => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(storageRef).then(async (downloadURL) => {
      await updateProfile(user, {
        displayName,
        photoURL: downloadURL,
      })
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName,
        email: user.email,
        photoURL: downloadURL,
      })

      await setDoc(doc(db, 'userChats', user.uid), {})
    })
  })
}
