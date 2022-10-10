import { Route, Redirect, useNavigate, Navigate } from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {UserPermisionContext} from "../App";
import Admin from "../Components/AdminPage/Admin";
import NotAdminPage from "../Components/AdminPage/AdminComponents/NotAdminPage";
import axios from "axios";
function AdminPrivateRoute({children}) {
    const [isAuth, setisAuth] = useState(false);
    const {user,userRole} = useContext(UserPermisionContext);
    const navigate = useNavigate();

    React.useEffect( () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user === null || user.userRole === "Guest") {
            setisAuth(false);
        }else{
            axios.get(`${global.config.backendUrl}/v1/get/${user.Id}`).then((response) => {
                setisAuth(response.data.userRole);
            }).catch((err) => {
                alert(err.response.data)
            })
        }

    },[isAuth])

    return isAuth ? <Admin /> : <NotAdminPage/>;
}
export default AdminPrivateRoute;