import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate, useNavigation} from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

function CollectionList(props) {
    const navigate = useNavigate();
    const { user,collections,children, value, index, ...other } = props;
    return(
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style = {{height : "100vh",overflowY : "auto"}}
            {...other}
        >
            <div style={{textAlign : "right"}}>
                <Button variant="contained" sx = {{margin : "20px"}} startIcon={<AddIcon/>} onClick = {() => navigate(`/collection/${user.Id}/create`)}>Collection</Button>
            </div>
            {value === index && (
                <Box sx={{ p: 3 , flexWrap: 'wrap',display:"flex",justifyContent: {xs : "center",sm : "left"}}}>
                    {
                        collections.map(element => (
                            <Card sx={{ maxWidth: {xs : "320px",sm : "250px",margin : "20px"}}}>
                                <CardMedia
                                    component="img"
                                    sx = {{maxHeight : "170px",minWidth : "280px"}}
                                    width = "70"
                                    image = {`${global.config.backendUrl}/uploads/${element.image}`}
                                    alt={`${element.name}`}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {element.name}
                                    </Typography>
                                    <Typography gutterBottom variant="p" component="div" sx = {{minHeight : "45px"}}>
                                        {element.about}
                                    </Typography>
                                    <Typography variant = "p">
                                        #{element.topic}
                                    </Typography>
                                </CardContent>
                                <CardActions >
                                    <Button size="small" startIcon={<VisibilityIcon/>} variant="outlined" color = "secondary">Show</Button>
                                    <Button size="small" startIcon = {<DeleteIcon/>} variant="outlined" color = "error">Delete</Button>
                                </CardActions>
                            </Card>
                        ))
                    }
                </Box>
            )}
        </div>
    )
}
export default CollectionList;