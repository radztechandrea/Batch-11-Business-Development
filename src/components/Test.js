import React from "react";
import { Box, Button, Paper, Typography } from "@material-ui/core";
import { parseText } from "src/parse_text";

const Test = () => {
  






  function dropHandler(event) {
    event.preventDefault();
    const droppedItems = event.dataTransfer.files;

    if (droppedItems.length === 0) {
      return;
    }

  const fileReader = new FileReader();
  
    fileReader.onload = () => {
      const rows = fileReader.result.trim().split('\n');
      parseText(rows)


    };

  
    fileReader.readAsText(droppedItems[0]);
  }

 
  function changeHandler(event) {
    event.preventDefault();

    const items = event.target.files;

    if (items.length === 0) {
      return;
    }

    const fileReader = new FileReader();
  
    fileReader.onload = () => {
      const rows = fileReader.result.trim().split('\n');
    
      parseText(rows)
    };
    fileReader.readAsText(items[0]);
  }

 
  return (

     

    <Box p={2}>
    <Box
      
    >
      <input
        type="file"
        onDrop={dropHandler}
        onChange={changeHandler}
      />
      <Typography variant="h4" color="textSecondary">
        Drag or click here.
      </Typography>
    </Box>
  </Box>

  );

  }


export default Test;
