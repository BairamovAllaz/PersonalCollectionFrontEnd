import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import Box from "@mui/material/Box";
import LoadingPage from "../../Utils/LoadingPage";
import {
  Autocomplete,
  Avatar,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";

function CreateItem() {
  const { collectionId } = useParams();
  const [tags, setTags] = React.useState([]);
  const [fields, setFields] = React.useState([]);
  const [values, setValues] = React.useState({});
  const [itemName, setItemName] = React.useState("");
  const [loadedFields,setLoadedFields]  = React.useState(true);
  const [loadedTags,setLoadedTags]  = React.useState(true);
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
    let formData = new FormData();

    formData.append("fields", JSON.stringify(fields));
    formData.append("selectedTags", JSON.stringify(selectedTags));
    formData.append("itemName", itemName);
    formData.append("image", image);

    axios
      .post(`${global.config.backendUrl}/items/addItem/${collectionId}`, formData)
      .then(response => {
        alert("Item Was Created");
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const OnTagsChange = (event, values) => {
    setSelectedTags(values);
    console.log(values);
  };

  if (loadedFields || loadedTags) {
    return <LoadingPage/>;
  }

  const render = (element, i) => {
    if (element.field_type === "Text") {
      return (
        <TextField
          id="outlined-basic"
          variant="outlined"
          style={{ marginTop: "40px" }}
          label={`${element.field_name}`}
          name={`${element.field_name}`}
          onChange={e => handleChange(e, i)}
        />
      );
    } else if (element.field_type === "Number") {
      return (
        <TextField
          id="outlined-number"
          type="number"
          InputLabelProps={{ shrink: true }}
          style={{ marginTop: "40px" }}
          label={`${element.field_name}`}
          name={`${element.field_name}`}
          onChange={e => handleChange(e, i)}
        />
      );
    } else if (element.field_type === "BigText") {
      return (
        <TextField
          id="filled-multiline-flexible"
          multiline
          maxRows={4}
          variant="outlined"
          style={{ marginTop: "40px" }}
          label={`${element.field_name}`}
          name={`${element.field_name}`}
          onChange={e => handleChange(e, i)}
        />
      );
    } else if (element.field_type === "Boolean") {
      return (
        <FormControl fullWidth>
          <InputLabel
            id="demo-simple-select-label"
            style={{ marginTop: "40px" }}
          >
            Age
          </InputLabel>
          <Select
            label={`${element.field_name}`}
            style={{ marginTop: "40px" }}
            InputLabelProps={{ shrink: true }}
            name={`${element.field_name}`}
            onChange={e => handleChange(e, i)}
          >
            <MenuItem value={true}>True</MenuItem>
            <MenuItem value={false}>False</MenuItem>
          </Select>
        </FormControl>
      );
    } else if (element.field_type === "Date") {
      return (
        <div>
          <TextField
            type="date"
            InputProps={{
              inputProps: { min: "1500-05-01", max: "2020-05-04" },
            }}
            style={{ marginTop: "40px", width: "100%" }}
            InputLabelProps={{ shrink: true }}
            label={`${element.field_name}`}
            name={`${element.field_name}`}
            onChange={e => handleChange(e, i)}
          />
        </div>
      );
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
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
                defaultValue={[tags[0]]}
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
              {fields.map((element, i) => render(element, i))}
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
