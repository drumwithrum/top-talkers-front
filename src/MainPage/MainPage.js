import { useState, useCallback, useRef } from "react";
import axios from "axios";
import Chart from './components/Chart';
import UploadForm from './components/UploadForm';
import ReactToPrint from 'react-to-print';
import List from './components/List';
import Button from './components/Button';
import "./MainPage.style.css";

export const MainPage = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [packetStats, setPacketStats] = useState([]);
  const [topTalkers, setTopTalkers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const toPdfRef = useRef();
  const currentDate = new Date().toLocaleDateString


  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const mapPackets = (packet) => ({
    name: `${packet.size} ${packet.unit}`,
    amount: packet.amount,
  })

 

  const processFile = useCallback(async (event) => {
    event.preventDefault();
    setTopTalkers([]);
    setPacketStats([]);
    setErrorMessage('');
    const formData = new FormData();
    formData.append("data", selectedFile);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      setIsLoading(true)
      const response = await axios.post(
        "http://127.0.0.1:8000/files",
        formData,
        config
      );

      setPacketStats(response.data.packetStats);
      setTopTalkers(response.data.topTalkers.sort((a, b) => b.load - a.load).slice(0, 50));
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setErrorMessage(error.response.data);
    }
  }, [selectedFile]);


  return (
    <div className="container">
      <div className="form-wrapper">
        <UploadForm
          onSubmit={processFile}
          onFileChange={onFileChange}
          error={errorMessage}
          fileName={selectedFile && selectedFile.name}
          isLoading={isLoading}
        />
      </div>
      <div className="to-print-wrapper">
        <ReactToPrint
          trigger={() => <Button className="print-button">Print report</Button>}
          content={() => toPdfRef.current}
        />
        <div ref={toPdfRef} className="print-page">
          <div className="list-wrapper"> 
            <List data={topTalkers}/>
          </div>
          <Chart width={1000} data={packetStats.map(mapPackets)} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
