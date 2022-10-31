import React from "react";
import { Grid, Avatar, Paper, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./Styles/UserContainer.style";
import UserContainerToolTip from "./UserContainerToolTip";
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
              <UserContainerToolTip userStatus={userStatus} userProp = {userProp}/>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default UserContainer;
