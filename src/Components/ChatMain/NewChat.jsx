import React from 'react'
import {IoIosChatbubbles} from 'react-icons/io'

const NewChat = ({setFlagLeftSec,setAboutAcc}) => {
    const hanldeSearchPhone = (value) => {
        console.log(value.target);
        setAboutAcc(false)
        setFlagLeftSec(true)
    }
  return (
    <div className="newChat" onClick={hanldeSearchPhone}>
        новый чат
        <IoIosChatbubbles size={30} className='createChat_icon'/>
    </div>
  )
}

export default NewChat