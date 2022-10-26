import React from "react";

import axios from "axios";
import { Button } from "@mui/material";
import { Search, SearchIconWrapper, StyledInputBase } from "../navbarStyle";
import SearchIcon from "@mui/icons-material/Search";
function FullTextInput({}) {
  const [searchText,setSearchText] = React.useState("");
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

  return (
    <div>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          //onChange={e => setSearchText(e.target.value)}
        />
        {/* <div
          style={{
            width: "100%",
            height: "300px",
            position: "absolute",
            zIndex: "2",
            backgroundColor: "red",
          }}
        ></div>
        <Button variant = "contained">Search</Button> */}
      </Search>
    </div>
  );
}

export default FullTextInput;
