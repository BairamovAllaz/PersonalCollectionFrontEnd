import { TextField, Box, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useStyles } from "./Styles/Login.style";
import axios from "axios";
function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();
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

  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };

  const handleChangePassword = e => {
    setPassword(e.target.value);  
  };

  return (
    <Box>
      <TextField
        className="outlined-basic"
        label={`${t("email")}*`}
        variant="outlined"
        className={classes.TextFieldStyle}
        onChange={handleChangeEmail}
        value={handleChangePassword}
      />
      <TextField
        className="outlined-basic"
        label={`${t("password")}*`}
        variant="outlined"
        type="password"
        className={classes.TextFieldStyle}
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <Button
        variant="contained"
        startIcon={<LoginIcon />}
        className={classes.LoginButton}
        onClick={LoginClick}
      >
        {t("login_text")}
      </Button>
    </Box>
  );
}

export default Login;
