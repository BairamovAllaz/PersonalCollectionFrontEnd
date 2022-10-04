import './Registration.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {SiPrivateinternetaccess} from 'react-icons/si'
import GoogleButton from 'react-google-button'

function Registration() {
    return (
        <div className="RegisterMain">
            <div className="Main">
                <h3 className="header">Login</h3>
                <div className="ToggleContainer">
                    <div className="LoginToggle">Login</div>
                    <div className="SignUpToggle">SignUp</div>
                </div>
                <form className = "Form">
                    <TextField className="outlined-basic" label="Email" variant="outlined" style = {{marginTop: "20px"}}/>
                    <TextField className="outlined-basic" label="Pasword" variant="outlined" type="password" style = {{marginTop: "20px"}} />
                    <Button variant="contained" style = {{
                        background : "linear-gradient(to bottom,#cb42f5,#f542ec)",
                        marginTop : "20px",
                        width : "70%"
                    }}
                    >Login</Button>
                    <GoogleButton
                        type="light" // can be light or dark
                        onClick={() => { console.log('Google button clicked') }}
                        style = {{
                            margin : "0 auto",
                            width : "70%",
                            marginTop : "10px"

                        }}
                    />
                    <Button variant="outlined">
                        <SiPrivateinternetaccess/>
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Registration;
