import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  CardMedia,
  Typography,
  Avatar,
  Grid,
  Stack,
} from "@mui/material";
import CheckBox from "@mui/material/Checkbox";
import { useStyles } from "./Styles/CollectionContainer.style";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import CollectionDescModal from "./CollectionDescModal";
import InfoIcon from "@mui/icons-material/Info";
import CollectionContainerButtons from "./CollectionContainerButtons";

function CollectionContainer({ collection, userCol, user, userId }) {
  const classes = useStyles();
  const navigation = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  function CheckUserLiked(likes) {
    return likes.some(el => el.userId === user.Id);
  }

  const handleClickOpenDialog = () => {
    setOpenDialog(!openDialog);
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
              className={classes.CardHeader}
              title={`${userCol.firstName}`}
              subheader={`${new Date(collection.createdAt).toLocaleDateString(
                "en-US"
              )}`}
            />
          </Grid>
          <Grid item xs={12} md={12} className={classes.GridContainer}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="h3">
              {collection.name}
            </Typography>
            <p>#{collection.topic}</p>
            <Typography variant="body2">
              <div className={classes.TypoAbout}>
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
        {user.userRole != "Guest" &&
          user.isBlocked != true &&
          (user.Id == userId || user.userRole == true) && (
            <CollectionContainerButtons
              userCol={userCol}
              collection={collection}
              handleClickOpenDialog={handleClickOpenDialog}
            />
          )}
        <CollectionDescModal
          isDialogOpened={openDialog}
          handleCloseDialog={() => setOpenDialog(false)}
          descText={collection.description}
        />
        <Stack direction="row" style={{ marginLeft: "auto" }}>
          {user.userRole != "Guest" &&
            (CheckUserLiked(collection.collectionLikes) == true ? (
              <CheckBox
                icon={<Favorite sx={{ color: "red" }} />}
                checkedIcon={<FavoriteBorder />}
                onClick={() => DisLikeCollection(collection.Id)}
              />
            ) : (
              <CheckBox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
                onClick={() => addLikeCollection(collection.Id)}
              />
            ))}
          {user.userRole != "Guest" && (
            <p>{collection.collectionLikes.length}</p>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
}
export default CollectionContainer;
