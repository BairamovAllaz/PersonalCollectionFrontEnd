import React from "react";
import TagCloud from "./ItemContainerComponents/TagCloud";
import axios from "axios";
import ItemBox from "./ItemContainerComponents/ItemBox";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

function ItemContainers() {
  const [data, setData] = React.useState([]);
  const [load, setLoad] = React.useState(3);
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
    setLoad(prev => prev + 3);
  };
  const ShowLess = () => {
    setLoad(3);
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


  ///TODO FIX FILTER
  //TODO ADD TAGS TO ITEM CONTAINER
  const filteredData = data.filter(item => {
    item.itemTags.forEach(sl => selectedTags.includes(sl.tag_name));
  });

  React.useEffect(() => {
    console.log(filteredData);
  }, [filteredData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TagCloud handleClick={handleClick} selectedTags={selectedTags} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data.slice(0, load).map(item => (
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
            <Button onClick={ShowLess}>Show Less</Button>
          ) : (
            <Button onClick={loadMore}>{t("load_more")}</Button>
          )}
        </div>
      </div>
    </div>
  );
}
export default ItemContainers;
