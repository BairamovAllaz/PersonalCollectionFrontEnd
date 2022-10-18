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
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [image, setImage] = React.useState();
  const [fields, setFields] = React.useState([]);

  const { itemId } = useParams();
  React.useEffect(() => {
    axios
      .get(`${global.config.backendUrl}/items/getAllItemsFileds/${itemId}`)
      .then(response => {
        setItems(response.data);
        setIsLoaded(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const ref = React.useRef();
  const handleClick = e => {
    ref.current.click();
  };

  //TODO FIX HANDLE CHANGE
  const handleChange = (e, idx, fields) => {
    fields[idx].field_value = e.target.value;
    console.log(fields);
  };

  const render = (element, i,fields) => {
    if (element.field_type === "Text") {
      return (
        <TextField
          id="outlined-basic"
          variant="outlined"
          style={{ marginTop: "40px" }}
          label={`${element.field_name}`}
          defaultValue={`${element.field_value}`}
          name={`${element.field_name}`}
          onChange={e => handleChange(e, i, fields)}
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
          onChange={e => handleChange(e, i, fields)}
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
          onChange={e => handleChange(e, i, fields)}
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
            defaultValue={`${element.field_value}`}
            name={`${element.field_name}`}
            onChange={e => handleChange(e, i, fields)}
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
            onChange={e => handleChange(e, i, fields)}
          />
        </div>
      );
    }
  };

  if (isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {items.map((item, i) => (
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
                    margin: "0 auto",
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
                {item.itemFields.map(field => render(field, i,item.itemFields))}
                <br />
                <Button
                  variant="contained"
                  //onClick={UpdateUser}
                  style={{ marginTop: "30px" }}
                >
                  Update User
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
