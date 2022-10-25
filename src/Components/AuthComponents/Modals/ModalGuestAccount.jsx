import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import * as React from "react";
import { UserContext } from "../../../Middleware/UserContext";


function ModalGuestAccount({isDialogOpened, handleCloseDialog}) {
    const navigation = useNavigate();
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const { setUser } = React.useContext(UserContext);

    const handleClose = () => {
        handleCloseDialog(false);
    }

    function isBlankFieldGuest() {
        if (firstName === '' || lastName === '') {
            alert("Please enter all the fields");
            return true;
        }
        return false;
    }

    const authGuesstAccount = () => {
        const GuestAccount = {
            firstName,
            lastName,
        }
        setUser(GuestAccount);
        setStorage(GuestAccount);
        navigation("/");
        window.location.reload();
    }

    function setStorage(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    return (
      <div>
        <Dialog open={isDialogOpened} onClose={handleClose}>
          <DialogTitle>Guest</DialogTitle>
          <DialogContent>
            <DialogContentText>Sign up as guest:)</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="FirstName*"
              type="text"
              fullWidth
              variant="outlined"
              onChange={e => setfirstName(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="LastName*"
              type="text"
              fullWidth
              variant="outlined"
              onChange={e => setlastName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={() => {
                if (!isBlankFieldGuest()) {
                  authGuesstAccount();
                  handleClose();
                }
              }}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default ModalGuestAccount;