import axios from "axios";
import React, {useEffect, useState} from "react";
export const UserPermisionContext = React.createContext();
export default function Context(props) {
    //TODO FIX USER FROM CONTEXT
    const [user,setUser] = useState("")
    React.useLayoutEffect (() => {
        axios.get(`${global.config.backendUrl}/v1/getuser`,{
            withCredentials : true,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response.data)
            setUser(response.data);
        }).catch((err) => {
            alert(err.response.data)
        })
    },[]);

    return (
        <UserPermisionContext.Provider value={user}>{props.children}</UserPermisionContext.Provider>
    )
}