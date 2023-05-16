import React from 'react'
import {Outlet} from "react-router-dom"
import styled from 'styled-components'
import Header from '../Header/Header'


const StyledMain = styled.main`
    width:100%;
    height:100vh;
    margin-top: 0px;
    display: flex;
    background-color: rgb(224,224,221);
    justify-content: center;
`

const StyledMainContainer = styled.div`
    width:1400px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
`


const Layout = () => {
  return (
    <>
      <Header></Header>
      <StyledMain>
          <StyledMainContainer className="StyledMainContainer">
              <Outlet/>   
          </StyledMainContainer>
      </StyledMain>
    </>
  )
}

export default Layout