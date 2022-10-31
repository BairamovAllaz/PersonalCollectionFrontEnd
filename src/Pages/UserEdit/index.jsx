import { useParams, useRouteLoaderData } from "react-router-dom";
import React from "react";
import axios from "axios";
import EditUserTextInputs from "./EditUserTextInputs";
function UserEdit() {
  const { userId } = useParams();
  const [userApi, setUserApi] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${global.config.backendUrl}/userpage/getUserInfo/${userId}`)
      .then(res => {
        setUserApi(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {userApi.map(user => (
        <EditUserTextInputs user = {user} userId = {userId}/>
      ))}
    </div>
  );
}
export default UserEdit;
