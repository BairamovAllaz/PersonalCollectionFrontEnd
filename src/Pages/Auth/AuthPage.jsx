import { useState } from "react";
import Button from "@mui/material/Button";
import Login from "../../Components/AuthComponents/Login";
import Sign from "../../Components/AuthComponents/Sign";
import AuthFotter from "../../Components/AuthComponents/AuthFotter";
import "./styles/Auth.scss";
function AuthPage() {
  const [isLog, setisLog] = useState(true);
  //TODO MOVE TO MUI COMPONENTS
  return (
    <div className="RegisterMain">
      <div className="Main">
        <h3 className="header">{isLog ? "Login" : "Sign"}</h3>
        <div className="ToggleContainer">
          <div className="LoginToggle">
            <Button
              variant="contained"
              style={{
                width: "100%",
                height: "100%",
                background: `${
                  isLog
                    ? "linear-gradient(to bottom,#cb42f5,#f542ec)"
                    : "#f0f3f7"
                }`,
                color: `${isLog == true ? "white" : "black"}`,
              }}
              onClick={() => setisLog(true)}
            >
              Login
            </Button>
          </div>
          <div className="SignUpToggle">
            <Button
              variant="contained"
              style={{
                width: "100%",
                height: "100%",
                background: `${
                  !isLog
                    ? "linear-gradient(to bottom,#cb42f5,#f542ec)"
                    : "#f0f3f7"
                }`,
                color: `${!isLog ? "white" : "black"}`,
              }}
              onClick={() => setisLog(false)}
            >
              Sign
            </Button>
          </div>
        </div>
        <form className="Form">
          {isLog ? <Login /> : <Sign />}
          <AuthFotter />
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
