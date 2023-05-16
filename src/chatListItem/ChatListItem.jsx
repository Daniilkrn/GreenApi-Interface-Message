import React from 'react'
import { setWindowPhone } from '../store/reducers/currentWindowSlice';
import {useDispatch} from 'react-redux'

const ChatListItem = ({phone, date, children, id, onChangeCurrent}) => {

const refCurrentWindow = React.useRef();
const liRef = React.useRef();
const dispatch = useDispatch()

React.useEffect(()=>{
    onChangeCurrent(liRef.current.textContent)
},[])

const handleChangeCurrent = (liRef) => {
    onChangeCurrent(liRef.current.textContent)
}

  return (
    <div className="chat_item" ref={refCurrentWindow} id={id} onClick={()=>{
        handleChangeCurrent(liRef)

    }}>
        <div className="avatar">
            ava
        </div>
        <div className="info_item">
            <div className="phone_container">
                <li ref={liRef}>{phone}</li>
                <li>{date}</li>
            </div>
            <div className="text">
                {
                    children
                }  
            </div>
        </div>
    </div>
  )
}

export default ChatListItem