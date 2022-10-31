import { useNavigate, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import Box from "@mui/material/Box";
import LoadingPage from "../../Utils/LoadingPage";
import { Autocomplete, iconButtonClasses } from "@mui/material";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import axios from "axios";
import Path from "./Path";
import { RenderField } from "./RenderField";

function CreateItem() {
  const { userId, collectionId } = useParams();
  const navigate = useNavigate();
  const [tags, setTags] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [values, setValues] = React.useState({});
  const [itemName, setItemName] = React.useState("");
  const [loadedFields, setLoadedFields] = React.useState(true);
  const [loadedTags, setLoadedTags] = React.useState(true);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [image, setImage] = React.useState();

  React.useEffect(() => {
    axios
      .get(`${global.config.backendUrl}/collection/getTags`)
      .then(response => {
        setTags(response.data);
        setLoadedTags(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(`${global.config.backendUrl}/collection/getFields/${collectionId}`)
      .then(response => {
        setFields(response.data);
        setLoadedFields(false);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(values);
  }, []);

  const handleChange = (e, idx) => {
    let cl = [...fields];
    let obj = cl[idx];
    obj.field_value = e.target.value; 
    cl[idx] = obj;
    setFields([...cl]);
  };

  const Create = () => {
    if (image == null) {
      alert("Please fill image field");
      return;
    }
    const formData = createFormData();
    axios
      .post(
        `${global.config.backendUrl}/items/addItem/${collectionId}`,
        formData
      )
      .then(response => {
        navigate(`/User/${userId}/collection/${collectionId}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  function createFormData() {
    let formData = new FormData();
    formData.append("fields", JSON.stringify(fields));
    formData.append("selectedTags", JSON.stringify(selectedTags));
    formData.append("itemName", itemName);
    formData.append("image", image);
    return formData;
  }

  const OnTagsChange = (event, values) => {
    setSelectedTags(values);
    console.log(values);
  };

  if (loadedFields || loadedTags) {
    return <LoadingPage />;
  }

  return (
    <div>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <div>
            <Path userId={userId} collectionId={collectionId} />
          </div>
          <Typography component="h1" variant="h4" align="center" mt={3}>
            Create Item
          </Typography>
          <React.Fragment>
            <Box sx={{ display: "grid", justifyContent: "center" }}>
              <TextField
                id="outlined"
                label="Item Name"
                variant="outlined"
                style={{ marginTop: "30px" }}
                onChange={e => setItemName(e.target.value)}
              />
              <br />
              <Autocomplete
                multiple
                id="tags-standard"
                options={tags}
                getOptionLabel={option => option.name}
                onChange={OnTagsChange}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Tags"
                    placeholder="Favorites"
                  />
                )}
                style={{ marginTop: "30px" }}
              />
              {fields.map((element, i) =>
                RenderField(element, i, handleChange)
              )}
              <Button
                variant="contained"
                component="label"
                style={{ marginTop: "20px" }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  onChange={e => setImage(e.target.files[0])}
                />
              </Button>
              {image != null && (
                <img
                  style={{ width: "60px", height: "60px", margin : "20px auto" }}
                  src={URL.createObjectURL(image)}
                />
              )}
              <Button
                variant="contained"
                style={{ marginTop: "30px" }}
                onClick={Create}
              >
                Create Item
              </Button>
            </Box>
          </React.Fragment>
        </Paper>
      </Container>
    </div>
  );
}

export default CreateItem;
