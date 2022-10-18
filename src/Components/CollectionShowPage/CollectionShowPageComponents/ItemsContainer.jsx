import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { UserPermisionContext } from "../../../UserContext/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

function ItemsContainer({ items, searchText, selectedFilter,userId }) {
  const { user } = React.useContext(UserPermisionContext);
  const [Items, setItems] = React.useState([]);
  const [expanded, setExpanded] = React.useState("panel_0");
  const navigate = useNavigate();

  const handleChangeExpanded = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  React.useEffect(() => {
    setItems(items);
  }, [items]);

  //TODO FIX FILTER AGAIN
  React.useEffect(() => {
    // if (selectedFilter === "recommended") {
    //    setItems(Items);
    // } else if (selectedFilter === "ByLike") {

    if (selectedFilter === "ByLike") {
      const lowestPriceGoods = items.sort(
        (el1, el2) => el2.itemLikes.length - el1.itemLikes.length
      );
      setItems(lowestPriceGoods);
    }

    // } else {
    //   setItems(items);
    // }
  }, [selectedFilter]);

  function CheckUserLiked(likes) {
    return likes.some(el => el.userId === user.Id);
  }

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

  if (items.length <= 0) {
    return <div style={{ marginTop: "30px" }}>No Item yet</div>;
  }

  return (
    <Box
      sx={{
        marginTop: "20px",
        width: "100%",
        height: "100%",
        overflowY: "auto",
        marginLeft: { sm: "140px" },
      }}
    >
      <div>
        {Items.filter(el => {
          if (searchText === "") {
            return el;
          } else if (
            el.item_name.toLowerCase().includes(searchText.toLowerCase())
          ) {
            return el;
          }
        }).map((element, id) => (
          <Accordion
            expanded={expanded === `panel_${id}`}
            onChange={handleChangeExpanded(`panel_${id}`)}
            sx={{
              marginTop: "10px",
              width: { xs: "100%", sm: "60%" },
              border: "solid 1px #e3e1da",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel_${id}d-content`}
              id={`panel_${id}d-header`}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 80, height: 80 }}>
                    <Img
                      alt="complex"
                      src={`${global.config.backendUrl}/uploads/${element.image}`}
                    />
                  </ButtonBase>
                  <Typography variant="subtitle1" component="div" noWrap>
                    {CheckUserLiked(element.itemLikes) == true ? (
                      <Checkbox
                        icon={<Favorite sx={{ color: "red" }} />}
                        checkedIcon={<FavoriteBorder />}
                        onClick={() => DisLikeItem(element.Id, element.likes)}
                        sx={{
                          marginLeft: "auto",
                          marginTop: "20px",
                        }}
                      />
                    ) : (
                      <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite sx={{ color: "red" }} />}
                        onClick={() => addLikeItem(element.Id, element.likes)}
                        sx={{
                          marginLeft: "auto",
                          marginTop: "20px",
                        }}
                      />
                    )}
                    <span style={{ position: "relative", top: "10px" }}>
                      {element.itemLikes.length}
                    </span>

                    <Button style={{ marginTop: "20px" }}>
                      <OpenInNewIcon
                        onClick={() =>
                          navigate(
                            `/User/${userId}/collection/${element.collectionId}/Item/${element.Id}`
                          )
                        }
                      />
                    </Button>
                  </Typography>
                </Grid>
                <Grid item xs={6} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                        sx={{ display: "block", justifyContent: "center" }}
                      >
                        <span style={{ fontWeight: "700" }}>
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
              <div>
                <Stack direction="row" spacing={1}>
                  {element.itemTags.map(tag => (
                    <div>
                      <Chip label={tag.tag_name} />
                    </div>
                  ))}
                </Stack>

                {element.itemFields.map(field => (
                  <p style={{ textAlign: "left" }}>
                    {field.field_value == "" ? (
                      <></>
                    ) : (
                      <p>
                        <span style={{ color: "#88909e", fontWeight: "700" }}>
                          {field.field_name}
                        </span>{" "}
                        : <span>{field.field_value}</span>
                      </p>
                    )}
                  </p>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Box>
  );
}

export default ItemsContainer;
