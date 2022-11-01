import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import axios from "axios";
import LoadingPage from "../../Utils/LoadingPage";
const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
  marginLeft: "20px",
};

function InfoContainer() {
  const [infos, setInfos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    axios
      .get(`${global.config.backendUrl}/admin/GetCountInfo`,{ 
        withCredentials : true
      })
      .then(response => {
        setInfos(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <LoadingPage/>;
  }
  return (
    <List sx={style} component="nav" aria-label="mailbox folders" style = {{marginTop : "25px"}}>
      <ListItem>
        <ListItemText primary={`Total Users : ${infos.userCount}`} />
      </ListItem>
      <Divider />
      <ListItem divider>
        <ListItemText primary={`Total Admins : ${infos.adminCount}`} />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={`Total Collections : ${infos.countCollections}`}
        />
      </ListItem>
      <Divider light />
      <ListItem>
        <ListItemText primary={`Total Items: ${infos.countItems}`} />
      </ListItem>
      <ListItem>
        <ListItemText primary={`Total Blocked: ${infos.countBlockedUsers}`} />
      </ListItem>
      <ListItem>
        <ListItemText primary={`Total Deleted: ${infos.countDeletedUsers}`} />
      </ListItem>
    </List>
  );
}

export default InfoContainer;
