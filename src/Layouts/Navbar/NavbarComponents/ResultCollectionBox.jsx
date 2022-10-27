import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
function ResultCollectionBox({
  collection,
  handleClose,
  ClearSearchText,
  SearchText,
}) {
  const navigate = useNavigate();
  const sendTo = url => {
    navigate(url);
    handleClose();
    ClearSearchText();
  };
  //TODO add founded tex
  const ReturnIncludedSearcText = text => {
    return (
        <p>
           { text.split('').map((word) => (
                <span style = {{backgroundColor : word.toLowerCase().includes(SearchText.toLowerCase()) && "#536110"}}>{word}</span>
            ))}
        </p>
    )
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345, margin: "30px auto" }}>
        <CardMedia component="img" height="140" image={collection.image} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ cursor: "pointer" }}
            onClick={() =>
              sendTo(`/User/${collection.userId}/collection/${collection.Id}`)
            }
          >
            {ReturnIncludedSearcText(collection.name)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {collection.about}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ marginTop: "10px", fontSize: "20px", cursor: "pointer" }}
            onClick={() => sendTo(`/user/${collection.userId}`)}
          >
            {ReturnIncludedSearcText(collection.user.firstName)}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ marginTop: "20px", fontSize: "15px" }}
          >
            #{ReturnIncludedSearcText(collection.topic)}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ marginTop: "20px", fontSize: "15px" }}
          >
            {new Date(collection.createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ResultCollectionBox;
