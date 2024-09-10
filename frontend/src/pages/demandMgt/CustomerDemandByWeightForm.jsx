import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

const CustomerDemandByWeightForm = () => {
  // State variables to hold district and member count
  const [district, setDistrict] = useState('');
  const [memberCount, setMemberCount] = useState('');

  // Handler for district selection
  const handleDistrict = (event) => {
    setDistrict(event.target.value);
  };

  // Handler for member count input
  const handleMemberCount = (event) => {
    setMemberCount(event.target.value);
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Send POST request to the backend API
      const response = await axios.post('http://localhost:4080/add_weight_predictions', {
        district,
        memberCount: Number(memberCount) // Convert memberCount to a number
      });

      console.log(response.data); // Log the response from the server
    } catch (error) {
      // Log any errors that occur during the request
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container
      sx={{
        bgcolor: '#E0DDDC', // Background color
        color: 'black', // Text color
        borderRadius: '16px', // Rounded corners
        width: '550px', // Width of the container
        height: '400px', // Height of the container
        padding: '16px', // Padding inside the container
        display: 'flex', // Flexbox layout
        flexDirection: 'column', // Column direction
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
      }}
      fixed
    >
      <FormControl fullWidth>
        <InputLabel id="district-select-label">District</InputLabel>
        <Select
          labelId="district-select-label"
          id="district-select"
          value={district} // Current selected district
          label="District"
          onChange={handleDistrict} // Update state on change
        >
          {/* Map through an array of district names to create menu items */}
          {['Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'].map((districtName, index) => (
            <MenuItem key={index} value={index + 1}>{districtName}</MenuItem>
          ))}
        </Select>

        <TextField
          id="outlined-basic"
          label="Total Members"
          variant="outlined"
          value={memberCount} // Current value of member count
          onChange={handleMemberCount} // Update state on change
          type="number" // Ensure the input is a number
          sx={{ marginTop: '16px' }} // Margin on top
        />

        <Button
          variant="contained"
          style={{ width: '210px', marginTop: '16px' }} // Button styling
          onClick={handleSubmit} // Call handleSubmit on click
        >
          Predict
        </Button>
      </FormControl>
    </Container>
  );
};

export default CustomerDemandByWeightForm;