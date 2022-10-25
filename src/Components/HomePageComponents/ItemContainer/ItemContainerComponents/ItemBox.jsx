import React from "react";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import {Grid,Paper,Typography,ButtonBase} from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
function ItemBox({item}) {
    const navigate = useNavigate(); 
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: "400px",
        flexGrow: 1,
        marginTop: "60px",
        marginLeft: "10px",
        backgroundColor: theme =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={item.image} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                sx={{ cursor: "pointer" }}
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
                sx={{ pt: 1, cursor: "pointer" }}
                onClick={() =>
                  navigate(`/User/${item.collection.user.Id}/collection/${item.collectionId}`)
                }
              >
                {item.collection.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ pt: 1, cursor: "pointer" }}
                onClick={() => navigate(`/User/${item.collection.user.Id}`)}
              >
                {item.collection.user.firstName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ pt: 1 }}>
                {new Date(item.createdAt).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
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
