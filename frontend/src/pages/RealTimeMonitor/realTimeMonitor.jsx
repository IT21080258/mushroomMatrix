import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SensorDataDisplay = () => {
  const [sensorData, setSensorData] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8081'); // Connect to WebSocket server

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setSensorData(data);
      setChartData((prevData) => [
        ...prevData,
        { name: new Date().toLocaleTimeString(), humidity: data.humidity, temperature: data.temperature, co2Value: data.co2Value },
      ]);
    };

    return () => ws.close(); // Close WebSocket connection on unmount
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Sensor Data
            </Typography>
            <Typography variant="body1">
              Humidity: {sensorData.humidity}%
            </Typography>
            <Typography variant="body1">
              Temperature: {sensorData.temperature}°C
            </Typography>
            <Typography variant="body1">
              CO2: {sensorData.co2Value} ppm
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Sensor Data Visualization
            </Typography>
            <LineChart width={500} height={300} data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="humidity" stroke="#8884d8" />
              <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
              <Line type="monotone" dataKey="co2Value" stroke="#ffc658" />
            </LineChart>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SensorDataDisplay;