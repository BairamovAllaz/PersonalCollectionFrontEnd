import React from "react";
import {
  Box,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
function FilterComponent({ handleFilterChange, handleChangeSearchText }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: { xs: "block", sm: "flex" },
        textAlign: "center",
      }}
    >
      <TextField
        id="filled-search"
        label="Search field"
        type="search"
        size="small"
        variant="outlined"
        onChange={e => {
          handleChangeSearchText(e.target.value);
        }}
        sx={{
          marginTop: "20px",
        }}
      />
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={e => handleFilterChange(e)}
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          marginLeft: "20px",
        }}
      >
        <FormControlLabel
          value="MostLiked"
          control={<Radio />}
          label="Most-Liked"
        />
        <FormControlLabel
          value="ByComment"
          control={<Radio />}
          label="Most-Comment"
        />
        <FormControlLabel value="Latest" control={<Radio />} label="Latest" />
      </RadioGroup>
    </Box>
  );
}

export default FilterComponent;
