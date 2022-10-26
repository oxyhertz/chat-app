import React from 'react'
import Add from '../assets/img/addAvatar.png'
export const Register = () => {
  return (
    <section className="form-container">
      <div className="form-wrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Register</span>
        <form action="">
          <input type="text " placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" name="" id="" />
          <input style={{ display: 'none' }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>

          <button>Sign up</button>
        </form>
        <p>You do have an account? Login</p>
      </div>
    </section>
  )
}
