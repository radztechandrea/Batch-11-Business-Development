import React from 'react';
import rawData0 from "./RawData_0.json";
import rawData1 from "./RawData_1.json";
import rawData2 from "./RawData_2.json";
import rawData3 from "./RawData_3.json";

export function LocationConverter() {
  const allData = [...rawData0, ...rawData1, ...rawData2, ...rawData3];

  const findCoordinates = (item) => {
    let latitude = null;
    let longitude = null;

    Object.keys(item).forEach(key => {
      if (key.toLowerCase().includes('lat')) {
        latitude = item[key];
      }
      if (key.toLowerCase().includes('long') || key.toLowerCase().includes('lon')) {
        longitude = item[key];
      }
      if (typeof item[key] === 'string' && item[key].includes(',')) {
        const [lat, lon] = item[key].split(',').map(Number);
        if (!isNaN(lat) && !isNaN(lon)) {
          latitude = lat;
          longitude = lon;
        }
      }
    });
    return { latitude, longitude };
  };

  const KeyMappings = {
    Sub_title: ['place_name', 'UI_id', 'name', 'sub_title'],
    Total_customer: ['number'],
  };

  const allDataWithMappedKeys = allData.map(item => {
    const coordinates = findCoordinates(item);
    const mappedItem = Object.keys(KeyMappings).reduce((acc, key) => {
      const mappedKey = KeyMappings[key].find(k => item.hasOwnProperty(k));
      if (mappedKey) {
        acc[key] = item[mappedKey];
      } else {
        acc[key] = null; 
      }
      return acc;
    }, {});
    return { ...coordinates, ...mappedItem };
  });

  return (
    <div>
      <pre>{JSON.stringify(allDataWithMappedKeys, null, 2)}</pre>
    </div>
  );
}

export const transformedData = () => {
  const allData = [...rawData0, ...rawData1, ...rawData2, ...rawData3];

  const findCoordinates = (item) => {
    let latitude = null;
    let longitude = null;

    Object.keys(item).forEach(key => {
      if (key.toLowerCase().includes('lat')) {
        latitude = item[key];
      }
      if (key.toLowerCase().includes('long') || key.toLowerCase().includes('lon')) {
        longitude = item[key];
      }
      if (typeof item[key] === 'string' && item[key].includes(',')) {
        const [lat, lon] = item[key].split(',').map(Number);
        if (!isNaN(lat) && !isNaN(lon)) {
          latitude = lat;
          longitude = lon;
        }
      }
    });
    return { latitude, longitude };
  };

  const KeyMappings = {
    Sub_title: ['place_name', 'UI_id', 'name', 'sub_title'],
    Total_customer: ['number'],
  };

  const allDataWithMappedKeys = allData.map(item => {
    const coordinates = findCoordinates(item);
    const mappedItem = Object.keys(KeyMappings).reduce((acc, key) => {
      const mappedKey = KeyMappings[key].find(k => item.hasOwnProperty(k));
      if (mappedKey) {
        acc[key] = item[mappedKey];
      } else {
        acc[key] = null; 
      }
      return acc;
    }, {});
    return { ...coordinates, ...mappedItem };
  });

  return allDataWithMappedKeys;
};

export default LocationConverter;
