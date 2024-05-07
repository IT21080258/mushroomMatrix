import React from 'react';
import { Container } from '@mui/material';

import { BarChart } from '@mui/x-charts/BarChart';

const DemandBarChart = () => {

    const districtArray = ['', 'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa'];

    return (
        <Container>
          <BarChart
          series={[
            { data: [35, 44, 24, 34] },
            { data: [51, 6, 49, 30] },
            { data: [15, 25, 30, 50] },
            { data: [60, 50, 15, 25] },
          ]}
          height={290}
          xAxis={[{ data: [districtArray[1], districtArray[2], districtArray[3], districtArray[4]], scaleType: 'band' }]}
          //margin={{ top: 10, bottom: 30, left: 300, right: 10 }}
          />
    
        </Container>
      );
    }

export default DemandBarChart;
