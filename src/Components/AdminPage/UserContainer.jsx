import React from "react";
import { Grid, Avatar, Paper, Tooltip, IconButton, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DeleteUser, AddUserToAdmin } from "./AdminMethods";
function UserContainer({ userProp,userStatus }) {

  const ReturnDeletedUser = (userId) => { 
     axios
       .put(`${global.config.backendUrl}/admin/ReturnUserById/${userId}`)
       .then(response => {
          window.location.reload();
       })
       .catch(err => {
         console.log(err);
       });
  }

  const navigation = useNavigate();
  return (
    <Box
      sx={{
        height: { xs: "150px", sm: "200px" },
        margin: { xs: "10px auto", sm: "20px 0" },
      }}
    >
      <Paper
        sx={{
          padding: "20px 20px",
          margin: { sm: "20px 20px" },
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid
            item
            style={{ display: "flex", alignItems: "center" ,cursor : "pointer"}}
            onClick={() => navigation(`/user/${userProp.Id}`)}
          >
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
              {userStatus === "Active" ? (
                <>
                  <Tooltip title="Delete" sx={{ marginLeft: "10px" }}>
                    <IconButton onClick={() => DeleteUser(userProp.Id)}>
                      <DeleteIcon style={{ marginLeft: "-30px" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add as Admin">
                    <IconButton onClick={() => AddUserToAdmin(userProp.Id)}>
                      <PlaylistAddIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => navigation(`/User/${userProp.Id}/edit`)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Profil">
                    <IconButton
                      onClick={() => navigation(`/user/${userProp.Id}`)}
                    >
                      <OpenInNewIcon />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Tooltip title="Return user">
                  <IconButton
                    sx={{ margin: "0 auto" }}
                    onClick={() => ReturnDeletedUser(userProp.Id)}
                  >
                    <KeyboardReturnIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default UserContainer;
