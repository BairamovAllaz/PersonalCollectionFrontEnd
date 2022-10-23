import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Middleware/UserContext";
import NotYou from "./NotYou";
function OwnPageRoute({ children }) {
  const { userId } = useParams();
  const [isAuth, setisAuth] = useState(false);
  const { user } = React.useContext(UserContext);
  React.useEffect(() => {
    if (
      (user.Id == userId || user.userRole === true) &&
      user.isBlocked != true
    ) {
      setisAuth(true);
    } else {
      setisAuth(false);
    }
  }, []);

  if (user === null) {
    return <div>getting...</div>;
  }
  return isAuth ? children : <NotYou />;
}
export default OwnPageRoute;
