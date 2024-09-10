import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

const PredictYield = () => {
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
  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);

  // Fetch all data on component load
  useEffect(() => {
    fetchAllData();
  }, []);

  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "Noofpots":
        if (!/^\d+$/.test(value)) {
          error = "No of Pots must be an integer";
        }
        break;
      case "TempInside":
      case "TempOutside":
        if (isNaN(value) || value < 14 || value > 36) {
          error = "Temperature must be a floating value between 14.00 and 36.00";
        }
        break;
      case "HumidInside":
      case "HumidOutside":
        if (isNaN(value) || value < 64 || value > 100) {
          error = "Humidity must be a floating value between 64.00 and 100.00";
        }
        break;
      case "CO2Inside":
      case "CO2Outside":
        if (isNaN(value)) {
          error = "CO2 must be a floating value";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      return; // Don't submit if there are errors
    }

    // Round the floating point values to 2 decimal places
    const roundedFormData = {
      Noofpots: formData.Noofpots, // No need to round integer
      TempInside: Number(formData.TempInside).toFixed(2),
      HumidInside: Number(formData.HumidInside).toFixed(2),
      CO2Inside: Number(formData.CO2Inside).toFixed(2),
      TempOutside: Number(formData.TempOutside).toFixed(2),
      HumidOutside: Number(formData.HumidOutside).toFixed(2),
      CO2Outside: Number(formData.CO2Outside).toFixed(2),
    };

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/yield/predict", roundedFormData);
      setPrediction(response.data.prediction);

      const payload = {
        ...roundedFormData,
        Yield: Number(response.data.prediction).toFixed(2) // Round the predicted yield too
      };

      await axios.post("http://localhost:8080/api/v1/predictyield", payload); // Save to DB

      setFormData({
        Noofpots: "",
        TempInside: "",
        HumidInside: "",
        CO2Inside: "",
        TempOutside: "",
        HumidOutside: "",
        CO2Outside: ""
      });

      setLoading(false);
      fetchAllData(); // Refresh data in table
    } catch (error) {
      console.error("Prediction error:", error);
      setLoading(false);
    }
  };

  const fetchAllData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/predictyield");
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/predictyield/${id}`);
      fetchAllData(); // Refresh table after delete
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <Grid>
      <div>
        <Typography variant="h3">Yield</Typography><br />
        <hr />
      </div>
      <div>
        <form style={{ width: '400px' }} onSubmit={handleSubmit}>
          <TextField
            onChange={handleChange}
            label="No of Pots"
            variant="outlined"
            color="secondary"
            name="Noofpots"
            value={formData.Noofpots}
            fullWidth
            required
            error={!!errors.Noofpots}
            helperText={errors.Noofpots}
            style={{ margin: '8px 0px 0px', width: '200px' }}
          />
          <TextField
            onChange={handleChange}
            label="Temperature Inside"
            variant="outlined"
            color="secondary"
            name="TempInside"
            value={formData.TempInside}
            fullWidth
            required
            error={!!errors.TempInside}
            helperText={errors.TempInside}
            style={{ margin: '8px 0px 0px', width: '200px' }}
          />
          <TextField
            onChange={handleChange}
            label="CO2 Inside"
            variant="outlined"
            color="secondary"
            name="CO2Inside"
            value={formData.CO2Inside}
            fullWidth
            required
            error={!!errors.CO2Inside}
            helperText={errors.CO2Inside}
            style={{ margin: '8px 0px 0px', width: '200px' }}
          />
          <TextField
            onChange={handleChange}
            label="Humidity Inside"
            variant="outlined"
            color="secondary"
            name="HumidInside"
            value={formData.HumidInside}
            fullWidth
            required
            error={!!errors.HumidInside}
            helperText={errors.HumidInside}
            style={{ margin: '8px 0px 0px', width: '200px' }}
          />
          <TextField
            onChange={handleChange}
            label="Temperature Outside"
            variant="outlined"
            color="secondary"
            name="TempOutside"
            value={formData.TempOutside}
            fullWidth
            required
            error={!!errors.TempOutside}
            helperText={errors.TempOutside}
            style={{ margin: '8px 0px 0px', width: '200px' }}
          />
          <TextField
            onChange={handleChange}
            label="CO2 Outside"
            variant="outlined"
            color="secondary"
            name="CO2Outside"
            value={formData.CO2Outside}
            fullWidth
            required
            error={!!errors.CO2Outside}
            helperText={errors.CO2Outside}
            style={{ margin: '8px 0px 0px', width: '200px' }}
          />
          <TextField
            onChange={handleChange}
            label="Humidity Outside"
            variant="outlined"
            color="secondary"
            name="HumidOutside"
            value={formData.HumidOutside}
            fullWidth
            required
            error={!!errors.HumidOutside}
            helperText={errors.HumidOutside}
            style={{ margin: '8px 0px 0px', width: '200px' }}
          />
          <Button variant="contained" style={{ margin: '30px 0px 0px', width: '400px' }} type="submit">
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </form>
        {prediction && (
          <Alert severity="success">{`Prediction: ${prediction}`}</Alert>
        )}
      </div><br />
      <hr />

      <Grid xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell align="right">No of Pots</TableCell>
                <TableCell align="right">Temp Inside</TableCell>
                <TableCell align="right">CO2 Inside</TableCell>
                <TableCell align="right">Humidity Inside</TableCell>
                <TableCell align="right">Temp Outside</TableCell>
                <TableCell align="right">CO2 Outside</TableCell>
                <TableCell align="right">Humidity Outside</TableCell>
                <TableCell align="right">Yield</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row._id}>
                  <TableCell align="right">{row.Noofpots}</TableCell>
                  <TableCell align="right">{row.TempInside}</TableCell>
                  <TableCell align="right">{row.CO2Inside}</TableCell>
                  <TableCell align="right">{row.HumidInside}</TableCell>
                  <TableCell align="right">{row.TempOutside}</TableCell>
                  <TableCell align="right">{row.CO2Outside}</TableCell>
                  <TableCell align="right">{row.HumidOutside}</TableCell>
                  <TableCell align="right">{row.Yield}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="delete" onClick={() => handleDelete(row._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default PredictYield;
