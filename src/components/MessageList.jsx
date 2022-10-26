import React from 'react'
import { MessagePreview } from './MessagePreview'
export const MessagesList = () => {
  return (
    <div className="messages">
      <MessagePreview></MessagePreview>
      <MessagePreview></MessagePreview>
      <MessagePreview></MessagePreview>
      <MessagePreview></MessagePreview>
      <MessagePreview></MessagePreview>
    </div>
  )
}
