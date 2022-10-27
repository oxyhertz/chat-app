import { signOut } from 'firebase/auth'
import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { auth } from '../services/firebase'

export const Navbar = () => {
  const { currentUser } = useContext(AuthContext)
  return (
    <section className="navbar">
      <section className="user">
        <span className="logo">Waza Chat</span>
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </section>
    </section>
  )
}
