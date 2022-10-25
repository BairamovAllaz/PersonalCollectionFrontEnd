import React from "react";
import CollectionBox from "./CollectionContainerComponents/CollectionBox";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
function CollectionContainer() {
  const [collections, setCollections] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`${global.config.backendUrl}/home/GetLargestCollections/`, {
        withCredentials: true,
      })
      .then(response => {
        setCollections(response.data);
        setLoading(false);
        console.log(response.data)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <div style={{ width: "100%" }}>
      <h3>Top 5 largest collection</h3>
      <Carousel style={{ width: "100%" }}>
        {collections.map((item, i) => (
          <CollectionBox item={item} key={i} />
        ))}
      </Carousel>
    </div>
  );
}

export default CollectionContainer;
