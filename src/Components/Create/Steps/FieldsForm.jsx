import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React, {useContext} from 'react';
import {Alert, FormControl, InputLabel, Select} from "@mui/material";
import { makeStyles } from '@mui/styles';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {InfoContext} from '../CreateCollection'
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';


function FieldsForm() {

    const {inputList,setInputList} = useContext(InfoContext);
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
        console.log(inputList)
    };

    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleAddClick = (x) => {
        if(x.field_name === "" || x.field_type === "") {
            alert("Please fill to add");
        }else {
            setInputList([...inputList, { field_name: "", field_type: "" }]);
        }
    }

    return(
        <div>
            <Alert severity="info">Every Item has id,name and tag field in default!</Alert>
            {
                inputList.map((x,i) => {
                    return(
                        <Grid container spacing={4} sx={{marginTop : "10px"}}>
                            <Grid item xs={5} sm = {7}>
                                <TextField
                                    required
                                    id="name"
                                    name="name"
                                    label="Field Name"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="outlined"
                                    value = {x.field_name}
                                    name = "field_name"
                                    onChange = {(e) => handleInputChange(e,i)}
                                />
                            </Grid>
                            <Grid item xs={4} sm = {3}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Age"
                                        value={x.field_type}
                                        name = "field_type"
                                        onChange = {(e) => handleInputChange(e,i)}
                                    >
                                        <MenuItem value={"Number"}>Number</MenuItem>
                                        <MenuItem value={"Text"}>Text</MenuItem>
                                        <MenuItem value={"Boolean"}>Boolean</MenuItem>
                                        <MenuItem value={"Date"}>Date</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={2} sm = {2}>
                                {
                                    inputList.length - 1 === i ? (
                                        <Button variant="contained" color = "success" style = {{marginTop : "10px"}} onClick = {() => handleAddClick(x)}>
                                            <AddCircleIcon/>
                                        </Button>
                                    ) : (
                                        <Button variant="contained" color = "error" style = {{marginTop : "10px"}} onClick = {() => handleRemoveClick(i)}>
                                            <DeleteIcon/>
                                        </Button>
                                    )
                                }
                            </Grid>
                        </Grid>
                    );
                })
            }
        </div>
    )
}
export default FieldsForm;