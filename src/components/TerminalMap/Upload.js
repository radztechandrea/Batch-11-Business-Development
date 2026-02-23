import React, { useState } from "react";
import { IconButton, Box, Typography, Button, Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, TextField } from "@material-ui/core";
import { CheckCircle, Cancel } from "@material-ui/icons";
import CloseIcon from '@material-ui/icons/Close';
import { parseText } from "./ParseData";
import { processData } from "./ProcessData";
import axios from 'axios';
import { Resizable } from 're-resizable';

const Test = () => {
  const [processedData, setProcessedData] = useState([]);
  const [processed, setProcessed] = useState([]);
  const [notPresentData, setNotPresentData] = useState([]);
  const [openNotPresent, setOpenNotPresent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [terminalIds, setTerminalIds] = useState({});
  const [remarks, setRemarks] = useState({});
  const [pushStatus, setPushStatus] = useState({});
  const [pushLoading, setPushLoading] = useState({});

  const terminalIDs = '12'; 
  const ixProd = '10899'; // APAN APAN

  const apiUrl = 'https://6a191f907760.ngrok.app/api/trans/search/prod/pos-terminal-map';
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX3V1aWQiOiI2MGVjMzE1My1kM2M1LTRkNDUtOWZkZS1hZThhYzgwMmQ5MzciLCJiaXoiOiJYRG4iLCJpeFNhbmRib3giOjAsImV4cCI6MTcxNzU5MTg3Mn0.UXCdCNK9DnUjSZM2O6EFYXywq-ejzEj8hp6IqCRR3JY';

  const postData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(apiUrl, {
        cdTerminal: terminalIDs,
        lst_cdTerminalProd: processedData,
      }, {
        headers: {
          "x-access-tokens": token,
          'Content-Type': 'application/json'
        }
      });

      const notPresentData = processData(response.data, processed);

      setNotPresentData(notPresentData);
      setOpenNotPresent(true);
    } catch (error) {
      console.error('POST Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const apiUrladd = `https://6a191f907760.ngrok.app/api/setup/prod/${ixProd}/pos-terminal-map`;
  const handlePush = async (barcode) => {
    setPushLoading(prev => ({ ...prev, [barcode]: true }));
    try {
      const response = await axios.post(apiUrladd, {
        cdTerminal: terminalIDs,
        cdTerminalProd: barcode
      }, {
        headers: {
          "x-access-tokens": token,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setPushStatus(prev => ({ ...prev, [barcode]: 'success' }));
      } else {
        setPushStatus(prev => ({ ...prev, [barcode]: 'failed' }));
      }
    } catch (error) {
      console.error('Push Error:', error);
      setPushStatus(prev => ({ ...prev, [barcode]: 'failed' }));
    } finally {
      setPushLoading(prev => ({ ...prev, [barcode]: false }));
    }
  };

  const handleFileRead = (file) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const rows = fileReader.result.trim().split('\n');
      const { processedData, processed } = parseText(rows);
      setProcessed(processed);
      setProcessedData(processedData);
    };
    fileReader.readAsText(file);
  };

  const dropHandler = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;

    if (droppedFiles.length === 0) {
      return;
    }

    handleFileRead(droppedFiles[0]);
  };

  const changeHandler = (event) => {
    event.preventDefault();
    const selectedFiles = event.target.files;

    if (selectedFiles.length === 0) {
      return;
    }

    handleFileRead(selectedFiles[0]);
  };

  const handleClose = () => {
    setOpenNotPresent(false);
  };

  const handleTerminalIdChange = (index, value) => {
    setTerminalIds(prev => ({ ...prev, [index]: value }));
  };

  const handleRemarksChange = (index, value) => {
    setRemarks(prev => ({ ...prev, [index]: value }));
  };

  return (
    <div>
      <Box p={2}>
        <Box 
          onDrop={dropHandler} 
          onDragOver={(e) => e.preventDefault()} 
          style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}
        >
          <input
            type="file"
            onChange={changeHandler}
            style={{ display: 'none' }}
            id="fileInput"
          />
          <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
            <Typography variant="h4" color="textSecondary">
              Drag or click here to upload a file.
            </Typography>
          </label>
        </Box>
      </Box>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
        <Button onClick={postData} variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Post'}
        </Button>
      </div>

      <Dialog open={openNotPresent} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">Missing Data {notPresentData.length}</Typography>
            <Typography variant="h4">Terminal ID: {terminalIDs}</Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Resizable
          defaultSize={{
            width: '950px',
            height: 'auto',
          }}
          style={{ overflow: 'hidden' }}
        >
          <DialogContent style={{ padding: 0 }}>
            {notPresentData.length > 0 ? (
              <TableContainer component={Paper} style={{ maxHeight: '550px', overflow: 'auto' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Barcode</TableCell>
                      <TableCell>Item Description</TableCell>
                      <TableCell>ID Product</TableCell>
                      <TableCell>Remarks</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {notPresentData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.barcode}</TableCell>
                        <TableCell>{item.itemname}</TableCell>
                        <TableCell>
                          <TextField
                            value={terminalIds[index] || ''}
                            onChange={(e) => handleTerminalIdChange(index, e.target.value)}
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={remarks[index] || ''}
                            onChange={(e) => handleRemarksChange(index, e.target.value)}
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handlePush(item.barcode, terminalIds[index] || '')}
                            color="primary"
                            disabled={pushLoading[item.barcode]}
                            endIcon={
                              pushLoading[item.barcode] ? (
                                <CircularProgress size={20} />
                              ) : pushStatus[item.barcode] === 'success' ? (
                                <CheckCircle style={{ color: 'green' }} />
                              ) : pushStatus[item.barcode] === 'failed' ? (
                                <Cancel style={{ color: 'red' }} />
                              ) : null
                            }
                          >
                            Save
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography>No not present data found.</Typography>
            )}
          </DialogContent>
        </Resizable>
      </Dialog>
    </div>
  );
};

export default Test;
