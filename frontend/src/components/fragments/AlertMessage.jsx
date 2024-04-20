import React, { useEffect, useState } from 'react'

const AlertMessage = ({wideBar, setFragment,setPage}) => {
  const [alertData,setAlertData] = useState([])
  useEffect(()=>{
    setAlertData(JSON.parse(localStorage.getItem("alert")))
  },[])
  const stampToTime = (stamp) =>{
    const date = new Date(stamp);

    // Get the individual components of the date and time
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    // Construct the date and time string in the desired format
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  }
  return (
    <div className={wideBar?" ml-12 text-gray-100 md:h-full blur-sm md:filter-none md:ml-[12em]":" text-gray-100 ml-16 md:h-full"}>
      <div className='m-10 bg-slate-900 p-10 rounded-2xl text-2xl font-bold'>
        <h1>All the Previous Generated Alert messages</h1>
      </div>
      <div className='flex flex-col justify-center items-center'>
      {alertData==null?(
         <div className='flex items-center justify-center flex-col'>
         <div className='flex justify-center items-center m-32 p-10 rounded-xl bg-slate-950'>
         <h1 className='text-2xl font-bold'>No Alert messages</h1>
       </div>
      
       </div>
      ):
      (
        alertData.map((alert, index) => (
          <div key={index} className={(alert.name=="overall"?'bg-red-950':'bg-red-900') +' mt-10 rounded-2xl text-red-200 font-semibold p-10 flex justify-between md:w-[80%]'}>
            <h1>{alert.name.toUpperCase() + " Power consumption alert"}</h1>
            <h2>{stampToTime(alert.time)}</h2>
          </div>
        ))
      )}
      </div>
      
    </div>
  )
}

export default AlertMessage