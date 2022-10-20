import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AppsIcon from "@mui/icons-material/Apps";
import AllUsers from "./AllUsers";
import AllAdmins from "./AllAdmins";
import axios from 'axios';
import { UserPermisionContext } from "../../UserContext/Context";
function ManageContainer() {
  const [value, setValue] = React.useState(0);
  const [isLoadedusers, setIsLoadedusers] = React.useState(true);
  const [Users,setUsers] = React.useState([]);

  const {user} = React.useContext(UserPermisionContext);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  React.useEffect(() => { 
      axios.get(`${global.config.backendUrl}/admin/getAllUsers`).then(response => {
        setUsers(response.data);
        setIsLoadedusers(false);
      }).catch(err => { 
        console.log(err);
      })
  },[])

  if(isLoadedusers) { 
    return <div>Loading...</div>
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
      >
        <Tab
          icon={<GroupIcon />}
          label="Users"
          id="All-users"
          aria-controls="allusers"
        />
        <Tab
          icon={<AssignmentIndIcon />}
          label="Admins"
          id="All-admins"
          aria-controls="alladmins"
        />
        <Tab icon={<AppsIcon />} label="Collections" id="All collections" />
      </Tabs>
      <AllUsers value={value} index={0} AllUsers = {Users} />
      <AllAdmins value={value} index={1} AllAdmins = {Users.filter(data => data.userRole === true && data.Id != user.Id)}/>
    </Box>
  );
}

export default ManageContainer;
