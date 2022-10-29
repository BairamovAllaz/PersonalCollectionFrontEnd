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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./Styles/CollectionBox.style";
function CollectionBox({ item }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateTo = url => {
    navigate(url);
  };
  return (
    <Paper className={classes.PaperContainer}>
      <Card className={classes.CardContainer}>
        <CardMedia
          component="img"
          className={classes.CardMedia}
          width = "70"
          image={item.image}
        />
        <CardContent className={classes.CardContent}>
          <List
            className={classes.List}
            sx = {{bgcolor : "background.paper"}}
            component="nav"
            aria-label="mailbox folders"
          >
            <Divider />
            <ListItem divider>
              <ListItemIcon>
                <p>{t("name")}</p>
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                className={classes.ListItemText}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <p>{t("about")}</p>
              </ListItemIcon>
              <ListItemText
                primary={item.about}
                className={classes.ListItemText}
              />
            </ListItem>
            <Divider light />
            <ListItem>
              <ListItemIcon>
                <p>{t("topic")}</p>
              </ListItemIcon>
              <ListItemText
                primary={item.topic}
                className={classes.ListItemText}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <p>{t("item_count")}</p>
              </ListItemIcon>
              <ListItemText
                primary={item.ItemCount}
                className={classes.ListItemText}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <p>{t("created_by")}</p>
              </ListItemIcon>
              <ListItemText
                primary={`${item.user.firstName} ${item.user.lastName}`}
                className={classes.ListItemText}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <p>{t("createdAt")}</p>
              </ListItemIcon>
              <ListItemText
                primary={new Date(item.createdAt).toLocaleDateString()}
                className={classes.ListItemText}
              />
            </ListItem>
          </List>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Tooltip title="Open Collection">
              <IconButton
                className={classes.IconButton}
                onClick={() =>
                  navigateTo(`/User/${item.userId}/collection/${item.Id}`)
                }
              >
                <OpenInNewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Open user">
              <IconButton
                className={classes.IconButtonAccount}
                onClick={() => navigateTo(`/User/${item.userId}`)}
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
