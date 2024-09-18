import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const districts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 
  'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 
  'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara', 'Monaragala', 
  'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 
  'Trincomalee', 'Vavuniya'
];

const mushrooms = [
  'American Oyster Mushroom (AOM)', 
  'Button Mushroom (BM)', 
  'Bhutan Oyster Mushroom (BOM)', 
  'Pink Oyster Mushroom (POM)', 
  'Abalone Mushroom (AM)'
];

const ShopDemandForm = () => {
  const [mushroomType, setMushroomType] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [demandAmount, setDemandAmount] = React.useState('');

  const handleMushroomTypeChange = (event) => {
    setMushroomType(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleDemandAmountChange = (event) => {
    const value = event.target.value;
    if (value === '' || /^[1-9]*$/.test(value)) {
      setDemandAmount(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Mushroom Type:', mushroomType);
    console.log('District:', district);
    console.log('Demand Amount:', demandAmount);
    setMushroomType('');
    setDistrict('');
    setDemandAmount('');
  };

  return (
    <Container sx={{ bgcolor: '#E0DDDC', color: 'white', borderRadius: '16px', width: '550px', height: '400px', padding: '16px' }} fixed>
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ m: 4 }}> {/* Increased margin to create more space */}
          <FormControl fullWidth>
            <InputLabel id="mushroom-type-select-label">Mushroom Type</InputLabel>
            <Select
              labelId="mushroom-type-select-label"
              id="mushroom-type-select"
              value={mushroomType}
              label="Mushroom Type"
              onChange={handleMushroomTypeChange}
            >
              {mushrooms.filter(mushroomName => mushroomName === "American Oyster Mushroom (AOM)" || mushroomName === "Abalone Mushroom (AM)").map((mushroomName, index) => (
                <MenuItem key={index} value={mushroomName}>{mushroomName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ m: 4 }}> {/* Increased margin to create more space */}
          <FormControl fullWidth>
            <InputLabel id="district-select-label">District</InputLabel>
            <Select
              labelId="district-select-label"
              id="district-select"
              value={district}
              label="District"
              onChange={handleDistrictChange}
            >
              {districts.map((districtName, index) => (
                <MenuItem key={index} value={districtName}>{districtName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ m: 4 }}> {/* Increased margin to create more space */}
          <FormControl fullWidth>
            <TextField
              id="demand-amount"
              label="Daily Sales (Packets)"
              variant="outlined"
              value={demandAmount}
              onChange={handleDemandAmountChange}
              type="number"
              inputProps={{ min: "0", step: "1" }} // Ensure the input is non-negative
            />
          </FormControl>
        </Box>

        {/* Centering the button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}> {/* Increased top margin for the button */}
          <Button type="submit" variant="contained" style={{ width: '210px' }}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ShopDemandForm;