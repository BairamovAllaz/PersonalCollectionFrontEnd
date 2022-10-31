import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip, Stack } from "@mui/material";
import { useStyles } from "./Styles/CollectionContainer.style";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CollectionContainerButtons({
  userCol,
  collection,
  handleClickOpenDialog,
  user,
  userId,
}) {
  const classes = useStyles();
  const navigation = useNavigate();
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

  return (
    <div>
      <Stack direction="row" spacing={2}>
        {user.userRole != "Guest" &&
          user.isBlocked != true &&
          (user.Id == userId || user.userRole == true) && (
            <div>
              <Tooltip title="Delete">
                <IconButton className={classes.IconButton}>
                  <DeleteIcon onClick={() => deleteCollection(collection.Id)} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit Collection">
                <IconButton className={classes.IconButton}>
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
                <IconButton className={classes.IconButton}>
                  <AddIcon
                    onClick={() =>
                      navigation(
                        `/User/${userCol.Id}/collection/${collection.Id}/item/create`
                      )
                    }
                  />
                </IconButton>
              </Tooltip>
            </div>
          )}
        <Tooltip title="Open Description">
          <IconButton
            className={classes.IconButton}
            onClick={handleClickOpenDialog}
          >
            <DescriptionIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </div>
  );
}

export default CollectionContainerButtons;
