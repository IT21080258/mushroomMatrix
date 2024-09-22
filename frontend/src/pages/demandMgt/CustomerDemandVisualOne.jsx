import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const CustomerDemandVisualOne = () => {
    // State variables for predictions
    const [predictionAom, setPredictionAom] = useState(0);
    const [predictionBm, setPredictionBm] = useState(0);
    const [predictionBom, setPredictionBom] = useState(0);
    const [predictionPom, setPredictionPom] = useState(0);

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

    // Data representation for the bar chart
    const mushroomCustomerRepresent = [
        {
            mushroom_id: '0',
            component_name: 'American Oyster Mushroom (AOM)',
            packet_count: predictionAom
        },
        {
            mushroom_id: '1',
            component_name: 'Button Mushroom (BM)',
            packet_count: predictionBm
        },
        {
            mushroom_id: '2',
            component_name: 'Bhutan Oyster Mushroom (BOM)',
            packet_count: predictionBom
        },
        {
            mushroom_id: '3',
            component_name: 'Pink Oyster Mushroom (POM)',
            packet_count: predictionPom
        }
    ];

    return (
        <Container sx={{ bgcolor: '#E0DDDC', color: 'white', borderRadius: '16px' }}>
            <BarChart
                xAxis={[{ scaleType: 'band', data: [' '], label: 'Mushroom Type' }]}
                series={mushroomCustomerRepresent.map(mushroom => ({
                    data: [mushroom.packet_count]
                }))}
                yAxis={[{ label: 'Predicted Demand (packets)' }]}
                width={500}
                height={300}
            />
        </Container>
    );
}

export default CustomerDemandVisualOne;