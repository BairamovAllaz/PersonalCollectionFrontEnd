import GoogleButton from "react-google-button";
import Button from "@mui/material/Button";
import ModalForgotPassword from "./Modals/ModalForgotPassword";
import ModalGuestAccount from "./Modals/ModalGuestAccount";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useTranslation } from "react-i18next";
import { useStyles } from "./Styles/AuthFooter.style";
import { useState } from "react";

function AuthFotter() {
  const classes = useStyles();
  const [openGuest, setOpenGuest] = useState(false);
  const [openForgot, setOpenForgot] = useState(false);
  const { t } = useTranslation();

  const handleClickOpenGuest = () => {
    setOpenGuest(!openGuest);
  };

  const handleClickOpenForgot = () => {
    setOpenForgot(!openForgot);
  };

  //TODO FIX GOOGLE AUTH BUTTON
  const authWithGoogle = () => {
    window.open(
      `http://localhost:5100/v1/google`,
      "_self",
      "width=500,height=600"
    );
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <GoogleButton
        type="light"
        className={classes.GoogleButton}
        onClick={() => authWithGoogle()}
      />
      <Button
        variant="contained"
        startIcon={<AssignmentIndIcon />}
        className={classes.OpenGuestButton}
        onClick={handleClickOpenGuest}
      >
        <b>{t("guest_account")}</b>
      </Button>
      <div className={classes.DivContainer}>
        <p
          onClick={handleClickOpenForgot}
          className={classes.ForgotPasswordText}
        >
          {t("forgot_password")}
        </p>
      </div>
      <ModalForgotPassword
        isDialogOpened={openForgot}
        handleCloseDialog={() => setOpenForgot(false)}
      />
      <ModalGuestAccount
        isDialogOpened={openGuest}
        handleCloseDialog={() => setOpenGuest(false)}
      />
    </div>
  );
}

export default AuthFotter;
