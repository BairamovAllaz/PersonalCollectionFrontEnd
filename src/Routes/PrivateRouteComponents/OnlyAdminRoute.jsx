import React, {useContext, useEffect, useState} from "react";
import { UserContext } from "../../Middleware/UserContext";
import Admin from "../../Pages/Admin/index";
import NotAdminPage from "../../Pages/InfoPages/NotAdminPage";
function OnlyAdminRoute({children}) {
    const [isAuth, setisAuth] = useState(false);
    const { user } = React.useContext(UserContext);
    React.useEffect( () => {
        if(user.userRole === true && user.isBlocked === false) {
            setisAuth(true);
        }else{
            setisAuth(false);
        }
    },[])
    return (
        isAuth ? <Admin /> : <NotAdminPage/>
    );
}
export default OnlyAdminRoute;