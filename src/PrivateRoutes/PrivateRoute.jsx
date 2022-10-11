import { Route, Redirect, useNavigate, Navigate } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Home from '../Components/Home'
import {UserPermisionContext} from "../App";
import axios from "axios";
export { PrivateRoute };
function PrivateRoute({children}) {
    const [isAuth, setisAuth] = useState();
    const navigate = useNavigate();
    const {user} = useContext(UserPermisionContext);
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('user')) !== null) {
            setisAuth(true);
            navigate("/");
        } else {
            setisAuth(false);
            navigate("/auth");
        }
        axios.get(`${global.config.backendUrl}/v1/getuser`,{
            withCredentials : true,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log("Private uiserser: " + response.data);
        }).catch((err) => {
            alert(err.response.data)
        })
    }, []);
    return isAuth ? <Home /> : <Navigate to="/auth" />;
}
export default PrivateRoute;