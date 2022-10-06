import './Registration.scss'
import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {SiPrivateinternetaccess} from 'react-icons/si'
import {BiImageAdd} from 'react-icons/bi'
import GoogleButton from 'react-google-button'
import {useNavigate} from "react-router-dom";
import axios from 'axios';

function Registration() {
    const navigation = useNavigate();
    const [isLog, setisLog] = useState(true)
    const [firstName,setfirstName] = useState("");
    const [lastName,setlastName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [image,setImage] = useState("");

    const LoginClick = (e) => {
        e.preventDefault();
        const UserData = {
            email,
            password
        }
        axios.post("http://localhost:5100/v1/login",UserData).then((response) => {
            setStorage(response.data);
            navigation("/");
        }).catch((err) => {
            alert(err.response.data)
        })
        clearInputs();
    }

    const RegisterClick = (e) => {
         e.preventDefault();
         const UserData = new FormData();
         UserData.append("firstName",firstName);
         UserData.append("lastName",lastName);
         UserData.append("email",email);
         UserData.append("password",password);
         UserData.append("image",image);
         axios.post("http://localhost:5100/v1/register",UserData).then((response) => {
             console.log("Registering succes");
             setStorage(response.data);
             navigation("/");
         }).catch((err) => {
             alert(err.response.data)
         })
        clearInputs();
    }


    function setStorage(user){
        localStorage.setItem('user',JSON.stringify(user));
    }

    function clearInputs() {
        setfirstName("");
        setlastName("");
        setEmail("");
        setPassword("");
    }

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
                        }} onClick={() => {
                            setisLog(true)
                            setfirstName("");
                            setlastName("")
                        }}
                        >Login</Button>
                    </div>
                    <div className="SignUpToggle">
                        <Button variant="contained" style={{
                            width: "100%",
                            height: "100%",
                            background: `${!isLog ? "linear-gradient(to bottom,#cb42f5,#f542ec)" : "#f0f3f7"}`,
                            color: `${!isLog ? "white" : "black"}`
                        }} onClick={() => {
                            setisLog(false)
                            setfirstName("");
                            setlastName("")
                        }}
                        >Sign</Button>
                    </div>
                </div>
                <form className="Form">
                    {
                        isLog ? (
                            <div>
                                <TextField className="outlined-basic" label="Email*" variant="outlined"
                                           style={{marginTop: "20px"}}
                                           onChange={(e) => setEmail(e.target.value)}
                                           value = {email}
                                />
                                <TextField className="outlined-basic" label="Password*" variant="outlined" type="password"
                                           style={{marginTop: "20px"}}
                                            onChange={(e) => setPassword(e.target.value)}
                                           value = {password}
                                />
                                <Button variant="contained" style={{
                                    background: "linear-gradient(to bottom,#cb42f5,#f542ec)",
                                    marginTop: "20px",
                                    width: "70%",
                                    height: "50px"
                                }}
                                        onClick={LoginClick}
                                >Login</Button>
                            </div>
                        ) : (
                            <div>
                                <TextField className="outlined-basic" label="FirstName*" variant="outlined"
                                           style={{marginTop: "20px"}}
                                            onChange = {(e) => setfirstName(e.target.value)}
                                           value = {firstName}
                                />
                                <TextField className="outlined-basic" label="LastName*" variant="outlined"
                                           style={{marginTop: "20px"}}
                                            onChange={(e) => setlastName(e.target.value)}
                                           value = {lastName}
                                />
                                <TextField className="outlined-basic" label="Email*" variant="outlined"
                                           style={{marginTop: "20px"}}
                                            onChange = {(e) => setEmail(e.target.value)}
                                           value = {email}
                                />
                                <TextField className="outlined-basic" label="Password*" variant="outlined" type="password"
                                           style={{marginTop: "20px"}}
                                            onChange = {(e) => setPassword(e.target.value)}
                                           value = {password}
                                />
                                <Button
                                    variant="contained"
                                    component="label"
                                    style = {{
                                        marginTop : "15px",
                                        width : "65%",
                                        height: "50px"
                                    }}
                                >
                                    <BiImageAdd style = {{
                                        paddingRight : "10px",
                                        fontSize : "20px",
                                    }}/>
                                    <b>
                                    Profile Image
                                    </b>
                                    <input
                                        type="file"
                                        hidden
                                        onChange={(e) => {
                                            setImage(e.target.files[0])
                                            console.log(e.target.files[0]);
                                        }}
                                    />
                                </Button>
                                <Button variant="contained" style={{
                                    background: "linear-gradient(to bottom,#cb42f5,#f542ec)",
                                    marginTop: "40px",
                                    width: "70%",
                                    height: "50px"
                                }}
                                        onClick={RegisterClick}
                                >Sign</Button>
                            </div>
                        )
                    }
                    <div style = {{marginTop:"10px"}}>
                        <GoogleButton
                            type="light"
                            onClick={() => {
                                console.log('Google button clicked')
                            }}
                            style={{
                                margin: "0 auto",
                                width: "70%",
                                marginTop: "10px",
                            }}
                        />
                        <Button variant="contained" style={{
                            width: "70%",
                            height: "50px",
                            margin: "10px auto",
                        }}>
                            <SiPrivateinternetaccess style={{paddingRight: "10px"}}/>
                            <b>Guest account</b>
                        </Button>
                        <div style = {{marginBottom : "20px"}}>
                            <a href="src/Components/Auth/Registration">Forgot Password?</a>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Registration;
