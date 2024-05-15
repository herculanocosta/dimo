import React, { useState } from 'react';

function TimestampFilter({ onFilterChange }) {
  const [interval, setInterval] = useState(30);

  const handleIntervalChange = (event) => {
    const newInterval = event.target.value;
    setInterval(newInterval);
    onFilterChange(newInterval);
  };

  return (
    <div>
      <label>
        Filter interval (minutes):
        <input
          type="number"
          value={interval}
          onChange={handleIntervalChange}
          min="1"
          max="1440"
        />
      </label>
    </div>
  );
}

export default TimestampFilter;