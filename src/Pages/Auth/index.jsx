import React from "react";
import Button from "@mui/material/Button";
import Login from "./Login";
import Sign from "./Sign";
import AuthFotter from "./AuthFotter";
import { Container, Paper, Typography, Box, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
function AuthPage() {
  const [isLog, setisLog] = React.useState(true);
  const { t } = useTranslation();
  React.useEffect(() => {
    if (localStorage.getItem("user") != null) {
      localStorage.removeItem("user");
    }
  }, []);
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ mb: 4, textAlign: "center" }}
    >
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          {isLog ? t("login_text") : t("sign_text")}
        </Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Stack direction="row" spacing={1}>
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
              {t("login_text")}
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
              {t("sign_text")}
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
