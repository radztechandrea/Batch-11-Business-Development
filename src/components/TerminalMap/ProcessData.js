// ProcessData.js

export const processData = (responseData, processed) => {
  // Extract cdTerminalProd from the response data
  const cdTerminalFromPost = responseData.map(item => item.cdTerminalProd);
  
  // First and second columns from the processed data
  const firstColumnFromProcessed = processed.map(item => item[0]);
  const secondColumnFromProcessed = processed.map(item => item[1]);

  console.log("POST Response:", responseData);
  console.log("First column from Processed Data:", firstColumnFromProcessed);
  
  // Find not present data and format it as {barcode, itemname}
  const notPresentData = firstColumnFromProcessed.map((item, index) => {
    if (!cdTerminalFromPost.includes(item)) {
      return {
        barcode: item,
        itemname: secondColumnFromProcessed[index]
      };
    }
    return null;
  }).filter(item => item !== null);

  console.log("Not Present Data:", notPresentData);

  return notPresentData;
};
