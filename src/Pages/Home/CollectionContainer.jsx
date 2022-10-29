import React from "react";
import CollectionBox from "./CollectionBox";
import Carousel from "react-material-ui-carousel";
import LoadingPage from "../../Utils/LoadingPage";
import { useTranslation } from "react-i18next";
import { useStyles } from "./Styles/CollectionContainer.style";
import axios from "axios";
function CollectionContainer() {
  const classes = useStyles();
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
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className={classes.MainDiv}>
      <h2 className={classes.Title}>{t("top_5_largest_collection")}</h2>
      <Carousel className={classes.Carousel}>
        {collections.map((item, i) => (
          <CollectionBox item={item} key={i} />
        ))}
      </Carousel>
    </div>
  );
}

export default CollectionContainer;
