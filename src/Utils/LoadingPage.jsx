import React from 'react'
import CircularProgress from "@mui/material/CircularProgress";
function LoadingPage() {
  return (
    <div style = {{display : "block",justifyContent : "center",textAlign : "center"}}>
      <CircularProgress />
    </div>
  );
}

export default LoadingPage