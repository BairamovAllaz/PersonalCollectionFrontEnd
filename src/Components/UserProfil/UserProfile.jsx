import {useParams} from "react-router-dom";
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style = {{height : "100vh"}}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


function UserProfile() {
    const {userId} = useParams();
    const [user, setUser] = React.useState("");
    const [collections,setCollections] = React.useState([]);


    React.useEffect(() => {
        axios.get(`${global.config.backendUrl}/v1/get/${userId}`).then((response) => {
            setUser(response.data);
        }).catch((err) => {
            alert(err.response.data)
        })
    }, [])


    React.useEffect(() => {
        axios.get(`${global.config.backendUrl}/userpage/getCollections/${userId}`).then(response => {
            setCollections(response.data)
        }).catch((err) => {
            console.log(err);
        })
    },[])

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Paper variant="outlined" elevation="4" >
                                <Avatar
                                    alt="Remy Sharp"
                                    src={`${global.config.backendUrl}/uploads/${user.image}`}
                                    sx={{ width: {xs : "100px",sm : "300px"}, height: {xs : "100px",sm : "300px"},margin : "0 auto",marginTop: "10px"}}
                                />
                                <Box>
                                    <Typography sx ={{fontSize: "30px",fontWeight : "600",color : "gray",paddingTop : "10px"}}>
                                        {user.firstName} {user.lastName}
                                    </Typography>
                                </Box>
                            <Grid item>
                                <Button style = {{marginTop:"20px",width : "50%"}} variant="outlined" startIcon={<EditIcon/>}>Edit Profile</Button>
                            </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Paper variant="outlined" elevation = "4" sx = {{height : "100vh"}}>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Collection" {...a11yProps(0)} />
                                    <Tab label="Item Two" {...a11yProps(1)} />
                                    <Tab label="Item Three" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <CollectionList user = {user} collections = {collections} value={value} index={0}>
                                Item One
                            </CollectionList>
                            <TabPanel value={value} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Item Three
                            </TabPanel>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
export default UserProfile;