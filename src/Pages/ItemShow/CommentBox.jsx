import React from "react";
import axios from "axios";
import {Box,TextField,Container,Button,Grid,Paper} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import BadgeIcon from "@mui/icons-material/Badge";
import io from "socket.io-client";
import LoadingPage from "../../Utils/LoadingPage";
import { useNavigate,  useParams } from "react-router-dom";

function CommentBox({ itemId, currUser, userRole }) {

  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [comments, setComments] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const { userId } = useParams();
  React.useEffect(() => {
    
    axios
      .get(`${global.config.backendUrl}/items/GetItemComments/${itemId}`)
      .then(response => {
        setComments(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const SendComment = () => {
    if (message.length <= 0) {
      alert("Message cant be empty");
      setMessage("");
      return;
    }
    if (currUser.userRole === "Guest" || currUser.isBlocked) {
      alert("You cant send message!!");
      setMessage("");
      return;
    }
    const comment = {
      itemId: itemId,
      message: message,
      userId: currUser.Id,
      userFirstname: currUser.firstName,
      userPhoto: currUser.image,
    };
    axios
      .post(`${global.config.backendUrl}/items/AddComment`, comment)
      .then(response => {})
      .catch(err => {
        console.log(err);
      });
    setMessage("");
  };

  React.useEffect(() => {
    const socket = io(`${global.config.backendUrl}`);
    socket.on("comments", newcomments => {
      setComments(newcomments);
    });
  }, []);

  if (loading) {
    return <LoadingPage/>;
  }

  return (
    <div>
      <Container component="main" maxWidth={false} sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <p style={{ textAlign: "left", fontWeight: "500" }}>
            <span>{comments.length}</span> Comments
          </p>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Avatar
              src={currUser.image}
            />
            <TextField
              id="CommentBox"
              label="Write your comment here!"
              variant="standard"
              multiline
              style={{ width: "100%", marginLeft: "20px" }}
              onChange={e => setMessage(e.target.value)}
              value={message}
            />
            <Button
              variant="contained"
              sx={{ marginLeft: "10px" }}
              onClick={SendComment}
            >
              <SendIcon />
            </Button>
          </Box>

          <div>
            {comments.length <= 0 ? (
              <p style={{ paddingTop: "30px" }}>No comments yet</p>
            ) : (
              comments.map(element => (
                <Paper style={{ padding: "20px 20px", margin: "20px 0" }}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid
                      item
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/User/${element.userId}`)}
                    >
                      <Avatar
                        src={element.userPhoto}
                      />
                      {userId == element.userId ? (
                        <BadgeIcon style={{ marginTop: "30px" }} />
                      ) : (
                        <></>
                      )}
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                      <h4 style={{ margin: 0, textAlign: "left" }}>
                        {element.userFirstname}
                      </h4>
                      <p style={{ textAlign: "left" }}>{element.message}</p>
                      <p style={{ textAlign: "left", color: "gray" }}>
                        {new Date(element.createdAt).toLocaleString()}
                      </p>
                    </Grid>
                  </Grid>
                </Paper>
              ))
            )}
          </div>
        </Paper>
      </Container>
    </div>
  );
}

export default CommentBox;
