import * as React from 'react';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const ShopDemandVisualOne = () => {
  return (
    <Container sx={{ bgcolor: '#E0DDDC', color: 'white', borderRadius: '16px' }}>

      <Typography variant="h6" color="black">
        Daily Sales Summary
      </Typography>

      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7], label:'Day Number (Latest details in day number 7th)' }]}
        series={[
          {
            name: 'Series 1 - Current',
            data: [1, 2, 3, 4, 5, 6, 7],
          },
          {
            name: 'Series 2 - Predicted',
            data: [8, 9, 10, 11, 12, 13, 14],
          },
        ]}
        width={500}
        height={300}
      />
    </Container>
  );
};

export default ShopDemandVisualOne;