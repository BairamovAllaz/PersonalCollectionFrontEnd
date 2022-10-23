import React from "react";
import UserContainer from "./UserContainer";
import Box from "@material-ui/core/Box";
function AllAdmins({ value, index, AllAdmins }) {
  const [admins, setAdmins] = React.useState([]);

  React.useEffect(() => {
    setAdmins(AllAdmins);
  }, [AllAdmins]);
  return (
    <div hidden={value !== index} id="alladmins" aria-labelledby="All-admins">
      <Box
        style={{
          width: "100%",
          maxheight: "500px",
          display: "flex",
          flexWrap: "wrap",
          overflowY: "scroll",
        }}
      >
        {admins.length <= 0 ? (
          <div style={{ width: "100%" }}>
            <p style={{textAlign : "center"}}>No admins expect you</p>
          </div>
        ) : (
          admins.map(user => (
            <UserContainer userProp={user} userStatus="Active" />
          ))
        )}
      </Box>
    </div>
  );
}

export default AllAdmins;
