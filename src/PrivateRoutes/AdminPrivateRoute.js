import { Route, Redirect, useNavigate, Navigate } from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {UserPermisionContext} from "./Context";
import Admin from "../Components/AdminPage/Admin";
import NotAdminPage from "../Components/AdminPage/AdminComponents/NotAdminPage";
import axios from "axios";
function AdminPrivateRoute({children}) {
    const navigate = useNavigate();
    const [isAuth, setisAuth] = useState(false);
    const {user} = React.useContext(UserPermisionContext);
    React.useEffect( () => {
        if(user.userRole === true) {
            setisAuth(true);
        }else{
            setisAuth(false);
        }
    },[])

    if(user === null) {
        return <div>getting</div>
    }
    return (
        isAuth ? <Admin /> : <NotAdminPage/>
    );
}
export default AdminPrivateRoute;