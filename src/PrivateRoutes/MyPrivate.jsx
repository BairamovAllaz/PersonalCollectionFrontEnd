import {Route, Redirect, useNavigate, Navigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {UserPermisionContext} from "../UserContext/Context";
import NotYou from "./NotYou";
import UserEdit from "../Components/UserProfil/UserProfileComponents/UserEdit";
function MyPrivate({children}) {
    const {userId} = useParams();
    const [isAuth, setisAuth] = useState(false);
    const {user} = React.useContext(UserPermisionContext);
    React.useEffect( () => {
        if(user.Id == userId) {
            setisAuth(true);
        }else{
            setisAuth(false);
        }
    },[])

    if(user === null) {
        return <div>getting</div>
    }
    return (
        isAuth ? <UserEdit/> : <NotYou/>
    );
}
export default MyPrivate;