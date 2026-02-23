import React, { useState, useEffect } from "react";
import dataJson from "./data.json";

const Entry = () => {
  const [uniqueIxAccs, setUniqueIxAccs] = useState([]);
  const [filteredDataList, setFilteredDataList] = useState([]);

  useEffect(() => {
    const ixAccSet = new Set();
    dataJson.defaults.kvs.collection.value.forEach((item) => {
      ixAccSet.add(item.account.ixAcc);
    });
    setUniqueIxAccs(Array.from(ixAccSet));
  }, []);

  useEffect(() => {
    const filteredData = uniqueIxAccs.map((ixAcc) => {
      const filteredItems = dataJson.defaults.kvs.collection.value.filter(
        (item) => item.account.ixAcc === ixAcc,
      );
      return {
        ...dataJson,
        defaults: {
          ...dataJson.defaults,
          kvs: {
            ...dataJson.defaults.kvs,
            collection: {
              ...dataJson.defaults.kvs.collection,
              value: filteredItems,
            },
          },
        },
      };
    });
    setFilteredDataList(filteredData);
  }, [uniqueIxAccs]);

  return (
    <div>
      {/* <h1>Data Json</h1>
      <pre>{JSON.stringify(dataJson, null, 2)}</pre> */}
      <h1>Filtered Data by ixAcc</h1>
      {filteredDataList.map((filteredData, index) => (
        <div key={index}>
          <h2>ixAcc: {uniqueIxAccs[index]}</h2>
          <pre>{JSON.stringify(filteredData, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

export default Entry;
