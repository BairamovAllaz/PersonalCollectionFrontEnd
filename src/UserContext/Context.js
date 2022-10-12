import axios from "axios";
import React, {useEffect, useState} from "react";
export const UserPermisionContext = React.createContext({});
export default function Context(props) {
    const [user,setUser] = useState(null)
    React.useLayoutEffect (() => {
            const user = JSON.parse(localStorage.getItem("user"));
            if(user !== null) {
                setUser(user);
            }else{
                axios.get(`${global.config.backendUrl}/v1/getuser`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then((response) => {
                    console.log(response.data)
                    setUser(response.data);
                }).catch((err) => {
                    alert(err.response.data)
                })
            }
    },[]);

    return (
        <UserPermisionContext.Provider value={{user,setUser}}>{props.children}</UserPermisionContext.Provider>
    )
}