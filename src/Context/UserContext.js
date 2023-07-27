import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingPage from "../Utils/LoadingPage";
export const UserContext = React.createContext({});
export default function Context(props) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useLayoutEffect(() => {
    // const user = { userRole: "Guest", Id: "1" };
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      user.userRole = "Guest";
      setUser(user);
      setIsLoading(false);
      console.log(user);
    } else {
      axios
        .get(`${global.config.backendUrl}/v1/getuser`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(response => {
          setUser(response.data);
          console.log("User id : " + response.data.Id)
          setIsLoading(false);
        })
        .catch(err => {
          alert(err.response.data);
        });
    }
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
