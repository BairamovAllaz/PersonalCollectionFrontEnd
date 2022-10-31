import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import CollectionInfoBadge from "../../Components/UI/CollectionInfoBadge";
function CollectionContainer({ collection }) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: { sm: "30%", xs: "100%" },
        marginLeft: { sm: "20px", xs: "0" },
        marginTop: "30px",
      }}
    >
      <Card sx={{ width: "100%", textAlign: "center" }}>
        <CardMedia
          component="img"
          height="300"
          image={collection.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate(`/User/${collection.userId}/collection/${collection.Id}`)
            }
          >
            {collection.name}
          </Typography>
          <p>{collection.topic}</p>
          <Typography variant="body" color="text.secondary">
            {collection.about}
          </Typography>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/User/${collection.userId}`)}
          >
            Allaz Bairamov
          </p>
          <p>{new Date(collection.createdAt).toLocaleDateString()}</p>
          <CollectionInfoBadge collection = {collection}/>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CollectionContainer;
