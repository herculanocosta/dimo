import React from 'react';
import './PointsList.css'; // Add a CSS file for styling

function PointsList({ points, filterInterval, onSelect, selectedPoint }) {
  const filteredPoints = [];
  let lastTimestamp = null;

  points.sort((a, b) => new Date(a.data.timestamp) - new Date(b.data.timestamp)).forEach(point => {
    const currentTimestamp = new Date(point.data.timestamp);
    if (!lastTimestamp || (currentTimestamp - lastTimestamp) / (1000 * 60) >= filterInterval) {
      lastTimestamp = currentTimestamp;
      filteredPoints.push(point);
    }
  });

  return (
    <div className="points-list">
      <h2>Points List</h2>
      <ul>
        {filteredPoints.map((point, idx) => (
          <li
            key={idx}
            onClick={() => onSelect(point)}
            className={`points-list-item ${selectedPoint && selectedPoint.id === point.id ? 'active' : ''}`}
          >
            {new Date(point.data.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PointsList;