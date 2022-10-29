import React from "react";
import CollectionBox from "./CollectionContainerComponents/CollectionBox";
import Carousel from "react-material-ui-carousel";
import LoadingPage from "../../../../Utils/LoadingPage";
import { useTranslation } from "react-i18next";
import axios from "axios";
function CollectionContainer() {
  const [collections, setCollections] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { t } = useTranslation();

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
    return <LoadingPage/>;
  }
  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ margin: "20px" }}>{t("top_5_largest_collection")}</h2>
      <Carousel style={{ width: "100%" }}>
        {collections.map((item, i) => (
          <CollectionBox item={item} key={i} />
        ))}
      </Carousel>
    </div>
  );
}

export default CollectionContainer;
