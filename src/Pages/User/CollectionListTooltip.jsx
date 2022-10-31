import React from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { Stack, Tooltip, IconButton } from "@mui/material";
import axios from "axios";

function CollectionListTooltip({ user, element, currUser,userId }) {
  const navigate = useNavigate();
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
    <div>
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
        {(currUser.Id == userId || currUser.userRole == true) &&
          currUser.isBlocked != true && (
            <div>
              <Tooltip title="Edit Collection">
                <IconButton>
                  <EditIcon
                    onClick={() =>
                      navigate(`/User/${user.Id}/Collection/${element.Id}/edit`)
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
                  <DeleteIcon onClick={() => DeleteCollection(element.Id)} />
                </IconButton>
              </Tooltip>
            </div>
          )}
      </Stack>
    </div>
  );
}

export default CollectionListTooltip;
