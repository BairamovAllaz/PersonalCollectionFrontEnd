import {useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import Box from "@mui/material/Box";
import {Autocomplete, Avatar} from "@mui/material";
import Button from "@mui/material/Button";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import {TextField} from "@material-ui/core";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import axios from 'axios'

const tags = [
    {name : "Happy"},{name : "Expensive"},{name : "Beautiful"},{name : "Top"},{name : "Recomended"},{name : "Nice"}
]

function CreateItem() {
    const {id} = useParams();

    // React.useEffect(() => {
    //     axios.get(`${global.config.backendUrl}/collection/getTags/`).then(response => {
    //         setTags(response.data)
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // },[])



    return(
        <div>
            <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Typography component="h1" variant="h4" align="center">
                        Create Item
                    </Typography>
                    <React.Fragment>
                        <Box sx={{display: 'grid', justifyContent: 'center'}}>
                            <TextField id="outlined" label="Item Name" variant="outlined" style = {{marginTop : "30px"}} />
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
                                        label="Multiple values"
                                        placeholder="Favorites"
                                    />
                                )}
                                style = {{marginTop : "30px"}}
                            />
                            <br/>
                            <Button  variant="contained" style = {{marginTop : "30px"}}>Update User</Button>
                        </Box>
                    </React.Fragment>
                </Paper>
            </Container>
        </div>
    )
}
export default CreateItem;