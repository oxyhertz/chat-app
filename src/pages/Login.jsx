import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import Add from '../assets/img/addAvatar.png'
import { auth } from '../services/firebase'
export const Login = () => {
  const navigate = useNavigate()
  const [userErrMsg, setUserErrMsg] = useState('')
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    try {
      setPersistence(auth, browserSessionPersistence).then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return signInWithEmailAndPassword(auth, email, password)
      })
      navigate('/')
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
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" name="" id="" />
          <input style={{ display: 'none' }} type="file" id="file" />
          {userErrMsg && <span className={`user-err-msg`}>{userErrMsg}</span>}
          <button>Sign in</button>
        </form>
        <p>You don't have an account? Register</p>
      </div>
    </section>
  )
}
