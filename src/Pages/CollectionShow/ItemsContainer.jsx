import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { UserContext } from "../../Middleware/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useStyles} from './Styles/ItemContainer.style'
import ItemsContainerFields from "./ItemsContainerFields";

function ItemsContainer({ items, searchText, selectedFilter, userId }) {
  const classes = useStyles();
  const { user } = React.useContext(UserContext);
  const [Items, setItems] = React.useState([]);
  const [expanded, setExpanded] = React.useState("panel_0");
  const navigate = useNavigate();

  const handleChangeExpanded = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  React.useEffect(() => {
    setItems(items);
  }, [items]);

  function CheckUserLiked(likes) {
    return likes.some(el => el.userId === user.Id);
  }

  const addLikeItem = itemId => {
    if (user.userRole === "Guest" || user.isBlocked) {
      alert(
        "You cant like you are guest OR your account BLOCKED please register or sign"
      );
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
      alert(
        "You cant like you are guest OR your account is BLOCKED please register or sign"
      );
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

  if (items.length <= 0) {
    return <div style={{ marginTop: "30px" }}>No Item yet</div>; //TODO ADD NOT ITEM COMPONENT
  }

  const SearchedItems = Items.filter(el => {
    if (searchText === "") {
      return el;
    } else {
      return el.item_name.toLowerCase().includes(searchText.toLowerCase());
    }
  });

  const FiteredItems = [...SearchedItems].sort((a, b) => {
    if (selectedFilter == "Default") {
      return -1;
    } else if (selectedFilter == "MostLiked") {
      return b.itemLikes.length - a.itemLikes.length;
    } else if (selectedFilter == "ByComment") {
      return b.itemComments.length - a.itemComments.length;
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <Box sx = {{maxWidth : {sm : "70%",xs : "100%"},margin : "30px auto"}}>
      <div>
        {/* TODO FIX REPOSNEVE MAKE STYLE */}
        {FiteredItems.map((element, id) => (
          <Accordion
            expanded={expanded === `panel_${id}`}
            onChange={handleChangeExpanded(`panel_${id}`)}
            className={classes.AccordionMain}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel_${id}d-content`}
              id={`panel_${id}d-header`}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase
                    className={classes.ButtonBase}
                    onClick={() =>
                      navigate(
                        `/User/${userId}/collection/${element.collectionId}/Item/${element.Id}`
                      )
                    }
                  >
                    <img
                      alt="complex"
                      src={element.image}
                      className={classes.Img}
                    />
                  </ButtonBase>
                  <Typography variant="subtitle1" component="div" noWrap>
                    {user.userRole != "Guest" && user.isBlocked != true && (
                      CheckUserLiked(element.itemLikes) == true ? (
                        <Checkbox
                          icon={<Favorite sx={{ color: "red" }} />}
                          checkedIcon={<FavoriteBorder />}
                          onClick={() => DisLikeItem(element.Id, element.likes)}
                          sx={{
                            marginTop: "20px",
                          }}
                        />
                      ) : (
                        <Checkbox
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite sx={{ color: "red" }} />}
                          onClick={() => addLikeItem(element.Id, element.likes)}
                          sx={{
                            marginTop: "20px",
                          }}
                        />
                      )
                    )}

                    {user.userRole !== "Guest" && user.isBlocked != true ? (
                      <span style={{ position: "relative", top: "10px" }}>
                        {element.itemLikes.length}
                      </span>
                    ) : (
                      <></>
                    )}
                    {(userId == user.Id || user.userRole == "admin") &&
                      user.isBlocked == false && (
                        <Tooltip title="Edit Item">
                          <IconButton
                            style={{ marginTop: "20px", marginLeft: "10px" }}
                            onClick={() =>
                              navigate(
                                `/User/${userId}/collection/${element.collectionId}/Item/${element.Id}/edit`
                              )
                            }
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        <span className={classes.TypoItemNameSpan}>
                          {element.item_name}
                        </span>
                        <p>{new Date(element.createdAt).toDateString()}</p>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <ItemsContainerFields element = {element}/>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Box>
  );
}

export default ItemsContainer;
