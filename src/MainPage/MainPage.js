import { useState, useCallback } from "react";
import axios from "axios";
import Chart from './components/Chart';
import UploadForm from './components/UploadForm';
import "./MainPage.style.css";


export const MainPage = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [packetStats, setPacketStats] = useState([]);
  const [topTalkers, setTopTalkers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
      <div className="header">
        Top talkers and packet histogram in pcap
      </div>
        {topTalkers.map(topTalker => <p key={`${topTalker.ip}`}>IP address: {topTalker.ip} ----- size: {topTalker.load}</p>)}
        <Chart data={packetStats.map(mapPackets)} />
    </div>
  );
}

export default MainPage;
