import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import CardContent from "@mui/material/CardContent";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

import {
  Avatar,
  ButtonBase,
  CardMedia,
  ListItemText,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import List from "@mui/material/List";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import { UserContext } from "../../Middleware/UserContext";
import CommentBox from "./ItemShowComponents/CommentBox";
import InfoIcon from "@mui/icons-material/Info";
function ItemShow() {
  const { userId, collectionId, itemId } = useParams();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = React.useState(true);
  const { user } = React.useContext(UserContext);
  const [items, setItems] = React.useState([]);
  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
    marginLeft: "20px",
  };
  React.useEffect(() => {
    axios
      .get(
        `${global.config.backendUrl}/items/getItemsById/${userId}/${collectionId}/${itemId}`
      )
      .then(response => {
        setItems(response.data);
        setIsLoaded(false);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const addLikeItem = itemId => {
    if (user.userRole === "Guest" || user.isBlocked) {
      alert("You cant like you are guest OR you are blocked please register or sign");
      return;
    }
    const info = {
      itemId,
      userId: user.Id,
    };
    axios
      .post(`${global.config.backendUrl}/items/addLikeItem`, info, {
        withCredentials: true,
      })
      .then(response => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const DisLikeItem = itemId => {
    if (user.userRole === "Guest" || user.isBlocked) {
      alert("You cant like you are guest OR you are blocked please register or sign");
      return;
    }
    axios
      .get(
        `${global.config.backendUrl}/items/ItemDislike/${user.Id}/${itemId}`,
        {
          withCredentials: true,
        }
      )
      .then(response => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  function CheckUserLiked(likes) {
    return likes.some(el => el.userId === user.Id);
  }

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

  if (isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {items.length <= 0 ? (
        <h2>Item not exsist OR deleted!!</h2>
      ) : (
        items.map(userCol => (
          <div>
            {userCol.collections.map(collectionCol => (
              <div>
                {collectionCol.items.map(itemCol => (
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <CardContent>
                          <CardMedia
                            component="img"
                            height="170"
                            image={itemCol.image}
                            alt="Paella dish"
                          />
                          <Paper sx={{ padding: "30px" }}>
                            <List
                              sx={style}
                              component="nav"
                              aria-label="mailbox folders"
                            >
                              <ListItem
                                button
                                onClick={() =>
                                  navigate(
                                    `/User/${userId}/collection/${collectionCol.Id}`
                                  )
                                }
                              >
                                <ListItemText
                                  primary={`Collection : ${collectionCol.name}`}
                                />
                              </ListItem>
                              <Divider />
                              <ListItem
                                divider
                                button
                                onClick={() => navigate(`/User/${userId}`)}
                              >
                                <ListItemText
                                  primary={`Creator : ${userCol.firstName}`}
                                />
                              </ListItem>
                              <ListItem>
                                <ListItemText
                                  primary={`Creation Time : ${new Date(
                                    itemCol.createdAt
                                  ).toLocaleDateString()}`}
                                />
                              </ListItem>
                              <Divider light />
                              <ListItem>
                                <ListItemText
                                  primary={`Total Likes: ${itemCol.itemLikes.length}`}
                                />
                              </ListItem>
                            </List>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {user.userRole !== "Guest" &&
                              user.isBlocked != true ? (
                                CheckUserLiked(itemCol.itemLikes) == true ? (
                                  <Checkbox
                                    icon={<Favorite sx={{ color: "red" }} />}
                                    checkedIcon={<FavoriteBorder />}
                                    onClick={() =>
                                      DisLikeItem(itemCol.Id, itemCol.likes)
                                    }
                                  />
                                ) : (
                                  <Checkbox
                                    icon={<FavoriteBorder />}
                                    checkedIcon={
                                      <Favorite sx={{ color: "red" }} />
                                    }
                                    onClick={() =>
                                      addLikeItem(itemCol.Id, itemCol.likes)
                                    }
                                  />
                                )
                              ) : (
                                <></>
                              )}

                              {(user.Id != userCol.Id &&
                              user.userRole != true) ||
                              user.isBlocked == true ? (
                                <></>
                              ) : (
                                <div>
                                  <Tooltip title="Delete Item">
                                    <IconButton
                                      sx={{
                                        color: "red",
                                        cursor: "pointer",
                                        fontSize: "20px",
                                        marginLeft: "30px",
                                      }}
                                    >
                                      <DeleteIcon
                                        onClick={() => DeleteItem(itemCol.Id)}
                                      />
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
                                      navigate(
                                        `/User/${userId}/collection/${collectionCol.Id}`
                                      )
                                    }
                                  />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </Paper>
                        </CardContent>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} style={{ marginTop: "20px" }}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "right",
                              }}
                            ></div>
                            <Paper sx={{ padding: "10px" }}>
                              <div
                                style={{
                                  textAlign: "left",
                                  fontSize: "20px",
                                  paddingTop: "-40px",
                                }}
                              >
                                <InfoIcon />
                              </div>
                              <List sx={{ marginBottom: "30px" }}>
                                <ListItem
                                  sx={{
                                    display: "grid",
                                    justifyContent: "center",
                                    marginTop: "-30px",
                                  }}
                                >
                                  <ListItemText sx={{ marginTop: "20px" }}>
                                    <Stack
                                      direction="row"
                                      sx={{ marginLeft: "-10px" }}
                                    >
                                      {itemCol.itemTags.map(tag => (
                                        <div>
                                          <Chip label={tag.tag_name} />
                                        </div>
                                      ))}
                                    </Stack>
                                  </ListItemText>
                                  <ListItemText sx={{ marginTop: "20px" }}>
                                    <span
                                      style={{
                                        fontWeight: "700",
                                        color: "gray",
                                      }}
                                    >
                                      Name :{" "}
                                    </span>
                                    {itemCol.item_name}
                                  </ListItemText>
                                  {itemCol.itemFields.map(fieldCol => (
                                    <div>
                                      <ListItemText sx={{ marginTop: "20px" }}>
                                        <span
                                          style={{
                                            fontWeight: "700",
                                            color: "gray",
                                          }}
                                        >
                                          {fieldCol.field_name}
                                        </span>{" "}
                                        : {fieldCol.field_value}
                                      </ListItemText>
                                    </div>
                                  ))}
                                </ListItem>
                              </List>
                            </Paper>
                          </Grid>
                          <Grid item xs={12}>
                            <CommentBox
                              currUser={user}
                              itemId={itemCol.Id}
                              userRole={userCol.userRole}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default ItemShow;
