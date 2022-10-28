import React from 'react'
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReactMarkdown from "react-markdown";

function CollectionDescModal({ isDialogOpened, handleCloseDialog,descText }) {
  const handleClose = () => {
    handleCloseDialog(false);
  };
  return (
    <Dialog
      open={isDialogOpened}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullScreen
    >
      <DialogTitle id="alert-dialog-title">Description</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {
            <ReactMarkdown
              children={descText}
              style={{ width: "100%", height: "100px" }}
            />
          }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CollectionDescModal