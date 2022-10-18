import React from "react";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import Container from "@mui/material/Container";
import { Avatar } from "@mui/material";
import { TextField } from "@material-ui/core";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ReactMarkdown from "react-markdown";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserPermisionContext } from "../../UserContext/Context";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
function EditCollection() {
  const navigate = useNavigate();
  const { collectionId, userId } = useParams();
  const [image, setImage] = React.useState();
  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");
  const [markDownInput, setMarkDownInput] = React.useState("");
  const [values, setValues] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [topics, setTopics] = React.useState([]);
  const [selectedTopic, setSelectedTopic] = React.useState("");

  const { user } = React.useContext(UserPermisionContext);

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  const ref = React.useRef();
  const handleClick = e => {
    ref.current.click();
  };

  React.useEffect(() => {
    axios
      .get(
        `${global.config.backendUrl}/collection/getCollectionById/${collectionId}`
      )
      .then(response => {
        setValues(response.data);
        console.log(response.data);
        setIsLoaded(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(`${global.config.backendUrl}/collection/getTopics`)
      .then(response => {
        console.log(response.data);
        setTopics(response.data);
      })
      .catch(err => {
        alert(err.response.data);
      });
  }, []);

  const UpdateCollection = collection => {
    const currentUpdates = removeEmpty(CheckUpdates(collection));

    const formdata = new FormData();
    if (image !== undefined) {
      formdata.append("image", URL.createObjectURL(image));
    } else {
      formdata.append("image", "");
    }
    for (const key of Object.keys(currentUpdates)) {
      formdata.append(key, currentUpdates[key]);
    }
    axios
      .put(
        `${global.config.backendUrl}/collection/UpdateCollection/${collectionId}`,
        formdata
      )
      .then(response => {
        window.location.reload();
      })
      .catch(err => {
        alert(err.response.data);
      });
  };

  function CheckUpdates(collection) {
    let updates = {};
    if (collection.name !== name) {
      updates.name = name;
    }
    if (collection.description !== markDownInput) {
      updates.description = markDownInput;
    }
    if (collection.topic !== selectedTopic) {
      updates.topic = selectedTopic;
    }
    if (collection.about !== about) {
      updates.about = about;
    }
    if (image !== null) {
      updates.image = image;
    }
    return updates;
  }

  function removeEmpty(updates) {
    return Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v != "")
    );
  }

  const DeleteItem = itemId => {
    axios
      .delete(`${global.config.backendUrl}/items/DeleteItemById/${itemId}`, {
        withCredentials: true,
      })
      .then(response => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {values.map(collection => (
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
                    margin: "20px auto",
                  }}
                  justifyContent="center"
                  src={`${global.config.backendUrl}/uploads/${collection.image}`}
                />
                <Button
                  startIcon={<UpgradeIcon />}
                  variant="contained"
                  sx={{ marginTop: "30px" }}
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
                <TextField
                  id="outlined"
                  label="Name"
                  variant="outlined"
                  defaultValue={`${collection.name}`}
                  onChange={e => setName(e.target.value)}
                  style={{ marginTop: "30px", marginBottom: "20px" }}
                />
                <br />
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  sx={{ width: "100%", marginTop: "40px" }}
                  defaultValue={`${collection.description}`}
                  onChange={e => setMarkDownInput(e.target.value)}
                />
                <Accordion style={{ marginTop: "30px" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>MarkDown Result</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      textAlign: "left",
                      width: `${
                        markDownInput.length > 0 ||
                        collection.description.length > 0
                          ? "300px"
                          : "0"
                      }`,
                      height: `${
                        markDownInput.length > 0 ||
                        collection.description.length > 0
                          ? "300px"
                          : "0"
                      }`,
                    }}
                  >
                    {
                      <ReactMarkdown
                        children={
                          markDownInput.length <= 0
                            ? collection.description
                            : markDownInput
                        }
                        style={{ width: "100%", height: "100px" }}
                      />
                    }
                  </AccordionDetails>
                </Accordion>
                <br />
                <TextField
                  id="outlined"
                  label="About"
                  variant="outlined"
                  defaultValue={`${collection.about}`}
                  onChange={e => setAbout(e.target.value)}
                  style={{ marginTop: "30px" }}
                />
                <br />
                <FormControl fullWidth>
                  <Typography style={{ textAlign: "left", padding: "10px" }}>
                    Topic
                  </Typography>
                  <Select
                    labelId="Topic"
                    id="topic"
                    label="Topic"
                    defaultValue={`${collection.topic}`}
                    onChange={e => setSelectedTopic(e.target.value)}
                  >
                    {topics &&
                      topics?.map(({ topic_name, Id }) => (
                        <MenuItem key={Id} value={topic_name}>
                          {topic_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <br />

                <Accordion style={{ marginTop: "20px" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <LibraryBooksIcon />
                    <Typography sx={{ ml: 2 }}>Items update</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {collection.items.map(element => (
                      <Grid container spacing={2}>
                        <Grid item>
                          <ButtonBase sx={{ width: 80, height: 80 }}>
                            <Img
                              alt="complex"
                              src={`${global.config.backendUrl}/uploads/${element.image}`}
                            />
                          </ButtonBase>
                        </Grid>
                        <Grid item xs={6} sm container>
                          <Grid
                            item
                            xs
                            container
                            direction="column"
                            spacing={2}
                          >
                            <Grid item xs>
                              <Typography
                                gutterBottom
                                variant="subtitle1"
                                component="div"
                                sx={{
                                  display: "block",
                                  justifyContent: "center",
                                }}
                              >
                                <span style={{ fontWeight: "700" }}>
                                  {element.item_name}
                                </span>
                                <p style={{ display: "flex" }}>
                                  <DeleteIcon
                                    sx={{
                                      marginLeft: "10px",
                                      color: "red",
                                      cursor: "pointer",
                                      fontSize: "20px",
                                      marginLeft: "30px",
                                    }}
                                    onClick={() => DeleteItem(element.Id)}
                                  />
                                  <EditIcon
                                    sx={{
                                      paddingLeft: "30px",
                                      cursor: "pointer",
                                      fontSize: "20px",
                                    }}
                                    onClick={() =>
                                      navigate(
                                        `/User/${collection.UserId}/collection/${collection.Id}/Item/${element.Id}/edit`
                                      )
                                    }
                                  />
                                  <OpenInNewIcon
                                    sx={{
                                      paddingLeft: "20px",
                                      cursor: "pointer",
                                      fontSize: "20px",
                                    }}
                                    // onClick={() =>
                                    //   navigation(
                                    //     `/collection/item/${collection.Id}/create`
                                    //   )
                                    // }
                                  />
                                </p>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                  </AccordionDetails>
                </Accordion>
                <Button
                  variant="contained"
                  onClick={() => UpdateCollection(collection)}
                  style={{ marginTop: "30px" }}
                >
                  Update Collection
                </Button>
              </Box>
            </React.Fragment>
          </Paper>
        </Container>
      ))}
    </div>
  );
}

export default EditCollection;
