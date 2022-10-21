import React from "react";
import { Grid, Avatar, Paper, Tooltip, IconButton,Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { UserPermisionContext } from "../../UserContext/Context";
import axios from 'axios';
import { RemoveFromAdmin, DeleteUser } from "./AdminMethods";
import { useNavigate } from "react-router-dom";
function AdminUserContainer({user}) {
  const navigation = useNavigate();
  return (
    <Box
      sx={{
        height: { xs: "150px", sm: "200px" },
        margin: { xs: "10px auto", sm: "20px 0"},
      }}
    >
      <Paper style={{ padding: "20px 20px", margin: "20px 0" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              style={{ width: "70px", height: "70px" }}
              src={`${global.config.backendUrl}/uploads/${user.image}`}
            />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {user.firstName}
                <StarIcon sx = {{paddingRight :"30px"}}/>
                <p style={{ marginLeft: "auto" }}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </h4>
            <div style={{ textAlign: "left", color: "gray" }}>
              <Tooltip title="Delete">
                <IconButton onClick = {() => DeleteUser(user.Id)}>
                  <DeleteIcon style={{ marginLeft: "-10px" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Remove From admin">
                <IconButton onClick={() => RemoveFromAdmin(user.Id)}>
                  <PlaylistRemoveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Profil">
                <IconButton onClick={() => navigation(`/user/${user.Id}`)}>
                  <OpenInNewIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default AdminUserContainer;
