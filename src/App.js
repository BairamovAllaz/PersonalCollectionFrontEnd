import "./App.scss";
import React from "react";
import Navbar from "./Layouts/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import Routes from "./Routes/Routes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@emotion/react";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  const { pathname } = useLocation();
  const currtheme = useTheme();
  const [mode, setMode] = React.useState("light");

  React.useEffect(() => {
    const mode = localStorage.getItem("mode");
    if (mode != null) {
      setMode(mode);
    }
  }, []);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
        const cur = localStorage.getItem("mode");
        if (cur != null) {
          localStorage.setItem("mode", cur == "light" ? "dark" : "light");
        } else {
          localStorage.setItem("mode", "dark");
        }
      },
    }),
    []
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {pathname !== "/auth" && <Navbar />}
        <Routes />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App;
