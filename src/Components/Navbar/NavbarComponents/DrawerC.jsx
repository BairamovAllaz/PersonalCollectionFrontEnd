import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import * as React from "react";
import {styled} from "@mui/material/styles";
import Drawer from '@mui/material/Drawer';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Link, useNavigate} from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import BadgeIcon from '@mui/icons-material/Badge';
import axios from "axios";
import {Avatar} from "@mui/material";
import {UserPermisionContext} from "../../../UserContext/Context";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


function DrawerC({isDrawerOpened, handleCloseDrawer}) {
    const navigation = useNavigate();
    const {user} = React.useContext(UserPermisionContext);

    const handleClose = () => {
        handleCloseDrawer(false);
    }

    const logout = () => {
        axios.get(`${global.config.backendUrl}/v1/logout`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response.data);
            localStorage.clear();
        }).catch((err) => {
            console.log(err);
        })
        navigation("/auth");
    }

    const renderIcon = () => {
        if(user.userRole === true) {
            return <StarIcon sx = {{margin : "5px auto"}}/>
        }else if(user.userRole === "Guest") {
            return  <AssignmentIndIcon sx = {{margin : "5px auto"}}/>
        }else {
            return <BadgeIcon sx = {{margin : "5px auto"}}/>
        }
    }

    return(
        <div>
            <Drawer
                anchor={"left"}
                open={isDrawerOpened}
                onClose={handleClose}
                sx={{
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "260px" },
                }}
            >
                <DrawerHeader>
                    <IconButton onClick={handleClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </DrawerHeader>

                <Box
                    role="presentation"
                    onClick={handleClose}
                    onKeyDown={handleClose}
                >
                    <List>
                        <ListItem sx = {{display : "grid",justifyContent : "center",alignItems : "center"}}>
                                <ListItemIcon sx={{margin : "0 auto"}}>
                                    <Avatar
                                        alt="image"
                                        src={`${global.config.backendUrl}/uploads/${user.image}`}
                                        sx={{ width: 56, height: 56 }}
                                    />
                                </ListItemIcon>
                                <ListItemText sx = {{marginTop : "20px"}}>
                                    {user.firstName} {user.lastName}
                                </ListItemText>
                                <ListItemIcon>
                                    {renderIcon()}
                                </ListItemIcon>
                                {
                                    user.userRole === true ? (
                                        <ListItemText style = {{margin : "0 auto",marginTop : "10px"}}>
                                            <Link to = "/admin">Admin Page</Link>
                                        </ListItemText>
                                    ) : (
                                        <></>
                                    )
                                }
                            </ListItem>
                        <ListItem sx = {{display : "block"}}>
                            <ListItemButton onClick={() => {navigation('/')}} style = {{marginTop :"10px"}}>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Home"} />
                            </ListItemButton>
                            {
                                user.userRole !== 'Guest'  ? (
                                    <>
                                        <ListItemButton onClick={() => {navigation(`/user/${user.Id}`)}} style = {{marginTop :"10px"}}>
                                            <ListItemIcon>
                                                <AccountCircleIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary={"Profil"} />
                                        </ListItemButton>
                                    <ListItemButton onClick={() => { navigation(`/collection/${user.Id}/create`)}} style = {{marginTop :"10px"}}>
                                        <ListItemIcon>
                                            <AddIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={"Create Collection"} />
                                    </ListItemButton>
                                    </>
                                ) : (
                                    <></>
                                )
                            }

                            <ListItemButton onClick={logout} style = {{marginTop :"10px"}}>
                                <ListItemIcon>
                                    <ExitToAppIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"LogOut"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                </Box>
            </Drawer>
        </div>
    );
}
export default DrawerC;