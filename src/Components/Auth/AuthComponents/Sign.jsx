import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {BiImageAdd} from "react-icons/bi";
import {useNavigate} from "react-router-dom";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import {useState} from "react";
import axios from "axios";

function Sign() {
    const navigation = useNavigate();
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");


    const RegisterClick = (e) => {
        if (isBlankInputsRegister()) {
            alert("Please fill all the input fileds");
            return;
        }
        e.preventDefault();
        const UserData = new FormData();
        UserData.append("firstName", firstName);
        UserData.append("lastName", lastName);
        UserData.append("email", email);
        UserData.append("password", password);
        UserData.append("image", image);
        axios.post(`${global.config.backendUrl}/v1/register`, UserData,{
            withCredentials : true,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            setStorage(response.data);
            navigation("/");
        }).catch((err) => {
            alert(err.response.data)
        })
        clearInputs();
    }

    function clearInputs() {
        setEmail("");
        setPassword("");
        setfirstName("");
        setlastName("");
        setImage(undefined);
    }

    function isBlankInputsRegister() {
        if (
            firstName === ""
            || lastName === ''
            || email === ''
            || password === '') {
            clearInputs();
            return true;
        }
        return false;
    }

    function setStorage(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    return (
        <div>
            <TextField className="outlined-basic" label="FirstName*" variant="outlined"
                       style={{marginTop: "20px"}}
                       onChange={(e) => setfirstName(e.target.value)}
                       value={firstName}
            />
            <TextField className="outlined-basic" label="LastName*" variant="outlined"
                       style={{marginTop: "20px"}}
                       onChange={(e) => setlastName(e.target.value)}
                       value={lastName}
            />
            <TextField className="outlined-basic" label="Email*" variant="outlined"
                       style={{marginTop: "20px"}}
                       onChange={(e) => setEmail(e.target.value)}
                       value={email}
            />
            <TextField className="outlined-basic" label="Password*" variant="outlined"
                       type="password"
                       style={{marginTop: "20px"}}
                       onChange={(e) => setPassword(e.target.value)}
                       value={password}
            />
            <Button
                variant="contained"
                component="label"
                style={{
                    marginTop: "15px",
                    width: "65%",
                    height: "50px"
                }}
            >
                <BiImageAdd style={{
                    paddingRight: "10px",
                    fontSize: "20px",
                }}/>
                <b>
                    Profile Image
                </b>
                <input
                    type="file"
                    hidden
                    onChange={(e) => {
                        setImage(e.target.files[0])
                    }}
                />
            </Button>
            <Button variant="contained" startIcon={<AppRegistrationIcon/>} style={{
                background: "linear-gradient(to bottom,#cb42f5,#f542ec)",
                marginTop: "40px",
                width: "70%",
                height: "50px"
            }}
                    onClick={RegisterClick}
            >Sign</Button>
        </div>
    );
}

export default Sign;