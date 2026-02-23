import React from 'react';
import PropTypes from 'prop-types';
import { Box, FormControlLabel, Switch, Typography } from '@material-ui/core';
import Table from '../Setting/Fields/TableFieldComponent';
import TextFieldComponent from '../Setting/Fields/TextFieldComponent';
import NumberFieldComponent from '../Setting/Fields/NumberFieldComponent';
import SelectFieldComponent from '../Setting/Fields/SelectFieldComponent';
import { useSettings } from './SettingsContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  subCaption: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(-0.2),
    fontWeight: 'italic',
    fontSize: '1rem',
  },
}));

const RenderFieldComponent = ({ field }) => {
  const classes = useStyles();
  const {
    formData,
    isEdit,
    showConfirm,
    handleChange,
    handleSave,
    handleInputChange,
    handleConfirm,
    handleRemoveClick,
    handleNo,
    handleAdd,
    handleAddResponse,
    handleDeleteResponse,
    getNestedValue,
    setEdit,
  } = useSettings();

  const fieldValue = getNestedValue(formData, field.targetKey) || field.defaultValue;

  const renderField = () => {
    switch (field.uiComponent) {
      case 'table':
        return (
          <Table
            key={field.targetKey}
            Tablecomponent={getNestedValue(formData, 'user.deductions') ?? []}
            isEdit={isEdit}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            handleAdd={handleAdd}
            handleConfirm={handleConfirm}
            handleRemoveClick={handleRemoveClick}
            handleNo={handleNo}
            showConfirm={showConfirm}
            setEdit={setEdit}
          />
        );
      case 'text':
        return (
          <TextFieldComponent
            key={field.targetKey}
            label={field.caption}
            description={field.description}
            field={field}
            fieldValue={fieldValue}
            handleChange={handleChange}
            handleAddResponse={handleAddResponse}
            handleDeleteResponse={handleDeleteResponse}
          />
        );
      case 'number':
        return (
          <NumberFieldComponent field={field} fieldValue={fieldValue} handleChange={handleChange} />
        );
      case 'select':
        return (
          <SelectFieldComponent field={field} fieldValue={fieldValue} handleChange={handleChange} />
        );
      default:
        if (field.type === 'boolean') {
          return (
            <FormControlLabel
              control={<Switch checked={fieldValue} onChange={(e) => handleChange(e, field.targetKey)} />}
              label={field.caption}
            />
          );
        }
        return null;
    }
  };

  return (
    <Box className={classes.subCaption}>
      {renderField()}
    </Box>
  );
};

RenderFieldComponent.propTypes = {
  field: PropTypes.object.isRequired,
};

export default RenderFieldComponent;
