import React from 'react'
import FavoriteIcon from "@mui/icons-material/Favorite";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
function CollectionInfoBadge({collection}) {
  return (
    <div>
      <Stack direction="row" justifyContent="center" spacing={4}>
        <Badge
          badgeContent={
            collection.collectionLikes.length > 0
              ? collection.collectionLikes.length
              : "0"
          }
          color="primary"
        >
          <FavoriteIcon color="action" />
        </Badge>
        <Badge
          badgeContent={
            collection.items.length > 0 ? collection.items.length : "0"
          }
          color="primary"
        >
          <FormatListNumberedIcon color="action" />
        </Badge>
      </Stack>
    </div>
  );
}

export default CollectionInfoBadge
