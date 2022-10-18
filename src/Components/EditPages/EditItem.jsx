import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import Container from "@mui/material/Container";
import { TextField } from "@material-ui/core";
import {
  Autocomplete,
  Avatar,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
function EditItem() {
  const [items, setItems] = React.useState([]);
  const [isLoadedItem, setIsLoadedItem] = React.useState(true);
  const [ItemName, setItemName] = React.useState("");
  const [isLoadedField, setIsLoadedField] = React.useState(true);
  const [image, setImage] = React.useState();
  const [fields, setFields] = React.useState([]);

  const { itemId } = useParams();
  React.useEffect(() => {
    axios
      .get(`${global.config.backendUrl}/items/getItemById/${itemId}`)
      .then(response => {
        setItems(response.data);
        console.log(response.data);
        setIsLoadedItem(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(`${global.config.backendUrl}/items/getAllItemsFileds/${itemId}`)
      .then(response => {
        setFields(response.data);
        console.log(response.data);
        setIsLoadedField(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const ref = React.useRef();
  const handleClick = e => {
    ref.current.click();
  };

  const handleChange = (e, idx) => {
    let cl = [...fields];
    let obj = cl[idx];
    obj.field_value = e.target.value;
    cl[idx] = obj;
    setFields([...cl]);
    console.log(fields);
  };

  const render = (element, i) => {
    if (element.field_type === "Text") {
      return (
        <TextField
          id="outlined-basic"
          variant="outlined"
          style={{ marginTop: "40px" }}
          label={`${element.field_name}`}
          defaultValue={`${element.field_value}`}
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
          defaultValue={`${element.field_value}`}
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
          defaultValue={`${element.field_value}`}
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
            {element.field_value}
          </InputLabel>
          <Select
            label={`${element.field_name}`}
            style={{ marginTop: "40px" }}
            InputLabelProps={{ shrink: true }}
            defaultValue={`${element.field_value}`}
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
            defaultValue={`${element.field_value}`}
            name={`${element.field_name}`}
            onChange={e => handleChange(e, i)}
          />
        </div>
      );
    }
  };

  const UpdateItem = () => {
    const formData = new FormData();
    if (image !== undefined) {
      formData.append("image", image);
    } else {
      formData.append("image", "");
    }
    formData.append("item_name", ItemName);
    formData.append("fields", JSON.stringify(fields));
    axios
      .put(
        `${global.config.backendUrl}/items/updateItemFields/${itemId}`,
        formData,
        {
          withCredentials: true,
        }
      )
      .then(response => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (isLoadedItem || isLoadedField) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {items.map(item => (
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
                  src={`${global.config.backendUrl}/uploads/${item.image}`}
                />
                <Button
                  startIcon={<UpgradeIcon />}
                  variant="contained"
                  sx={{ marginTop: "20px" }}
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
                  id="outlined-basic"
                  variant="outlined"
                  style={{ marginTop: "40px" }}
                  label="Item Name"
                  defaultValue={`${item.item_name}`}
                  onChange={e => setItemName(e.target.value)}
                />
                {fields.map((field, i) => render(field, i))}
                <br />
                <Button
                  variant="contained"
                  onClick={UpdateItem}
                  style={{ marginTop: "30px" }}
                >
                  Update Item
                </Button>
              </Box>
            </React.Fragment>
          </Paper>
        </Container>
      ))}
    </div>
  );
}

export default EditItem;
