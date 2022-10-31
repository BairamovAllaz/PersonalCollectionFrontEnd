import React from 'react'
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExtensionIcon from "@mui/icons-material/Extension";
function Path({ userId, collectionId,itemId }) {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href={`/User/${userId}`}
        >
          <AccountCircleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          User
        </Link>
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href={`/User/${userId}/collection/${collectionId}`}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Collection
        </Link>
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href={`/User/${userId}/collection/${collectionId}/Item/${itemId}`}
        >
          <ExtensionIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Item
        </Link>
        <Typography
          sx={{ display: "flex", alignItems: "center" }}
          color="text.primary"
        >
          <UpgradeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Update Item
        </Typography>
      </Breadcrumbs>
    </div>
  );
}

export default Path
