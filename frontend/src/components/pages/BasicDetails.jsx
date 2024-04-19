import React, { useState } from 'react';
import SettingSVG from '../../assets/svgs/personl_settings.svg'
import { auth } from '../../config/firebase';
const StudentForm = ({setPage}) => {
  const [pState, setPState] = useState(false)
  const [consumerDetails, setConsumerDetails] = useState({
   consumerNo:"",
   consumerName:"",
   nationality:"India",
   state:"Tamil nadu",
   charges:0,
   totalUnit:0,
   email:auth?.currentUser?.email,
  });
  const input_box="border-b-2 w-full text-black pl-8 p-3 mb-6  bg-stone-100 rounded-2xl shadow-sm"
const handleSubmit = async(e)=>{
    setPState(true)
    e.preventDefault()
    localStorage.setItem("UserBasicDetails_SEMS",JSON.stringify(consumerDetails))
    setPage("portalMain")

}

  return (
    <div className="bg-[#f6f6f6] flex justify-center items-center">
      <div className="bg-[#fefefe] w-[90%] my-[10%] rounded-2xl shadow-2xl flex flex-wrap md:p-10 p-2">
        <img src={SettingSVG} alt="Login Svg" className="w-1/2 p-5 hidden md:block" />
        <div className="w-full md:w-1/2 p-5 flex flex-col justify-center">
          <h1 className="antialiased font-extrabold font text-3xl text-left mb-10">Enter Basic Details</h1>
          <form className='mt-5' onSubmit={(e)=> handleSubmit(e)}>
            <label htmlFor="uname" className="absolute pt-4 pl-2"></label>
            <input type="text" name="uname" id="uname" value={consumerDetails?.consumerName} placeholder="Enter Consumer Name" required title="Username" className={input_box} onChange ={(e) => setConsumerDetails({...consumerDetails, consumerName:e.target.value})}/>
            <label htmlFor="conNo" className="absolute pt-4 pl-2"></label>
            <input type="number" name="conNo" id="conNo" placeholder="Enter Consumer No" min={0} required title="Consumer no" className={input_box} value={consumerDetails?.consumerNo} onChange ={(e) => setConsumerDetails({...consumerDetails, consumerNo:e.target.value})}/>
            <input type="text" 
            name="nat" 
            id="nat" 
            placeholder="Enter Nationality" 
            required
            value={consumerDetails.nationality}
            title="nat" 
            className={input_box} 
            onChange={(e) => setConsumerDetails({...consumerDetails, nationality:e.target.value})}/>
            <input type="text" 
            name="state" 
            id="state" 
            placeholder="Enter State" 
            required
            value={consumerDetails.state}
            title="state" 
            className={input_box} 
            onChange={(e) => setConsumerDetails({...consumerDetails, state:e.target.value})}/>
            <input type="number" 
            name="charges" 
            id="charges" 
            placeholder="Enter your state charge per unit" 
            required 
            title="charges" 
            className={input_box} 
            onChange={(e) => setConsumerDetails({...consumerDetails, charges:e.target.value})}/>
            
            <input type="number"  
            name="preUnit" 
            id="preUnit" 
            placeholder="Previous Total Unit" 
            required 
            title="unit" 
            className={input_box} 
            onChange={(e) => setConsumerDetails({...consumerDetails, totalUnit:e.target.value})}/>
            <input type="email" 
            name="email" 
            id="email" 
            placeholder="Enter your email"
            value={consumerDetails.email} 
            required 
            title="email" 
            className={input_box} 
            onChange={(e) => setConsumerDetails({...consumerDetails, email:e.target.value})}/>
    
            
           
            
            <button className="inline-flex items-center px-4 justify-center py-2 mt-5 font-bold leading-6 text-sm shadow rounded-md text-white bg-cyan-500 min-w-[7em] transition ease-in-out duration-150">
            <svg className={pState?"animate-spin -ml-1 mr-3 h-5 w-5 text-white":"hidden"} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>{pState?"Processing...":"Submit"}
              </button>
          </form>
        </div>
      </div>
    </div>
  )
};

export default StudentForm;
