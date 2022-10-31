import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Grid,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./Styles/ForgotPassword.style";

import Button from "@mui/material/Button";
import axios from "axios";
function ForgotPassword() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [password, setpassword] = useState();
  const [passwordVerify, setpasswordverify] = useState();

  useEffect(async () => {
    const isExsist = (
      await axios.get(`${global.config.backendUrl}/v1/checkToken/${token}`)
    ).data;
    if (!isExsist) {
      alert("This token no longer exsist");
      navigate("/auth");
    }
  }, []);

  const changePassword = async () => {
    if(password != passwordVerify) {
      alert("Fields need ton be same");
      return;
    }
    const newpass = {
      password,
      passwordVerify,
    };
    axios
      .put(
        `${global.config.backendUrl}/v1/forgot-password/${id}/${token}`,
        newpass
      )
      .then(response => {
        alert(response.data);
        navigate("/auth");
      })
      .catch(err => {
        alert(err.response.data);
        clearInputs();
      });
  };

  function clearInputs() {
    setpassword("");
    setpasswordverify("");
  }

  const handlePasswordChange = (e) => { 
    setpassword(e.target.value)
  }

  const handlePasswordVerifyChange = (e) => { 
    setpasswordverify(e.target.value)
    
  }

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.MainGrid}
      >
        <h3>Change password</h3>
        <TextField
          label="new password"
          type="password"
          className={classes.PasswordInput}
          onChange={handlePasswordChange}
          value={password}
        />
        <TextField
          label="repeat password"
          type="password"
          className={classes.PasswordInput}
          onChange={handlePasswordVerifyChange}
          value={passwordVerify}
        />
        <Button
          variant="contained"
          component="label"
          className={classes.ChanegPassword}
          onClick={changePassword}
        >
          Change Password
        </Button>
      </Grid>
    </div>
  );
}
export default ForgotPassword;
