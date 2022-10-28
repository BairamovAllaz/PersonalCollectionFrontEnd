import React from "react";
import { UserContext } from "../../Middleware/UserContext";
import UserContainer from "../../Components/AdminPage/Containers/UserContainer";
import InfoContainer from "../../Components/AdminPage/Containers/InfoContainer";
import TabsComponents from "../../Components/AdminPage/TabsComponent";
import { Grid } from "@mui/material";
function Admin() {
  const { user } = React.useContext(UserContext);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <UserContainer userProp={user} userStatus="Active" />
            </Grid>
            <Grid item xs={12}>
              <InfoContainer />
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={8} xs={12}>
          <TabsComponents />
        </Grid>
      </Grid>
    </div>
  );
}
export default Admin;
