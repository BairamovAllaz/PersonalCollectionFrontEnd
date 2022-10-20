import React from 'react'
import { Grid, Avatar, Paper, Tooltip, IconButton,Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
function UserContainer({userProp}) {
  return (
    <Box>
      <Paper sx={{ padding: "20px 20px", margin: { sm: "20px 20px"} }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              style={{ width: "70px", height: "70px" }}
              src={`${global.config.backendUrl}/uploads/${userProp.image}`}
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
                <p style={{ marginRight: "20px" }}>{userProp.firstName}</p>
                <p style={{ marginLeft: "auto" }}>
                  {new Date(userProp.createdAt).toLocaleDateString()}
                </p>
              </div>
            </h4>
            <div style={{ textAlign: "left", color: "gray", display: "flex" }}>
              <Tooltip title="Delete" sx={{ marginLeft: "10px" }}>
                <IconButton>
                  <DeleteIcon style={{ marginLeft: "-30px" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add as Admin">
                <IconButton>
                  <PlaylistAddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Profil">
                <IconButton>
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

export default UserContainer