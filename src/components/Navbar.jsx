import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../services/firebase'

export const Navbar = () => {
  return (
    <section className="navbar">
      <section className="user">
        <span className="logo">Waza Chat</span>
        <img
          src="https://images.pexels.com/photos/14099311/pexels-photo-14099311.jpeg?cs=srgb&dl=pexels-jhovani-morales-14099311.jpg&fm=jpg&_gl=1*axt13x*_ga*MzgyMzU4MTIzLjE2NjY3Nzg0MDU.*_ga_8JE65Q40S6*MTY2Njc3ODQwNS4xLjEuMTY2Njc3ODQwOC4wLjAuMA.."
          alt=""
        />
        <span>John</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </section>
    </section>
  )
}
