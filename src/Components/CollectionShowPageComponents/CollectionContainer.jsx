import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Tooltip,
  Checkbox,
  FormLabel,
  FormControl,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  CardMedia,
  Typography,
  Avatar,
  Paper,
  Grid,
  Container,
  Box,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import CollectionDescModal from "../../Components/CollectionShowPageComponents/CollectionDescModal";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

function CollectionContainer({ collection, userCol, user, userId }) {
  const navigation = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  function CheckUserLiked(likes) {
    return likes.some(el => el.userId === user.Id);
  }

  const handleClickOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  const deleteCollection = collectionId => {
    axios
      .delete(`${global.config.backendUrl}/collection/Delete/${collectionId}`, {
        withCredentials: true,
      })
      .then(response => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addLikeCollection = collectionId => {
    if (user.userRole === "Guest" || user.isBlocked) {
      alert("You cant like you are guest please register or sign");
      return;
    }
    const info = {
      collectionId,
      userId: user.Id,
    };
    axios
      .post(`${global.config.backendUrl}/collection/addLikeCollection`, info, {
        withCredentials: true,
      })
      .then(response => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const DisLikeCollection = collectionId => {
    if (user.userRole === "Guest" || user.isBlocked) {
      alert(
        "You cant like you are guest OR your account is Blocked By admins please register or sign"
      );
      return;
    }
    axios
      .get(
        `${global.config.backendUrl}/collection/CollectionDislike/${user.Id}/${collectionId}`,
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

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12} md={12}>
            <CardMedia
              component="img"
              height="194"
              image={collection.image}
              alt="Paella dish"
            />
            <CardHeader
              onClick={() => navigation(`/user/${userCol.Id}`)}
              avatar={<Avatar aria-label="recipe" src={userCol.image} />}
              style={{ cursor: "pointer", marginLeft: "-15px" }}
              title={`${userCol.firstName}`}
              subheader={`${new Date(collection.createdAt).toLocaleDateString(
                "en-US"
              )}`}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            sx={{ marginTop: "30px", textAlign: "center" }}
          >
            <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="h3">
              {collection.name}
            </Typography>
            <p>#{collection.topic}</p>
            <Typography variant="body2">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <span style={{ padding: "2px" }}>
                  <InfoIcon sx={{ fontSize: "20px" }} />
                  <p style={{ marginTop: "10px" }}>{collection.about}</p>
                </span>
              </div>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ padding: "20px" }}>
        {user.userRole === "Guest" ||
        user.isBlocked ||
        (user.Id != userId && user.userRole !== true) ? (
          <></>
        ) : (
          <>
            <Stack direction="row" spacing={2}>
              <Tooltip title="Delete">
                <IconButton
                  sx={{
                    cursor: "pointer",
                    fontSize: "30px",
                  }}
                >
                  <DeleteIcon onClick={() => deleteCollection(collection.Id)} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit Collection">
                <IconButton
                  sx={{
                    cursor: "pointer",
                    fontSize: "30px",
                  }}
                >
                  <EditIcon
                    onClick={() =>
                      navigation(
                        `/User/${userCol.Id}/Collection/${collection.Id}/edit`
                      )
                    }
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Item">
                <IconButton
                  sx={{
                    cursor: "pointer",
                    fontSize: "30px",
                  }}
                >
                  <AddIcon
                    onClick={() =>
                      navigation(
                        `/User/${userCol.Id}/collection/${collection.Id}/item/create`
                      )
                    }
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Open Description">
                <IconButton
                  sx={{
                    cursor: "pointer",
                    fontSize: "30px",
                  }}
                  onClick={handleClickOpenDialog}
                >
                  <DescriptionIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </>
        )}
        <CollectionDescModal
          isDialogOpened={openDialog}
          handleCloseDialog={() => setOpenDialog(false)}
          descText={collection.description}
        />
        <Stack direction="row" style={{ marginLeft: "auto" }}>
          {user.userRole != "Guest" ? (
            CheckUserLiked(collection.collectionLikes) == true ? (
              <Checkbox
                icon={<Favorite sx={{ color: "red" }} />}
                checkedIcon={<FavoriteBorder />}
                onClick={() => DisLikeCollection(collection.Id)}
              />
            ) : (
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
                onClick={() => addLikeCollection(collection.Id)}
              />
            )
          ) : (
            <></>
          )}
          {user.userRole != "Guest" ? (
            <p>{collection.collectionLikes.length}</p>
          ) : (
            <></>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
}
export default CollectionContainer;