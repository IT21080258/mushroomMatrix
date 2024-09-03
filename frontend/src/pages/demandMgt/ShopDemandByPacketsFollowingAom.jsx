import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Container } from '@mui/material';

const ShopDemandByPacketsFollowingAom = () => {
  return (
    <Container sx={{ bgcolor: '#E0DDDC', color: 'white', borderRadius: '16px', width: '300px', // Specify the width here
      height: '350px', padding: '16px', display: 'flex',justifyContent: 'center', alignItems: 'center' }}  fixed>
    <Card sx={{ minWidth: 'fitContent', minHeight: 'fitContent' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Predicted Monthly Sales (FY)
        </Typography>
        <Typography variant="h3" component="div">
          <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
          >
            2000
          </Box>
        </Typography>
      </CardContent>

      <CardContent>
        <Typography variant="h5" component="div">
          Predicted Yealy Sales (FY)
        </Typography>
        <Typography variant="h3" component="div">
          <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
          >
            2000
          </Box>
        </Typography>
      </CardContent>

    </Card>
    </Container>
  );
}

export default ShopDemandByPacketsFollowingAom;
