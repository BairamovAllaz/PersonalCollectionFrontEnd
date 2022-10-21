import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useNavigation } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack, Tooltip, IconButton } from "@mui/material";
import UpgradeIcon from "@mui/icons-material/Upgrade";
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
        {props.currUser.userRole != true &&
        props.currUser.Id != props.userId ? (
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
                image={`${global.config.backendUrl}/uploads/${element.image}`}
                alt={`${element.name}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {element.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="p"
                  component="div"
                  sx={{ minHeight: "45px" }}
                >
                  {element.about}
                </Typography>
                <Typography variant="p">#{element.topic}</Typography>
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

                  {props.currUser.Id != props.userId &&
                  props.currUser.userRole != true ? (
                    <></>
                  ) : (
                    <div>
                      <Tooltip title="Delete Collection">
                        <IconButton>
                          <UpgradeIcon
                            onClick={() =>
                              navigate(
                                `/User/${user.Id}/Collection/${element.Id}/edit`
                              )
                            }
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Collection">
                        <IconButton sx={{ color: "red" }}>
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
