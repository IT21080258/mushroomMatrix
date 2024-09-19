import React, {useEffect, useState} from 'react';
import { Container } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';


const CustomerDemandVisualOne = () => {

    const[predictionAom, setPredictionAom] = useState(0)
    const[predictionBm, setPredictionBm] = useState(0)
    const[predictionBom, setPredictionBom] = useState(0)
    const[predictionPom, setPredictionPom] = useState(0)

    useEffect(() => {
        fetch("/get_predict_customer_demand").then(res => res.json()).then(data => {
            setPredictionAom(data.prediction_aom);
            setPredictionBm(data.prediction_bm);
            setPredictionBom(data.prediction_bom);
            setPredictionPom(data.prediction_pom);
        });
    },)

    const mushroomCustomerRepresent = [
       {
          mushroom_id: '0',
          component_name: 'American Oyster Mushroom (AOM)',
          packet_count: predictionAom
       },
       {
          component_id: '1',
          component_name: 'Button Mushroom (BM)',
          packet_count: predictionBm
       },
       {
          component_id: '2',
          component_name: 'Bhutan Oyster Mushroom (BOM)',
          packet_count: predictionBom
       },
       {
          component_id: '3',
          component_name: 'Pink Oyster Mushroom (POM)',
          packet_count: predictionPom
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