import React from 'react';
import { Container } from '@mui/material';

import { PieChart } from '@mui/x-charts/PieChart';

const DemandPieChart = () => {
    return (
        <Container>
          
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 25, label: 'AOM' },
                  { id: 1, value: 25, label: 'BOM' },
                  { id: 2, value: 25, label: 'BM' },
                  { id: 3, value: 25, label: 'POM' },
                ],
              },
            ]}
            width={400}
            height={200}
          />
    
        </Container>
    );
}

export default DemandPieChart;
