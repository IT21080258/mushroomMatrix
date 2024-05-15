import React from "react";
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

import axios from "axios";
import { useState } from "react";

const PredictYield = () =>  {

    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState(null);

    const [formData, setFormData] = useState({
        Noofpots: "",
        TempInside: "",
        HumidInside: "",
        CO2Inside: "",
        TempOutside: "",
        HumidOutside: "",
        CO2Outside: ""
      });

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          // Store form data in local storage
          localStorage.setItem("formData", JSON.stringify(formData));
    
          // Send form data to backend for prediction
          const response = await axios.post("http://localhost:5000/yield/predict", formData);
          setTimeout(() => {
            setPrediction(response.data.prediction);
            setLoading(false);
        }, 2000);
        } catch (error) {
          
          setTimeout(() => {
            console.error("Prediction error:", error);
        }, 2000);
          // Handle error responses
        }
      };

    
    
return(
    <Grid>
        <div>
            <Typography variant="h3">
                Yield
            </Typography><br/>
            <hr/>
        </div>
        <div>
            <form style={{width:'400px'}} onSubmit={handleSubmit}>
            <TextField 
                onChange={handleChange}
                label="Growshed Code" 
                variant="outlined" 
                color="secondary"
                name="Noofpots" 
                fullWidth
                required
                style={{margin: '8px 0px 0px', width:'200px'}}
            />
            <TextField 
                onChange={handleChange}
                label="Date" 
                variant="outlined" 
                color="secondary" 
                fullWidth
                required
                style={{margin: '8px 0px 0px', width:'200px'}}
            /><br/>
            <TextField 
                onChange={handleChange}
                label="Tempreture Inside" 
                variant="outlined" 
                color="secondary" 
                name="TempInside"
                fullWidth
                required
                style={{margin: '8px 0px 0px', width:'200px'}}
            />
            <TextField 
                onChange={handleChange}
                label="CO2 Inside" 
                variant="outlined" 
                color="secondary"
                name="CO2Inside" 
                fullWidth
                required
                style={{margin: '8px 0px 0px', width:'200px'}}
            />
            <TextField 
                onChange={handleChange}
                label="Humidity Inside" 
                variant="outlined" 
                color="secondary"
                name="HumidInside" 
                fullWidth
                required
                style={{margin: '8px 0px 0px', width:'200px'}}
            /><br/>
            <TextField 
                onChange={handleChange}
                label="Tempreture Outside" 
                variant="outlined" 
                color="secondary"
                name="TempOutside" 
                fullWidth
                required
                style={{margin: '8px 0px 0px', width:'200px'}}
            />
            <TextField 
                onChange={handleChange}
                label="CO2 Outside" 
                variant="outlined" 
                color="secondary"
                name="CO2Outside" 
                fullWidth
                required
                style={{margin: '8px 0px 0px', width:'200px'}}
            />
            <TextField 
                onChange={handleChange}
                label="Humidity Outside" 
                variant="outlined" 
                color="secondary"
                name="HumidOutside" 
                fullWidth
                required
                style={{margin: '8px 0px 0px', width:'200px'}}
            />
            <Button variant="contained" style={{Margin:'30px 0px 0px',
                                                width: '400px'                        
                                                                        }}
                    onClick={handleSubmit}                                                    >
            {loading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
            
            </form>
            {prediction && (
                <Alert severity="success">{`Prediction: ${prediction}`}</Alert>
            )}
        </div><br/>
        <hr/>
        
        {/* <Grid xs={12}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{width:'100%'}}>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Grow Shed</TableCell>
                        <TableCell align="right">Temp Inside</TableCell>
                        <TableCell align="right">CO2 Inside</TableCell>
                        <TableCell align="right">Humidity Inside</TableCell>
                        <TableCell align="right">Temp Outside</TableCell>
                        <TableCell align="right">CO2 Outside</TableCell>
                        <TableCell align="right">Humidity Outside</TableCell>
                        <TableCell align="right">Yield</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.code}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >   
                            <TableCell component="th" scope="row">{row.Date}</TableCell>      
                            <TableCell align="right">{row.growShed}</TableCell>
                            <TableCell align="right">{row.tempIn}</TableCell>
                            <TableCell align="right">{row.humidIn}</TableCell>
                            <TableCell align="right">{row.co2In}</TableCell>
                            <TableCell align="right">{row.tempOut}</TableCell>
                            <TableCell align="right">{row.Co2Out}</TableCell>
                            <TableCell align="right">{row.humidOut}</TableCell>
                            <TableCell align="right">{row.Yield}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </Grid> */}
    </Grid>
)
}

export default PredictYield;