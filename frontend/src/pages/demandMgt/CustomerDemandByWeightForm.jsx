import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

// Define the districts array separately
const districts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 
  'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 
  'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Monaragala', 
  'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 
  'Trincomalee', 'Vavuniya'
];

const CustomerDemandByWeightForm = () => {
  // State variables to hold district and member count
  const [districtIndex, setDistrictIndex] = useState('');
  const [memberCount, setMemberCount] = useState('');

  // Passing JSON Object
  const customerPrediction = {
    districtIndex,
    memberCount
  };

  // Handler for districtIndex selection
  const handleDistrictIndex = (event) => {
    setDistrictIndex(event.target.value);
  };

  // Handler for member count input
  const handleMemberCount = (event) => {
    const value = event.target.value;
    // Check if the value is a number and greater than 0
    if (/^\d*$/.test(value) && (value === '' || Number(value) > 0)) {
      setMemberCount(value);
    }
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send POST request to the Flask API
      const response = await axios.post('URL', customerPrediction);

      console.log(response.data);
    } catch (error) {
      // Log any errors that occur during the request
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container
      sx={{
        bgcolor: '#E0DDDC',
        color: 'black',
        borderRadius: '16px',
        width: '550px',
        height: '400px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      fixed
    >
      <FormControl fullWidth>
        <InputLabel id="district-select-label">District</InputLabel>
        <Select
          labelId="district-select-label"
          id="district-select"
          value={districtIndex}
          label="District"
          onChange={handleDistrictIndex}
        >
          {districts.map((districtName, districtIndex) => (
            <MenuItem key={districtIndex} value={districtIndex}>{districtName}</MenuItem>
          ))}
        </Select>

        <TextField
          id="outlined-basic"
          label="Total Members"
          variant="outlined"
          value={memberCount}
          onChange={handleMemberCount}
          type="number"
          sx={{ marginTop: '16px' }}
        />

        <Button 
          variant="contained" 
          style={{ width: '210px', marginTop: '30px', margin: '0 auto' }}
          onClick={handleSubmit}
        >
          Predict
        </Button>

      </FormControl>
    </Container>
  );
};

export default CustomerDemandByWeightForm;
