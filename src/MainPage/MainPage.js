import { useState, useCallback } from "react";
import axios from "axios";
import Chart from './components/Chart';
import UploadForm from './components/UploadForm';
import "./MainPage.style.css";


export const MainPage = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [packetStats, setPacketStats] = useState([]);
  const [topTalkers, setTopTalkers] = useState([]);
 // const [errorMessage, setErrorMessage] = useState('');



 const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

 const processFile = useCallback(async (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("data", selectedFile);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/files",
        formData,
        config
      );
      setPacketStats(response.data.packetStats);
      setTopTalkers(response.data.topTalkers);
      
      console.log(packetStats);
      console.log(response);
      
    } catch (error) {
      alert(error.response.data);
    }
  }, [selectedFile]);

 

  return (
    <div className="container">
      <div className="header">
      Top talkers and packet histogram in pcap
      </div>
      <UploadForm processFile={processFile} changeHandler={changeHandler}/>
       {topTalkers.map(topTalker => <p key={`${topTalker.ip}`}>IP address: {topTalker.ip} ----- size: {topTalker.load}</p>)}
    
      <Chart data = {packetStats.map((packetStat) => ({
            name: `${packetStat.size} ${packetStat.unit}`,
            amount: packetStat.amount,
          }))}/>

    </div>
  );
}

export default MainPage;
