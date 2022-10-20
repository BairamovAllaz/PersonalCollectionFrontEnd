import React from "react";
import {Box} from '@material-ui/core'
import UserContainer from "./UserContainer";
function AllUsers({ value, index, AllUsers }) {
  const [Users, setUsers] = React.useState([]);

  React.useEffect(() => {
    setUsers(AllUsers);
  }, [AllUsers]);

  return (
    <Box hidden={value !== index} id="allusers" aria-labelledby="All-users">
      <Box
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          overflowY: "scroll",
        }}
      >
        {Users.map(user => (
          <UserContainer userProp={user} />
        ))}
      </Box>
    </Box>
  );
}

export default AllUsers;
