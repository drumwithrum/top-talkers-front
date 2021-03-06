import { useState, useCallback, useRef } from 'react';
import moment from 'moment';
import axios from 'axios';
import scroll from 'scroll-to-element';
import Chart from './components/Chart';
import UploadForm from './components/UploadForm';
import ReactToPrint from 'react-to-print';
import List from './components/List';
import Button from './components/Button';
import './MainPage.style.css';

export const MainPage = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [packetStats, setPacketStats] = useState([]);
  const [topTalkers, setTopTalkers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentDate, setCurrentDate] = useState();
  const toPdfRef = useRef();

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const mapPackets = (packet) => ({
    name: `${packet.size} ${packet.unit}`,
    amount: packet.amount,
  });
  const processFile = useCallback(
    async (event) => {
      event.preventDefault();
      setTopTalkers([]);
      setPacketStats([]);
      setErrorMessage('');
      const formData = new FormData();
      formData.append('data', selectedFile);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      try {
        setIsLoading(true);
        const response = await axios.post(
          'http://127.0.0.1:8000/files',
          formData,
          config
        );

        setPacketStats(response.data.packetStats);
        setTopTalkers(
          response.data.topTalkers.sort((a, b) => b.load - a.load).slice(0, 50)
        );
        setCurrentDate(moment());
        scroll('#to-print-wrapper');
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (error.response && error.response.data) {
          return setErrorMessage(error.response.data);
        }
        setErrorMessage(
          'Something went wrong, server could not process your file'
        );
      }
    },
    [selectedFile]
  );

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
      {packetStats.length ? (
        <div className="spacing-bottom-big">
          <div id="to-print-wrapper" className="to-print-wrapper">
            <ReactToPrint
              trigger={() => (
                <Button className="print-button">Print report</Button>
              )}
              content={() => toPdfRef.current}
            />
            <div ref={toPdfRef} className="print-page">
              <h2 className="print-page__title">{`Report from file: ${selectedFile && selectedFile.name}`}</h2>
              <p className="print-page__subtitle">Date: <strong>{`${currentDate && currentDate.format('YYYY-MM-DD')}`}</strong></p>
              <p className="print-page__subtitle">Hour: <strong>{`${currentDate && currentDate.format('HH:mm')}`}</strong></p>
              <div className="list-wrapper">
                <List data={topTalkers} />
              </div>
              <Chart width={1000} data={packetStats.map(mapPackets)} />
              <p className="print-page__footer">Generated by Top Talkers app</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MainPage;
