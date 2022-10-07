import Snackbar from '@mui/material/Snackbar';
import React,{useState,useEffect} from 'react';

import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ErrorUi({errorMessage, typee}) {
        const [open, setOpen] = useState(false);

        const handleClick = () => {
            setOpen(true);
        };
        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            setOpen(false);
        };
        useEffect(() => {
            setOpen(true);
        },[])
        return(
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={typee.toString()} sx={{ width: '100%' }}>
                {errorMessage}
            </Alert>
        </Snackbar>
        )
}
    export default ErrorUi;