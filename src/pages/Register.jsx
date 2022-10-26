import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import Add from '../assets/img/addAvatar.png'
import { auth, storage, db, uploadUserImg } from '../services/firebase'
import { useNavigate } from 'react-router-dom'
export const Register = () => {
  const navigate = useNavigate()
  const [userErrMsg, setUserErrMsg] = useState('')
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      console.log('user', user)

      await uploadUserImg(user, displayName, file)

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
        <form action="" onSubmit={handleSubmit} ref={formRef}>
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
