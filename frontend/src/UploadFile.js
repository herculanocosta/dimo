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
        console.log("Uploading file content:", content);  // Add logging for debugging
        const response = await axios.post('http://127.0.0.1:5000/upload', content);
        console.log("Response from server:", response.data);  // Add logging for debugging
        // Extract the 'data' array from the JSON response
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