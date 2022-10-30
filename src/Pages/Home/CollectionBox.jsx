import React from "react";
import {
  Card,
  CardContent,
  Stack,
  CardMedia,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./Styles/CollectionBox.style";
import CollectionBoxInfo from "./CollectionBoxInfo";
function CollectionBox({ item }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateTo = url => {
    navigate(url);
  };
  return (
    <Paper className={classes.PaperContainer}>
      <Card className={classes.CardContainer}>
        <CardMedia
          component="img"
          className={classes.CardMedia}
          width="70"
          image={item.image}
        />
        <CardContent className={classes.CardContent}>
          <CollectionBoxInfo item={item} />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Tooltip title="Open Collection">
              <IconButton
                className={classes.IconButton}
                onClick={() =>
                  navigateTo(`/User/${item.userId}/collection/${item.Id}`)
                }
              >
                <OpenInNewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Open user">
              <IconButton
                className={classes.IconButtonAccount}
                onClick={() => navigateTo(`/User/${item.userId}`)}
              >
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </CardContent>
      </Card>
    </Paper>
  );
}

export default CollectionBox;
