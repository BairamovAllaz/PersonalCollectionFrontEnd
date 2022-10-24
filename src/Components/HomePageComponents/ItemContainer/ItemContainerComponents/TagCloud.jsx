import React from "react";
import { Box, Stack, Chip } from "@mui/material";
import axios from "axios";
function TagCloud() {
  const [tags, setTags] = React.useState([]);
  const [loaded, setLoaded] = React.useState(true);
  const [selectedTags, setSelectedTags] = React.useState([]);
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

  const handleClick = (tagName, id) => {
    if (selectedTags.includes(tagName)) {
      const indexToRemove = selectedTags.indexOf(tagName);
      selectedTags.splice(indexToRemove, 1);
      setSelectedTags([...selectedTags]);
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
    console.log(selectedTags);
  };

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
      }}
    >
      {tags.map((tag, id) => (
        <Chip
          label={`${tag.name}`}
          onClick={() => handleClick(tag.name, id)}
          sx={{
            backgroundColor: selectedTags.includes(tag.name) ? "blue" : "gray",
          }}
        />
      ))}
    </Box>
  );
}

export default TagCloud;
