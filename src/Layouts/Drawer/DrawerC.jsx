import * as React from "react";
import { styled,useTheme } from "@mui/material/styles";
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
  Button
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import LanguageIcon from "@mui/icons-material/Language";
import BadgeIcon from "@mui/icons-material/Badge";
import { useTranslation } from "react-i18next";
import {ColorModeContext} from '../../App'
import axios from "axios";
import { UserContext } from "../../Middleware/UserContext";
import i18next from "i18next";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function DrawerC({ isDrawerOpened, handleCloseDrawer }) {
  const navigation = useNavigate();
  const { user } = React.useContext(UserContext);
  const value = React.useContext(ColorModeContext);
  const theme = useTheme();
    const { t } = useTranslation();

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
        if (localStorage.getItem("user")) {
          localStorage.removeItem("user");
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


  const handleLangChange = (e) => {
    i18next.changeLanguage(e.target.value);
  }

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
                  <Link to="/admin" style={{ color: "#47c3e6" }}>
                    Admin Page
                  </Link>
                </ListItemText>
              ) : (
                <></>
              )}
              {
                user.userRole == "Guest" && (
                    <div style = {{textAlign : "center",marginTop :"20px"}}>
                        <Button onClick = {() => navigation("/auth")}>Join</Button>
                    </div>
                )
              }
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
                <ListItemText primary={t("home")} />
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
                    <ListItemText primary={t("profile")} />
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
                    <ListItemText primary={t("create_collection")} />
                  </ListItemButton>
                </>
              ) : (
                <></>
              )}
              <ListItemButton
                style={{ marginTop: "10px" }}
                onClick={value.toggleColorMode}
              >
                <ListItemIcon color="inherit">
                  {theme.palette.mode === "dark" ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={
                    theme.palette.mode === "light"
                      ? t("theme_light")
                      : t("theme_dark")
                  }
                />
              </ListItemButton>
              <ListItemButton onClick={logout} style={{ marginTop: "10px" }}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={t("log_out")} />
              </ListItemButton>

              <ListItem>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <FormControl sx={{ m: 1, minWidth: 80, mt: 2 }} size="small">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      <LanguageIcon />
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={i18next.language}
                      onChange={handleLangChange}
                      autoWidth
                      label="Age"
                    >
                      <MenuItem value=""></MenuItem>
                      <MenuItem value={"en"}>en</MenuItem>
                      <MenuItem value={"ge"}>ge</MenuItem>
                      <MenuItem value={"pol"}>pol</MenuItem>
                      <MenuItem value={"uzb"}>uzb</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </ListItem>
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>
    </div>
  );
}
export default DrawerC;
