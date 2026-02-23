import React, { useState, useEffect, memo } from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';


const DebounceTextField = ({
    delay = 500,
    onChange = () => {}, 
    value,
    ...props
  }) => {
    const [tempVal, setTempVal] = useState('');
  
    useEffect(() => {
      if (tempVal === value) return;
      setTempVal(value);
    }, [value]);
  
    useEffect(() => {
      let timeOutId = null;
  
      if (tempVal !== value) {
        const newValues = {
          target: {
            name: props.name,
            value: tempVal,
          },
        };
  
        timeOutId = setTimeout(() => onChange(newValues), delay);
      }
  
      return () => {
        if (!timeOutId) return;
  
        clearTimeout(timeOutId);
      };
    }, [tempVal]);
  
    const handleChangeValue = (e) => {
      setTempVal(e.target.value);
    };
  
    return (
      <TextField value={tempVal ?? ''} onChange={handleChangeValue} {...props} />
    );
  };
  

export default memo(DebounceTextField);