import {useParams} from "react-router-dom";
import React from 'react';
import {UserPermisionContext} from "../../../UserContext/Context";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UpgradeIcon from '@mui/icons-material/Upgrade';
import Container from "@mui/material/Container";
import {Avatar} from "@mui/material";
import {TextField} from "@material-ui/core";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import axios from "axios";

function UserEdit() {
    const {userId} = useParams();
    const [firstName,setFirstName] = React.useState("");
    const [lastName,setLastName] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [image,setImage] = React.useState("");

    const {user} = React.useContext(UserPermisionContext);

    React.useEffect(() => {
        console.info(user);
    }, [])

    const ForgotPassword = () => {
        axios.post(`${global.config.backendUrl}/v1/forgot-password`, {email: user.email}).then((response) => {
            alert("We sended a link to change your password check your email");
        }).catch((err) => {
            alert(err.response.data)
        })
    }

    const UpdateUser = (e) => {
        e.preventDefault();
        const updates = CheckUpdates(e);
        const toUpdate = removeEmpty(updates);
        axios.put(`${global.config.backendUrl}/userpage/updateUser/${userId}`, toUpdate).then((response) => {
            alert(response.data);
        }).catch((err) => {
            alert(err.response.data)
        })
    }
    function removeEmpty(updates) {
        return Object.fromEntries(Object.entries(updates).filter(([_, v]) => v != ""));
    }

    function CheckUpdates(e) {
        let updates = {};
        if(user.firstName !== firstName) {
            updates.firstName = firstName;
        }
        if(user.lastName !== e.lastName) {
            updates.lastName = lastName;
        }
        if(user.email !== e.email) {
            updates.email = email;
        }
        return updates;
    }

    return (
        <div>
            <Container component="main" maxWidth="sm" sx={{mb: 4}}>
                <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
                    <Typography component="h1" variant="h4" align="center">
                        Update
                    </Typography>
                    <React.Fragment>
                        <Box sx={{display: 'grid', justifyContent: 'center'}}>
                            <Avatar
                                alt="User"
                                src={`${global.config.backendUrl}/uploads/${user.image}`}
                                sx={{ width: 120, height: 120,marginTop : "20px",margin : "0 auto"}}
                            />
                            <Button startIcon = {<UpgradeIcon/>} variant="contained" sx = {{marginTop : "20px"}}>Image</Button>
                            <br/>
                            <TextField id="outlined" label="FirstName" variant="outlined" defaultValue={`${user.firstName}`} onChange = {(e) => setFirstName(e.target.value)}/>
                            <br/>
                            <TextField id="outlined" label="LastName" variant="outlined" defaultValue={`${user.lastName}`} onChange = {(e) => setLastName(e.target.value)}/>
                            <br/>
                            <TextField id="outlined" label="Email" variant="outlined" defaultValue={`${user.email}`}  onChange = {(e) => setEmail(e.target.value)}/>
                            <br/>
                                <Button sx = {{width : "300px"}} color = "secondary" startIcon = {<ChangeCircleIcon/>} onClick={ForgotPassword}>Change Password</Button>
                            <br/>
                            <Button  variant="contained" onClick = {UpdateUser}>Update User</Button>
                        </Box>
                    </React.Fragment>
                </Paper>
            </Container>
        </div>
    )
}

export default UserEdit;