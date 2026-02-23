import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import markerIcon from './UlapMarker.png';
import { transformedData } from './MapSetting';
import './App.css';
import Modal from './Modal'; // Import the Modal component

const data = transformedData().sort((a, b) => a.Sub_title.localeCompare(b.Sub_title)); // Sort data alphabetically

const MapComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const mapInstance = L.map('map').setView([16.714983, 121.553719], 8);
    setMap(mapInstance);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance);

    const customIcon = L.icon({
      iconUrl: markerIcon,
      iconSize: [30, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });

    const createMarker = (latitude, longitude, item) => {
      if (latitude && longitude) {
        const marker = L.marker([latitude, longitude], { icon: customIcon });
        marker.on('click', () => {
          setSelectedLocation(item);
          setModalIsOpen(true);
        });
        return marker;
      }
      return null;
    };

    const markersCluster = L.markerClusterGroup({
      iconCreateFunction: function (cluster) {
        return L.divIcon({
          html: `<div style="position: relative; display: inline-block;">
                   <img src="${markerIcon}" style="width: 30px; height: 41px;">
                   <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: black; font-size: 12px;">
                     ${cluster.getChildCount()}
                   </span>
                 </div>`,
          className: 'custom-cluster-icon'
        });
      }
    });

    const allMarkers = data.map(item => {
      const { latitude, longitude } = item;
      const marker = createMarker(latitude, longitude, item);
      if (marker) {
        markersCluster.addLayer(marker);
        item.marker = marker;
      }
      return marker;
    });

    setMarkers(allMarkers);
    mapInstance.addLayer(markersCluster);

  }, []);

  const handleLocationChange = (event) => {
    const selectedSubtitle = event.target.value;
    if (selectedSubtitle === "All") {
      setSelectedLocation(null);
      markers.forEach(marker => marker && marker.addTo(map));
      map.setView([12.8797, 121.774], 6);
    } else {
      const location = data.find(item => item.Sub_title === selectedSubtitle);
      setSelectedLocation(location);
      map.setView([location.latitude, location.longitude], 12);
      markers.forEach(marker => marker && marker.removeFrom(map));
      location.marker && location.marker.addTo(map);
    }
  };

  return (
    <div className="map-container">
      <div className="sidebar">
        <select onChange={handleLocationChange} className="location-select">
          <option value="All">All</option>
          {data.map(item => (
            <option key={item.Sub_title} value={item.Sub_title}>{item.Sub_title}</option>
          ))}
        </select>
        {selectedLocation ? (
          <div className="location-details">
            <h3>{selectedLocation.Sub_title}</h3>
            <p>Latitude: {selectedLocation.latitude}</p>
            <p>Longitude: {selectedLocation.longitude}</p>
            {/* Display other data related to the selected location */}
            {/* Example: <p>Total Customers: {selectedLocation.Total_customer}</p> */}
          </div>
        ) : (
          <div className="all-locations">
            {data.map(location => (
              <div key={location.Sub_title}>
                <h4>{location.Sub_title}</h4>
                <p>Latitude: {location.latitude}</p>
                <p>Longitude: {location.longitude}</p>
                {/* Display other data related to each location */}
              </div>
            ))}
          </div>
        )}
      </div>
      <div id="map" style={{ flex: 1, height: '550px', marginRight: '25px' }}></div>
      <Modal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        location={selectedLocation}
      />
    </div>
  );
};

export default MapComponent;
