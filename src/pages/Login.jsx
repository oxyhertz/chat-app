import React from 'react'
import Add from '../assets/img/addAvatar.png'
export const Login = () => {
  return (
    <section className="form-container">
      <div className="form-wrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Register</span>
        <form action="">
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" name="" id="" />
          <input style={{ display: 'none' }} type="file" id="file" />
          <button>Sign in</button>
        </form>
        <p>You don't have an account? Register</p>
      </div>
    </section>
  )
}
