import React from "react";
import { Box } from "@material-ui/core";
import { useStyles } from "../Styles/TabCompoents.style";
import UserContainer from "../UserContainer";
function AllUsers({ value, index, AllUsers }) {
  const classes = useStyles();
  const [Users, setUsers] = React.useState([]);

  React.useEffect(() => {
    setUsers(AllUsers);
  }, [AllUsers]);

  return (
    <Box hidden={value !== index} id="allusers" aria-labelledby="All-users">
      <div className={classes.MainBox}>
        {Users.length <= 0 ? (
          <p style={{ marginTop: "30px" }}>No User</p>
        ) : (
          Users.map(user => (
            <UserContainer userProp={user} userStatus="Active" />
          ))
        )}
      </div>
    </Box>
  );
}

export default AllUsers;
