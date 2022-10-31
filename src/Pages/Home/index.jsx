import {Grid,Container} from '@mui/material';
import CollectionContainer from './CollectionContainer';
import ItemContainers from './ItemContainers';
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