import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

import {useState} from 'react';

function ModalForgotPassword({isDialogOpened, handleCloseDialog}) {
    const [email, setEmail] = useState("");
    const handleClose = () => {
        handleCloseDialog(false);
    }

    const ForgotPassword = () => {
        axios.post(`${global.config.backendUrl}/v1/forgot-password`, {email: email}).then((response) => {
            alert(response.data);
        }).catch((err) => {
            alert(err.response.data)
        })
    }

    return (
        <div>
            <Dialog open={isDialogOpened} onClose={handleClose}>
                <DialogTitle>Forgot Password</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email*"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        if (email !== "") {
                            ForgotPassword();
                            handleClose();
                        } else {
                            alert("Please fill email field");
                        }
                    }}>Send</Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default ModalForgotPassword;