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
  Stack
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./Styles/ItemsAccordion.style";
import axios from 'axios'

function ItemsAccordion({collection, userId }) {
  const classes = useStyles();
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
    <Accordion className={classes.MainAccordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <LibraryBooksIcon />
        <Typography className={classes.ItemUpdateText}>Items update</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {collection.items.map(element => (
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.ButtonBase}>
                <img
                  alt="complex"
                  src={element.image}
                  className={classes.Img}
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={6} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <div className={classes.DivItemName}>{element.item_name}</div>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    className={classes.TypoElementName}
                  >
                    <Stack direction="row">
                      <Tooltip title="Delete Item">
                        <IconButton className={classes.IconButton}>
                          <DeleteIcon onClick={() => DeleteItem(element.Id)} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Item">
                        <IconButton className={classes.IconButton}>
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
                        <IconButton className={classes.IconButton}>
                          <OpenInNewIcon
                            onClick={() =>
                              navigate(
                                `/User/${userId}/collection/${element.collectionId}/Item/${element.Id}`
                              )
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    </Stack>
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
