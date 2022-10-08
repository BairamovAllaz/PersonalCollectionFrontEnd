import GoogleButton from "react-google-button";
import Button from "@mui/material/Button";
import ModalForgotPassword from "../Modals/ModalForgotPassword";
import ModalGuestAccount from "../Modals/ModalGuestAccount";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import {useState} from "react";

function AuthFotter() {
    //MODAL STATES
    const [openGuest, setOpenGuest] = useState(false);
    const [openForgot, setOpenForgot] = useState(false);

    const handleClickOpenGuest = () => {
        setOpenGuest(!openGuest);
    };

    const handleClickOpenForgot = () => {
        setOpenForgot(!openForgot);
    };

    //TODO FIX GOOGLE AUTH BUTTON
    const authWithGoogle = () => {
        window.open(`http://localhost:5100/v1/google`, "_self", "width=500,height=600");
    }
    return (
        <div style={{marginTop: "10px"}}>
            <GoogleButton
                type="light"
                onClick={() => {
                    console.log("clicm");
                    authWithGoogle();
                }}
                style={{
                    margin: "0 auto",
                    width: "70%",
                    marginTop: "10px",
                }}
            />
            <Button variant="contained" startIcon={<AssignmentIndIcon/>} style={{
                width: "70%",
                height: "50px",
                margin: "10px auto",
            }}
                    onClick={handleClickOpenGuest}>
                <b>Guest account</b>
            </Button>
            <div style={{marginBottom: "20px"}}>
                <a onClick={handleClickOpenForgot} style={{cursor:"hover",color:"blue"}}>Forgot Password?</a>
            </div>
            <ModalForgotPassword isDialogOpened={openForgot} handleCloseDialog={() => setOpenForgot(false)}/>
            <ModalGuestAccount isDialogOpened={openGuest} handleCloseDialog={() => setOpenGuest(false)}/>
        </div>
    );
}

export default AuthFotter;