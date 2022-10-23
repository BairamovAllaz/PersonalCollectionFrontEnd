import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {Link} from 'react-router-dom'
function RenderMenu({anchorEl,menuId,isMenuOpen,handleMenuClose,userId}) {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to={`/user/${userId}`} style={{ color: "black" }}>
          Profile
        </Link>
      </MenuItem>
    </Menu>
  );
}

export default RenderMenu;
