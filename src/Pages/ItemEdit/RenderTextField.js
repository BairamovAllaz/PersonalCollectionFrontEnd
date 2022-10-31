import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
export const render = (element, i, handleChange) => {
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
        <InputLabel id="demo-simple-select-label" style={{ marginTop: "40px" }}>
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
