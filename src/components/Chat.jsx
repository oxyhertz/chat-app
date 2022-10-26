import React from 'react'
import { MessagesList } from './MessageList'
import { Input } from './Input'
import Cam from '../assets/img/cam.png'
import Add from '../assets/img/add.png'
import More from '../assets/img/more.png'
export const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-info">
        <span>Jane</span>
        <div className="chat-icons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <MessagesList></MessagesList>
      <Input></Input>
    </div>
  )
}
