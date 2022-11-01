import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import FolderDeleteIcon from "@mui/icons-material/FolderDelete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import NormalUsers from "./TabsComponents/NormalUsers";
import AdminUsers from "./TabsComponents/AdminUsers";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import DeletedUsers from "./TabsComponents/DeletedUsers";
import BlockedUsers from "./TabsComponents/BlockedUsers";
import LoadingPage from "../../Utils/LoadingPage";
function TabsComponents() {
  const [value, setValue] = React.useState(0);
  const [isLoadedusers, setIsLoadedusers] = React.useState(true);
  const [Users, setUsers] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");

  const { user } = React.useContext(UserContext);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    axios
      .get(`${global.config.backendUrl}/admin/getAllUsers`, {
        withCredentials: true,
      })
      .then(response => {
        setUsers(response.data);
        setIsLoadedusers(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const filteredData = Users.filter(el => {
    if (searchText === "") {
      return el;
    } else {
      return el.firstName.toLowerCase().includes(searchText.toLowerCase());
    }
  });

  if (isLoadedusers) {
    return <LoadingPage />;
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
        <Tab
          icon={<FolderDeleteIcon />}
          label="Deleted"
          id="Deleted-Users"
          aria-controls="deletedUsers"
        />
        <Tab
          icon={<RemoveCircleOutlineIcon />}
          label="Blocked"
          id="Blocked-Users"
          aria-controls="blockedUsers"
        />
      </Tabs>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <TextField
          size="small"
          onChange={e => setSearchText(e.target.value)}
          style={{ margin: "20px" }}
          placeholder="Search"
        />
      </Box>
      <Box
        sx={{
          wdith: "100%",
          maxHeight: "100vh",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <NormalUsers
          value={value}
          index={0}
          AllUsers={filteredData.filter(
            data => data.Id != user.Id && data.userRole === false
          )}
        />
        <AdminUsers
          value={value}
          index={1}
          AllAdmins={filteredData.filter(
            data => data.userRole === true && data.Id != user.Id
          )}
        />
        <DeletedUsers value={value} index={2} />
        <BlockedUsers value={value} index={3} />
      </Box>
    </Box>
  );
}

export default TabsComponents;
