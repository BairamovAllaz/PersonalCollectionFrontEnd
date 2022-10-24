import { Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "../../Components/Home";
import * as React from "react";
import axios from "axios";
export { PrivateRoute };
function PrivateRoute({ children }) {
  const [isAuth, setisAuth] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  React.useLayoutEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user !== null) {
      setisAuth(true);
      setisLoading(false);
    } else {
      axios
        .get(`${global.config.backendUrl}/v1/getuser`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(response => {
          setisAuth(response.data);
          setisLoading(false);
        })
        .catch(err => {
          alert(err.response.data);
        });
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isAuth ? <Home /> : <Navigate to="/auth" />;
}
export default PrivateRoute;