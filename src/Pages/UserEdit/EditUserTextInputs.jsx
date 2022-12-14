import React from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  Container,
  Avatar,
  TextField,
} from "@mui/material";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import axios from "axios";
function EditUserTextInputs({ user, userId }) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [image, setImage] = React.useState();
  const ref = React.useRef();

  const ForgotPassword = email => {
    axios
      .post(`${global.config.backendUrl}/v1/forgot-password`, {
        email: email,
      })
      .then(response => {
        alert("We sended a link to change your password check your email");
      })
      .catch(err => {
        alert(err.response.data);
      });
  };

  const UpdateUser = user => {
    const updates = CheckUpdates(user);
    const toUpdate = removeEmpty(updates);

    const formdata = new FormData();
    if (image !== undefined) {
      formdata.append("image", URL.createObjectURL(image));
    } else {
      formdata.append("image", "");
    }
    for (const key of Object.keys(toUpdate)) {
      formdata.append(key, toUpdate[key]);
    }
    axios
      .put(
        `${global.config.backendUrl}/userpage/updateUser/${userId}`,
        formdata
      )
      .then(response => {
        alert(response.data);
        window.location.reload();
      })
      .catch(err => {
        alert(err.response.data);
      });
  };
  function removeEmpty(updates) {
    return Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v != "")
    );
  }

  function CheckUpdates(user) {
    let updates = {};
    if (user.firstName !== firstName) {
      updates.firstName = firstName;
    }
    if (user.lastName !== lastName) {
      updates.lastName = lastName;
    }
    if (user.email !== email) {
      updates.email = email;
    }
    if (image !== null) {
      updates.image = image;
    }
    return updates;
  }

  const handleClick = e => {
    ref.current.click();
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Update
        </Typography>
        <React.Fragment>
          <Box sx={{ display: "grid", justifyContent: "center",padding : "20px"}}>
            <Avatar
              alt="User"
              src={user.image}
              sx={{
                width: 120,
                height: 120,
                marginTop: "20px",
                margin: "30px auto",
              }}
            />
            <Button
              startIcon={<UpgradeIcon />}
              variant="contained"
              sx={{ marginTop: "20px" }}
              onClick={handleClick}
            >
              Update Image
            </Button>
            <div style={{ textAlign: "center" }}>
              {image != null && (
                <img
                  width="60"
                  height="60"
                  style={{ marginTop: "30px" }}
                  src={URL.createObjectURL(image)}
                />
              )}
            </div>
            <input
              ref={ref}
              type="file"
              style={{ display: "none" }}
              onChange={e => setImage(e.target.files[0])}
            />
            <br />
            <TextField
              id="outlined"
              label="FirstName"
              variant="outlined"
              defaultValue={`${user.firstName}`}
              onChange={e => setFirstName(e.target.value)}
              style={{ marginTop: "30px" }}
            />
            <br />
            <TextField
              id="outlined"
              label="LastName"
              variant="outlined"
              defaultValue={`${user.lastName}`}
              onChange={e => setLastName(e.target.value)}
              style={{ marginTop: "30px" }}
            />
            <br />
            {user.authType !== "google" && (
              <TextField
                id="outlined"
                label="Email"
                variant="outlined"
                defaultValue={`${user.email}`}
                onChange={e => setEmail(e.target.value)}
                style={{ marginTop: "30px" }}
              />
            )}

            <br />
            <Button
              sx={{ width: "300px" }}
              color="secondary"
              startIcon={<ChangeCircleIcon />}
              onClick={() => ForgotPassword(user.email)}
              style={{ marginTop: "30px" }}
            >
              Change Password
            </Button>
            <br />
            <Button
              variant="contained"
              onClick={() => UpdateUser(user)}
              style={{ marginTop: "30px" }}
            >
              Update User
            </Button>
          </Box>
        </React.Fragment>
      </Paper>
    </Container>
  );
}

export default EditUserTextInputs;
