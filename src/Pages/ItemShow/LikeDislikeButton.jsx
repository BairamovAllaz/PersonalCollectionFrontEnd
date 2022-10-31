import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import axios from 'axios'
function LikeDislikeButton({ itemCol, user }) {
  const addLikeItem = itemId => {
    if (user.userRole === "Guest" || user.isBlocked) {
      alert(
        "You cant like you are guest OR you are blocked please register or sign"
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
        "You cant like you are guest OR you are blocked please register or sign"
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

  function CheckUserLiked(likes) {
    return likes.some(el => el.userId === user.Id);
  }
  return (
    <div>
      {CheckUserLiked(itemCol.itemLikes) == true ? (
        <Checkbox
          icon={<Favorite sx={{ color: "red" }} />}
          checkedIcon={<FavoriteBorder />}
          onClick={() => DisLikeItem(itemCol.Id, itemCol.likes)}
        />
      ) : (
        <Checkbox
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite sx={{ color: "red" }} />}
          onClick={() => addLikeItem(itemCol.Id, itemCol.likes)}
        />
      )}
    </div>
  );
}

export default LikeDislikeButton;
