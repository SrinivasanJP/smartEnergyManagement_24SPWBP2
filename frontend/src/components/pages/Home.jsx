import React, { useState } from 'react'
import Navigation from '../Navigation'
import planet from '../../assets/svgs/3dPlanet.png'
import planet2 from '../../assets/svgs/p2.png'
import woman3d from '../../assets/svgs/3dWomanLaptop.png'
const Home = ({setPage}) => {
  const spanD = 'w-2 h-2 bg-[#4D78EF] inline-block rounded-full mr-5 animate-pulse'
  const liD = ' bg-gradient-to-r  from-slate-950 px-5 py-3 rounded-2xl mt-3'
  const liED = ' bg-gradient-to-r  from-slate-950 px-5 py-3 rounded-2xl mt-3'

  const [contactData, setContactData]= useState({
    name: '',
    email: '',
    message: '',
    submitted: false,
  })
  const handleSubmit = (e)=>{
    e.preventDefault()
    setContactData({...contactData,submitted:true})
  }
  const handleChange = (e)=>{
    setContactData({...contactData,[e.target.name]:e.target.value})
  }
  return (
    <div id="home" className="mt-[66px]"
    >
      <Navigation setPage={setPage}/>
      <img src={planet} alt="" className='absolute -right-36  opacity-70 w-[80%] md:w-[50%] animate-orbit' />
      <img src={planet2} alt="" className='absolute top-0 animate-spinOrbit w-[20%]'/>
      <section className=' w-screen h-screen bg-[#0c1015] md:mt-[8em]' id='home'>
        
        <div className='text-white w-[85%] h-[80%] backdrop-blur-sm backdrop-filter bg-opacity-70 rounded-2xl mx-auto z-10 shadow-gray-700 flex justify-center sm:items-center items-start shadow-inner flex-col p-10'>
          <div className='flex flex-col md:flex-row justify-center md:items-center'>
          <h1 className='bg-[radial-gradient(138.06%_1036.51%_at_95.25%_-2.54%,_#7ED4FD_14.06%,#709DF7_51.02%,#4D78EF_79.09%)] bg-clip-text text-4xl leading-[1.2] tracking-tighter text-transparent sm:text-center sm:text-[4rem] sm:leading-[4.75rem] lg:text-left' >Welcome to <br /> <span className=' font-SpaceMono text-orange-400'>Smart</span> Enery Management System</h1>
          
              <img src={woman3d} alt="3D Woman Image" width={500} height={500} className='w-25 h-25 top-50 left-50' id="largeIMG"/>
          
          </div>
          
          <p className=' text-xl bg-clip-text bg-[radial-gradient(138.06%_1036.51%_at_95.25%_-2.54%,_#7ED4FD_14.06%,#709DF7_51.02%,#4D78EF_79.09%)] tracking-tighter text-transparent sm:text-center sm:text-[2rem] sm:leading-[4.75rem] lg:text-left'>This project leverages machine learning and time series models to predict
and analyse household energy consumption.It offers an interactive web platform revealing energy patterns, detects faulty
appliances, and sends alerts for potential overconsumption risks.The primary goal is to empower users to optimize energy usage for
sustainability and cost savings</p>
        </div>

      </section>
      
    </div>
    
  )
}

export default Home