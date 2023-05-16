import React from 'react'

const AvatarMe = ({setAboutMe,setFlagLeftSec}) => {

const avatarClickHandler = () => {
    setAboutMe(true)
    setFlagLeftSec(true)
}

  return (
    <div className="avatar" onClick={avatarClickHandler}>
        me
    </div>
  )
}

export default AvatarMe