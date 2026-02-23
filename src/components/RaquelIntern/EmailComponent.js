import React, { useState } from 'react';
import { TextField, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(6),
    width: 400,
    display: 'flex',
    padding: theme.spacing(2),
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  textField: {
    width: '100%',
    marginBottom: theme.spacing(3),
  },
  emailText: {
    marginTop: theme.spacing(1),
    color: '#555',
  },
}));

  const EmailField = ({ label = 'Email', required = true }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setHelperText(required ? '' : '');
    } else if (!emailRegex.test(value)) {
      setError(true);
      setHelperText('Invalid email format');
    } else {
      setError(false);
      setHelperText('');
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography>Enter you email:</Typography>
      <TextField
        label={label}
        variant="outlined"
        value={email}
        error={error}
        onChange={handleChange}
        helperText={helperText}
        className={classes.textField}
      />
      
    </Container>
  );
};

export default EmailField;
