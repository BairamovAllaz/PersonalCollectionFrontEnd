import "./Styles/ImageForm.css";
import { useDropzone } from "react-dropzone";
import Container from "@mui/material/Container";
import React, { useContext } from "react";
import { InfoContext } from "./index";

function ImageForm() {
  const { files, setFiles } = useContext(InfoContext);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map(file => (
    <div className="thumb" key={file.name}>
      <div className="thumbInner">
        <img
          src={file.preview}
          className="img"
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  return (
    <Container className="main" maxWidth="sm">
      <div {...getRootProps({ className: "dropzone" })}>
        <input className="input-zone" {...getInputProps()} />
        <div className="text-center">
          <p className="dropzone-content">
            Drag’n’drop some files here, or click to select files
          </p>
        </div>
      </div>
      <aside className="thumbsContainer">{thumbs}</aside>
    </Container>
  );
}

export default ImageForm;
