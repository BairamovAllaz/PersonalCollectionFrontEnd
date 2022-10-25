import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import AppsIcon from "@mui/icons-material/Apps";
import InfoIcon from "@mui/icons-material/Info";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "../../Middleware/UserContext";
import CollectionDescModal from "./CollectionShowPageComponents/CollectionDescModal";
import ItemsContainer from "./CollectionShowPageComponents/ItemsContainer";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import DescriptionIcon from '@mui/icons-material/Description';
import {
  Tooltip,
  Checkbox,
  TextField,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
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
  Box
} from "@mui/material";

function CollectionShowPage() {
  const navigation = useNavigate();
  const { user } = React.useContext(UserContext);
  const { userId, collectionId } = useParams();
  const [values, setValues] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState("Default");
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
    <Box sx={{ width: "100%", height: "100%" }}>
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
            <Container maxWidth={false} sx={{ marginTop: "30px" }}>
              <Paper
                variant="outlined"
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
              >
                <Grid container>
                  <Grid item md={4} xs={12}>
                    <Card>
                      <CardContent>
                        <Grid container>
                          <Grid item xs={6} md={12}>
                            <CardMedia
                              component="img"
                              height="194"
                              image={collection.image}
                              alt="Paella dish"
                            />
                            <CardHeader
                              avatar={
                                <Avatar
                                  aria-label="recipe"
                                  src={userCol.image}
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
                          <Grid
                            item
                            xs={6}
                            md={12}
                            sx={{ marginTop: "30px", textAlign: "center" }}
                          >
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
                                  <InfoIcon sx={{ fontSize: "20px" }} />
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
                        user.isBlocked ||
                        (user.Id != userId && user.userRole !== true) ? (
                          <></>
                        ) : (
                          <>
                            <Tooltip title="Delete">
                              <IconButton
                                sx={{
                                  marginLeft: "20px",
                                  cursor: "pointer",
                                  fontSize: "30px",
                                }}
                              >
                                <DeleteIcon
                                  onClick={() =>
                                    deleteCollection(collection.Id)
                                  }
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Collection">
                              <IconButton
                                sx={{
                                  marginLeft: "30px",
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
                                  marginLeft: "30px",
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
                          </>
                        )}
                        <CollectionDescModal
                          isDialogOpened={openDialog}
                          handleCloseDialog={() => setOpenDialog(false)}
                          descText={collection.description}
                        />
                        <DescriptionIcon
                          sx={{
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
                    </Card>
                    <Box
                      sx={{
                        width: "100%",
                        height: "200px",
                        marginTop: "20px",
                      }}
                    >
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          <FilterListIcon />
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
                            value="MostLiked"
                            control={<Radio />}
                            label="Most-Liked"
                          />
                          <FormControlLabel
                            value="ByComment"
                            control={<Radio />}
                            label="Most-Comment"
                          />
                          <FormControlLabel
                            value="Latest"
                            control={<Radio />}
                            label="Latest"
                          />
                          <FormControlLabel
                            checked
                            value="Default"
                            control={<Radio />}
                            label="Default"
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
    </Box>
  );
}
export default CollectionShowPage;
