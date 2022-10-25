import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import DrawerC from "../Drawer/DrawerC";
import { UserContext } from "../../Middleware/UserContext";
import RenderMenu from "./NavbarComponents/RenderMenu";
import RenderMobilMenu from "./NavbarComponents/RenderMobilMenu";
import FullTextInput from "./NavbarComponents/FullTextInput";

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { user } = React.useContext(UserContext);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(!openDrawer);
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Collection
          </Typography>
          <FullTextInput/>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {user.userRole === "Guest" ? (
                <AssignmentIndIcon />
              ) : (
                <Avatar alt="image" src={user.image} />
              )}
            </IconButton>
          </Box>
          {user.userRole === "Guest" ? (
            <></>
          ) : (
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {user.userRole === "Guest" ? (
        <></>
      ) : (
        <div>
          <RenderMobilMenu
            mobileMoreAnchorEl={mobileMoreAnchorEl}
            mobileMenuId={mobileMenuId}
            isMobileMenuOpen={isMobileMenuOpen}
            handleMobileMenuClose={handleMobileMenuClose}
            handleProfileMenuOpen={handleProfileMenuOpen}
            userFirstname={user.firstName}
          />
          <RenderMenu
            anchorEl={anchorEl}
            menuId={menuId}
            isMenuOpen={isMenuOpen}
            handleMenuClose={handleMenuClose}
            userId={user.Id}
          />
        </div>
      )}
      <DrawerC
        isDrawerOpened={openDrawer}
        handleCloseDrawer={() => setOpenDrawer(false)}
      />
    </Box>
  );
}

export default Navbar;
