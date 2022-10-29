import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./Styles/ItemBox.style";
import { Grid, Paper, Typography, ButtonBase, Chip } from "@mui/material";

function ItemBox({ item }) {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Paper className={classes.MainPaper} sx={{backgroundColor: theme => theme.palette.mode === "dark" ? "#1A2027" : "#fff"}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ButtonBase className={classes.ButtonBase}>
            <img alt="complex" src={item.image} className={classes.Img} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                className={classes.TypographyItemName}
                onClick={() =>
                  navigate(
                    `/User/${item.collection.user.Id}/collection/${item.collection.Id}/Item/${item.Id}`
                  )
                }
              >
                {item.item_name}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                className={classes.TypographyInfo}
                onClick={() =>
                  navigate(
                    `/User/${item.collection.user.Id}/collection/${item.collectionId}`
                  )
                }
              >
                {item.collection.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className={classes.TypographyInfo}
                onClick={() => navigate(`/User/${item.collection.user.Id}`)}
              >
                {item.collection.user.firstName}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className={classes.TypographyInfo}
                sx = {{pt: 1}}
              >
                {new Date(item.createdAt).toLocaleDateString()}
              </Typography>
              <div className={classes.MainDivTags}>
                {item.itemTags.map(tag => (
                  <Chip label={`${tag.tag_name}`} className={classes.Chip} />
                ))}
              </div>
            </Grid>
            <Grid item>
              <div className={classes.BageDiv}>
                <p>
                  <Badge
                    badgeContent={
                      item.itemLikes.length > 0 ? item.itemLikes.length : "0"
                    }
                    color="primary"
                  >
                    <FavoriteIcon color="action" />
                  </Badge>
                </p>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ItemBox;
