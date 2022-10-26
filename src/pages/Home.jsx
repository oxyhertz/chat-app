import React from 'react'
import { Chat } from '../components/Chat'
import { Sidebar } from '../components/Sidebar'

export const Home = () => {
  return (
    <section className="home">
      <main className="container">
        <Sidebar></Sidebar>
        <Chat></Chat>
      </main>
    </section>
  )
}
