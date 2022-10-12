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
import {useNavigate} from "react-router-dom";
import axios from "axios";

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

    return(
        <div>
            <Drawer
                anchor={"left"}
                open={isDrawerOpened}
                onClose={handleClose}
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
                            <ListItem >
                                <ListItemButton onClick={logout}>
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