import React from "react";
import { useTranslation } from "react-i18next";
import { useStyles } from "./Styles/CollectionBox.style";
import {
  List,
  ListItemText,
  ListItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
function CollectionBoxInfo({ item }) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div>
      <List
        className={classes.List}
        sx={{ bgcolor: "background.paper" }}
        component="nav"
        aria-label="mailbox folders"
      >
        <Divider />
        <ListItem divider>
          <ListItemIcon>
            <p>{t("name")}</p>
          </ListItemIcon>
          <ListItemText primary={item.name} className={classes.ListItemText} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <p>{t("about")}</p>
          </ListItemIcon>
          <ListItemText primary={item.about} className={classes.ListItemText} />
        </ListItem>
        <Divider light />
        <ListItem>
          <ListItemIcon>
            <p>{t("topic")}</p>
          </ListItemIcon>
          <ListItemText primary={item.topic} className={classes.ListItemText} />
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
    </div>
  );
}

export default CollectionBoxInfo;
