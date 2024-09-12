import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';

const ShopDemandByPacketsFormAm = () => {

  const [demandAmount, setDemandAmount] = useState('');

  // Passing JSON Object
  const shopPrediction = {
    demandAmount
  };

  // Handler for member count input
  const handleDemandAmount = (event) => {
    const value = event.target.value;
    // Check if the value is a number and greater than 0
    if (/^\d*$/.test(value) && (value === '' || Number(value) > 0)) {
      setDemandAmount(value);
    }
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send POST request to the Flask API
      const response = await axios.post('URL', shopPrediction);

      console.log(response.data);
    } catch (error) {
      // Log any errors that occur during the request
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Container sx={{ bgcolor: '#E0DDDC', color: 'white', borderRadius: '16px', width: '450px', // Specify the width here
        height: '300px', padding: '16px', display: 'flex',justifyContent: 'center', alignItems: 'center' }}  fixed>

        <FormControl>

          <TextField
            id="outlined-basic"
            label="AM Daily Demand"
            variant="outlined"
            value={demandAmount}
            onChange={handleDemandAmount}
            type="number"
            sx={{ marginTop: '16px' }}
          />

          <br/>

          <Button 
            variant="contained" 
            style={{width: '210px'}}
            onClick={handleSubmit}
          >
          Predict
          </Button>

        </FormControl>

  </Container>
  )
}

export default ShopDemandByPacketsFormAm;
