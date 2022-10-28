import GoogleButton from "react-google-button";
import Button from "@mui/material/Button";
import ModalForgotPassword from "./Modals/ModalForgotPassword";
import ModalGuestAccount from "./Modals/ModalGuestAccount";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function AuthFotter() {
  //MODAL STATES
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
      `https://personalcollection-itransition.herokuapp.com/v1/google`,
      "_self",
      "width=500,height=600"
    );
  };
  return (
    <div style={{ marginTop: "10px" }}>
      <GoogleButton
        type="light"
        onClick={() => {
          console.log("clicm");
          authWithGoogle();
        }}
        style={{
          margin: "0 auto",
          width: "70%",
          marginTop: "20px",
        }}
      />
      <Button
        variant="contained"
        startIcon={<AssignmentIndIcon />}
        style={{
          width: "70%",
          height: "50px",
          margin: "20px auto",
        }}
        onClick={handleClickOpenGuest}
      >
        <b>{t("guest_account")}</b>
      </Button>
      <div style={{ marginBottom: "20px" }}>
        <p
          onClick={handleClickOpenForgot}
          style={{ cursor: "pointer", color: "blue" }}
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
