import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

import { Container } from '@mui/material';

export default function DemandPredicitionDashboard() {

  const yearArray = ['', '2020', '2021', '2022', '2023'];

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
      xAxis={[{ data: [yearArray[1], yearArray[2], yearArray[3], yearArray[4]], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 300, right: 10 }}
      />
    </Container>
  );
}