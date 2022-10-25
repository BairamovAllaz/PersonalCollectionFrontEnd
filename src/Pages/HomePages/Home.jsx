import {Grid,Container} from '@mui/material';
import CollectionContainer from '../../Components/HomePageComponents/ItemContainer/CollectionContainer/CollectionContainer';
import ItemContainers from '../../Components/HomePageComponents/ItemContainer/ItemContainers';
function Home() {

    return (
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Grid container>
          <Grid item xs={12} style={{ height: "30%" }}>
            <CollectionContainer />
          </Grid>
          <Grid item xs={12} style={{ height: "70%" }}>
            <ItemContainers />
          </Grid>
        </Grid>
      </Container>
    );
}

export default Home;    