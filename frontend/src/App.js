import React, { useState } from 'react';
import UploadFile from './UploadFile';
import Map from './Map';
import TimestampFilter from './TimestampFilter';
import PointsList from './PointsList';
import './App.css';

function App() {
  const [positions, setPositions] = useState([]);
  const [filterInterval, setFilterInterval] = useState(30);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const handleUpload = (data) => {
    console.log("Data received in App component:", data);  // Verify data format
    setPositions(data);
  };

  const handleFilterChange = (interval) => {
    setFilterInterval(interval);
  };

  const handlePointSelect = (point) => {
    setSelectedPoint(point);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h1>Location History Map</h1>
        <UploadFile onUpload={handleUpload} />
        <TimestampFilter onFilterChange={handleFilterChange} />
        <PointsList points={positions} filterInterval={filterInterval} onSelect={handlePointSelect} selectedPoint={selectedPoint} />
      </div>
      <div className="map-container">
        {positions.length > 0 && (
          <Map
            positions={positions}
            filterInterval={filterInterval}
            selectedPoint={selectedPoint}
          />
        )}
      </div>
    </div>
  );
}

export default App;