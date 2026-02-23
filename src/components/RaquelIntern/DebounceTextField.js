import React, { useState, useEffect, memo } from 'react';
import { TextField } from '@material-ui/core';


const DebounceTextField = ({ delay = 5, onChange, value, ...props }) => {
  const [tempVal, setTempVal] = useState(value || '');

  useEffect(() => {
    setTempVal(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange({ target: { value: tempVal } });
    }, delay);

    return () => clearTimeout(handler);
  }, [tempVal]);

  return <TextField value={tempVal} onChange={(e) => setTempVal(e.target.value)} {...props} />;
};

export default memo(DebounceTextField);