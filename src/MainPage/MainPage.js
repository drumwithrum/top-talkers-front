import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Button from './components/Button';
import "./MainPage.style.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MainPage = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [packetStats, setPacketStats] = useState([]);
  const [topTalkers, setTopTalkers] = useState([]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const processFile = useCallback(async () => {
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
    } catch (error) {
      //przydaloby sie cos wyswietlic jakby sie wywalilo 
      console.log(error);
    }
  }, [selectedFile]);

  return (
    <div className="container">
      <div className="header">
        Top talkers i histogram pakietów w pliku pcap
      </div>
      {/* opakowałbym to w <form> + przeniósł do komponentu UploadForm na przykład */}
      <div className="upload">
        <div className="button">
          <Button title="Submit" onClick={processFile} />
        </div>
        <input type="file" name="data" onChange={changeHandler} />
      </div>

      {/* {topTalkers.map(topTalker => <p key={`${topTalker.ip}`}>{topTalker.ip}{topTalker.load}</p>)} */}

      {/* Na to osobny komponent w komponentach o nazwie np Chart albo Graph, gdzie po prostu przekazesz data */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={400}
          data={packetStats.map((packetStat) => ({
            name: `${packetStat.size} ${packetStat.unit}`,
            amount: packetStat.amount,
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
          <Bar dataKey="amount" fill="#53c653" name="Amount of packets" minPointSize={5} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MainPage;
