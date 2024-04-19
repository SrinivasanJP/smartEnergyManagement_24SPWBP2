import React, { useEffect, useState } from 'react'
import Home from './components/pages/Home.jsx'
import { db } from './config/firebase.js'
import { doc, getDoc } from 'firebase/firestore'
import Login from './components/pages/Login'
import Signup from './components/pages/SignUp'
import BasicDetails from './components/pages/BasicDetails.jsx'
import { auth } from './config/firebase.js'
import PortalMain from './components/pages/PortalMain.jsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { ToastContainer } from 'react-toastify'
 function App(){
  const [page, setPage] = useState("home")
  useEffect(()=>{
    if(localStorage.getItem("isLoggedIn")==="true"){
      console.log("lksdjfkjkld")
      setPage("portalMain")
    }
    console.log(localStorage.getItem("isLoggedIn"))
  },[])
  const checkBasics = () =>{
      setPage("initialization")
  }
  const renderPage = ()=>{
    switch (page){
      case "home":{
        return (<Home setPage={setPage}/>)
      }
      case "login":{
        return (<Login setPage={setPage} checkBasics={checkBasics}/>)
      }
      case "signup":{
        return (<Signup setPage={setPage}/>)
      }
      case "portalMain":{
        return (<PortalMain setPage={setPage}/>)
      }
      case "initialization":{
        return (<BasicDetails setPage={setPage}/>)
      }
    }
  }
  
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
      <ToastContainer />
      {renderPage()}
    </div>
    </ThemeProvider>
    
  )
}

export default App
