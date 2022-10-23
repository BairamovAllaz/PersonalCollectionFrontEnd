import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { Paper } from "@material-ui/core";
import axios from "axios";
import { Avatar, Tab, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import CollectionList from "./UserProfileComponents/CollectionList";
import {
  List,
  ListItemText,
  ListItem,
  Divider,
  ListItemIcon,
  Stack,
  Tooltip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LockIcon from "@mui/icons-material/Lock";
import AppsIcon from "@mui/icons-material/Apps";
import { UserContext } from "../../Middleware/UserContext";

function UserProfile() {
  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
    marginLeft: "20px",
    margin: "0 auto",
  };
  const { userId } = useParams();
  const navigate = useNavigate();
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

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {users.map(element =>
        element.isDelete ? (
          <div>User deleted</div>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box
                style={{
                  display: "block",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Paper variant="outlined" elevation="2">
                  <Avatar
                    src={element.image}
                    sx={{
                      margin: "10px auto",
                      width: "100px",
                      height: "100px",
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "gray",
                        paddingTop: "10px",
                      }}
                    >
                      {element.firstName} {element.lastName}
                    </Typography>
                    {element.isBlocked && (
                      <Typography>
                        <p>
                          <LockIcon />
                        </p>
                        Blocked
                      </Typography>
                    )}
                    <List
                      sx={style}
                      component="nav"
                      aria-label="mailbox folders"
                    >
                      <ListItem>
                        <ListItemIcon>
                          <AlternateEmailIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={element.email}
                          sx={{ textAlign: "center" }}
                        />
                      </ListItem>
                      <Divider />
                      <ListItem divider onClick={() => navigate(`/User/${element.Id}`)}>
                        <ListItemIcon>
                          <PermContactCalendarIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={`${element.userRole ? "admin" : "user"}`}
                          sx={{ textAlign: "center" }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CalendarMonthIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={new Date(
                            element.createdAt
                          ).toLocaleDateString()}
                          sx={{ textAlign: "center" }}
                        />
                      </ListItem>
                      <Divider light />
                      <ListItem>
                        <ListItemIcon>
                          <AppsIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Count: ${element.collections.length}`}
                          sx={{ textAlign: "center" }}
                        />
                      </ListItem>
                    </List>
                  </Box>
                  <Grid item sx={{ margin: "10px" }}>
                    {user.Id === element.Id || user.userRole === true ? (
                      <div>
                        <Stack direction="row" justifyContent="center">
                          <Tooltip title="Edit User">
                            <IconButton
                              sx={{
                                cursor: "pointer",
                                marginLeft: "30px",
                              }}
                            >
                              <EditIcon
                                onClick={() =>
                                  navigate(`/User/${element.Id}/edit`)
                                }
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete User">
                            <IconButton
                              sx={{
                                cursor: "pointer",
                                marginLeft: "30px",
                              }}
                            >
                              <DeleteIcon
                                onClick={() => DeleteUser(element.Id)}
                              />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </div>
                    ) : (
                      <></>
                    )}
                  </Grid>
                </Paper>
              </Box>
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
export default UserProfile;
