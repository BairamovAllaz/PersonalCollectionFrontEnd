import { useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import { UserContext } from "../../Middleware/UserContext";
import ItemsContainer from "./ItemsContainer";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LoadingPage from "../../Utils/LoadingPage";
import {useStyles} from './Styles/index.style'
import {
  FormLabel,
  FormControl,
  Paper,
  Grid,
  Container,
  Box,
} from "@mui/material";
import FilterComponent from "./FilterComponent";
import CollectionContainer from "./CollectionContainer";
function CollectionShowPage() {
  const classes = useStyles();
  const { user } = React.useContext(UserContext);
  const { userId, collectionId } = useParams();
  const [values, setValues] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(true);
  const [selectedFilter, setSelectedFilter] = React.useState("Default");
  const [searchText, setSearchText] = React.useState("");
  
  const handleChangeSearchText = text => {
    setSearchText(text);
  };

  const handleFilterChange = e => {
    setSelectedFilter(e.target.value);
  };

  React.useEffect(() => {
    axios
      .get(
        `${global.config.backendUrl}/items/getAllItems/${userId}/${collectionId}`,
        { withCredentials: true }
      )
      .then(response => {
        setValues(response.data);
        setIsLoaded(false);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (isLoaded) {
    return <LoadingPage/>;
  }

  return (
    <Box className={classes.BoxMain}>
      {values.map(userCol =>
        userCol.collections.map(collection =>
          collection.isDelete === true ? (
            <div className={classes.DeletedDiv}>
              <h1>
                <DeleteForeverIcon />
                Collection Deleted
              </h1>
            </div>
          ) : (
            <Container maxWidth={false} className={classes.ContainerMain}>
              <Paper
                variant="outlined"
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
              >
                <Grid container>
                  <Grid item md={4} xs={12}>
                    <CollectionContainer
                      collection={collection}
                      userCol={userCol}
                      user={user}
                      userId={userId}
                    />
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <Box className={classes.FormBox}>
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          <h2 className={classes.ItemsText}>Items</h2>
                        </FormLabel>
                        <FilterComponent
                          handleFilterChange={handleFilterChange}
                          handleChangeSearchText={handleChangeSearchText}
                        />
                      </FormControl>
                    </Box>
                    <div className={classes.DivItemsContainer}>
                        <ItemsContainer
                          items={collection.items}
                          searchText={searchText}
                          selectedFilter={selectedFilter}
                          userId={userCol.Id}
                        />
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </Container>
          )
        )
      )}
    </Box>
  );
}
export default CollectionShowPage;
