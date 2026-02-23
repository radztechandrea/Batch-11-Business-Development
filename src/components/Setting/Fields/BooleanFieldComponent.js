import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Switch } from '@material-ui/core';

const BooleanFieldComponent = ({ field, fieldValue, handleChange }) => (
  <FormControlLabel
    control={
      <Switch
        checked={fieldValue}
        onChange={e => handleChange(e, field.targetKey)}
      />
    }
    label={field.caption}
  />
);

BooleanFieldComponent.propTypes = {
  field: PropTypes.object.isRequired,
  fieldValue: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default BooleanFieldComponent;

