import axios from "axios";
import React, { useEffect, useState } from "react";
export const UserPermisionContext = React.createContext({});
export default function Context(props) {
  const [user, setUser] = useState(null);
  const [isLoading,setIsLoading] = React.useState(true);
  React.useLayoutEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user !== null) {
      user.userRole = "Guest";
      setUser(user);
      setIsLoading(false);
    } else {
      axios
        .get(`${global.config.backendUrl}/v1/getuser`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(response => {
          console.log(response.data);
          setUser(response.data);
          setIsLoading(false);
        })
        .catch(err => {
          alert(err.response.data);
        });
    }
  }, []);

  if(isLoading) { 
    return <div>Loading...</div>
  }
  return (
    <UserPermisionContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserPermisionContext.Provider>
  );
}
