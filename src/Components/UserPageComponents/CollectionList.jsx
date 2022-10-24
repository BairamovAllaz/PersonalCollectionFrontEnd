import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useNavigation } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Stack, Tooltip, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Badge from "@mui/material/Badge";
import axios from "axios";

function CollectionList(props) {
  const navigate = useNavigate();
  const { user, collections } = props;

  const DeleteCollection = collectionId => {
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


  return (
    <div style={{ height: "100vh", overflowY: "auto" }}>
      <div style={{ textAlign: "right" }}>
        {(props.currUser.userRole != true &&
          props.currUser.Id != props.userId) ||
        props.currUser.isBlocked != false ? (
          <></>
        ) : (
          <Button
            variant="contained"
            sx={{ margin: "20px" }}
            startIcon={<AddIcon />}
            onClick={() => navigate(`/User/${user.Id}/collection/create`)}
          >
            Collection
          </Button>
        )}
      </div>
      <Box
        sx={{
          p: 3,
          flexWrap: "wrap",
          display: "flex",
          justifyContent: { xs: "center", sm: "left" },
        }}
      >
        {collections.length <= 0 ? (
          <div style={{ margin: "30px auto" }}>Not Collections</div>
        ) : (
          collections.map(element => (
            <Card
              sx={{ maxWidth: { xs: "320px", sm: "250px", margin: "20px" } }}
            >
              <CardMedia
                component="img"
                sx={{ maxHeight: "170px", minWidth: "280px" }}
                width="70"
                image={element.image}
                alt={`${element.name}`}
              />
              <CardContent sx = {{textAlign :"center"}}>
                <Typography gutterBottom variant="h5" component="div">
                  {element.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="p"
                  component="div"
                  sx={{ minHeight: "30px" }}
                >
                  {element.about}
                </Typography>
                <Typography variant="p">#{element.topic}</Typography>
                <Typography sx={{ mt: 2 }}>
                  {new Date(element.createdAt).toLocaleDateString()}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p>
                    <Badge
                      badgeContent={element.collectionLikes.length > 0 ? element.collectionLikes.length : "0"}
                      color="primary"
                    >
                      <FavoriteIcon color="action" />
                    </Badge>
                  </p>
                  <div style={{width : "30px"}}></div>
                  <p>
                    <Badge
                      badgeContent={element.items.length > 0 ? element.items.length : "0"}
                      color="primary"
                    >
                      <FormatListNumberedIcon color="action" />
                    </Badge>
                  </p>
                </div>
              </CardContent>
              <CardActions>
                <Stack direction="row" justifyContent="center" spacing={1}>
                  <Tooltip title="Show Collection">
                    <IconButton>
                      <VisibilityIcon
                        onClick={() =>
                          navigate(`/User/${user.Id}/collection/${element.Id}`)
                        }
                      />
                    </IconButton>
                  </Tooltip>

                  {(props.currUser.Id != props.userId &&
                    props.currUser.userRole != true) ||
                  props.currUser.isBlocked ? (
                    <></>
                  ) : (
                    <div>
                      <Tooltip title="Edit Collection">
                        <IconButton>
                          <EditIcon
                            onClick={() =>
                              navigate(
                                `/User/${user.Id}/Collection/${element.Id}/edit`
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
                              navigate(
                                `/User/${user.Id}/collection/${element.Id}/item/create`
                              )
                            }
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Collection">
                        <IconButton>
                          <DeleteIcon
                            onClick={() => DeleteCollection(element.Id)}
                          />
                        </IconButton>
                      </Tooltip>
                    </div>
                  )}
                </Stack>
              </CardActions>
            </Card>
          ))
        )}
      </Box>
    </div>
  );
}
export default CollectionList;
