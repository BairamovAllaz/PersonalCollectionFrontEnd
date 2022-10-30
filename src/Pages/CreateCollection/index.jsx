import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CollectionForm from "./CollectionForm";
import FieldsForm from "./FieldsForm";
import ImageForm from "./ImageForm";
import Final from "./Final";
import axios from "axios";
import { useParams } from "react-router-dom";

const steps = ["Create Collection", "Define Fields", "Collection Image"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <CollectionForm />;
    case 1:
      return <FieldsForm />;
    case 2:
      return <ImageForm />;
    default:
      throw new Error("Unknown step");
  }
}

export const InfoContext = React.createContext();
function CreateCollection() {
  const { userId } = useParams();
  const [collectionId, setCollectionId] = React.useState();
  const [image, setImage] = React.useState([]);
  const [name, setName] = React.useState("");
  const [topic, setTopic] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [markDownInput, setMarkDownInput] = React.useState("");
  const [activeStep, setActiveStep] = React.useState(0);
  const [fieldList, setFieldList] = React.useState([
    { field_name: "", field_type: "" },
  ]);

  const handleNext = () => {
    if (checkIfEmpty()) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function checkIfEmpty() {
    if (name === "" || topic === "" || markDownInput === "") {
      alert("Cant be empty");
      return false;
    }
    return true;
  }

  const createCollectionClick = e => {
    e.preventDefault();
    const formData = InitFormData();
    axios
      .post(`${global.config.backendUrl}/collection/create`, formData)
      .then(response => {
        setCollectionId(response.data);
      })
      .catch(err => {
        alert(err.response.data);
      });
    handleNext();
  };

  function InitFormData() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("userId", userId);
    formData.append("description", markDownInput);
    formData.append("topic", topic);
    formData.append("about", about);
    formData.append("image", image[0]);
    formData.append("field", JSON.stringify(fieldList));
    return formData;
  }

  return (
    <div>
      <InfoContext.Provider
        value={{
          inputList: fieldList,
          setInputList: setFieldList,
          files: image,
          setFiles: setImage,
          markDownInput,
          setMarkDownInput,
          name,
          setName,
          topic,
          setTopic,
          userId,
          collectionId,
          about,
          setAbout,
        }}
      >
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Create
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Final />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}

                    {activeStep === steps.length - 1 ? (
                      <Button
                        variant="contained"
                        onClick={createCollectionClick}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        Create Collection
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </Container>
      </InfoContext.Provider>
    </div>
  );
}
export default CreateCollection;
