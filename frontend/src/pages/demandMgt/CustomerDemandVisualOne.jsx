import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CustomerDemandVisualOne = () => {
    // State variables for predictions
    const [predictionAom, setPredictionAom] = useState(null);
    const [predictionBm, setPredictionBm] = useState(null);
    const [predictionBom, setPredictionBom] = useState(null);
    const [predictionPom, setPredictionPom] = useState(null);

    // Fetch predictions on component mount
    useEffect(() => {
        fetch("/get_predict_customer_demand")
            .then(res => res.json())
            .then(data => {
                setPredictionAom(data.prediction_aom);
                setPredictionBm(data.prediction_bm);
                setPredictionBom(data.prediction_bom);
                setPredictionPom(data.prediction_pom);
            });
    }, []); // Added empty dependency array to run effect only on mount

    // Check if any prediction is null
    const isAnyPredictionNull = [predictionAom, predictionBm, predictionBom, predictionPom].some(prediction => prediction === null);

    // Data representation for the bar chart
    const mushroomCustomerRepresent = [
        {
            mushroom_id: '0',
            component_name: 'American Oyster Mushroom (AOM)',
            packet_count: predictionAom || 0 // Use 0 if null
        },
        {
            mushroom_id: '1',
            component_name: 'Button Mushroom (BM)',
            packet_count: predictionBm || 0 // Use 0 if null
        },
        {
            mushroom_id: '2',
            component_name: 'Bhutan Oyster Mushroom (BOM)',
            packet_count: predictionBom || 0 // Use 0 if null
        },
        {
            mushroom_id: '3',
            component_name: 'Pink Oyster Mushroom (POM)',
            packet_count: predictionPom || 0 // Use 0 if null
        }
    ];

    return (
        <Container sx={{ bgcolor: '#E0DDDC', color: 'white', borderRadius: '16px' }}>
            {isAnyPredictionNull ? (
                <Box 
                    sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', // Center horizontally
                    alignItems: 'center',     // Center vertically
                    width: 500, 
                    height: 300 
                    }}
                >
                    <CircularProgress size={100} />
                </Box>
            ) : (
                <BarChart
                    xAxis={[{ scaleType: 'band', data: [' '], label: 'Mushroom Type' }]}
                    series={mushroomCustomerRepresent.map(mushroom => ({
                        data: [mushroom.packet_count]
                    }))}
                    yAxis={[{ label: 'Predicted Demand (packets)' }]}
                    width={500}
                    height={300}
                />
            )}
        </Container>
    );
}

export default CustomerDemandVisualOne;