import React from "react";
import { Grid, Avatar, Paper, Tooltip, IconButton, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import axios from "axios";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import BlockIcon from "@mui/icons-material/Block";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./Styles/UserContainer.style";
import {
  DeleteUser,
  AddUserToAdmin,
  RemoveFromAdmin,
  BlockUserById,
  ReturnDeletedUser,
  ReturnBlockedUser
} from "./AdminMethods/AdminMethods";
function UserContainer({ userProp, userStatus }) {
  const classes = useStyles();
  const navigation = useNavigate();
  return (
    <Box
      sx={{
        height: { xs: "150px", sm: "200px" },
        minWidth: "100%",
        margin: { xs: "10px auto" },
      }}
    >
      <Paper
        sx={{
          padding: "20px 20px",
          margin: { sm: "0px 20px" },
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid
            item
            className={classes.DivUserProfile}
            onClick={() => navigation(`/user/${userProp.Id}`)}
          >
            <Avatar
            className = {classes.Avatar}
              src={userProp.image}
            />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>
              <div className = {classes.DivContaier}>
                <p
                  style={{ marginRight: "20px", cursor: "pointer" }}
                  onClick={() => navigation(`/user/${userProp.Id}`)}
                >
                  {userProp.firstName}
                </p>
                {userProp.userRole == true && (
                  <StarIcon sx={{ fontSize: "20px" }} />
                )}
                <p style={{ marginLeft: "auto" }}>
                  {new Date(userProp.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p style={{ fontSize: "13px" }}>{userProp.email}</p>
            </h4>
            <div style={{ textAlign: "left", color: "gray", display: "flex" }}>
              {userStatus === "Active" ? (
                <>
                  <Tooltip title="Delete" sx={{ marginLeft: "10px" }}>
                    <IconButton onClick={() => DeleteUser(userProp.Id)}>
                      <DeleteIcon style={{ marginLeft: "-30px" }} />
                    </IconButton>
                  </Tooltip>
                  {userProp.userRole == true ? (
                    <Tooltip title="Remove From admin">
                      <IconButton onClick={() => RemoveFromAdmin(userProp.Id)}>
                        <PlaylistRemoveIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Add as Admin">
                      <IconButton onClick={() => AddUserToAdmin(userProp.Id)}>
                        <PlaylistAddIcon />
                      </IconButton>
                    </Tooltip>
                  )}

                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => navigation(`/User/${userProp.Id}/edit`)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Block">
                    <IconButton
                      onClick={() => {
                        BlockUserById(userProp.Id);
                      }}
                    >
                      <BlockIcon />
                    </IconButton>
                  </Tooltip>
                </>
              ) : userStatus == "Blocked" ? (
                <Tooltip title="UnBlock user">
                  <IconButton
                    sx={{ margin: "0 auto" }}
                    onClick={() => ReturnBlockedUser(userProp.Id)}
                  >
                    <AutorenewIcon />
                  </IconButton>
                </Tooltip>
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
