// TextFieldComponent.js
import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Box, Typography } from "@material-ui/core";
import ListFieldComponent from './ListFieldComponent';

const TextFieldComponent = ({ field, fieldValue, handleChange, handleAddResponse, handleDeleteResponse }) => {
  if (field.list) {
    return (
      <ListFieldComponent
        field={field}
        fieldValue={fieldValue}
        handleChange={handleChange}
        handleAddResponse={handleAddResponse}
        handleDeleteResponse={handleDeleteResponse}
      />
    );
  } else {
    return (
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          {field.description}
        </Typography>
        <TextField
          label={field.caption}
          value={fieldValue}
          onChange={(e) => handleChange(e, field.targetKey)}
          variant="outlined"
          size="small"
          margin="normal"
          fullWidth
        />
      </Box>
    );
  }
};

TextFieldComponent.propTypes = {
  field: PropTypes.object.isRequired,
  fieldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAddResponse: PropTypes.func.isRequired,
  handleDeleteResponse: PropTypes.func.isRequired,
};

export default TextFieldComponent;
