import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Avatar, ButtonBase, CardMedia, ListItemText } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import List from "@mui/material/List";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import { UserPermisionContext } from "../UserContext/Context";
function ItemShow() {
  const { userId, collectionId, itemId } = useParams();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = React.useState(true);
  const { user } = React.useContext(UserPermisionContext);
  const [items, setItems] = React.useState([]);
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
    if (user.userRole === "Guest") {
      alert("You cant like you are guest please register or sign");
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
    if (user.userRole === "Guest") {
      alert("You cant like you are guest please register or sign");
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
                            image={`${global.config.backendUrl}/uploads/${itemCol.image}`}
                            alt="Paella dish"
                          />
                          <p>
                            <span
                              style={{
                                color: "blue",
                                cursor: "pointer",
                                fontWeight: "700",
                              }}
                            >
                              Collection :{" "}
                            </span>
                            {collectionCol.name}
                          </p>
                          <p>
                            <span
                              style={{
                                color: "blue",
                                cursor: "pointer",
                                fontWeight: "700",
                              }}
                            >
                              Creator :{" "}
                            </span>
                            {userCol.firstName}
                          </p>
                          <p>
                            <span style={{ fontWeight: "700", color: "gray" }}>
                              Creation Time :{" "}
                            </span>{" "}
                            {new Date(itemCol.createdAt).toLocaleDateString()}
                          </p>
                          <p>
                            <span style={{ fontWeight: "700", color: "gray" }}>
                              Total Likes
                            </span>{" "}
                            : {itemCol.itemLikes.length}
                          </p>
                          {CheckUserLiked(itemCol.itemLikes) == true ? (
                            <Checkbox
                              icon={<Favorite sx={{ color: "red" }} />}
                              checkedIcon={<FavoriteBorder />}
                              onClick={() =>
                                DisLikeItem(itemCol.Id, itemCol.likes)
                              }
                              sx={{
                                marginLeft: "auto",
                                marginTop: "20px",
                              }}
                            />
                          ) : (
                            <Checkbox
                              icon={<FavoriteBorder />}
                              checkedIcon={<Favorite sx={{ color: "red" }} />}
                              onClick={() =>
                                addLikeItem(itemCol.Id, itemCol.likes)
                              }
                              sx={{
                                marginLeft: "auto",
                                marginTop: "20px",
                              }}
                            />
                          )}
                        </CardContent>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "right",
                              }}
                            >
                              <p style={{ display: "flex" }}>
                                <DeleteIcon
                                  sx={{
                                    marginLeft: "10px",
                                    color: "red",
                                    cursor: "pointer",
                                    fontSize: "20px",
                                    marginLeft: "30px",
                                  }}
                                  onClick={() => DeleteItem(itemCol.Id)}
                                />
                                <EditIcon
                                  sx={{
                                    paddingLeft: "30px",
                                    cursor: "pointer",
                                    fontSize: "20px",
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/User/${collectionCol.UserId}/collection/${collectionCol.Id}/Item/${itemCol.Id}/edit`
                                    )
                                  }
                                />
                                <OpenInNewIcon
                                  sx={{
                                    paddingLeft: "20px",
                                    cursor: "pointer",
                                    fontSize: "20px",
                                  }}
                                  onClick={() =>
                                    navigate(
                                      `/User/${userId}/collection/${collectionCol.Id}`
                                    )
                                  }
                                />
                              </p>
                            </div>
                            <List>
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
                                    style={{ fontWeight: "700", color: "gray" }}
                                  >
                                    Name :{" "}
                                  </span>
                                  {itemCol.item_name}
                                </ListItemText>
                                {itemCol.itemFields.map(fieldCol => (
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
                                ))}
                              </ListItem>
                            </List>
                          </Grid>
                          <Grid item xs={12}></Grid>
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
