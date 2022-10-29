import React from "react";
import TagCloud from "./TagCloud";
import axios from "axios";
import ItemBox from "./ItemBox";
import Button from "@mui/material/Button";
import LoadingPage from "../../Utils/LoadingPage";
import { useTranslation } from "react-i18next";

function ItemContainers() {
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
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const loadMore = () => {
    setLoad(prev => prev + 6);
  };
  const ShowLess = () => {
    setLoad(6);
  };

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

  if (loading) {
    return <LoadingPage/>;
  }

  return (
    <div style={{ marginTop: "30px" }}>
      <div>
        <h2>{t("latest_items")}</h2>
      </div>
      <TagCloud handleClick={handleClick} selectedTags={selectedTags} />
      <div
        style={{
          display: "inline-flex",
          flexWrap: "wrap",
          width: "100%",
          margin: "auto",
        }}
      >
        {filteredData.slice(0, load).map(item => (
          <ItemBox item={item} />
        ))}
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            width: "100%",
            marginBottom: "30px",
          }}
        >
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
