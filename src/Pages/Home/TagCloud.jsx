import React from "react";
import { Box, Stack, Chip } from "@mui/material";
import axios from "axios";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTheme } from "@emotion/react";
function TagCloud({ selectedTags, handleClick }) {
  const [tags, setTags] = React.useState([]);
  const [loaded, setLoaded] = React.useState(true);
  const theme = useTheme();
  React.useEffect(() => {
    axios
      .get(`${global.config.backendUrl}/collection/getTags`)
      .then(response => {
        setTags(response.data);
        setLoaded(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (loaded) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "200px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        aligntItems: "center",
        gap: "10px",
        marginTop: "30px",
      }}
    >
      <div>
        <FilterListIcon />
      </div>
      {tags.map((tag, id) => (
        <Chip
          label={`${tag.name}`}
          onClick={() => handleClick(tag.name, id)}
          sx={{
            backgroundColor: selectedTags.includes(tag.name)
              ? theme.palette.mode === "light"
                ? "#9ec0f7"
                : "blue"
              : theme.palette.mode === "light"
              ? "#faf5f5"
              : "gray",
          }}
        />
      ))}
    </Box>
  );
}

export default TagCloud;
