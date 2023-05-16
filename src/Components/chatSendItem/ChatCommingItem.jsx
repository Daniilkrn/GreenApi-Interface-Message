import React from 'react'

const ChatCommingItem = ({children}) => {
  return (
    <div className='сhatCommingItem'>
        Собеседник:
        <div className="cloud">
            {children}
        </div>
    </div>
  )
}

export default ChatCommingItem