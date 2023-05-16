import React from 'react'
import {FiLogOut} from 'react-icons/fi'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setAuthDataID, setAuthDataToken, setFlagAuth } from '../../store/reducers/authSlice'

const LogOut = () => {

    const dispatch = useDispatch();

    const flag = useSelector(state => state.flagSlice.flagAuth)   
    const idInstance = useSelector(state => state.flagSlice.IdInstance)
    const ApiTokenInstance = useSelector(state => state.flagSlice.ApiTokenInstance)
    
    const logOutHanlder = () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.green-api.com/waInstance${idInstance}/logout/${ApiTokenInstance}`,
        headers: { }
      };
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if(response.data.isLogout === true){
            dispatch(setFlagAuth(false))
        } 
      })
      .finally(()=>{
        dispatch(setAuthDataID(idInstance))
        dispatch(setAuthDataToken(ApiTokenInstance))
      })
      .catch((error) => {
        console.log(error);
      });
    }

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
    {
        flag ? 
        <div className="logOut" onClick={logOutHanlder}>
          <FiLogOut size={30} className='logOut_icon'/>
          разлогинить instance
        </div> : null
    }
    </div>
  )
}

export default LogOut