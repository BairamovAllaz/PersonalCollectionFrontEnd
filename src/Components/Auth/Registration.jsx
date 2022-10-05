import './Registration.scss'
import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {SiPrivateinternetaccess} from 'react-icons/si'
import {BiImageAdd} from 'react-icons/bi'
import GoogleButton from 'react-google-button'

function Registration() {
    const [isLog, setisLog] = useState(false);
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
                            <div>
                                <TextField className="outlined-basic" label="Email*" variant="outlined"
                                           style={{marginTop: "20px"}}/>
                                <TextField className="outlined-basic" label="Password*" variant="outlined" type="password"
                                           style={{marginTop: "20px"}}/>
                                <Button variant="contained" style={{
                                    background: "linear-gradient(to bottom,#cb42f5,#f542ec)",
                                    marginTop: "20px",
                                    width: "70%",
                                    height: "50px"
                                }}
                                >Login</Button>
                            </div>
                        ) : (
                            <div>
                                <TextField className="outlined-basic" label="FirstName*" variant="outlined"
                                           style={{marginTop: "20px"}}/>
                                <TextField className="outlined-basic" label="LastName*" variant="outlined"
                                           style={{marginTop: "20px"}}/>
                                <TextField className="outlined-basic" label="Email*" variant="outlined"
                                           style={{marginTop: "20px"}}/>
                                <TextField className="outlined-basic" label="Password*" variant="outlined" type="password"
                                           style={{marginTop: "20px"}}/>
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
                                    />
                                </Button>
                                <Button variant="contained" style={{
                                    background: "linear-gradient(to bottom,#cb42f5,#f542ec)",
                                    marginTop: "40px",
                                    width: "70%",
                                    height: "50px"
                                }}
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
