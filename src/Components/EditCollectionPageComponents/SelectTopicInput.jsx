import React from "react";
import {FormControl,Typography,Select,MenuItem} from '@mui/material'
import axios from 'axios';
function SelectTopicInput({ handleSelectedInput,defaultTopic }) {
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [topics, setTopics] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`${global.config.backendUrl}/collection/getTopics`)
      .then(response => {
        setTopics(response.data);
        setIsLoaded(false);
      })
      .catch(err => {
        alert(err.response.data);
      });
  }, []);

  if (isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <FormControl fullWidth>
      <Typography style={{ textAlign: "left", padding: "10px" }}>
        Topic
      </Typography>
      <Select
        labelId="Topic"
        id="topic"
        label="Topic"
        defaultValue={`${defaultTopic}`}
        onChange={e => handleSelectedInput(e.target.value)}
      >
        {topics &&
          topics?.map(({ topic_name, Id }) => (
            <MenuItem key={Id} value={topic_name}>
              {topic_name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default SelectTopicInput;
