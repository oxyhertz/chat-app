import React from 'react'

export const MessagePreview = () => {
  return (
    <div className="message owner">
      <div className="message-info">
        <img
          src="https://images.pexels.com/photos/10306256/pexels-photo-10306256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <span>Just now</span>
      </div>
      <div className="message-content">
        <p>hello</p>
        {/* <img
          src="https://images.pexels.com/photos/10306256/pexels-photo-10306256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        /> */}
      </div>
    </div>
  )
}
