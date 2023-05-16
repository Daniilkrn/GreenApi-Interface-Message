import React, { useState } from 'react'
import '../../Styles/chatMain.scss'
import {AiOutlineSend} from 'react-icons/ai'
import {CgSortAz} from 'react-icons/cg'
import {AiOutlineSearch} from 'react-icons/ai'
import AboutMe from '../aboutMe/AboutMe'
import axios from 'axios'
import { WarningMessage } from '../../Helpers/WarningMessage'
import ChatSendItem from '../chatSendItem/ChatSendItem'
import ChatListItem from '../../chatListItem/ChatListItem'
import { useSelector } from 'react-redux'
import ChatCommingItem from '../chatSendItem/ChatCommingItem'
import { io } from "socket.io-client";
import LogOut from './LogOut'
import AvatarMe from './AvatarMe'
import NewChat from './NewChat'

const socket = io.connect("http://localhost:5000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

const ChatMain = () => {

const [commingData,setCommingData] = useState([])
const [all, setAll] = useState([])
const idInstance = useSelector(state => state.flagSlice.IdInstance)
const apiTokenInstance = useSelector(state => state.flagSlice.ApiTokenInstance)

socket.on('message', (data) => {
    setCommingData([...commingData, data.messageData.textMessageData.textMessage])
    let obj = {
        from: 'server',
        message: data.messageData.textMessageData.textMessage,
        idMessage:  new Date().getTime(),
        id: count,
        text: data.messageData.textMessageData.textMessage,
        phone: startChat ? phoneSearch : `${dataAcc} (Вы)`
    }
    setAll([...all, new Array(obj)])
    setDataChatList([new Array(obj)])
})

const [phoneCurrent, setPhoneCurrent] = useState()
const [flagLeftSec, setFlagLeftSec] = useState(false)

const [aboutMe, setAboutMe] = useState(false)
const [fetching, setFetching]= useState(true)
const [sendInput, setSendInput] = useState('')
const [aciteSend, setActiveSend] = useState(false)

const [searchInput, setSearchInput] = useState('')

const [searchInputData,setSearchInputData] = useState([])

const [phoneSearch,setPhoneSearch] = useState('')
const [startChat,setStartChat] = useState(false)
const [wasSend,setWasSend] = useState(false)

const [visibleWarn,setWisibleWarn] = useState(false)

// const [dataChat,setDataChat] = useState([])
const [dataChatList, setDataChatList] = useState([])
const [count,setCount] = useState(0)

React.useEffect(()=>{
    if(sendInput.trim().length > 0){
        setActiveSend(true)
    } else {
        setActiveSend(false)
    }
},[sendInput])

const [dataAcc,setDataAcc] = useState()

React.useEffect(()=>{
    if(fetching){
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.green-api.com/waInstance${idInstance}/getSettings/${apiTokenInstance}`,
            headers: { }
        };
        axios.request(config)
        .then((response) => {
            const data = JSON.stringify(response.data.wid)
            setDataAcc(data.replace(/\D/g,''))
        })
        .finally(()=>{
            setFetching(false)
        })
        .catch((error) => {
            console.log(error);
        });
    }
},[fetching])

const setWasSendHandler = (sendInput , phoneSearch) => {
    let obj = {
        id: count,
        text: sendInput,
        phone: startChat ? phoneSearch : `${dataAcc} (Вы)` 
    }
    dataChatList[count - 1].shift()
    setDataChatList([new Array(obj), ...dataChatList])
} 

const hanldeStartChat = () => {
    if(searchInputData.length === 0){
        setSearchInputData([phoneSearch, ...searchInputData]) 
        setFlagLeftSec(false)
        setStartChat(true)
        let obj = {
            id: count,
            text: 'Здесь пока ничего нет',
            phone: phoneSearch,
        }
        setDataChatList([new Array(obj), ...dataChatList])
        setCount(count + 1)
    }
    if(searchInputData.includes(phoneSearch) === false){
        setSearchInputData([phoneSearch, ...searchInputData]) 
        setFlagLeftSec(false)
        setStartChat(true)
        let obj = {
            id: count,
            text: 'Здесь пока ничего нет',
            phone: phoneSearch,
        }
        if(commingData.length){
            obj.text = commingData
        }
        setDataChatList([new Array(obj), ...dataChatList])
        setCount(count + 1)
    } else {
        alert(`у вас уже есть чат с номером ${phoneSearch}`)
    }
}

const handlerAxiosHandler = (sendInput) => {
    let obj = {
        from: 'client',
        message: sendInput,
        idMessage: new Date().getTime()
    }
    setAll([...all, new Array(obj)])
    setFlagLeftSec(false)
    let data = JSON.stringify({
        "chatId": `${phoneSearch}@c.us`,
        "message": `${sendInput}`
      });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
    };
    axios.request(config)
    .finally(()=>{
        setWasSend(true)
    })
    .catch((error) => {
        console.log(error);
    });
}

  return (
    <div className='ChatMain'>
        <div className="all_chats__container">
            <div className="nav">
                <AvatarMe setAboutMe={setAboutMe} setFlagLeftSec={setFlagLeftSec}></AvatarMe>
                <div className="nav_group">
                    <div className="nav_group_item">
                        <NewChat setFlagLeftSec={setFlagLeftSec} setSearchInputData={setSearchInputData} setAboutAcc={setAboutMe}/>
                    </div>
                </div>
            </div>
            <div className="search_container">
                <label htmlFor="" className='searchWindow'>
                    <AiOutlineSearch size={20} className='search_icon'/>
                    <input type="text" className="input" value={searchInput ? searchInput : ''} placeholder='поиск или новый чат' onChange={(e)=>{
                    setSearchInput(e.target.value)
                }}/>
                </label>
                <div className="sort">
                    <CgSortAz size={27} className='sort_icon'/>
                </div>
            </div>
            <div className="chat_item_container">
                {
                  dataChatList &&
                  dataChatList.map(el => el.map(el2 =>
                    <ChatListItem key={el2.id} id={el2.id} phone={el2.phone} onChangeCurrent={(e)=>setPhoneCurrent(e)}>
                        {el2.text}
                    </ChatListItem>
                    ))  
                }
            </div>
            {
                flagLeftSec ? 
                <AboutMe setFlagLeftSec={setFlagLeftSec} title={searchInputData ? 'Новый чат' : 'Профиль'}>
                    {
                    aboutMe ?           
                        <div className="avatar_block">
                            <div className="avatar">my avatar</div>
                        </div> : 
                        <div className="inputPhone">
                            <input type="tel" placeholder='телефон получателя' onChange={(e)=>{
                                setPhoneSearch(e.target.value)
                            }}/>
                            <button onClick={(e)=>{
                                let regexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
                                if(regexp.test(String(phoneSearch))){
                                    hanldeStartChat(e)
                                } else {
                                    setWisibleWarn(true)
                                }
                            }}>Начать чат</button>
                            <WarningMessage visible={visibleWarn ? true : false}>
                                Некорректный формат номера получателя
                            </WarningMessage>
                        </div> 
                    }
                </AboutMe> : null
            }
        </div>
        <div className="single_chat__container">
            <div className="nav">
                    <div className="chat_name">
                        {
                        phoneCurrent  ?
                        `чат с: ${phoneCurrent}` : null 
                        }
                    </div>
                    <LogOut></LogOut>
            </div>
            <div className="chat_window">
                {
                    startChat ? null : 
                    <div className="window_nothing">
                        <div className="nothing_container">
                            <li>Здесь пока ничего нет</li>
                            <NewChat setFlagLeftSec={setFlagLeftSec} setSearchInputData={setSearchInputData} setAboutAcc={setAboutMe}/>
                        </div>
                    </div>
                }
                {
                    all.map(el => el.map(el2 =>
                        el2.from === 'server'?
                        <ChatCommingItem key={el2.idMessage}>{el2.message}</ChatCommingItem>
                        :
                        <ChatSendItem key={el2.idMessage}>{el2.message}</ChatSendItem>
                    ))
                }
            </div>
            {
                startChat ? 
                <div className="activity_send">
                    <input className="message_window" placeholder='Введите сообщение' value={sendInput ? sendInput : ''} onChange={(e)=>{
                        setSendInput(e.target.value)
                    }}/>
                    <AiOutlineSend className={aciteSend ? "send_icon active" : "send_icon"} size={24} onClick={()=>{
                        setWasSendHandler(sendInput,phoneSearch)
                        handlerAxiosHandler(sendInput, wasSend)
                        setSendInput('')
                    }}/>
                </div> 
                : null
            }
        </div>
    </div>
  )
}

export default ChatMain