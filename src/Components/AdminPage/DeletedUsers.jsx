import React from "react";
import UserContainer from "./UserContainer";
import axios from "axios";
import {Box} from '@mui/material'
function DeletedUsers({ value, index }) {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    axios
      .get(`${global.config.backendUrl}/admin/GetDeletedUsers`)
      .then(response => {
        setUsers(response.data);
        console.log(response.data)
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if(loading) { 
    return <div>loading...</div>
  }

  return (
    <div
      hidden={value !== index}
      id="deletedUsers"
      aria-labelledby="Deleted-Users"
    >
      <Box
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexWrap: "wrap",
          overflowY: "scroll",
        }}
      >
        {users.map(user => (
          <UserContainer userProp={user} />
        ))}
      </Box>
    </div>
  );
}

export default DeletedUsers;
