import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const CustomerDemandByWeightForm = () => {

  const [district, setDistrict] = useState('');

  const handleChange = (event) => {
    setDistrict(event.target.value);
  };

  return (
    <Container sx={{ bgcolor: '#E0DDDC', color: 'white', borderRadius: '16px', width: '550px', // Specify the width here
        height: '300px', padding: '16px', display: 'flex',justifyContent: 'center', alignItems: 'center' }}  fixed>

        <FormControl>

            <InputLabel id="demo-simple-select-label">District</InputLabel>

            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={district}
                label="District"
                onChange={handleChange}
            >
            <MenuItem value={1}>Ampara</MenuItem>
            <MenuItem value={2}>Anuradhapura</MenuItem>
            <MenuItem value={3}>Badulla</MenuItem>
            <MenuItem value={4}>Batticaloa</MenuItem>
            <MenuItem value={5}>Colombo</MenuItem>
            <MenuItem value={6}>Galle</MenuItem>
            <MenuItem value={7}>Gampaha</MenuItem>
            <MenuItem value={8}>Hambantota</MenuItem>
            <MenuItem value={9}>Jaffna</MenuItem>
            <MenuItem value={10}>Kalutara</MenuItem>
            <MenuItem value={11}>Kandy</MenuItem>
            <MenuItem value={12}>Kegalle</MenuItem>
            <MenuItem value={13}>Kilinochchi</MenuItem>
            <MenuItem value={14}>Kurunegala</MenuItem>
            <MenuItem value={15}>Mannar</MenuItem>
            <MenuItem value={16}>Matale</MenuItem>
            <MenuItem value={17}>Matara</MenuItem>
            <MenuItem value={18}>Monaragala</MenuItem>
            <MenuItem value={19}>Mullaitivu</MenuItem>
            <MenuItem value={20}>Nuwara Eliya</MenuItem>
            <MenuItem value={21}>Polonnaruwa</MenuItem>
            <MenuItem value={22}>Puttalam</MenuItem>
            <MenuItem value={23}>Ratnapura</MenuItem>
            <MenuItem value={24}>Trincomalee</MenuItem>
            <MenuItem value={25}>Vavuniya</MenuItem>
            </Select>

            <br/>

            <TextField id="outlined-basic" label="Total Members" variant="outlined" />

            <br/>

            <Button variant="contained" style={{width: '210px'}}>
              Predict
            </Button>

        </FormControl>

  </Container>
  )
}

export default CustomerDemandByWeightForm;
