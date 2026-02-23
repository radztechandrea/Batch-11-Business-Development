import React, { useState, useEffect, memo } from "react";
import { TextField, makeStyles } from "@material-ui/core";

/**
 *
 * @param {TextFieldProps & {number: delay, value: string, onChange: (event: {target: {value: string}}) => void}} param
 * @returns
 */

const useStyles = makeStyles({
  root: {
    width: "100%",
    "& .MuiInputBase-input": {
      fontSize: "14px",
    },
  },
});
const TblTextField = ({ delay = 500, onChange, value, ...props }) => {
  const classes = useStyles();
  const [tempVal, setTempVal] = useState("");

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
    <TextField
      value={tempVal ?? ""}
      onChange={handleChangeValue}
      className={classes.root}
      {...props}
    />
  );
};

export default memo(TblTextField);
