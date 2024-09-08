const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require("cors");
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const WebSocket = require('ws');

//user imports
const GSRoutes = require('./routes/GrowShedRoute');

dotenv.config();

mongoose.set('strictQuery', true);

//middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());

//database connection
const PORT = process.env.PORT || 8090 ;
const URL = process.env.DB_URL ;
mongoose.connect(URL,{
    
})

//check connection
const connection = mongoose.connection;
connection.once("open",() => {
    console.log("Mongodb connection success!");
})

//routes define to be used
//Grow shed
app.use('/api/v1/growshed',GSRoutes);


const wss = new WebSocket.Server({ port: 8081 });
// Arduino sensor data
const arduinoPort = new SerialPort({
    path: 'COM5', // Change this to your actual port
    baudRate: 9600
});

const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\n' }));

// Handle incoming data from Arduino
parser.on('data', (data) => {
    try {
        // Parse the JSON string received from Arduino
        const sensorData = JSON.parse(data);
        console.log('Sensor Data:', sensorData);

        // Broadcast the sensor data to all connected WebSocket clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(sensorData));
            }
        });
    } catch (error) {
        console.error('Error parsing sensor data:', error);
    }
});

arduinoPort.on('error', (err) => {
    console.error('Error opening serial port:', err);
});




//start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});