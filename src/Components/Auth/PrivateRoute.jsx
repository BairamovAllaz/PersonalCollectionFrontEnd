import { Route, Redirect, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from '../Home'
export { PrivateRoute };
function PrivateRoute({children}) {
    const [isAuth, setisAuth] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('user')) !== null) {
            setisAuth(true);
            navigate("/");
        } else {
            setisAuth(false);
            navigate("/auth");
        }
    }, []);
    return isAuth ? <Home /> : <Navigate to="/auth" />;
}
export default PrivateRoute;