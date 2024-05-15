import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import moment from 'moment';

// Define a custom icon
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function CenterMap({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);

  return null;
}

function Map({ positions = [], filterInterval, selectedPoint }) {
  const [filteredPositions, setFilteredPositions] = useState([]);

  useEffect(() => {
    let lastTimestamp = null;
    const sortedPositions = positions.sort((a, b) => new Date(a.data.timestamp) - new Date(b.data.timestamp));

    const filtered = sortedPositions.filter(pos => {
      const currentTimestamp = moment(pos.data.timestamp);
      if (!lastTimestamp || currentTimestamp.diff(lastTimestamp, 'minutes') >= filterInterval) {
        lastTimestamp = currentTimestamp;
        return true;
      }
      return false;
    });

    setFilteredPositions(filtered);
  }, [positions, filterInterval]);

  const polyline = filteredPositions.map(pos => [
    parseFloat(pos.data.latitude.toFixed(6)), 
    parseFloat(pos.data.longitude.toFixed(6))
  ]);

  // Center map on the selected point if available, otherwise center on the first position
  const center = selectedPoint ? [
    parseFloat(selectedPoint.data.latitude.toFixed(6)), 
    parseFloat(selectedPoint.data.longitude.toFixed(6))
  ] : (polyline.length > 0 ? polyline[0] : [51.505, -0.09]);

  const mapboxAccessToken = 'pk.eyJ1IjoiaGVyY3VsYW5vMTciLCJhIjoiY2x3OGJzaHNvMjZpczJrcGhmaGhueGlrcCJ9.gFmU8XewL9vICGjvP9vsVQ';  // Replace with your Mapbox access token

  return (
    <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token=${mapboxAccessToken}`}
        attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
      />
      <Polyline positions={polyline} color="blue" />
      {selectedPoint && (
        <Marker
          position={[
            parseFloat(selectedPoint.data.latitude.toFixed(6)), 
            parseFloat(selectedPoint.data.longitude.toFixed(6))
          ]}
          icon={customIcon}
        >
          <Popup>
            {`Timestamp: ${selectedPoint.data.timestamp}`}
          </Popup>
        </Marker>
      )}
      <CenterMap center={center} />
    </MapContainer>
  );
}

export default Map;