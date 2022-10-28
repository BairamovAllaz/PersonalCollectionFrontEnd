import React from "react";
import { UserContext } from "../../Middleware/UserContext";
import UserContainer from "../../Components/AdminPage/Containers/UserContainer";
import InfoContainer from "../../Components/AdminPage/Containers/InfoContainer";
import Tabs from "../../Components/AdminPage/Tabs";
import { Grid } from "@mui/material";
function Admin() {
  const { user } = React.useContext(UserContext);
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
          <Tabs />
        </Grid>
      </Grid>
    </div>
  );
}
export default Admin;
