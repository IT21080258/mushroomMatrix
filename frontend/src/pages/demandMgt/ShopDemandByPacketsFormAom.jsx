import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';

const ShopDemandByPacketsFormAom = () => {

  return (
    <Container sx={{ bgcolor: '#E0DDDC', color: 'white', borderRadius: '16px', width: '450px', // Specify the width here
        height: '300px', padding: '16px', display: 'flex',justifyContent: 'center', alignItems: 'center' }}  fixed>

        <FormControl>

            <TextField id="outlined-basic" label="Daily AOM Demand" variant="outlined" />

            <br/>

            <Button variant="contained" style={{width: '210px'}}>
              Predict
            </Button>

        </FormControl>

  </Container>
  )
}

export default ShopDemandByPacketsFormAom;
