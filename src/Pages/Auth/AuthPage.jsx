import { useState } from "react";
import Button from "@mui/material/Button";
import Login from "../../Components/AuthComponents/Login";
import Sign from "../../Components/AuthComponents/Sign";
import AuthFotter from "../../Components/AuthComponents/AuthFotter";
import { Container, Paper, Typography ,Box,Stack} from "@mui/material";
import "./styles/Auth.scss";
function AuthPage() {
  const [isLog, setisLog] = useState(true);
  return (
    <Container component="main" maxWidth="xs" sx={{ mb: 4,textAlign : "center"}}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          {isLog ? "Login" : "Sign"}
        </Typography>
        <Box style = {{display :"flex",justifyContent : "center",marginTop :"20px"}}>
          <Stack direction = "row" spacing = {1}>
            <Button
              variant="contained"
              style={{
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
            <Button
              variant="contained"
              style={{
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
          </Stack>
        </Box>
        <form className="Form">
            {isLog ? <Login /> : <Sign />}
            <AuthFotter />
        </form>
      </Paper>
    </Container>
  );
}

export default AuthPage;
