import React, { Children } from 'react'
import {MdOutlineKeyboardBackspace} from 'react-icons/md'
import '../../Styles/aboutMe.scss'

const AboutMe = ({setFlagLeftSec, children, title}) => {
  return (
    <div className='aboutMe'>
        <div className="prev">
            <MdOutlineKeyboardBackspace  className='back_icon' onClick={()=>{
                setFlagLeftSec(false)
            }}/>
            <li>{title}</li>
        </div>
        {children}
    </div>
  )
}

export default AboutMe