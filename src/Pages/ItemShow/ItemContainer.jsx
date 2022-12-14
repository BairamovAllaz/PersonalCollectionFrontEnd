import React from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CardMedia, ListItemText, Paper, List, ListItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import CardContent from "@mui/material/CardContent";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import LikeDislikeButton from "./LikeDislikeButton";

function ItemContainer({ userId, userCol, collectionCol, itemCol, user }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const DeleteItem = itemId => {
    axios
      .delete(`${global.config.backendUrl}/items/DeleteItemById/${itemId}`, {
        withCredentials: true,
      })
      .then(response => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <CardContent>
      <CardMedia
        component="img"
        height="170"
        image={itemCol.image}
        alt="Paella dish"
      />
      <Paper sx={{ padding: "30px" }}>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            margin: "0 auto",
          }}
          component="nav"
          aria-label="mailbox folders"
        >
          <ListItem
            button
            onClick={() =>
              navigate(`/User/${userId}/collection/${collectionCol.Id}`)
            }
          >
            <ListItemText
              primary={`${t("collection")} : ${collectionCol.name}`}
            />
          </ListItem>
          <Divider />
          <ListItem divider button onClick={() => navigate(`/User/${userId}`)}>
            <ListItemText primary={`${t("Creator")} : ${userCol.firstName}`} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`${t("createdAt")} : ${new Date(
                itemCol.createdAt
              ).toLocaleDateString()}`}
            />
          </ListItem>
          <Divider light />
          <ListItem>
            <ListItemText
              primary={`${t("total_likes")}: ${itemCol.itemLikes.length}`}
            />
          </ListItem>
        </List>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          {user.userRole !== "Guest" && user.isBlocked != true && (
            <LikeDislikeButton itemCol={itemCol} user={user} />
          )}

          {(user.Id == userCol.Id || user.userRole == true) &&
            user.isBlocked == false && (
              <div>
                <Tooltip title="Delete Item">
                  <IconButton
                    sx={{
                      cursor: "pointer",
                      fontSize: "20px",
                      marginLeft: "30px",
                    }}
                  >
                    <DeleteIcon onClick={() => DeleteItem(itemCol.Id)} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit Item">
                  <IconButton
                    sx={{
                      marginLeft: "30px",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                  >
                    <EditIcon
                      onClick={() =>
                        navigate(
                          `/User/${collectionCol.userId}/collection/${collectionCol.Id}/Item/${itemCol.Id}/edit`
                        )
                      }
                    />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          <Tooltip title="Open Collection">
            <IconButton
              sx={{
                marginLeft: "20px",
                cursor: "pointer",
                fontSize: "20px",
              }}
            >
              <OpenInNewIcon
                onClick={() =>
                  navigate(`/User/${userId}/collection/${collectionCol.Id}`)
                }
              />
            </IconButton>
          </Tooltip>
        </div>
      </Paper>
    </CardContent>
  );
}
export default ItemContainer;
