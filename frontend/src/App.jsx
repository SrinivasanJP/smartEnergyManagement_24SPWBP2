import React, { useState } from 'react'
import Home from './components/pages/Home.jsx'
import { db } from './config/firebase.js'
import { doc, getDoc } from 'firebase/firestore'
import Login from './components/pages/Login'
import Signup from './components/pages/SignUp'
import BasicDetails from './components/pages/BasicDetails.jsx'
import { auth } from './config/firebase.js'
 function App(){
  const [page, setPage] = useState("home")
  auth.onAuthStateChanged((user)=>{
    if(user!=null && user.emailVerified){
      checkBasics()
    }
  })
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
      case "monitorPage":{
        return (<Home setPage={setPage}/>)
      }
      case "initialization":{
        return (<BasicDetails setPage={setPage}/>)
      }
    }
  }
  return (
    <div>
      {renderPage()}
    </div>
  )
}

export default App
