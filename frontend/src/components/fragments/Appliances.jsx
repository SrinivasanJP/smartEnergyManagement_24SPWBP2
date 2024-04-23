import React, { useEffect, useState } from 'react'
import LiveGraph from '../LiveGraph';
import ToggleButton from 'react-toggle-button'

const Appliances = ({wideBar, setFragment,setPage}) => {
  const [applianceData, setApplicanceData] = useState([])
  const [isClickedForm, setIsClickedForm] = useState(false);
  const [formData,setFormData] = useState({
    applianceName:"",
    appliancePreviousUnit:"",
    minNormalRange: "",
    maxNormalRange:"",
    monitor:false
  })
  useEffect(()=>{
    let data = JSON.parse(localStorage.getItem(`${JSON.parse(localStorage.getItem("UserBasicDetails_SEMS"))?.email}_ApplianceData`))
    setApplicanceData(data!=null?data:[])
  },[isClickedForm])
  const handleFormSubmit = (e)=>{
    e.preventDefault()
    const preJson = JSON.parse(localStorage.getItem(`${JSON.parse(localStorage.getItem("UserBasicDetails_SEMS"))?.email}_ApplianceData`))
    if(preJson == null) {
      let newData = []
      newData.push(formData)
      localStorage.setItem(`${JSON.parse(localStorage.getItem("UserBasicDetails_SEMS"))?.email}_ApplianceData`,JSON.stringify(newData))
    }
    else{
      preJson.push(formData)
      localStorage.setItem(`${JSON.parse(localStorage.getItem("UserBasicDetails_SEMS"))?.email}_ApplianceData`,JSON.stringify(preJson))
      console.log(preJson)
    }
    setIsClickedForm(false)
  }
  const input_box = "w-full mt-5 text-black p-3 rounded-xl";
  return (
    <div className={wideBar?" ml-12 text-gray-100 md:h-full blur-sm md:filter-none md:ml-[12em]":" text-gray-100 ml-16 md:h-full"}>
      {applianceData.length == 0 ? (
      
      <div className='flex items-center justify-center flex-col'>
        <div className='flex justify-center items-center m-32 p-10 rounded-xl bg-slate-950'>
        <h1 className='text-2xl font-bold'>No appliance added</h1>
       
      </div>
      <div className='flex flex-col w-full p-10 justify-center items-center'>
      <button className=' bg-slate-950 px-10 py-5 rounded-xl md:w-[50%]' onClick={()=>setIsClickedForm(!isClickedForm)}>Add Appliance</button>
      {isClickedForm && (<form className='w-full p-10 bg-slate-950 m-10 rounded-xl flex items-center justify-center flex-col' onSubmit={(e)=>handleFormSubmit(e)}>
      <input type="text" name="uname" id="uname" value={formData?.applianceName} placeholder="Enter Consumer Name" required title="Username" className={input_box} onChange ={(e) => setFormData({...formData, applianceName:e.target.value})}/>
      <input type='number' required min={0} className='w-full mt-5 text-black p-3 rounded-xl' value={formData?.appliancePreviousUnit} onChange={(e)=>setFormData({...formData,appliancePreviousUnit:e.target.value})} placeholder='Enter appliance Previous unit '/>
      <input type='number' required min={0} className='w-full mt-5 text-black p-3 rounded-xl' value={formData?.minNormalRange} onChange={(e)=>setFormData({...formData,minNormalRange:e.target.value})} placeholder='Minimum unit range'/>
      <input type='number' required min={0} className='w-full mt-5 text-black p-3 rounded-xl' value={formData?.maxNormalRange} onChange={(e)=>setFormData({...formData,maxNormalRange:e.target.value})} placeholder='Maximum unit range'/>
      <input value={"Submit"} type='submit' className='bg-white text-black px-10 py-2 rounded-xl text-xl font-semibold mt-10 '  />

    </form>)}
    </div>
      </div>
      ):(
        <div>
          {applianceData?.map((item,index)=>(
            <div className='m-10 bg-gray-900 p-10 rounded-xl flex flex-col'>
              <div className='flex justify-between'>
              <h1>{item?.applianceName}</h1>
              <div className='flex gap-3'>
                <h2>Turn on Monitor : </h2>
              <ToggleButton
            value={item?.monitor}
            onToggle={(t) => {
              let updatedApplianceData = [...applianceData];
    updatedApplianceData[index].monitor = !t;
              
    setApplicanceData(updatedApplianceData);
            }} />

              </div>
              
              </div>
              <LiveGraph on={item?.monitor} className={item?.applianceName}/>
            </div>
          ))}


<div className='flex flex-col w-full p-10 justify-center items-center'>
      <button className=' bg-slate-950 px-10 py-5 rounded-xl md:w-[50%]' onClick={()=>setIsClickedForm(!isClickedForm)}>Add Appliance</button>
      {isClickedForm && (<form className='w-full p-10 bg-slate-950 m-10 rounded-xl flex items-center justify-center flex-col' onSubmit={(e)=>handleFormSubmit(e)}>
      <input type="text" name="uname" id="uname" value={formData?.applianceName} placeholder="Enter Consumer Name" required title="Username" className={input_box} onChange ={(e) => setFormData({...formData, applianceName:e.target.value})}/>
      <input type='number' required min={0} className='w-full mt-5 text-black p-3 rounded-xl' value={formData?.appliancePreviousUnit} onChange={(e)=>setFormData({...formData,appliancePreviousUnit:e.target.value})} placeholder='Enter appliance Previous unit '/>
      <input type='number' required min={0} className='w-full mt-5 text-black p-3 rounded-xl' value={formData?.minNormalRange} onChange={(e)=>setFormData({...formData,minNormalRange:e.target.value})} placeholder='Minimum unit range'/>
      <input type='number' required min={0} className='w-full mt-5 text-black p-3 rounded-xl' value={formData?.maxNormalRange} onChange={(e)=>setFormData({...formData,maxNormalRange:e.target.value})} placeholder='Maximum unit range'/>
      <input value={"Submit"} type='submit' className='bg-white text-black px-10 py-2 rounded-xl text-xl font-semibold mt-10 '  />

    </form>)}
    </div>

        </div>
      )}
    </div>
  )
}

export default Appliances