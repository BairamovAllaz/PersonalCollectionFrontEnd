import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  Avatar,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import BadgeIcon from "@mui/icons-material/Badge";
import axios from "axios";
import { UserPermisionContext } from "../../UserContext/Context";


const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function DrawerC({ isDrawerOpened, handleCloseDrawer }) {
  const navigation = useNavigate();
  const { user } = React.useContext(UserPermisionContext);

  const handleClose = () => {
    handleCloseDrawer(false);
  };

  const logout = () => {
    axios
      .get(`${global.config.backendUrl}/v1/logout`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => {
        if (sessionStorage.getItem("user")) {
          sessionStorage.removeItem("user");
        }
      })
      .catch(err => {
        console.log(err);
      });
    navigation("/auth");
  };

  const renderIcon = () => {
    if (user.userRole === true) {
      return <StarIcon sx={{ margin: "5px auto" }} />;
    } else if (user.userRole === "Guest") {
      return <AssignmentIndIcon sx={{ margin: "5px auto" }} />;
    } else {
      return <BadgeIcon sx={{ margin: "5px auto" }} />;
    }
  };

  return (
    <div>
      <Drawer
        anchor={"left"}
        open={isDrawerOpened}
        onClose={handleClose}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "260px" },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <Box role="presentation" onClick={handleClose} onKeyDown={handleClose}>
          <List>
            <ListItem
              sx={{
                display: "grid",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ListItemIcon sx={{ margin: "0 auto" }}>
                <Avatar
                  alt="image"
                  src={user.image}
                  sx={{ width: 56, height: 56 }}
                />
              </ListItemIcon>
              <ListItemText sx={{ marginTop: "20px" }}>
                {user.firstName} {user.lastName}
              </ListItemText>
              <ListItemIcon>{renderIcon()}</ListItemIcon>
              {user.isBlocked == true && (
                <p style={{ textAlign: "center" }}>
                  <LockIcon />
                  <p>Blocked</p>
                </p>
              )}
              {user.userRole === true && user.isBlocked != true ? (
                <ListItemText style={{ margin: "0 auto", marginTop: "10px" }}>
                  <Link to="/admin">Admin Page</Link>
                </ListItemText>
              ) : (
                <></>
              )}
            </ListItem>
            <ListItem sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  navigation("/");
                }}
                style={{ marginTop: "10px" }}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItemButton>
              {user.userRole !== "Guest" ? (
                <>
                  <ListItemButton
                    onClick={() => {
                      navigation(`/user/${user.Id}`);
                    }}
                    style={{ marginTop: "10px" }}
                  >
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Profil"} />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => {
                      navigation(`/User/${user.Id}/collection/create`);
                    }}
                    style={{ marginTop: "10px" }}
                  >
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Create Collection"} />
                  </ListItemButton>
                </>
              ) : (
                <></>
              )}
              <ListItemButton onClick={logout} style={{ marginTop: "10px" }}>
                <ListItemIcon>
                  <ExitToAppIcon />
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
