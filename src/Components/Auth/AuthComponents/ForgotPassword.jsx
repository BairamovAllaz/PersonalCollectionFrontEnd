import {useParams} from 'react-router-dom'
import {useEffect,useState} from 'react'
import {
    Checkbox,
    Grid,
    TextField,
    FormControlLabel,
    Paper,
} from '@material-ui/core';
import {useNavigate} from "react-router-dom";

import Button from '@mui/material/Button';
import axios from "axios";
function ForgotPassword() {
    const navigate = useNavigate();
    const {id,token} = useParams();
    const [password,setpassword] = useState();
    const [passwordVerify,setpasswordverify] = useState();

    useEffect(async() => {
        const isExsist = (await axios.get(`${global.config.backendUrl}/v1/checkToken`, token)).data;
        if(!isExsist) {
            alert("This token no longer exsist");
            navigate("/auth");
        }
    },[])

    const changePassword = async() => {
        const newpass = {
            password,
            passwordVerify
        }
        axios.put(`${global.config.backendUrl}/v1/forgot-password/${id}/${token}`, newpass).then((response) => {
            alert(response.data);
            navigate("/auth");
        }).catch((err) => {
            alert(err.response.data)
            clearInputs();
        })
    }

    function clearInputs() {
        setpassword("");
        setpasswordverify("");
    }

    return(
       <div>
           <Grid
               container
               direction="column"
               justifyContent="center"
               alignItems="center"
               style = {{marginTop :"20px"}}
           >
                    <h5>Change password</h5>
                   <TextField label="new password" type="password" style = {{marginTop:"20px"}} onChange={(e) => setpassword(e.target.value)} value={password}/>
                   <TextField label="repeat password" type="password" style = {{marginTop:"30px"}} onChange={(e) => setpasswordverify(e.target.value)} value={passwordVerify}/>
                    <Button variant="contained" component="label" style = {{marginTop : "30px"}} onClick = {changePassword}>Change Password</Button>
           </Grid>
       </div>
    );
}
export default ForgotPassword;