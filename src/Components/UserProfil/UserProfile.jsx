import {useNavigate, useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import * as React from "react";
import {styled} from '@mui/material/styles';
import {Paper} from "@material-ui/core";
import axios from "axios";
import {Avatar, Tab, Tabs} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import CollectionList from "./UserProfileComponents/CollectionList";

function UserProfile() {
    const {userId} = useParams();
    const navigate = useNavigate();
    const [user,setUser] = React.useState([]);

    React.useEffect(() => {
        axios.get(`${global.config.backendUrl}/userpage/getCollections/${userId}`).then(response => {
            setUser(response.data);
        }).catch((err) => {
            console.log(err);
        })
    },[])

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if(user.length < 0) {
       return <div>Loading</div>
    }

    return (
        <div>
            {
                user.map(element => (
                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={4}>
                            <Paper variant="outlined" elevation="2" >
                                <Avatar
                                    alt="Remy Sharp"
                                    src={`${global.config.backendUrl}/uploads/${element.image}`}
                                    sx={{ width: {xs : "100px",sm : "300px"}, height: {xs : "100px",sm : "300px"},margin : "0 auto",marginTop: "10px"}}
                                />
                                <Box>
                                    <Typography sx ={{fontSize: "30px",fontWeight : "600",color : "gray",paddingTop : "10px"}}>
                                        {element.firstName} {element.lastName}
                                    </Typography>
                                </Box>
                                <Grid item>
                                    <Button style = {{marginTop:"20px",width : "50%",marginBottom : "30px"}} variant="outlined" startIcon={<EditIcon/>}
                                            onClick = {() => navigate(`/User/${element.Id}/edit`)}>Edit Profile</Button>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Paper variant="outlined" elevation = "4" sx = {{height : "100vh"}}>
                                <Box sx={{ width: '100%' }}>
                                    <CollectionList user = {element} collections = {element.collections} value={value} index={0}>
                                        Item One
                                    </CollectionList>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                ))
            }
        </div>
    )
}
export default UserProfile;