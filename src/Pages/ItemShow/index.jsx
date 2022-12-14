import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { UserContext } from "../../Context/UserContext";
import CommentBox from "./CommentBox";
import ItemContainer from "./ItemContainer";
import InfoContainer from "./InfoContainer";
import LoadingPage from "../../Utils/LoadingPage";
function ItemShow() {
  const { userId, collectionId, itemId } = useParams();
  const [isLoaded, setIsLoaded] = React.useState(true);
  const { user } = React.useContext(UserContext);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${global.config.backendUrl}/items/getItemsById/${itemId}`)
      .then(response => {
        setItems(response.data);
        setIsLoaded(false);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (isLoaded) {
    return <LoadingPage />;
  }
  return (
    <div>
      {items.length <= 0 ? (
        <h2 style={{ textAlign: "center" }}>
          Item does not exsist OR deleted!!
        </h2> //TODO ADD PAGE HERE
      ) : (
        <div>
          <div>
            {items.map(itemCol => (
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <ItemContainer
                      userId={userId}
                      userCol={itemCol.collection.user}
                      collectionCol={itemCol.collection}
                      itemCol={itemCol}
                      user={user}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} style={{ marginTop: "20px" }}>
                        <InfoContainer itemCol={itemCol} />
                      </Grid>
                      <Grid item xs={12}>
                        <CommentBox
                          currUser={user}
                          itemId={itemCol.Id}
                          userRole={itemCol.collection.user.userRole}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemShow;
