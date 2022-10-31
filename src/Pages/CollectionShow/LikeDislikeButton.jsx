import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Stack from "@mui/material/Stack";
import axios from "axios";
function LikeDislikeButton({ element, user }) {
  const Like = Id => {
    if (user.userRole === "Guest" || user.isBlocked) {
      alert(
        "You cant like you are guest OR your account BLOCKED please register or sign"
      );
      return;
    }
    const info = {
      itemId : Id,
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

  const DisLike = Id => {
    if (user.userRole === "Guest" || user.isBlocked) {
      alert(
        "You cant like you are guest OR your account is BLOCKED please register or sign"
      );
      return;
    }
    axios
      .get(`${global.config.backendUrl}/items/ItemDislike/${user.Id}/${Id}`, {
        withCredentials: true,
      })
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
      <Stack direction="row" alignItems="center">
        {CheckUserLiked(element.itemLikes) == true ? (
          <Checkbox
            icon={<Favorite sx={{ color: "red" }} />}
            checkedIcon={<FavoriteBorder />}
            onClick={() => DisLike(element.Id, element.likes)}
          />
        ) : (
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
            onClick={() => Like(element.Id, element.likes)}
          />
        )}
        {element.itemLikes.length}
      </Stack>
    </div>
  );
}

export default LikeDislikeButton;
