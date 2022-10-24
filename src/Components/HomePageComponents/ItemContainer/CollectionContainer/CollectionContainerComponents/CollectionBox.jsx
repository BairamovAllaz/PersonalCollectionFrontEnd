import React from "react";
import {
  Card,
  CardContent,
  Stack,
  CardMedia,
  Paper,
  List,
  ListItemText,
  ListItem,
  Divider,
  ListItemIcon,
  Tooltip,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from "react-router-dom";
function CollectionBox({ item }) {
  const navigate = useNavigate();
  return (
    <Paper style={{ width: "100%" }}>
      <Card sx={{ width: "100%" }}>
        <CardMedia
          component="img"
          sx={{ maxHeight: "250px", minWidth: "280px" }}
          width="70"
          image={item.image}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <List
            sx={{
              bgcolor: "background.paper",
              marginLeft: "20px",
              margin: "0 auto",
            }}
            component="nav"
            aria-label="mailbox folders"
          >
            <Divider />
            <ListItem divider>
              <ListItemIcon>
                <p>Name: </p>
              </ListItemIcon>
              <ListItemText primary={item.name} sx={{ textAlign: "center" }} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <p>About: </p>
              </ListItemIcon>
              <ListItemText primary={item.about} sx={{ textAlign: "center" }} />
            </ListItem>
            <Divider light />
            <ListItem>
              <ListItemIcon>
                <p>Topic: </p>
              </ListItemIcon>
              <ListItemText primary={item.topic} sx={{ textAlign: "center" }} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <p>Created At: </p>
              </ListItemIcon>
              <ListItemText
                primary={new Date(item.createdAt).toLocaleDateString()}
                sx={{ textAlign: "center" }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <p>Item Count: </p>
              </ListItemIcon>
              <ListItemText
                primary={item.ItemCount}
                sx={{ textAlign: "center" }}
              />
            </ListItem>
          </List>
          <Stack direction="row" spacing={2}>
            <Tooltip title="Open Collection">
              <IconButton
                sx={{
                  cursor: "pointer",
                  fontSize: "30px",
                  marginLeft: "30px",
                }}
                onClick={() =>
                  navigate(`/User/${item.userId}/collection/${item.Id}`)
                }
              >
                <OpenInNewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Open user">
              <IconButton
                sx={{
                  cursor: "pointer",
                  fontSize: "30px",
                }}
                onClick={() =>
                  navigate(`/User/${item.userId}`)
                }
              >
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </CardContent>
      </Card>
    </Paper>
  );
}

export default CollectionBox;
