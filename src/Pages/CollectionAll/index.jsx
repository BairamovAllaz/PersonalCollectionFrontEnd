import React from "react";
import axios from "axios";
import { Box } from "@mui/material";
import LoadingPage from "../../Utils/LoadingPage";
import CollectionContainer from "./CollectionContainer";
import ReactPaginate from "react-paginate";
import "./Styles/Pagination.css";
function CollectionAll() {
  const [collections, setCollections] = React.useState([]);
  const [collectionPerPage] = React.useState(6);
  const [collectionsLength, setCollectionsLength] = React.useState(0);
  const [offset, setOffset] = React.useState(1);
  const [pageCount, setPageCount] = React.useState(0);
  const [loaded, setLoaded] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`${global.config.backendUrl}/home/GetCollections`, {
        withCredentials: true,
      })
      .then(response => {
        const pageData = response.data.slice(
          offset - 1,
          offset - 1 + collectionPerPage
        );
        setCollectionsLength(response.data.length)
        setPageCount(Math.ceil(response.data.length / collectionPerPage));
        setCollections(pageData);
        setLoaded(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [offset]);

  const handlePageClick = event => {
    const selectedPage = event.selected;
    setOffset(selectedPage + 1);
  };

  if (loaded) {
    return <LoadingPage />;
  }
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>All collections</h1>
        <h2 style = {{color : "gray"}}>Total</h2>
        <b>{collectionsLength}</b>
      </div>
      <Box
        sx={{
          display: { sm: "flex", xs: "block" },
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "center",
          height: "auto",
        }}
      >
        {collections.map(collection => (
          <CollectionContainer collection={collection} />
        ))}
      </Box>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}

export default CollectionAll;
