import React from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  Box,
  Button,
  Container,
  TextField,
} from "@mui/material";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ItemsAccordion from "./ItemsAccordion";
import MarkDownAccordion from "./MarkDownAccordion";
import SelectTopicInput from "./SelectTopicInput";
import Path from "./Path";
import { useStyles } from "./Styles/index.style";

function EditCollection() {
  const navigate = useNavigate();
  const classes = useStyles();
  const { collectionId, userId } = useParams();
  const [image, setImage] = React.useState();
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [markDownInput, setMarkDownInput] = React.useState("");
  const [values, setValues] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [selectedTopic, setSelectedTopic] = React.useState("");
  const ref = React.useRef();

  const handleClick = e => {
    ref.current.click();
  };

  const handleSelectedInput = selectedInput => {
    setSelectedTopic(selectedInput);
  };
  React.useEffect(() => {
    axios
      .get(
        `${global.config.backendUrl}/collection/getCollectionById/${collectionId}`
      )
      .then(response => {
        setValues(response.data);
        console.log(response.data);
        setIsLoaded(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const UpdateCollection = collection => {
    const currentUpdates = removeEmpty(CheckUpdates(collection));
    const obj = UpdatedCollection(currentUpdates);
    axios
      .put(
        `${global.config.backendUrl}/collection/UpdateCollection/${collectionId}`,
        obj
      )
      .then(response => {
        window.location.reload();
      })
      .catch(err => {
        alert(err.response.data);
      });
  };

  function UpdatedCollection(currentUpdates) {
    const formdata = new FormData();
    if (image !== undefined) {
      formdata.append("image", URL.createObjectURL(image));
    } else {
      formdata.append("image", "");
    }
    for (const key of Object.keys(currentUpdates)) {
      formdata.append(key, currentUpdates[key]);
    }
    return formdata;
  }

  function CheckUpdates(collection) {
    let updates = {};
    if (collection.name !== name) {
      updates.name = name;
    }
    if (collection.description !== markDownInput) {
      updates.description = markDownInput;
    }
    if (collection.topic !== selectedTopic) {
      updates.topic = selectedTopic;
    }
    if (collection.about !== about) {
      updates.about = about;
    }
    if (image !== null) {
      updates.image = image;
    }
    return updates;
  }

  function removeEmpty(updates) {
    return Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v != "")
    );
  }
  if (isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {values.map(collection => (
        <Container
          component="main"
          maxWidth="sm"
          sx={{ mb: 4, padding: "20px" }}
        >
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <div className={classes.PathDiv}>
              <Path userId={userId} collectionId={collectionId} />
            </div>
            <Typography component="h3" variant="h4" align="center" mt={3}>
              Update
            </Typography>
            <React.Fragment>
              <Box className={classes.BoxContainer}>
                <Box
                  component="img"
                  sx={{
                    height: 160,
                    width: 160,
                    maxHeight: { xs: 160, md: 167 },
                    maxWidth: { xs: 160, md: 250 },
                    margin: "20px auto",
                  }}
                  justifyContent="center"
                  src={collection.image}
                />
                <Button
                  startIcon={<UpgradeIcon />}
                  variant="contained"
                  sx={{ marginTop: "30px" }}
                  onClick={handleClick}
                >
                  Update Image
                </Button>
                <div style={{ textAlign: "center" }}>
                  {image != null && (
                    <img
                      width="60"
                      height="60"
                      style={{ marginTop: "30px" }}
                      src={URL.createObjectURL(image)}
                    />
                  )}
                </div>
                <input
                  ref={ref}
                  type="file"
                  style={{ display: "none" }}
                  onChange={e => setImage(e.target.files[0])}
                />
                <br />
                <TextField
                  id="outlined"
                  label="Name"
                  variant="outlined"
                  defaultValue={`${collection.name}`}
                  onChange={e => setName(e.target.value)}
                  style={{ marginTop: "30px", marginBottom: "20px" }}
                />
                <br />
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  sx={{ width: "100%", marginTop: "40px" }}
                  defaultValue={`${collection.description}`}
                  onChange={e => setMarkDownInput(e.target.value)}
                />
                <MarkDownAccordion
                  markDownInput={markDownInput}
                  collection={collection}
                />
                <br />
                <TextField
                  id="outlined"
                  label="About"
                  variant="outlined"
                  defaultValue={`${collection.about}`}
                  onChange={e => setAbout(e.target.value)}
                  style={{ marginTop: "30px" }}
                />
                <br />
                <SelectTopicInput
                  handleSelectedInput={handleSelectedInput}
                  defaultTopic={collection.topic}
                />
                <br />
                <ItemsAccordion collection={collection} userId={userId} />
                <Button
                  variant="contained"
                  onClick={() => UpdateCollection(collection)}
                  style={{ marginTop: "30px" }}
                >
                  Update Collection
                </Button>
              </Box>
            </React.Fragment>
          </Paper>
        </Container>
      ))}
    </div>
  );
}
export default EditCollection;
