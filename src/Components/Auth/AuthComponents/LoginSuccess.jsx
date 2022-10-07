
import Home from '../../Home'
import {useEffect} from 'react';
function LoginSuccess() {
    useEffect(() => {
        setTimeout(() => {
            window.close();
        },1000)
    },[])
    return(
        <div>
            <h1>You are good</h1>
        </div>
    );
}
export default LoginSuccess;