import React from "react";
import Button from "@mui/material/Button";
import Login from "./Login";
import Sign from "./Sign";
import AuthFotter from "./AuthFotter";
import { Container, Paper, Typography, Box, Stack } from "@mui/material";
import { useStyles } from "./Styles/index.style";
import { useTranslation } from "react-i18next";
function AuthPage() {
  const classes = useStyles();
  const [isLog, setisLog] = React.useState(true);
  const { t } = useTranslation();
  React.useEffect(() => {
    if (localStorage.getItem("user") != null) {
      localStorage.removeItem("user");
    }
  }, []);

  const changeIsLog = val => {
    setisLog(val);
  };
  return (
    <Container component="main" maxWidth="xs" className={classes.Container}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          {isLog ? t("login_text") : t("sign_text")}
        </Typography>
        <Box className={classes.BoxContainer}>
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
              onClick={() => changeIsLog(true)}
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
              onClick={() => changeIsLog(false)}
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
