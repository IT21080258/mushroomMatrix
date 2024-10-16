import React from "react";
import Grid from '@mui/material/Grid2';
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
import { useState } from 'react';
import app from './firebase';
import { getDownloadURL, getStorage,ref, uploadBytes } from 'firebase/storage';


const IdentifyContamination = () =>  {
    const [uploding,setUploading] = useState(false);
    const [imageURL,setImageURL] = useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [inputValue1, setInputValue1] = React.useState('');
    const handleChange = (event) => {
        setInputValue(event.target.value);
      };
      const handleChange2 = (event) => {
        setInputValue1(event.target.value);
      };
    async function handleI(e) {
        console.log(e.target.files[0]);
        const image = e.target.files[0];
        if (image){
          try{
            setUploading(true);
            const storage = getStorage(app)
            const storageRef = ref(storage,"images/"+image.name);
            await uploadBytes(storageRef,image);
            const downloadURL = await getDownloadURL(storageRef);
            console.log(downloadURL);
            setImageURL(downloadURL);
          }catch (error){
            console.log(error);
    
          }finally{
            setUploading(false);
          }
          
    
        }
      }
      async function upLoadImages(){
        const respond = await fetch("http://Localhost:8070/product",{
          method: "POST",
          headers: {
            "Content-Type":"application/json",
    
          },
          body:JSON.stringify({image:imageURL,Growshed_Code:inputValue,Rank_Number:inputValue1,Contaminated:"?"})
        });
        if(respond){
          const data = await respond.json();
          console.log(data);
        }
       
      }
    function createData(Date, growShed, rackNumber, isContaminated) {
        return {Date, growShed, rackNumber, isContaminated};
      }
      const rows = [
        createData('2024/05/05','GH1','C', 'True'),
        createData('2024/05/07','GH1','B', 'True'),
        createData('2024/05/05','GH2','C', 'False'),
        
      ];
    
return(
    <Grid>
        <div>
            <Typography variant="h3">
                Contaminations
            </Typography><br/>
            <hr/>
        </div>
        <div>
            <form style={{width:'400px'}}>
            {/* <TextField 
                // onChange={(e) => setCode(e.target.value)}
                label="Date" 
                variant="outlined" 
                color="secondary" 
                fullWidth
                required
                style={{margin: '8px 0px 0px', width:'200px'}}
            /> */}
            <TextField 
                // onChange={(e) => setCode(e.target.value)}
                label="Growshed Code" 
                variant="outlined" 
                color="secondary" 
                fullWidth
                required
                style={{margin: '8px 0px 0px', width:'200px'}}
                value={inputValue}
                onChange={handleChange}
            />            
            <TextField 
                // onChange={(e) => setCode(e.target.value)}
                label="Rack Number" 
                variant="outlined" 
                color="secondary" 
                fullWidth
                required
                style={{margin: '8px 0px 0px', width:'200px'}}
                value={inputValue1}
                onChange={handleChange2}
            />
            <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                style={{ display: 'none' }}
                onChange={handleI}
            />
            <label htmlFor="contained-button-file">
                <Button  variant="contained" component="span" style={{Margin:'30px 0px 0px', width: '400px'}}>
                   Add Image
                </Button>
            </label>
            <Button onClick={upLoadImages} variant="contained" disabled={uploding} style={{Margin:'30px 0px 0px',
                                                width: '400px'                        
                                                                        }}>
            {uploding ? "Uploading" : "Upload Image"}
            </Button>

            </form>
        </div><br/>
        <hr/>
        
        <Grid xs={12}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{width:'100%'}}>
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Grow Shed</TableCell>
                        <TableCell align="right">Rack Number</TableCell>
                        <TableCell align="right">Contaminated</TableCell>
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
                            <TableCell align="right">{row.rackNumber}</TableCell>
                            <TableCell align="right">{row.isContaminated}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    </Grid>
)
}

export default IdentifyContamination;