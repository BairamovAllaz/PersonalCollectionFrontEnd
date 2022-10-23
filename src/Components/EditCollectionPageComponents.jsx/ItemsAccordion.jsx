import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Tooltip,
  IconButton,
  ButtonBase,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

function ItemsAccordion({collection, userId }) {
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
  const navigate = useNavigate();
  return (
    <Accordion style={{ marginTop: "20px" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <LibraryBooksIcon />
        <Typography sx={{ ml: 2 }}>Items update</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {collection.items.map(element => (
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase sx={{ width: 80, height: 80 }}>
                <Img alt="complex" src={element.image} />
              </ButtonBase>
            </Grid>
            <Grid item xs={6} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontWeight: "700" }}>
                      {element.item_name}
                    </span>
                    <p style={{ display: "flex" }}>
                      <Tooltip title="Delete Item">
                        <IconButton
                          sx={{
                            marginLeft: "10px",
                            color: "red",
                            cursor: "pointer",
                            fontSize: "20px",
                            marginLeft: "30px",
                          }}
                        >
                          <DeleteIcon onClick={() => DeleteItem(element.Id)} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Item">
                        <IconButton
                          sx={{
                            paddingLeft: "30px",
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                        >
                          <EditIcon
                            onClick={() =>
                              navigate(
                                `/User/${collection.UserId}/collection/${collection.Id}/Item/${element.Id}/edit`
                              )
                            }
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Item">
                        <IconButton
                          sx={{
                            paddingLeft: "20px",
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                        >
                          <OpenInNewIcon
                            onClick={() =>
                              navigate(
                                `/User/${userId}/collection/${element.collectionId}/Item/${element.Id}`
                              )
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    </p>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

export default ItemsAccordion;
