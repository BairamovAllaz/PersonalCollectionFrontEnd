import { Route, Redirect, useNavigate, Navigate } from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {UserPermisionContext} from "./Context";
import Admin from "../Components/AdminPage/Admin";
import NotAdminPage from "../Components/AdminPage/AdminComponents/NotAdminPage";
import axios from "axios";
function AdminPrivateRoute({children}) {
    const navigate = useNavigate();
    const [isAuth, setisAuth] = useState(false);
    React.useEffect( () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user !== null) {
            setisAuth(false);
        }else {
            axios.get(`${global.config.backendUrl}/v1/getuser`,{
                withCredentials : true
            }).then((response) => {
                console.log(response.data);
                if (response.data.userRole === true) {
                    setisAuth(true);
                }
            }).catch((err) => {
                alert(err.response.data)
            })
        }
    },[])

    return isAuth ? <Admin /> : <NotAdminPage/>;
}
export default AdminPrivateRoute;