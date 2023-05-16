import React from 'react'
import { useDispatch } from 'react-redux'
import { setAuthDataID, setAuthDataToken, setFlagAuth } from '../../store/reducers/authSlice'
import { useState } from 'react'
import '../../Styles/nonAuth.scss'
import { WarningMessage } from '../../Helpers/WarningMessage'
import '../../Styles/helpers.scss'
import axios from 'axios'

const HomePage = () => {

const dispatch = useDispatch() 
const [modal,setModal] = useState(false)  
const [warnMessage, setWarnMeassage] = useState(false)
const [checker,setChecker] = useState(false)

const [idInstance,SetIdInstance] = useState('')
const [apiTokenInstance,SetApiTokenInstance] = useState('')

const [nameInfo, setNameInfo] = useState('')

/*server auth*/
const [authData, setAuthData] = useState(false)
const [warningAuth, setWarningAuth] = useState(false)

const submitHandler = (e) => {
  e.preventDefault()
  setChecker(true)
  if(idInstance.trim() && apiTokenInstance.trim()){
    setNameInfo(idInstance)
    setModal(true)
    setChecker(false)
    SetIdInstance('')
    SetApiTokenInstance('')
    submitAxiosCheck()
  } else {
    setWarnMeassage(true)
    setTimeout(() => {
      setWarnMeassage(false)
    }, 3500);
  }
}

const submitAxiosCheck = () => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
        headers: { }
      };
      axios.request(config)
      .then((response) => {
        const data = JSON.stringify(response.data)
        if(response.data.stateInstance === 'authorized'){
          dispatch(setFlagAuth(true))
          dispatch(setAuthDataID(idInstance))
          dispatch(setAuthDataToken(apiTokenInstance))
          setAuthData(true)
        } else{
          setAuthData(false)
          setWarnMeassage(true)
        }
      })
      .catch((error) => {
        console.log(error);
        setWarnMeassage(true)
      });
}

  return (
    <div style={{display:"flex", alignItems:"flex-start", justifyContent: "center"}} className='container_home'>
      <section>
      <form>
          <legend>Авторизация</legend>
          <label>idInstance<span>*</span></label>
          <input type="text" name="idInstance" value={idInstance} className={!idInstance.trim().length && checker ? "input error" : "input"} onChange={(e)=>{
              SetIdInstance(e.target.value)
          }}/>
          <label>apiTokenInstance<span>*</span></label>
          <input type="e-mail" name="apiTokenInstance" value={apiTokenInstance} className={!apiTokenInstance.trim().length && checker ? "input error" : "input"} onChange={(e)=>{
            SetApiTokenInstance(e.target.value)
          }}/>
          <div className="btn_form">
            <button onClick={(e)=>{
              submitHandler(e)
            }}>Авторизоваться</button>
          </div>
      </form>
      </section>
      <div className='warn'>
      {
            warnMessage ? 
            <WarningMessage visible={warnMessage ? true : false}>
                {
                    !warningAuth ? "Вы не авторизованы либо таких данных не заргистрировано" 
                    :
                    "Заполните все обязательные поля"
                }
            </WarningMessage>
            :
            null
      }
      </div>
    </div>
  )
}

export default HomePage