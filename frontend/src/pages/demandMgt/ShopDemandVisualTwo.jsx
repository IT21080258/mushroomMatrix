import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { ScatterChart } from '@mui/x-charts/ScatterChart';

const ShopDemandVisualTwo = () => {
  // State for daily and monthly sales values
  const [salesData, setSalesData] = useState(Array(7).fill({
    currentDailyValue: 0,
    currentValue: 0,
    predictValue: 0,
  }));

  // Fetch sales data on component mount
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch("/get_predict_shop_demand_aom");
        const data = await response.json();
        
        // Map the fetched data to our state structure
        const formattedData = data.map(item => ({
          currentValue: item.cy_monthly_sales,
          predictValue: item.fy_monthly_sales,
        })).reverse();
        
        setSalesData(formattedData);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  // Prepare data for the ScatterChart
  const chartData = salesData.map((sales, index) => ({
    id: index + 1,
    cy_monthly_sales: sales.currentValue,
    fy_monthly_sales: sales.predictValue,
  }));

  return (
    <Container sx={{ bgcolor: '#E0DDDC', color: 'white', borderRadius: '16px' }}>
      <Typography variant="h6" color="black">
        Monthly Sales Summary (AOM)
      </Typography>

      <ScatterChart
        series={[
          {
            label: 'Current Value',
            data: chartData.map(v => ({ x: v.id, y: v.cy_monthly_sales, id: v.id })),
          },
          {
            label: 'Predicted Value',
            data: chartData.map(v => ({ x: v.id, y: v.fy_monthly_sales, id: v.id })),
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