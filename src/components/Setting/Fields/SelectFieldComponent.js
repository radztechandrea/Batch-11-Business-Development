import React from 'react';
import PropTypes from 'prop-types';
import { Box, Select, MenuItem, Typography } from "@material-ui/core";

const SelectFieldComponent = ({ field, fieldValue, handleChange, compact = false }) => {
  const styles = {
    select: {
      height: compact ? '30px' : '42px',
      padding: compact ? '2px' : '6px',
    },
  };
  return (
    <Box>
      <Select
        value={fieldValue}
        onChange={(e) => handleChange(e, field.targetKey)}
        variant="outlined"
        size="small"
        fullWidth
        style={styles.select}
        displayEmpty
      >
        {(field.options || []).map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Typography variant="body2">{option.label}</Typography>
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

SelectFieldComponent.propTypes = {
  field: PropTypes.object.isRequired,
  fieldValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  compact: PropTypes.bool,
};

export default SelectFieldComponent;

