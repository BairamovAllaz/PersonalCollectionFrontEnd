import React from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  ListItemText,
  ListItem,
  Divider,
  ListItemIcon,
  Stack,
  Tooltip,
  IconButton,
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LockIcon from "@mui/icons-material/Lock";
import AppsIcon from "@mui/icons-material/Apps";
function UserInfoContainer({ element, user, DeleteUser }) {
  const navigate = useNavigate();
  return (
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
            margin: "30px auto",
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
              padding : "20px",
              textAlign : "center"
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
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              marginLeft: "20px",
              margin: "0 auto",
            }}
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
                primary={new Date(element.createdAt).toLocaleDateString()}
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
                      onClick={() => navigate(`/User/${element.Id}/edit`)}
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
                    <DeleteIcon onClick={() => DeleteUser(element.Id)} />
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
  );
}
export default UserInfoContainer;