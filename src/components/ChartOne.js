import React from 'react';
import 'chart.js/auto';
import { Chart as ChartsJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useState, useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import '../index.css';
ChartsJS.register(ArcElement, Tooltip, Legend);

const ChartOne = () => {
    const[chartData, setChartData] = useState([]);
    const[failedData, setFailedData] = useState([]);
    const[succData, setsuccData] = useState([]);
    // Variables for chart2
    const [barData, setBarData]= useState([]);
    const[thrustSea, setThrustSea] = useState([]);
    const[infoData, setInfoData] = useState([]);
    const[thrustVac, setThrustVac] = useState([]);
    const[lineData, setLineData] = useState([]);
    const[missionInfo, setMissionInfo] = useState([]);
    

    useEffect(()=>{
        axios.get('https://api.spacexdata.com/v5/launches')
        .then((response) =>{
           let data = response.data;
           let successData = data.filter((item) => item.success === true).length;
           let failData = data.filter((item) => item.success === false).length;

           setChartData([successData,failData]);
           const successArray = [];
           const failArray = [];

            for(let i =0; i < data.length; i++){
                if(data[i].success === true){
                    successArray.push({
                    id: data[i].id,
                     success: data[i].success,  
                    });

                } else if (data[i].success = false){
                    failArray.push({
                        id: data[i].id,
                        success: data[i].success,
                    });
                }
                
            }
            
            setsuccData(successArray);
            setFailedData(failArray);


        })
        

        console.log(succData);
    },[]);
   

    // useEffect(()=>{
    //     axios.get('https://api.spacexdata.com/v4/rockets')
    //    .then((res)=>{
    //        let rockets = res.data;
    //        let rocketInfo = [];
           
    //        for(let i=0; i < rockets.length; i++){
    //             rocketInfo.push({
    //                 name: rockets[i].name,
    //                 seaThrustLevel: rockets[i].engines.thrust_sea_level.lbf,
    //                 vacuumThrustLevel: rockets[i].engines.thrust_vacuum.lbf,
    //             });
    //        }
    //        setInfoData(rocketInfo);
    //    }) 
    //    setBarData(infoData);

    // },[])

    useEffect(()=>{
        axios.get('https://api.spacexdata.com/v4/launches')
        .then((launches)=>{
            let data = launches.data;
 
            // console.log(data);
            const yearArray = [];
            for(let i= 0; i<data.length; i++){
                const year = data[i].date_local;
                let fix = year.split("-")
                let remove = fix.splice(0,1)
                let result = remove.join();
                yearArray.push(result);
               
              
            }
            // const numbers = yearArray.map(Number);
      

            const count = {};
            const newArray = yearArray;
            newArray.forEach(function (x) { count[x] = (count[x] || 0) + 1; });
            

            setLineData(count);
           
           

        })

    },[])
    console.log(lineData);

    useEffect(()=>{
        axios.get('https://api.spacexdata.com/v3/missions')
        .then((result)=>{
            let data = result.data;
      
            const infoArray = [];

            for (let i = 0; i < data.length; i++) {
               infoArray.push({
                    id: data[i].imission_id,
                    Name: data[i].mission_name,
                   descritption: data[i].description,
                    Manu: data[i].manufacturers,
                    web: data[i].website,
                });
                setMissionInfo(infoArray);
            }
  
    })
    console.log(missionInfo);
},[])



    const chartStats= {

        labels: ["success", "failures"],
        datasets: [{
            label: 'success fail for launches',
            data: chartData,
            backgroundColor: [
                '#2b2b2b',
                '#222222',

            ],
            borderColor: [
                '#2b2b2b',
                '#222222',

            ],
            borderWidth: 3
        }]
    }

    const lineChart= {

        labels: ["Launches per year"],
        datasets: [{
         
            data: lineData,
            backgroundColor: [
                '#2b2b2b',
                '#222222',

            ],
            borderColor: [
                '#2b2b2b',
                '#222222',

            ],
            borderWidth: 3
        }]
    }
    

    return (
        <>
        <div className='PanelOne'>
            <Doughnut data = {chartStats}/>
        </div>
        <div className='Paneltwo'>
       
        </div>
        <div className='PanelThree'>
        <Line data = {lineChart}/>
        </div >
        <div className='container'>

        </div>
        </>
    );
};

export default ChartOne;