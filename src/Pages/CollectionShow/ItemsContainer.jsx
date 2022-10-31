import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box ,Stack} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { UserContext } from "../../Middleware/UserContext";
import { useNavigate } from "react-router-dom";
import {useStyles} from './Styles/ItemContainer.style'
import ItemsContainerFields from "./ItemsContainerFields";
import LikeDislikeButton from "./LikeDislikeButton";

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


  if (items.length <= 0) {
    return <div style={{ marginTop: "30px" }}>No Item yet</div>;
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
    <Box sx={{ maxWidth: { sm: "70%", xs: "100%" }, margin: "30px auto" }}>
      <div>
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
                    <Stack direction="row">
                      {user.userRole != "Guest" && user.isBlocked != true && (
                        <LikeDislikeButton element={element} user={user} />
                      )}
                      {(userId == user.Id || user.userRole == "admin") &&
                        user.isBlocked == false && (
                          <Tooltip title="Edit Item">
                            <IconButton
                              style={{marginLeft: "10px" }}
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
                    </Stack>
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
              <ItemsContainerFields element={element} />
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Box>
  );
}
export default ItemsContainer;
