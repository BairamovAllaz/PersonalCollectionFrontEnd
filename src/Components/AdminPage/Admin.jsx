import React, { useContext, useEffect, useState } from "react";
import { UserPermisionContext } from "../../UserContext/Context";
import UserContainer from "./UserContainer";
import InfoContainer from "./InfoContainer"
import ManageContainer from './ManageContainer'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Avatar, Paper, Tooltip,IconButton } from "@mui/material";
import AdminUserContainer from "./AdminUserContainer";

function Admin() {
    const { user } = React.useContext(UserPermisionContext);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item sm={3} xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <UserContainer userProp={user} userStatus="Active" />
            </Grid>
            <Grid item xs={12}>
              <InfoContainer />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={9} xs={12}>
          <ManageContainer />
        </Grid>
      </Grid>
    </div>
  );
}
export default Admin;
