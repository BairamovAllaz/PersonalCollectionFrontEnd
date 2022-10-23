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
import { UserContext } from "../../Middleware/UserContext";
import ItemsAccordion from "../../Components/EditCollectionPageComponents.jsx/ItemsAccordion";
import MarkDownAccordion from "../../Components/EditCollectionPageComponents.jsx/MarkDownAccordion";
import SelectTopicInput from "../../Components/EditCollectionPageComponents.jsx/SelectTopicInput";
function EditCollection() {
  const navigate = useNavigate();
  const { collectionId, userId } = useParams();
  const [image, setImage] = React.useState();
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [markDownInput, setMarkDownInput] = React.useState("");
  const [values, setValues] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [selectedTopic, setSelectedTopic] = React.useState("");
  const ref = React.useRef();
  const { user } = React.useContext(UserContext);

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

    const formdata = new FormData();
    if (image !== undefined) {
      formdata.append("image", URL.createObjectURL(image));
    } else {
      formdata.append("image", "");
    }
    for (const key of Object.keys(currentUpdates)) {
      formdata.append(key, currentUpdates[key]);
    }
    axios
      .put(
        `${global.config.backendUrl}/collection/UpdateCollection/${collectionId}`,
        formdata
      )
      .then(response => {
        window.location.reload();
      })
      .catch(err => {
        alert(err.response.data);
      });
  };

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
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Update
            </Typography>
            <React.Fragment>
              <Box sx={{ display: "grid", justifyContent: "center" }}>
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
                  Image
                </Button>
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