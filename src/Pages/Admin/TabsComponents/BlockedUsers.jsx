import React from "react";
import Box from "@material-ui/core/Box";
import UserContainer from "../UserContainer";
import { useStyles } from "../Styles/TabCompoents.style";
import axios from "axios";
function BlockedUsers({ value, index }) {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`${global.config.backendUrl}/admin/GetBlockedUsers`, {
        withCredentials: true,
      })
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div
      hidden={value !== index}
      id="blockedUsers"
      aria-labelledby="Blocked-Users"
    >
      <Box className={classes.MainBox}>
        {users.length <= 0 ? (
          <div style={{ width: "100%" }}>
            <p style={{ textAlign: "center" }}>No blocked Users</p>
          </div>
        ) : (
          users.map(user => (
            <UserContainer userProp={user} userStatus="Blocked" />
          ))
        )}
      </Box>
    </div>
  );
}

export default BlockedUsers;
