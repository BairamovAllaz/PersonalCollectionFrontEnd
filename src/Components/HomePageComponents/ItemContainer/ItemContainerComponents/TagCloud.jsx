import React from "react";
import { Box, Stack, Chip } from "@mui/material";
import axios from "axios";
function TagCloud({selectedTags,handleClick}) {
  const [tags, setTags] = React.useState([]);
  const [loaded, setLoaded] = React.useState(true);
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
        marginTop : "30px"
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
