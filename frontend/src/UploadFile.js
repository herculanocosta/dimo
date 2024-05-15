import React, { useState } from 'react';
import axios from 'axios';

function UploadFile({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = JSON.parse(e.target.result);
      try {
        console.log("Uploading file content:", content);
        const response = await axios.post(`${process.env.https://dimo-1.onrender.com/upload`, content);
        console.log("Response from server:", response.data);
        onUpload(response.data.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadFile;