// ListFieldComponent.js
import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Box, Button, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const ListFieldComponent = ({ field, fieldValue, handleChange, handleAddResponse, handleDeleteResponse }) => {
  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {field.description}
      </Typography>
      {(fieldValue || []).map((response, index) => (
        <Box key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: -15 }}>
          <TextField
            label={field.caption}
            value={response}
            onChange={(e) => handleChange(e, `${field.targetKey}.${index}`)}
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth
          />
          <Button onClick={() => handleDeleteResponse(field.targetKey, index)} color="secondary">
            <DeleteIcon />
          </Button>
        </Box>
      ))}
      <Button onClick={() => handleAddResponse(field.targetKey)} variant="contained" color="primary" style={{ marginTop: 12 }}>
        Add
      </Button>
    </Box>
  );
};

ListFieldComponent.propTypes = {
  field: PropTypes.object.isRequired,
  fieldValue: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAddResponse: PropTypes.func.isRequired,
  handleDeleteResponse: PropTypes.func.isRequired,
};

export default ListFieldComponent;
