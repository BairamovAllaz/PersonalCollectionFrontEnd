import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import CollectionInfoBadge from "../../Components/UI/CollectionInfoBadge";
import CollectionListTooltip from "./CollectionListTooltip";

function CollectionList(props) {
  const navigate = useNavigate();
  const { user, collections } = props;
  return (
    <div style={{ height: "100vh", overflowY: "auto" }}>
      <div style={{ textAlign: "right" }}>
        {(props.currUser.userRole != true &&
          props.currUser.Id != props.userId) ||
        props.currUser.isBlocked != false ? (
          <></>
        ) : (
          <Button
            variant="contained"
            sx={{ margin: "20px" }}
            startIcon={<AddIcon />}
            onClick={() => navigate(`/User/${user.Id}/collection/create`)}
          >
            Collection
          </Button>
        )}
      </div>
      <Box
        sx={{
          p: 3,
          flexWrap: "wrap",
          display: "flex",
          justifyContent: { xs: "center", sm: "left" },
        }}
      >
        {collections.length <= 0 ? (
          <div style={{ margin: "30px auto" }}>No Collection</div>
        ) : (
          collections.map(element => (
            <Card
              sx={{ width: { xs: "100%", sm: "30%", margin: "30px 10px" } }}
            >
              <CardMedia
                component="img"
                sx={{ maxHeight: "170px", minWidth: "280px" }}
                width="70"
                image={element.image}
                alt={`${element.name}`}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {element.name}
                </Typography>
                <Typography
                  gutterBottom
                  variant="p"
                  component="div"
                  sx={{ minHeight: "30px" }}
                >
                  {element.about}
                </Typography>
                <Typography variant="p">#{element.topic}</Typography>
                <Typography sx={{ mt: 2 }}>
                  {new Date(element.createdAt).toLocaleDateString()}
                </Typography>
                <div style={{ marginBottom: "20px" }}></div>
                <CollectionInfoBadge collection={element} />
              </CardContent>
              <CardActions>
                <CollectionListTooltip user = {user} element = {element} currUser = {props.currUser} userId = {props.userId}/>
              </CardActions>  
            </Card>
          ))
        )}
      </Box>
    </div>
  );
}
export default CollectionList;
