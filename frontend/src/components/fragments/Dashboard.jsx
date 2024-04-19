import React, { useState, useEffect } from 'react'
import TypeWriter from '../TypeWriter'

import ToggleButton from 'react-toggle-button'
import { auth, db } from '../../config/firebase'
import { collection, getDocs } from 'firebase/firestore'
import LiveGraph from "../LiveGraph"
import { FaCircle, FaThumbsUp } from 'react-icons/fa'
import { BarChart } from '@mui/x-charts/BarChart';
import { BsFillTriangleFill } from 'react-icons/bs'

function Dashboard({wideBar, setFragment,setPage}) {
  const [toggle,setToggle] = useState(false)
  const [selectSlot,setSelectSlot] = useState(0) 
  const [userData,setUserData] = useState()
  const [applianceData, setApplicanceData] = useState([])
  const [applianceGraph,setApplicanceGraph] = useState([]);
  useEffect(()=>{
    setUserData(JSON.parse(localStorage.getItem("UserBasicDetails_SEMS")))
  },[])
  useEffect(()=>{
    let data = JSON.parse(localStorage.getItem("ApplianceData"))
    setApplicanceData(data!=null?data:[])
  },[])

//   useEffect(()=>{
//     (async ()=>{
//         const courseRef = collection(db, "courses")
//         const collectionSnap = await getDocs(courseRef)
//         setCoursesCollections([])
//         collectionSnap.forEach((doc)=>{
//           const newColl = {...doc.data(), id: doc.id}
//           setCoursesCollections(old=>[...old, newColl])
//         })
//     })()
// }, [])

const chartSetting = {
  xAxis: [
    {
      label: 'consumption (KW/H)',
    },
  ],
  width: 500,
  height: 400,
};

const valueFormatter = (value) => `${value}mm`;

const pData = [2400, 1398];
const xLabels = [
  'Mar',
  'Apr',
];
  return (
    <div className={wideBar?" ml-12 text-gray-100 md:h-full blur-sm md:filter-none md:ml-[12em]":" text-gray-100 ml-16 md:h-full"}>
      <div id='section1' className='m-10'>
        {
          userData?.consumerName?<TypeWriter userName={userData?.consumerName}/>:<></>
        }
        
      </div>
      <main>
        <div className=' rounded-xl'>
          <div className=' flex justify-between mx-10'>
            <div className='flex justify-center items-center'>
              {
                toggle && <FaCircle color='red' className='mx-1 animate-pulse '/>
              }
            
            <h1 className=' text-2xl'>Live Electricity Monitor</h1>
            </div>
          
          <ToggleButton
            value={toggle}
            onToggle={(t) => {
              setToggle(!t)
            }} />
          </div>
          <LiveGraph on={toggle}/>
        </div>
        <div className='m-10'>
        <div className=''>
          <ul className='inline-flex bg-slate-800 p-2 rounded-3xl'>
            <li className={selectSlot==0?' cursor-pointer bg-gray-900 p-2 rounded-2xl':" cursor-pointer p-2 rounded-2xl"} onClick={()=>setSelectSlot(0)}>Today</li>
            <li className={selectSlot==1?'cursor-pointer bg-gray-900 p-2 rounded-2xl':"cursor-pointer p-2 rounded-2xl"} onClick={()=>setSelectSlot(1)}>This Week</li>
            <li className={selectSlot==2?'cursor-pointer bg-gray-900 p-2 rounded-2xl':"cursor-pointer p-2 rounded-2xl"} onClick={()=>setSelectSlot(2)}>This Month</li>
          </ul>
        </div>
        <div className='flex lg:inline-flex lg:w-[48%]  bg-slate-800 flex-col rounded-xl mt-10 mr-4'>
          <h1 className='p-3 text-xl font-bold'>Change In Cost</h1>
          <hr></hr>
          <div className='flex items-center justify-center '>
          <BarChart
            width={500}
            height={400}
            series={[
              { data: pData, id: 'pvId' },
            ]}
            xAxis={[{ data: xLabels, scaleType: 'band' }]}
          />
          <div className='flex flex-col justify-center items-center p-5'>
            <div className='flex justify-center items-center'>
            <BsFillTriangleFill color='red' className=' rotate-180 m-3' />
            <h1 className=' font-semibold'>5.42%</h1>
            </div>
            <h1 className=' text-center'>DECREASE IN COST</h1>
           
            
          </div>
          </div>
       
        </div>
        <div className='flex lg:inline-flex lg:w-[48%]  bg-slate-800 flex-col rounded-xl mt-10  '>
          <h1 className='p-3 text-xl font-bold'>Active Appliances</h1>
          <hr></hr>
          <div className='flex items-center justify-center '>
          <BarChart
            dataset={applianceData}
            yAxis={[{ scaleType: 'band', dataKey: 'applianceName' }]}
            series={[{ dataKey: 'appliancePreviousUnit',valueFormatter }]}
            layout="horizontal"
            {...chartSetting}
          />
          </div>
       
        </div>
        </div>

      </main>
      <footer className=' flex justify-center items-center'>
        <button className=' bg-slate-800 px-24 py-4 font-bold rounded-2xl m-10' onClick={async()=>{
          localStorage.setItem("isLoggedIn",false)
          await auth.signOut()
          setPage("home")
        }}>Logout</button>
      </footer>
      
      
    </div>
  )
}

export default Dashboard