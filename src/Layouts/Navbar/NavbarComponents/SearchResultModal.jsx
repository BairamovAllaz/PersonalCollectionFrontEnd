import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Container } from "@mui/system";
import ResultCollectionBox from "./ResultCollectionBox";

function SearchResultModal({
  isDialogOpened,
  handleCloseDialog,
  searchResult,
  ClearSearchText,
  SearchText,
}) {
  const handleClose = () => {
    handleCloseDialog(false);
  };
  return (
    <div>
      <Dialog
        open={isDialogOpened}
        onClose={() => {
          ClearSearchText();
          handleClose();
        }}
        PaperProps={{
          sx: { width: { xs: "100%", sm: "50vw" }, minHeight: "70vh" },
        }}
      >
        <DialogTitle style={{ textAlign: "center" }}>
          Search results <span>for "{SearchText}"</span>
          <p>Founded: {searchResult.length}</p>
        </DialogTitle>
        <DialogContent>
          {searchResult.length > 0 ? (
            <Container maxWidth="sm" style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "100%",
                  height: "500px",
                  display: "block",
                  justifyContent: "center",
                  overflowY: "scroll",
                }}
              >
                {searchResult.map(collection => (
                  <ResultCollectionBox
                    collection={collection}
                    handleClose={handleClose}
                    ClearSearchText={ClearSearchText}
                    SearchText={SearchText}
                  />
                ))}
              </div>
            </Container>
          ) : (
            <div>
              <h2 style={{ textAlign: "center", padding: "20px" }}>
                No Result
              </h2>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              ClearSearchText();
              handleClose();
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SearchResultModal;
