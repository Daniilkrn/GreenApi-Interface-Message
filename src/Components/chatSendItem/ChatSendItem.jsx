import React from 'react'
import '../../Styles/chatSendItem.scss'

const ChatSendItem = ({children}) => {
  return (
    <div className='chatSendItem'>
        Вы:
        <div className="cloud">
            {children}
        </div>
    </div>
  )
}

export default ChatSendItem