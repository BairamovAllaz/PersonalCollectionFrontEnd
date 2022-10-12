import { Route, Redirect, useNavigate, Navigate } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Home from '../Components/Home'
import {UserPermisionContext} from "./Context";
import axios from "axios";
import * as React from "react";
export { PrivateRoute };
function PrivateRoute({children}) {
    const [isAuth, setisAuth] = useState(false);
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(true);
    const value = React.useContext(UserPermisionContext);


    useEffect(() => {
       const isLog = localStorage.getItem("isLog");
       if(isLog) {
           setisAuth(true);
           navigate("/")
       }else{
           setisAuth(false);
           navigate("/auth")
       }

    }, []);


    return(
                 isAuth ? <Home/> : <Navigate to="/auth" />
);
}
export default PrivateRoute;