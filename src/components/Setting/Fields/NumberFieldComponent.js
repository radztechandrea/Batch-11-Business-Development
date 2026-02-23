import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, TextField, Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const NumberFieldComponent = ({ field, fieldValue, handleChange, handleAddResponse, handleDeleteResponse }) => {
  const renderField = () => (
    <TextField
      label={field.caption}
      value={fieldValue}
      onChange={e => handleChange(e, field.list ? `${field.targetKey}.${fieldValue.length}` : field.targetKey)}
      variant="outlined"
      size="small"
      margin="normal"
      fullWidth
      type="number"
    />
  );

  const renderListField = () => (
    <Box style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
      {renderField()}
      <IconButton onClick={() => handleDeleteResponse(field.targetKey, fieldValue.length - 1)} color="secondary">
        <DeleteIcon />
      </IconButton>
    </Box>
  );

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>{field.description}</Typography>
      {field.list ? (
        <>
          {fieldValue.map((_, index) => renderListField())}
          <Button onClick={() => handleAddResponse(field.targetKey)} variant="contained" color="primary" style={{ marginTop: 12 }}>Add</Button>
        </>
      ) : renderField()}
    </Box>
  );
};

NumberFieldComponent.propTypes = {
  field: PropTypes.object.isRequired,
  fieldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAddResponse: PropTypes.func.isRequired,
  handleDeleteResponse: PropTypes.func.isRequired,
};

export default NumberFieldComponent;

