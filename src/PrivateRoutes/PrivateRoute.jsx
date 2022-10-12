import { Route, Redirect, useNavigate, Navigate } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Home from '../Components/Home'
import {UserPermisionContext} from "./Context";
import axios from "axios";
export { PrivateRoute };
function PrivateRoute({children}) {
    const [isAuth, setisAuth] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const guest = JSON.parse(localStorage.getItem("user"));
        if(guest !== null){
            navigate("/");
            setisAuth(true);
        }else {
            axios.get(`${global.config.backendUrl}/v1/getuser`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                navigate("/");
                setisAuth(true);
            }).catch((err) => {
                navigate("/auth");
                setisAuth(false);
            })
        }
    }, []);
    return isAuth ? children : <Navigate to="/auth" />;
}
export default PrivateRoute;