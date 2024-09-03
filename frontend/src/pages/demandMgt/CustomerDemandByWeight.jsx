import React from 'react';
import { Container, TextField } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const CustomerDemandByWeight = () => {

    const dataset = [
        {
            group_1_name: '', // keep this empty
            group_2_name: 'group_2',
            group_3_name: 'group_3',
            group_4_name: 'group_4',
            x_axis_name: 'Number Of Family Members',
       },
       {
          component_id: '1',
          component_name: 'name_1',
          component_group_1_value: 4,
          component_group_2_value: 3,
          component_group_3_value: 5,
          component_group_4_value: 7,
       },
       {
          component_id: '2',
          component_name: 'name_2',
          component_group_1_value: 1,
          component_group_2_value: 6,
          component_group_3_value: 3,
          component_group_4_value: 7,
       },
       {
          component_id: '3',
          component_name: 'name_3',
          component_group_1_value: 2,
          component_group_2_value: 5,
          component_group_3_value: 6,
          component_group_4_value: 9,
       },
       {
          component_id: '4',
          component_name: 'name_3',
          component_group_1_value: 1,
          component_group_2_value: 2,
          component_group_3_value: 3,
          component_group_4_value: 4,
       },
      ];
    
      return (
        <Container sx={{ bgcolor: '#E0DDDC', color: 'white', borderRadius: '16px' }}>
    
            <BarChart
                xAxis={[{ scaleType: 'band', data: [dataset[0].group_1_name], label:'Mushroom Type'}]}
                series={[
                    { data: [
                        dataset[1].component_group_1_value, 
                    ] 
                    }, 
                    { data: [
                        dataset[2].component_group_1_value, 
                    ] 
                    }, 
                    { data: [
                        dataset[3].component_group_1_value,
                    ] 
                    },
                    { data: [
                        dataset[4].component_group_1_value, 
                    ] 
                    }
                ]}
                yAxis={[{ label:'Predicted Demand (g)'}]}
                width={500}
                height={300}
            />
    
        </Container>
    
      )
}

export default CustomerDemandByWeight;
