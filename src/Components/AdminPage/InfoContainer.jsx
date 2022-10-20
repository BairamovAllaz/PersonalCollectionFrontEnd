import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
  marginLeft: "20px",
};

function InfoContainer() {
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem>
        <ListItemText primary={`Total Users : ${0}`} />
      </ListItem>
      <Divider />
      <ListItem divider>
        <ListItemText primary={`Total Admins : ${0}`} />
      </ListItem>
      <ListItem>
        <ListItemText primary={`Total Collections : ${0}`} />
      </ListItem>
      <Divider light />
      <ListItem>
        <ListItemText primary={`Total Items: ${0}`} />
      </ListItem>
    </List>
  );
}

export default InfoContainer;
