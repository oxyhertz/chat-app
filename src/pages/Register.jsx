import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import Add from '../assets/img/addAvatar.png'
import { auth, storage, db } from '../services/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
export const Register = () => {
  const [userErrMsg, setUserErrMsg] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].value

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      const storageRef = ref(storage, `images/${displayName}-avatar.jpg`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        (err) => {},
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(user.user, {
              displayName,
              photoURL: downloadURL,
            })
            await setDoc(doc(db, 'users', user.user.uid), {
              uid: user.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            })
          })
        }
      )
    } catch (error) {
      console.log('error', error)
      const errorMessage = error.message
      setUserErrMsg(errorMessage)

      setTimeout(() => {
        setUserErrMsg('')
      }, 2000)
    }
  }

  return (
    <section className="form-container">
      <div className="form-wrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Register</span>
        <form action="" onSubmit={handleSubmit}>
          <input type="text " placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" name="" id="" />
          <input style={{ display: 'none' }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>

          <button>Sign up</button>
          {userErrMsg && <span className={`user-err-msg`}>{userErrMsg}</span>}
          {/* <span className={`user-err-msg  ${!userErrMsg ? 'hidden' : ''}`}>
            {userErrMsg}
          </span> */}
        </form>
        <p>You do have an account? Login</p>
      </div>
    </section>
  )
}
