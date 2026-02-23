import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconmap from "./marker.png";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import ReactDOMServer from "react-dom/server";
import * as htmlToImage from "html-to-image";

document.id = (function () {
  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
    iconUrl: require("leaflet/dist/images/marker-icon.png").default,
    shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
  });
})();

const officeLocation = [16.9322974, 121.7681041];

const customIcon = L.icon({
  iconUrl: iconmap,
  iconSize: [35, 40],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const createDivIcon = (content) =>
  L.divIcon({
    className: "custom-text-icon",
    html: ReactDOMServer.renderToString(
      <div
        style={{
          position: "absolute",
          top: "60px",
          left: "5px",
          transform: "translate(-50%, -50%)",
          backgroundColor: "transparent",
          color: "black",
          textAlign: "center",
          borderRadius: "8px",
          height: "100px",
          width: "200px",
          overflow: "auto",
        }}
      >
        <div style={{ maxHeight: "100%", overflow: "hidden" }}>
          <p style={{ margin: 0 }}>{content}</p>
        </div>
      </div>,
    ),
  });

const MapMarker = () => {
  const [userLocations, setUserLocations] = useState([]);
  const [locationDetails, setLocationDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = [position.coords.latitude, position.coords.longitude];
          console.log("Geolocation coordinates:", coords);
          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse`,
              {
                params: {
                  lat: position.coords.latitude,
                  lon: position.coords.longitude,
                  format: "json",
                },
              },
            );
            console.log("Nominatim API response:", response.data);
            const locationName = response.data.display_name;
            setUserLocations((prevLocations) => [...prevLocations, coords]);
            setLocationDetails((prevDetails) => [...prevDetails, locationName]);
          } catch (error) {
            console.error("Error fetching location details: ", error);
            setLocationDetails((prevDetails) => [...prevDetails, "N/A"]);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Failed to fetch location.");
          setLoading(false);
        },
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleExportMap = async () => {
    if (mapRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(mapRef.current);
        const link = document.createElement("a");
        link.download = "map.png";
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Error exporting map: ", error);
      }
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "200px",
          padding: "10px",
          backgroundColor: "#f0f0f0",
          borderRight: "1px solid #ccc",
        }}
      >
        <button onClick={handleGetLocation}>Get Location</button>
        <button onClick={handleExportMap}>Export Map</button>
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Oval
              height={100}
              width={100}
              color="#4fa94d"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        )}
        {locationDetails.map((detail, index) => (
          <div
            key={index}
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#e0e0e0",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            {detail}
          </div>
        ))}
      </div>

      <div
        id="map-container"
        style={{ height: "500px", width: "500px" }}
        ref={mapRef}
      >
        <MapContainer
          center={officeLocation}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <Marker position={officeLocation} icon={customIcon} />
          <Marker
            position={officeLocation}
            icon={createDivIcon("Office Location")}
          />

          {userLocations.map((location, index) => (
            <Marker key={index} position={location} icon={customIcon} />
          ))}
          {userLocations.map((location, index) => (
            <Marker
              key={index}
              position={location}
              icon={createDivIcon(locationDetails[index])}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapMarker;
