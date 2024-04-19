import React, { useState, useEffect } from 'react'
import { auth, db } from '../../config/firebase'
import SideBar from '../SideBar'
import Dashboard from '../fragments/Dashboard'
import { doc, getDoc } from 'firebase/firestore'
import Cost from '../fragments/Cost'
import Appliances from '../fragments/Appliances'
import AlertMessage from '../fragments/AlertMessage'



function PortalMain( {setPage}) {
    const [fragment,setFragment] = useState(["dashboard"]);
    const [wideBar, setWideBar] = useState(true);
    const [uID, setUID] = useState("");
    const [userData, setUserData] = useState({})
  
    useEffect(()=>{
      setUserData(JSON.parse(localStorage.getItem("UserBasicDetails_SEMS")))
    },[])
    // useEffect(()=>{
    // (async()=>{
    //   try{
    //   const docRef = doc(db, "user", uID);
    //   const docSnap = await getDoc(docRef);
    //   if(docSnap.exists()){
    //     setUserData(docSnap.data());
    //   }
    //   else{
    //     console.log("NO doc found");
    //   }
    // }catch(err){
    //   console.log("UID not loaded")
    // }
    // })();
    // },[uID]);
    // useEffect(()=>{
    //   auth.onAuthStateChanged((user) =>{
    //     if(user){
    //       setUID(user.uid)
    //     }else{
    //       console.log("Auth error")
    //     }
    //   })
    // }, []);
    const renderFragment = () => {
        switch (fragment[0]) {
          case "dashboard":
            return <Dashboard wideBar={wideBar} setFragment={setFragment} setPage={setPage}/>;
          case "cost":
            return <Cost wideBar={wideBar} userData={userData} setWideBar={setWideBar} setPage={setPage}/>;
          case "appliances":
            return <Appliances wideBar={wideBar} setFragment={setFragment}/>;
          case "alert messages":
            return <AlertMessage wideBar={wideBar} setFragment={setFragment}/>
          default:
            console.log("no fragment")
        }
      };
  return (
    <div>
        <SideBar  wideBar ={wideBar} setWideBar={setWideBar}  setFragment={setFragment} />
        {renderFragment()}
    </div>
  )
}

export default PortalMain