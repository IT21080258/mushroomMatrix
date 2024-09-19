import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const ShopDemandVisualOne = () => {
  // State for current and predicted values
  const [currentValues, setCurrentValues] = useState(Array(7).fill(0));
  const [predictValues, setPredictValues] = useState(Array(7).fill(0));

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/get_predict_shop_demand_aom");
        const data = await response.json();

        // Update state with fetched data
        const currentSales = data.map(item => item.c_daily_sales);
        const predictedSales = data.map(item => item.fy_daily_sales);

        setCurrentValues(currentSales);
        setPredictValues(predictedSales);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container sx={{ bgcolor: '#E0DDDC', color: 'white', borderRadius: '16px' }}>
      <Typography variant="h6" color="black">
        Daily Sales Summary (AOM)
      </Typography>

      <LineChart
        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7], label: 'Day Number (Latest details in day number 7th)' }]}
        series={[
          {
            name: 'Series 1 - Current',
            data: currentValues,
          },
          {
            name: 'Series 2 - Predicted',
            data: predictValues,
          },
        ]}
        width={500}
        height={300}
      />
    </Container>
  );
};

export default ShopDemandVisualOne;