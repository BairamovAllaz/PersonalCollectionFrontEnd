import React from "react";
import TagCloud from "./TagCloud";
import axios from "axios";
import ItemBox from "./ItemBox";
import Button from "@mui/material/Button";
import LoadingPage from "../../Utils/LoadingPage";
import { useStyles } from "./Styles/ItemContainer.style";
import { useTranslation } from "react-i18next";

function ItemContainers() {
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [load, setLoad] = React.useState(6);
  const [loading, setLoading] = React.useState(true);
  const [selectedTags, setSelectedTags] = React.useState([]);
  const { t } = useTranslation();

  React.useEffect(() => {
    axios
      .get(`${global.config.backendUrl}/home/GetItemsByDate`, {
        withCredentials: true,
      })
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleClick = (tagName, id) => {
    if (selectedTags.includes(tagName)) {
      const indexToRemove = selectedTags.indexOf(tagName);
      selectedTags.splice(indexToRemove, 1);
      setSelectedTags([...selectedTags]);
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
    console.log(selectedTags);
  };

  const filteredData = data.filter(item => {
    if (selectedTags.length <= 0) {
      return data;
    }
    return selectedTags.some(it => {
      return item.itemTags.some(dat => dat.tag_name == it);
    });
  });

  const loadMore = () => {
    setLoad(prev => prev + 6);
  };
  const ShowLess = () => {
    setLoad(6);
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className={classes.MainDiv}>
      <div>
        <h2>{t("latest_items")}</h2>
      </div>
      <TagCloud handleClick={handleClick} selectedTags={selectedTags} />
      <div className={classes.DivInfoItem}>
        {filteredData.slice(0, load).map(item => (
          <ItemBox item={item} />
        ))}
        <div className={classes.DivButton}>
          {load > data.length ? (
            <Button onClick={ShowLess}>{t("show_less")}</Button>
          ) : (
            <Button onClick={loadMore}>{t("load_more")}</Button>
          )}
        </div>
      </div>
    </div>
  );
}
export default ItemContainers;
