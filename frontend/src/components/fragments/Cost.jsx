import React, { useEffect, useState } from 'react'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
const Cost = ({wideBar, userData, setWideBar, setPage}) => {
  const [applianceData, setApplicanceData] = useState([])
  const [graphData, setGraphData] = useState([])
  useEffect(()=>{
    let data = JSON.parse(localStorage.getItem(`${JSON.parse(localStorage.getItem("UserBasicDetails_SEMS"))?.email}_ApplianceData`))
    setApplicanceData(data!=null?data:[])
  },[])
  useEffect(()=>{
    setGraphData(applianceData?.map((data,index)=>{
      return {id:index,
        value:data.appliancePreviousUnit,
        label:data.applianceName
      }
    }))
  },[applianceData])

  console.log(applianceData,userData)
    const mainD="ml-12 flex flex-col max-w-screen text-gray-100 items-center h-full transition-all duration-500"
  return (
    <div  className={wideBar?mainD+" blur-sm -z-10 md:filter-none md:ml-[12em]":mainD}>
      <div className=' w-full'>
        <p className=' m-10 border-red-200 border p-10 rounded-xl '>The calculation of costs is intricately tied to the data entered during the login process. Should you find it necessary to modify this data, a re-login procedure will be required. This is because the system's cost assessment hinges upon the specific details furnished during your login session. Therefore, to effect any alterations to this information, a fresh login is indispensable. This ensures that the system accurately reflects the updated data, thus providing you with precise and relevant cost calculations tailored to your current circumstances. Hence, for any adjustments or modifications to your data inputs, initiating a new login session is imperative to maintain the integrity and accuracy of the cost evaluation process within the system. </p>
      </div>
      <div className='flex flex-col md:flex-row m-10 justify-center items-center w-full flex-wrap'>
      <table className="w-full m-10 border-collapse flex-1">
  <thead>
    <tr className="bg-gray-800 text-white">
      <th className="border border-gray-600 px-4 py-2">S.No.</th>
      <th className="border border-gray-600 px-4 py-2">Appliances</th>
      <th className="border border-gray-600 px-4 py-2">Unit consumed KW/H</th>
      <th className="border border-gray-600 px-4 py-2">Total Amount</th>
    </tr>
  </thead>
  <tbody>
    {applianceData.map((data, index) => (
      <tr key={index} className={index % 2 === 0 ? "bg-gray-800" : ""}>
        <td className="border border-gray-600 px-4 py-2">{index + 1}</td>
        <td className="border border-gray-600 px-4 py-2">{data.applianceName}</td>
        <td className="border border-gray-600 px-4 py-2">{data.appliancePreviousUnit}</td>
        <td className="border border-gray-600 px-4 py-2">{data.appliancePreviousUnit * userData.charges}</td>
      </tr>
    ))}
  </tbody>
</table>

<PieChart
className=''
        series={[
              {
                arcLabel: (item) => `${item.label} (${item.value})`,
                arcLabelMinAngle: 45,
                data: graphData,
                paddingAngle:5,
                innerRadius:30,
                outerRadius:200,
                cornerRadius:5,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },

              },
              ]}
                        
            slotProps={{legend:{hidden:true}}}
            
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: 'white',
                fontSize: 14,
              },
            }}
            
            width={500}
        height={500}
        />
      </div>
    </div>
        )
}

export default Cost