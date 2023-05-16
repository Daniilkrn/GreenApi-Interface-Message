import './App.css';
import {HashRouter, Route, Routes} from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx';
import NFP from './Helpers/NFP.jsx';
import ChatMain from './Components/ChatMain/ChatMain.jsx';
import { useState } from 'react';
import NonAuth from './Components/Layout/NonAuth.jsx';
import HomePage from './Components/HomePage/HomePage.jsx';
import { useSelector } from 'react-redux';
import React from 'react';

function App() {
  const flag = useSelector(state => state.flagSlice.flagAuth)   
  const [isAuth, setIsAuth] = useState(flag)
 
  React.useEffect(()=>{
    setIsAuth(flag)
  },[flag])

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          {
            isAuth ?
            <Route path='/' element={<Layout/>}>
              <Route exact path='/' element={<ChatMain/>}></Route>
              <Route path='*' element={<NFP/>}></Route>
            </Route> :
            <Route path='/' element={<NonAuth/>}>
              <Route exact path='/' element={<HomePage/>}></Route>
              <Route path='*' element={<NFP/>}></Route>
            </Route>
          } 
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
