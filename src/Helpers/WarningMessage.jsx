import React from 'react'
import {RiErrorWarningFill} from "react-icons/ri"

export const WarningMessage = ({children, visible}) => {
  return (
    <div className={visible ? 'WarningMessage active' : 'NoNWarningMessage'}>
        <div className="content">
            <RiErrorWarningFill className='icon'/>
            <div className="text">
                {children}
            </div>
        </div>
    </div>
  )
}
