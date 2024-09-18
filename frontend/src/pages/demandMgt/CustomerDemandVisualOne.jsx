import React from 'react';
import { Container } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const CustomerDemandVisualOne = () => {

    const mushroomCustomerRepresent = [
       {
          mushroom_id: '0',
          component_name: 'American Oyster Mushroom (AOM)',
          packet_count: 5
       },
       {
          component_id: '1',
          component_name: 'Button Mushroom (BM)',
          packet_count: 10
       },
       {
          component_id: '2',
          component_name: 'Bhutan Oyster Mushroom (BOM)',
          packet_count: 15
       },
       {
          component_id: '3',
          component_name: 'Pink Oyster Mushroom (POM)',
          packet_count: 20
       }
      ];
    
      return (
        <Container sx={{ bgcolor: '#E0DDDC', color: 'white', borderRadius: '16px' }}>
    
            <BarChart
                xAxis={[{ scaleType: 'band', data: [' '], label:'Mushroom Type'}]}
                series={[
                    { data: [
                        mushroomCustomerRepresent[0].packet_count, 
                    ] 
                    }, 
                    { data: [
                        mushroomCustomerRepresent[1].packet_count, 
                    ] 
                    }, 
                    { data: [
                        mushroomCustomerRepresent[2].packet_count,
                    ] 
                    },
                    { data: [
                        mushroomCustomerRepresent[3].packet_count, 
                    ] 
                    }
                ]}
                yAxis={[{ label:'Predicted Demand (packets)'}]}
                width={500}
                height={300}
            />
    
        </Container>
    
      )
}

export default CustomerDemandVisualOne;