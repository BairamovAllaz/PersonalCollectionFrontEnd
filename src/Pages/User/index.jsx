import { useParams } from "react-router-dom";
import * as React from "react";
import axios from "axios";
import { Box, Paper, Grid } from "@mui/material";
import CollectionList from "./CollectionList";
import { UserContext } from "../../Middleware/UserContext";
import UserInfoContainer from "./UserInfoContainer";
import LoadingPage from "../../Utils/LoadingPage";

function UserPage() {
  const { userId } = useParams();
  const [value, setValue] = React.useState(0);
  const { user } = React.useContext(UserContext);
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`${global.config.backendUrl}/userpage/getCollections/${userId}`)
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const DeleteUser = userId => {
    axios
      .delete(`${global.config.backendUrl}/admin/DeleteUserById/${userId}`)
      .then(response => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return <LoadingPage/>
  }

  return (
    <div>
      {users.map(element =>
        element.isDelete ? (
          <div>User deleted</div>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <UserInfoContainer
                element={element}
                user={user}
                DeleteUser={DeleteUser}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper variant="outlined" elevation="4" sx={{ height: "100vh" }}>
                <Box sx={{ width: "100%" }}>
                  <CollectionList
                    user={element}
                    collections={element.collections}
                    value={value}
                    index={0}
                    currUser={user}
                    userId={userId}
                  >
                    Item One
                  </CollectionList>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )
      )}
    </div>
  );
}
export default UserPage;