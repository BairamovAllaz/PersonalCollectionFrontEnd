import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import * as React from "react";
import {styled} from "@mui/material/styles";
import Drawer from '@mui/material/Drawer';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function DrawerC({isDrawerOpened, handleCloseDrawer}) {
    const handleClose = () => {
        handleCloseDrawer(false);
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
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer>
        </div>
    );
}
export default DrawerC;