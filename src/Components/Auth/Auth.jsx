import './styles/Auth.scss'
import {useState} from 'react'
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import Login from "./AuthComponents/Login";
import Sign from "./AuthComponents/Sign";
import AuthFotter from "./AuthComponents/AuthFotter";

function Auth() {
    const navigation = useNavigate();
    const [isLog, setisLog] = useState(true)

    return (
        <div className="RegisterMain">
            <div className="Main">
                <h3 className="header">{isLog ? "Login" : "Sign"}</h3>
                <div className="ToggleContainer">
                    <div className="LoginToggle">
                        <Button variant="contained" style={{
                            width: "100%",
                            height: "100%",
                            background: `${isLog ? "linear-gradient(to bottom,#cb42f5,#f542ec)" : "#f0f3f7"}`,
                            color: `${isLog == true ? "white" : "black"}`
                        }} onClick={() => setisLog(true)}
                        >Login</Button>
                    </div>
                    <div className="SignUpToggle">
                        <Button variant="contained" style={{
                            width: "100%",
                            height: "100%",
                            background: `${!isLog ? "linear-gradient(to bottom,#cb42f5,#f542ec)" : "#f0f3f7"}`,
                            color: `${!isLog ? "white" : "black"}`
                        }} onClick={() => setisLog(false)}
                        >Sign</Button>
                    </div>
                </div>
                <form className="Form">
                    {
                        isLog ? (
                            <Login/>
                        ) : (
                            <Sign/>
                        )
                    }
                    <AuthFotter/>
                </form>
            </div>
        </div>
    );
}

export default Auth;
