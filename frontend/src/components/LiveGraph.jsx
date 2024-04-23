import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { ToastContainer, toast,Bounce } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const LiveGraph = ({on,height=350,className="overall"}) => {
  const [series, setSeries] = useState([{ data: [] }]); // Initialize series with an empty array
  const [options] = useState({
    chart: {
      id: 'realtime',
      height: height,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    markers: {
      size: 0
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      max: 100
    },
    legend: {
      show: false
    },
  });
  const [recipient, setRecipient] = useState(JSON.parse(localStorage.getItem("UserBasicDetails_SEMS"))?.email);
  const [subject, setSubject] = useState(`Alert: ${className} High electricity consumption`);
  const [body, setBody] = useState(`Your ${className} electricity consumption is more than usual`);
  const sendEmail = async () => {
    try {
      await axios.post('http://localhost:3001/send-email', { recipient, subject, body });
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      console.log('Failed to send email.');
    }
  };
    
  useEffect(() => {
    let interval;
    if (on) {
      interval = setInterval(() => {
        let rand = Math.floor(Math.random() * 100)
        console.log(rand)
        if(rand>95){
          let preAlert =  JSON.parse(localStorage.getItem(`${JSON.parse(localStorage.getItem("UserBasicDetails_SEMS"))?.email}_alert`))
          if(preAlert==null){
            localStorage.setItem(`${JSON.parse(localStorage.getItem("UserBasicDetails_SEMS"))?.email}_alert`,JSON.stringify([{name:className, time:Date.now()}]))
          }else{
            preAlert.push({name:className,time:Date.now()})
            localStorage.setItem(`${JSON.parse(localStorage.getItem("UserBasicDetails_SEMS"))?.email}_alert`,JSON.stringify(preAlert))
          }
          toast(`Alert: Your ${className} Consumes more...`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
          sendEmail()
        }
        
        const newDataPoint = {
          x: new Date().getTime(),
          y: rand
        };
        setSeries(prevSeries => [{ data: [...prevSeries[0].data, newDataPoint] }]);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [on]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="line" height={height} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default LiveGraph;
