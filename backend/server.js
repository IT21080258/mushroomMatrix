const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require("cors");

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




//start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});