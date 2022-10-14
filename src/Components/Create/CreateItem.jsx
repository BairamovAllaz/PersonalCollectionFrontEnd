import {useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import Box from "@mui/material/Box";
import {Autocomplete, Avatar, FormControl, InputLabel, Select} from "@mui/material";
import Button from "@mui/material/Button";
import {TextField} from "@material-ui/core";
import axios from 'axios'
import MenuItem from "@mui/material/MenuItem";

function CreateItem() {
    const {id} = useParams();
    const [tags, setTags] = React.useState([]);
    const [fields, setFields] = React.useState([]);
    const [values,setValues] = React.useState({});
    const [itemName,setItemName] = React.useState("");
    const [selectedTags,setSelectedTags] = React.useState("");

    React.useEffect(() => {
        axios.get(`${global.config.backendUrl}/collection/getTags`).then(response => {
            setTags(response.data)
        }).catch(err => {
            console.log(err);
        })
    }, [])

    React.useEffect(() => {
        axios.get(`${global.config.backendUrl}/collection/getFields/${id}`).then(response => {
            setFields(response.data)
        }).catch(err => {
            console.log(err);
        })
        console.log(values);
    }, [])

    const handleChange = (e,idx) => {
        let cl = [...fields];
        let obj = cl[idx];
        obj.field_value = e.target.value;
        cl[idx] = obj;
        setFields([...cl])
        console.log(fields);
    }


    const Create = () => {
        axios.put(`${global.config.backendUrl}/collection/addFieldsValue/${id}`,fields).then(response => {
            alert(response.data);
        }).catch(err => {
            console.log(err);
        })
    }

    if (tags.length === 0 || fields.length === 0) {
        return <div>Loading...</div>
    }

    const render = (element,i) => {
        if (element.field_type === "Text") {
            return <TextField id="outlined-basic"
                              variant="outlined"
                              style={{marginTop: "40px"}}
                              label={`${element.field_name}`}
                              name = {`${element.field_name}`}
                              onChange={(e) => handleChange(e,i)}
                />
        } else if (element.field_type === "Number") {
            return <TextField id="outlined-number"
                              type="number" InputLabelProps={{shrink: true}}
                              style={{marginTop: "40px"}}
                              label={`${element.field_name}`}
                              name = {`${element.field_name}`}
                              onChange={(e) => handleChange(e,i)}
                    />
        } else if (element.field_type === "BigText") {
            return <TextField id="filled-multiline-flexible" label="Multiline" multiline maxRows={4} variant="outlined"
                              style={{marginTop: "40px"}} label={`${element.field_name}`}
                              name = {`${element.field_name}`}
                              onChange={(e) => handleChange(e,i)}
                    />
        } else if (element.field_type === "Boolean") {
            return <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" style={{marginTop: "40px"}}>Age</InputLabel>
                <Select
                    label={`${element.field_name}`}
                    style={{marginTop: "40px"}}
                    InputLabelProps={{shrink: true}}
                    name = {`${element.field_name}`}
                    onChange={(e) => handleChange(e,i)}
                >
                    <MenuItem value={true}>True</MenuItem>
                    <MenuItem value={false}>False</MenuItem>
                </Select>
            </FormControl>
        } else if (element.field_type === "Date") {
            return (
                <div>
                    <TextField type="date" InputProps={{inputProps: {min: "1500-05-01", max: "2020-05-04"}}}
                               style={{marginTop: "40px", width: "100%"}}
                               InputLabelProps={{shrink: true}}
                               label={`${element.field_name}`}
                               name = {`${element.field_name}`}
                               onChange={(e) => handleChange(e,i)}
                    />
                </div>
            )
        }
    }

    return (
        <div>
            <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Typography component="h1" variant="h4" align="center">
                        Create Item
                    </Typography>
                    <React.Fragment>
                        <Box sx={{display: 'grid', justifyContent: 'center'}}>
                            <TextField id="outlined" label="Item Name" variant="outlined" style={{marginTop: "30px"}}/>
                            <br/>
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={tags}
                                getOptionLabel={(option) => option.name}
                                defaultValue={[tags[0]]}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Tags"
                                        placeholder="Favorites"
                                    />
                                )}
                                style={{marginTop: "30px"}}
                            />
                            {
                                fields.map((element,i) => (
                                    render(element,i)
                                ))
                            }
                            <Button variant="contained" style={{marginTop: "30px"}} onClick = {Create}>Create Item</Button>
                        </Box>
                    </React.Fragment>
                </Paper>
            </Container>
        </div>
    )
}

export default CreateItem;