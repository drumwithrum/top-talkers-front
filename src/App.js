import { useEffect, useState, useCallback  } from 'react'
import axios from 'axios';
import MainPage, { innaFunkcja } from './MainPage/MainPage'
import Button from './MainPage/components/button/Button'
import './App.css';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {
  
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
  const [packetStats,setPacketStats]=useState([]);
  const [topTalkers,setTopTalkers]=useState([]);

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);

   
	};

 
  const processFile = useCallback(async () => {
    const formData = new FormData();
    formData.append('data', selectedFile);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/files',
        formData,
        config
      );

      setPacketStats(response.data.packetStats); 
      setTopTalkers(response.data.topTalkers); 

      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  }, [selectedFile]);
  
 

  return (
    
    <div className="container">
      <div className="header">Top talkers i histogram pakietów w pliku pcap</div>
       <div className="upload">
          <div className="button">
           <Button title="Submit" onClick={processFile}/>
              </div>
              <input type ="file" name="data" onChange={changeHandler}/>
              {isFilePicked ? (
                <div>
                  	
              </div>
              ) : (
                <p></p>
              )
              }
      </div>
      
      {/* {topTalkers.map(topTalker => <p key={`${topTalker.ip}`}>{topTalker.ip}{topTalker.load}</p>)} */}

     
        <BarChart
          width={500}
          height={300}
          data={packetStats.map(packetStat => ({
            name: `${packetStat.size} ${packetStat.unit}`,
            amount: packetStat.amount
          }))}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#53c653" />
        </BarChart>
     
         


    </div>
  );
}

export default App;
