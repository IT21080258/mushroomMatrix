import * as React from 'react';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

const ShopDemandVisualTwo = () => {

    const data = [
        {
          id: 'data-1',
          observed_daily_sales: 96.94,
          cy_monthly_sales: 110.5,
          fy_monthly_sales: 217.8,
        },
        {
          id: 'data-2',
          observed_daily_sales: 336.35,
          cy_monthly_sales: 175.23,
          fy_monthly_sales: 286.32,
        },
        {
          id: 'data-3',
          observed_daily_sales: 159.44,
          cy_monthly_sales: 195.97,
          fy_monthly_sales: 325.12,
        },
        {
          id: 'data-4',
          observed_daily_sales: 188.86,
          cy_monthly_sales: 351.77,
          fy_monthly_sales: 144.58,
        },
        {
          id: 'data-5',
          observed_daily_sales: 143.86,
          cy_monthly_sales: 43.253,
          fy_monthly_sales: 146.51,
        },
        {
          id: 'data-6',
          observed_daily_sales: 202.02,
          cy_monthly_sales: 376.34,
          fy_monthly_sales: 309.69,
        },
        {
          id: 'data-7',
          observed_daily_sales: 384.41,
          cy_monthly_sales: 31.514,
          fy_monthly_sales: 236.38,
        }
    ];

    return (
        <Container sx={{ bgcolor: '#E0DDDC', color: 'white', borderRadius: '16px' }}>
    
          <Typography variant="h6" color="black">
            Monthly Sales Summary
          </Typography>
    
          <ScatterChart
            series={[
              {
                label: 'Current Value',
                data: data.map((v) => ({ x: v.observed_daily_sales, y: v.cy_monthly_sales, id: v.id })),
              },
              {
                label: 'Predicted Value',
                data: data.map((v) => ({ x: v.observed_daily_sales, y: v.fy_monthly_sales, id: v.id })),
              },
            ]}
            grid={{ vertical: true, horizontal: true }}
            width={500}
            height={300}
          />

        </Container>
      );
    };
    
export default ShopDemandVisualTwo;