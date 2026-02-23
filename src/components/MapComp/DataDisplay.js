import React from 'react';
import { transformedData } from './setting';

export function DisplayData() {
  const data = transformedData();

  return (
    <div>
      <h1>Display Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default DisplayData;
