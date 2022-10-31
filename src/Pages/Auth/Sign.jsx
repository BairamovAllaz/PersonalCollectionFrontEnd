import { TextField, Button, Box } from "@mui/material";
import { BiImageAdd } from "react-icons/bi";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import axios from "axios";
import { useStyles } from "./Styles/Sign.style";

function Sign() {
  const classes = useStyles();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState();
  const { t } = useTranslation();

  const RegisterClick = async e => {
    e.preventDefault();
    if (isBlankInputsRegister()) {
      alert("Please fill all the input fileds");
      return;
    }
    const payload = CreateUser();
    axios
      .post(`${global.config.backendUrl}/v1/register`, payload, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(response => {
        alert("User register successfuly");
        window.location.reload();
      })
      .catch(err => {
        alert(err.response.data);
      });
  };

  function isBlankInputsRegister() {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      image == null
    ) {
      clearInputs();
      return true;
    }
    return false;
  }

  function clearInputs() {
    setEmail("");
    setPassword("");
    setfirstName("");
    setlastName("");
    setImage(undefined);
  }

  const CreateUser = () => {
    const UserData = new FormData();
    UserData.append("firstName", firstName);
    UserData.append("lastName", lastName);
    UserData.append("email", email);
    UserData.append("password", password);
    UserData.append("image", image);
    return UserData;
  };

  const handleChangeFirstName = e => {
    setfirstName(e.target.value);
  };

  const handleChangeLastName = e => {
    setlastName(e.target.value);
  };

  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };

  const handleChangePassword = e => {
    setPassword(e.target.value);
  };

  const handleImageChange = e => {
    setImage(e.target.files[0]);
  };

  return (
    <Box>
      <TextField
        className="outlined-basic"
        label={`${t("firstname")}*`}
        variant="outlined"
        style={{ marginTop: "20px" }}
        onChange={handleChangeFirstName}
        value={firstName}
      />
      <TextField
        className="outlined-basic"
        label={`${t("lastname")}*`}
        variant="outlined"
        style={{ marginTop: "20px" }}
        onChange={handleChangeLastName}
        value={lastName}
      />
      <TextField
        className="outlined-basic"
        label={`${t("email")}*`}
        variant="outlined"
        style={{ marginTop: "20px" }}
        onChange={handleChangeEmail}
        value={email}
      />
      <TextField
        className="outlined-basic"
        label={`${t("password")}*`}
        variant="outlined"
        type="password"
        style={{ marginTop: "20px" }}
        onChange={handleChangePassword}
        value={password}
      />
      <Button
        variant="contained"
        component="label"
        className={classes.ImageButton}
      >
        <BiImageAdd className={classes.BiImageAdd} />
        <b>{t("profile_image_text")}</b>
        <input type="file" hidden onChange={handleImageChange} />
      </Button>
      <Box className={classes.TextAlignDiv}>
        {image != null && (
          <img
            className={classes.ImagePreview}
            src={URL.createObjectURL(image)}
          />
        )}
      </Box>
      <Button
        variant="contained"
        startIcon={<AppRegistrationIcon />}
        className={classes.SignButton}
        onClick={RegisterClick}
      >
        {t("sign_text")}
      </Button>
    </Box>
  );
}

export default Sign;
