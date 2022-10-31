import {Link} from 'react-router-dom'
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
function NotCreator() {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ marginTop: "60px" }}>
          <WarningAmberIcon style={{ fontSize: "50px" }} />
          <h2>Permission Denied</h2>
          <p>This page only open for creator and admins</p>
          <Link to="/auth" style={{ fontSize: "20px", color: "#8bc5e0" }}>
            Try another account
          </Link>
        </div>
      </div>
    );
}
export default NotCreator;