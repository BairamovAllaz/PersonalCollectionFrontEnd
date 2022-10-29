import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {Link} from 'react-router-dom'
function NotAdminPage() {
  return (
    <div
      style={{ textAlign: "center", display: "flex", justifyContent: "center" }}
    >
      <div style={{ marginTop: "60px" }}>
        <WarningAmberIcon style={{ fontSize: "50px" }} />
        <h2>You are not admin</h2>
        <p>
          If you sure you was admin then possibly an admin removed or blocked
          you
        </p>
        <Link to="/auth" style={{ fontSize: "20px", color: "#8bc5e0" }}>
          Try another account
        </Link>
      </div>
    </div>
  );
}
export default NotAdminPage;
