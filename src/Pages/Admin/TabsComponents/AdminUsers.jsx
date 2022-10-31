import React from "react";
import UserContainer from "../UserContainer";
import Box from "@material-ui/core/Box";
import {useStyles} from '../Styles/TabCompoents.style'
function AllAdmins({ value, index, AllAdmins }) {
  const classes = useStyles();
  const [admins, setAdmins] = React.useState([]);

  React.useEffect(() => {
    setAdmins(AllAdmins);
  }, [AllAdmins]);
  return (
    <div hidden={value !== index} id="alladmins" aria-labelledby="All-admins">
      <Box className={classes.MainBox}>
        {admins.length <= 0 ? (
          <div style={{ width: "100%" }}>
            <p style={{ textAlign: "center" }}>No admins expect you</p>
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
