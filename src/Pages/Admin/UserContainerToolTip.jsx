import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import BlockIcon from "@mui/icons-material/Block";
import { Tooltip, IconButton } from "@mui/material";
import {
  DeleteUser,
  AddUserToAdmin,
  RemoveFromAdmin,
  BlockUserById,
  ReturnDeletedUser,
  ReturnBlockedUser,
} from "./AdminMethods/AdminMethods";
import {useNavigate } from 'react-router-dom'
function UserContainerToolTip({ userStatus, userProp }) {
  const navigation = useNavigate();
  return (
    <div>
      {userStatus === "Active" ? (
        <>
          <Tooltip title="Delete" sx={{ marginLeft: "10px" }}>
            <IconButton onClick={() => DeleteUser(userProp.Id)}>
              <DeleteIcon style={{ marginLeft: "-30px" }} />
            </IconButton>
          </Tooltip>
          {userProp.userRole == true ? (
            <Tooltip title="Remove From admin">
              <IconButton onClick={() => RemoveFromAdmin(userProp.Id)}>
                <PlaylistRemoveIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Add as Admin">
              <IconButton onClick={() => AddUserToAdmin(userProp.Id)}>
                <PlaylistAddIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Edit">
            <IconButton onClick={() => navigation(`/User/${userProp.Id}/edit`)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Block">
            <IconButton
              onClick={() => {
                BlockUserById(userProp.Id);
              }}
            >
              <BlockIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : userStatus == "Blocked" ? (
        <Tooltip title="UnBlock user">
          <IconButton
            sx={{ margin: "0 auto" }}
            onClick={() => ReturnBlockedUser(userProp.Id)}
          >
            <AutorenewIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Return user">
          <IconButton
            sx={{ margin: "0 auto" }}
            onClick={() => ReturnDeletedUser(userProp.Id)}
          >
            <KeyboardReturnIcon />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
}

export default UserContainerToolTip;
