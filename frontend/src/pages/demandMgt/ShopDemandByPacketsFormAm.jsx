import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';

const ShopDemandByPacketsFormAm = () => {

  return (
    <Container sx={{ bgcolor: '#E0DDDC', color: 'white', borderRadius: '16px', width: '450px', // Specify the width here
        height: '300px', padding: '16px', display: 'flex',justifyContent: 'center', alignItems: 'center' }}  fixed>

        <FormControl>

            <TextField id="outlined-basic" label="Daily AM Demand" variant="outlined" />

            <br/>

            <Button variant="contained" style={{width: '210px'}}>
              Predict
            </Button>

        </FormControl>

  </Container>
  )
}

export default ShopDemandByPacketsFormAm;
