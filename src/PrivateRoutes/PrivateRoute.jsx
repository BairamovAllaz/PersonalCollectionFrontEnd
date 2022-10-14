import { Route, Redirect, useNavigate, Navigate } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Home from '../Components/Home'
import * as React from "react";
export { PrivateRoute };
function PrivateRoute({children}) {
    const [isAuth, setisAuth] = useState(false);
    const navigate = useNavigate();
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

    return(isAuth ? <Home/> : <Navigate to="/auth" />);
}
export default PrivateRoute;