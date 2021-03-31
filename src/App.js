import { useEffect, useState } from 'react'
import axios from 'axios';
import MainPage, { innaFunkcja } from './MainPage/MainPage'
import Button from './MainPage/components/button/Button'
import './App.css';



function App() {
  
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);


  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
   
	};

 
   const apiCall = async () => {
   const formData = new FormData();
   formData.append('file', selectedFile);
 
  try {
    const response = await axios.post('http://127.0.0.1:8000/files', {
      data: {
      data: formData.file
     }
    })
} catch (error) {
  console.log(error)
}
   }
  
  return (
    <div className="App">
      
    
      <input type ="file" name="file" onChange={changeHandler}/>
      {isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>		
					<p>Size in bytes: {selectedFile.size}</p>
      </div>
			) : (
        <p></p>
      )
			}
      <div>
      <Button title="Submit" onClick={apiCall}/>
      </div>


      <MainPage />
      
    </div>
  );
}

export default App;
