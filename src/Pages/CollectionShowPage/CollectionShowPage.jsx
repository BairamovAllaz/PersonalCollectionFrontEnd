import { useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import { UserContext } from "../../Middleware/UserContext";
import ItemsContainer from "../../Components/CollectionShowPageComponents/ItemsContainer";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  FormLabel,
  FormControl,
  Paper,
  Grid,
  Container,
  Box,
} from "@mui/material";
import FilterComponent from "../../Components/CollectionShowPageComponents/FilterComponent";
import CollectionContainer from "../../Components/CollectionShowPageComponents/CollectionContainer";
function CollectionShowPage() {
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
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      {values.map(userCol =>
        userCol.collections.map(collection =>
          collection.isDelete === true ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <h1>
                <DeleteForeverIcon />
                Collection Deleted
              </h1>
            </div>
          ) : (
            <Container maxWidth={false} sx={{ marginTop: "30px" }}>
              <Paper
                variant="outlined"
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
              >
                <Grid container>
                  <Grid item md={4} xs={12}>
                   <CollectionContainer collection = {collection} userCol = {userCol} user = {user} userId = {userId}/>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <Box
                      sx={{
                        maxWidth: "100%",
                        height: "auto",
                        marginLeft: { sm: "140px" },
                      }}
                    >
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          <h2
                            style={{ textAlign: "center", paddingTop: "20px" }}
                          >
                            Items
                          </h2>
                        </FormLabel>
                        <FilterComponent
                          handleFilterChange={handleFilterChange}
                          handleChangeSearchText={handleChangeSearchText}
                        />
                      </FormControl>
                    </Box>
                    <Box
                      style={{
                        width: "100%",
                        height: "auto",
                        textAlign: "center",
                      }}
                    >
                      <ItemsContainer
                        items={collection.items}
                        searchText={searchText}
                        selectedFilter={selectedFilter}
                        userId={userCol.Id}
                      />
                    </Box>
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
