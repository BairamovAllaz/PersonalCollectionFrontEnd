import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import { Grid, Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { Avatar, ButtonBase, CardMedia, Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import AppsIcon from "@mui/icons-material/Apps";
import InfoIcon from "@mui/icons-material/Info";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserPermisionContext } from "../../UserContext/Context";
import DescriptionIcon from "@mui/icons-material/Description";
import CollectionDescModal from "./CollectionShowPageComponents/CollectionDescModal";
import ItemsContainer from "./CollectionShowPageComponents/ItemsContainer";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

function CollectionShowPage() {
  const navigation = useNavigate();
  const { user } = React.useContext(UserPermisionContext);
  const { userId, collectionId } = useParams();
  const [values, setValues] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState("recommended");
  const [searchText, setSearchText] = React.useState("");
  const [Items, setItems] = React.useState([]);

  const handleClickOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleFilterChange = e => {
    setSelectedFilter(e.target.value);
  };

  const searchFilter = () => {};

  React.useEffect(() => {
    axios
      .get(
        `${global.config.backendUrl}/items/getAllItems/${userId}/${collectionId}`,
        { withCredentials: true }
      )
      .then(response => {
        setValues(response.data);
        setIsLoaded(false);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const addLikeCollection = collectionId => {
    if (user.userRole === "Guest") {
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
    if (user.userRole === "Guest") {
      alert("You cant like you are guest please register or sign");
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

  function CheckUserLiked(likes) {
    return likes.some(el => el.userId === user.Id);
  }

  if (isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {values.map(userCol =>
        userCol.collections.map(collection =>
          collection.isDelete === true ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <h1>
                <DeleteForeverIcon />
                Collection Deleted
              </h1>
            </div>
          ) : (
            <Container maxWidth="lg" style={{ border: "solid 1px black" }}>
              <Paper
                variant="outlined"
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
              >
                <Grid container>
                  <Grid item md={4} xs={12}>
                    <CardContent>
                      <Grid container>
                        <Grid item xs={6} md={12}>
                          <CardMedia
                            component="img"
                            height="194"
                            image={`${global.config.backendUrl}/uploads/${collection.image}`}
                            alt="Paella dish"
                          />
                          <CardHeader
                            avatar={
                              <Avatar
                                aria-label="recipe"
                                src={`${global.config.backendUrl}/uploads/${userCol.image}`}
                              />
                            }
                            action={
                              <IconButton aria-label="settings">
                                <RemoveRedEyeIcon
                                  onClick={() =>
                                    navigation(`/user/${userCol.Id}`)
                                  }
                                />
                              </IconButton>
                            }
                            title={`${userCol.firstName} ${userCol.lastName}`}
                            subheader={`${new Date(
                              collection.createdAt
                            ).toLocaleDateString("en-US")}`}
                          />
                        </Grid>
                        <Grid item xs={6} md={12} style={{ marginTop: "30px" }}>
                          <Typography
                            sx={{ mb: 1.5 }}
                            color="text.secondary"
                            variant="h4"
                          >
                            <AppsIcon />
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
                                <InfoIcon style={{ fontSize: "20px" }} />
                                <p style={{ marginTop: "-1px" }}>
                                  {collection.about}
                                </p>
                              </span>
                            </div>
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      {user.userRole === "Guest" ||
                      (user.Id != userId && user.userRole !== true) ? (
                        <></>
                      ) : (
                        <>
                          <DeleteIcon
                            sx={{
                              marginLeft: "20px",
                              color: "red",
                              cursor: "pointer",
                              fontSize: "30px",
                            }}
                            onClick={() => deleteCollection(collection.Id)}
                          />
                          <EditIcon
                            sx={{
                              paddingLeft: "30px",
                              cursor: "pointer",
                              fontSize: "30px",
                            }}
                            onClick={() =>
                              navigation(
                                `/User/${userCol.Id}/Collection/${collection.Id}/edit`
                              )
                            }
                          />

                          <AddIcon
                            sx={{
                              paddingLeft: "20px",
                              cursor: "pointer",
                              fontSize: "30px",
                            }}
                            onClick={() =>
                              navigation(
                                `/User/${userCol.Id}/collection/${collection.Id}/item/create`
                              )
                            }
                          />
                        </>
                      )}
                      <CollectionDescModal
                        isDialogOpened={openDialog}
                        handleCloseDialog={() => setOpenDialog(false)}
                        descText={collection.description}
                      />
                      <DescriptionIcon
                        style={{
                          fontSize: "30px",
                          marginLeft: "30px",
                          cursor: "pointer",
                        }}
                        onClick={handleClickOpenDialog}
                      />
                      {user.userRole != "Guest" ? (
                        CheckUserLiked(collection.collectionLikes) == true ? (
                          <Checkbox
                            icon={<Favorite sx={{ color: "red" }} />}
                            checkedIcon={<FavoriteBorder />}
                            onClick={() => DisLikeCollection(collection.Id)}
                            sx={{
                              marginLeft: "auto",
                              marginTop: "20px",
                            }}
                          />
                        ) : (
                          <Checkbox
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite sx={{ color: "red" }} />}
                            onClick={() => addLikeCollection(collection.Id)}
                            sx={{
                              marginLeft: "auto",
                              marginTop: "20px",
                            }}
                          />
                        )
                      ) : (
                        <></>
                      )}
                      {user.userRole != "Guest" ? (
                        <p style={{ paddingTop: "15px" }}>
                          {collection.collectionLikes.length}
                        </p>
                      ) : (
                        <></>
                      )}
                    </CardActions>
                    <Box
                      sx={{
                        width: "100%",
                        height: "200px",
                        marginTop: "20px",
                      }}
                    >
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          Filter
                        </FormLabel>
                        <TextField
                          id="filled-search"
                          label="Search field"
                          type="search"
                          variant="outlined"
                          onChange={e => {
                            setSearchText(e.target.value);
                          }}
                          sx={{
                            marginTop: "20px",
                          }}
                        />
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          checked={selectedFilter === "recommended"}
                          onChange={e => handleFilterChange(e)}
                          sx={{
                            marginTop: "20px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <FormControlLabel
                            value="ByLike"
                            control={<Radio />}
                            label="Most-Liked"
                          />
                          <FormControlLabel
                            value="ByComment"
                            control={<Radio />}
                            label="Most-Comment"
                          />
                          <FormControlLabel
                            value="latest"
                            control={<Radio />}
                            label="Latest"
                          />
                          <FormControlLabel
                            value="recommended"
                            control={<Radio />}
                            label="recommended"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <ItemsContainer
                      items={collection.items}
                      searchText={searchText}
                      selectedFilter={selectedFilter}
                      userId={userCol.Id}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Container>
          )
        )
      )}
    </div>
  );
}
export default CollectionShowPage;
