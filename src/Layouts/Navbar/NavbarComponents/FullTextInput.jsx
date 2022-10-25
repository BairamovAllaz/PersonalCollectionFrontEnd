import React from "react";
import { Search, SearchIconWrapper, StyledInputBase } from "../navbarStyle";
import SearchIcon from "@mui/icons-material/Search";
import { Button,MenuItem } from "@mui/material";
import axios from "axios";
function FullTextInput() {
  const [searchText, setSearchText] = React.useState("");
  const [TextResult, setTextResult] = React.useState([]);

  const TextSearch = () => {
    axios
      .get(`${global.config.backendUrl}/home/FullTextSearch/${searchText}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => {
        setTextResult(response.data);
        console.log(response.data);
      })
      .catch(err => {
        alert(err.response.data);
      });
  };
  //TODO ADD DROPDOWN
  
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        options = {TextResult}
        renderInput = {(data) => <p>{data.name}</p>}
        onChange={e => setSearchText(e.target.value)}
      >
      </StyledInputBase>
    </Search>
  );
}

export default FullTextInput;
