import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import { Grid, Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { Avatar, ButtonBase, CardMedia } from "@mui/material";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import AppsIcon from "@mui/icons-material/Apps";
import InfoIcon from "@mui/icons-material/Info";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserPermisionContext } from "../../UserContext/Context";
import DescriptionIcon from "@mui/icons-material/Description";
import CollectionDescModal from "./CollectionShowPageComponents/CollectionDescModal";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ItemsContainer from "./CollectionShowPageComponents/ItemsContainer";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

function CollectionShowPage() {
  const navigation = useNavigate();
  const { user } = React.useContext(UserPermisionContext);
  const { userId, collectionId } = useParams();
  const [values, setValues] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  React.useEffect(() => {
    axios
      .get(
        `${global.config.backendUrl}/items/getAllItems/${userId}/${collectionId}`
      )
      .then(response => {
        setValues(response.data);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (values === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {values.map(user =>
        user.collections.map(collection => (
          <Container maxWidth="lg" style={{ border: "solid 1px black" }}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <Grid container>
                <Grid item md={4} xs={12}>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={6} md={12}>
                        <CardMedia
                          component="img"
                          height="194"
                          image={`${global.config.backendUrl}/uploads/${collection.image}`}
                          alt="Paella dish"
                        />
                        <CardHeader
                          avatar={
                            <Avatar
                              aria-label="recipe"
                              src={`${global.config.backendUrl}/uploads/${user.image}`}
                            />
                          }
                          action={
                            <IconButton aria-label="settings">
                              <RemoveRedEyeIcon
                                onClick={() => navigation(`/user/${user.Id}`)}
                              />
                            </IconButton>
                          }
                          title={`${user.firstName} ${user.lastName}`}
                          subheader={`${new Date(
                            collection.createdAt
                          ).toLocaleDateString("en-US")}`}
                        />
                      </Grid>
                      <Grid item xs={6} md={12}>
                        <Typography
                          sx={{ mb: 1.5 }}
                          color="text.secondary"
                          variant="h4"
                        >
                          <AppsIcon />
                          {collection.name}
                        </Typography>
                        <p>#{collection.topic}</p>
                        <Typography variant="body2">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <InfoIcon />
                            <span style={{ padding: "3px" }}>
                              {collection.about}
                            </span>
                          </div>
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    {user.Role === "Guest" || user.Id != userId ? (
                      <></>
                    ) : (
                      <DeleteIcon
                        sx={{
                          marginLeft: "20px",
                          color: "red",
                          cursor: "pointer",
                          fontSize: "30px",
                        }}
                      />
                    )}
                    <CollectionDescModal
                      isDialogOpened={openDialog}
                      handleCloseDialog={() => setOpenDialog(false)}
                      descText={collection.description}
                    />
                    <DescriptionIcon
                      style={{
                        fontSize: "30px",
                        marginLeft: "30px",
                        cursor: "pointer",
                      }}
                      onClick={handleClickOpenDialog}
                    />
                  </CardActions>
                  <Accordion style={{ margin: "10px auto" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Filter</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{}}>
                      <h1>Filter</h1>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item md={8} xs={12}>
                      <ItemsContainer items={collection.items} />
                </Grid>
              </Grid>
            </Paper>
          </Container>
        ))
      )}
    </div>
  );
}
export default CollectionShowPage;
