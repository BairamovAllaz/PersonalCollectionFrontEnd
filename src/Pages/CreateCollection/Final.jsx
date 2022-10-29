import {useContext} from "react";
import { InfoContext } from "./index";
import {Alert} from "@mui/material";
import {Link} from "react-router-dom";

function Final() {
    const {userId,collectionId} = useContext(InfoContext);
    return(
        <div>
            <Alert severity="success">Collection created successfuly — check it out!</Alert>
            <br/>
            <Link to={`/User/${userId}/collection/${collectionId}`} style = {{paddingTop : "30px"}}>Collection Link</Link>
        </div>
    )
}

export default Final;