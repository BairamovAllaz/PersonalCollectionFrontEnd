import React from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Search, SearchIconWrapper, StyledInputBase } from "../navbarStyle";
import SearchIcon from "@mui/icons-material/Search";
import SearchResultModal from "./SearchResultModal";
function FullTextInput({}) {
  const [searchText, setSearchText] = React.useState("");
  const [TextResult, setTextResult] = React.useState([]);
  const [openSearchResult, setOpenSearchResult] = React.useState(false);

  const handleClickSearchResult = () => {
    setOpenSearchResult(!openSearchResult);
  };
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

  const ClearSearchText = () => {
    setSearchText("");
  };

  return (
    <div style={{ display: "flex" }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={e => setSearchText(e.target.value)}
          value={searchText}
        />
      </Search>
      <Button
        onClick={async () => {
          if (searchText == "") {
            alert("Please fill search box");
            return;
          } else {
            await TextSearch();
            handleClickSearchResult();
          }
        }}
      >
        <SearchIcon />
      </Button>
      <SearchResultModal
        isDialogOpened={openSearchResult}
        handleCloseDialog={() => setOpenSearchResult(false)}
        searchResult={TextResult}
        ClearSearchText={ClearSearchText}
        SearchText={searchText}
      />
    </div>
  );
}

export default FullTextInput;
