import React, { useState } from 'react';
import { Box, Paper, Input } from "@material-ui/core";

const searchData = [
  'Account requirement',
  'Account request',
  'Account request 2',
  'Another requirement',
  'Another request',
  'Yet another request',
  'Adonis Maranan',
  'Benedick Yamat',
  'Randy Antalan',
  'Jeomar Palting',
  'Dona Maranan'
];

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterDataByParts = (parts) => {
    return searchData.filter(item => {
      const itemLowerCase = item.toLowerCase();
      return parts.every(part => itemLowerCase.includes(part.toLowerCase()));
    });
  };

  const renderMatchedItem = () => {
    const parts = searchTerm.toLowerCase().split(' ').filter(part => part.trim() !== '');
    const matchedItems = filterDataByParts(parts);
    return matchedItems.length > 0 ? matchedItems.map((item, index) => (
      <li key={index}>{item}</li>
    )) : <p>No List</p>;
  };

  return (
    <Box m={2} p={2} component={Paper}>
      <Input
        fullWidth
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <Box mt={2}>
        {renderMatchedItem()}
      </Box>
    </Box>
  );
};

export default SearchBar;