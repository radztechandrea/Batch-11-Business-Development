import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell as MuiTableCell, TableContainer, TableHead, TableRow,
  TextField, IconButton, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  withStyles, Box
} from "@material-ui/core";
import {
  AddBox as AddBoxIcon, Done as DoneIcon, Clear as ClearIcon, Create as CreateIcon, Delete as DeleteIcon
} from "@material-ui/icons";

const TableCell = withStyles((theme) => ({
  root: {
    paddingTop: 1,
    paddingBottom: 1,
  },
}))(MuiTableCell);

const Tables = ({
  Tablecomponent,
  isEdit,
  handleInputChange,
  handleSave,
  handleAdd,
  handleConfirm,
  handleRemoveClick,
  handleNo,
  showConfirm,
  setEdit,
}) => {

  const handleSaveWithValidation = () => {
    const hasEmptyField = Tablecomponent.some(row => Object.values(row).some(value => !value.trim()));

    if (hasEmptyField) {
      alert("All fields must be filled out before saving.");
      return;
    }
    handleSave();
  };

  const renderTableRow = (row, rowIndex) => {
    return (
      <TableRow key={rowIndex} style={{ maxHeight: "5vh" }}>
        {Object.keys(row).map((key) => (
          <TableCell key={key}>
            {isEdit ? (
              <TextField
                value={row[key]}
                name={key}
                onChange={(e) => handleInputChange(e, rowIndex)}
                variant="outlined"
                size="small"
                fullWidth={key === "field"}
              />
            ) : (
              row[key]
            )}
          </TableCell>
        ))}
        {isEdit && Object.keys(row).length > 0 && (
          <TableCell align="center">
            <IconButton onClick={() => handleConfirm(rowIndex)} disabled={!isEdit}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        )}
      </TableRow>
    );
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {Tablecomponent[0] && Object.keys(Tablecomponent[0]).map((key) => (
                <TableCell key={key} style={{ fontWeight: "bold" }} align="left">{key.toUpperCase()}</TableCell>
              ))}
              {isEdit && <TableCell align="center">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {Tablecomponent.map(renderTableRow)}
          </TableBody>
        </Table>
      </TableContainer>
      <Box style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
        <Box style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            startIcon={<AddBoxIcon />}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="default"
            onClick={() => setEdit(!isEdit)}
            startIcon={<CreateIcon />}
          >
            Edit
          </Button>
          {isEdit && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveWithValidation}
              startIcon={<DoneIcon />}
            >
              Save
            </Button>
          )}
        </Box>
      </Box>
      <Dialog open={showConfirm} onClose={handleNo} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete this record?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveClick} color="primary">Yes</Button>
          <Button onClick={handleNo} color="primary" autoFocus>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Tables.propTypes = {
  Tablecomponent: PropTypes.array.isRequired,
  isEdit: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  handleRemoveClick: PropTypes.func.isRequired,
  handleNo: PropTypes.func.isRequired,
  showConfirm: PropTypes.bool.isRequired,
  setEdit: PropTypes.func.isRequired,
};

export default Tables;
