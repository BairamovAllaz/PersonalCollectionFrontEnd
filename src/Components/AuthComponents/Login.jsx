import {TextField,Box,Button} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import React, { useState } from "react";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginClick = () => {
    if (isBlankInputsLogin()) {
      alert("Fields cannot be empty");
      return;
    }
    const UserData = {
      email,
      password,
    };
    axios
      .post(`${global.config.backendUrl}/v1/login`, UserData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => {
        window.location.href = "/";
      })
      .catch(err => {
        alert(err.response.data);
      });
    clearInputs();
  };

  function isBlankInputsLogin() {
    if (email === "" || password === "") {
      clearInputs();
      return true;
    }
    return false;
  }

  function clearInputs() {
    setEmail("");
    setPassword("");
  }

  return (
    <Box>
      <TextField
        className="outlined-basic"
        label="Email*"
        variant="outlined"
        style={{ marginTop: "20px" }}
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      <TextField
        className="outlined-basic"
        label="Password*"
        variant="outlined"
        type="password"
        style={{ marginTop: "20px" }}
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <Button
        variant="contained"
        startIcon={<LoginIcon />}
        style={{
          background: "linear-gradient(to bottom,#cb42f5,#f542ec)",
          marginTop: "20px",
          width: "70%",
          height: "50px",
        }}
        onClick={LoginClick}
      >
        Login
      </Button>
    </Box>
  );
}

export default Login;