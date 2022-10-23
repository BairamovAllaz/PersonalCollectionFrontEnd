import "./App.scss";
import React from "react";
import Navbar from "./Layouts/Navbar/Navbar";
import {useLocation } from "react-router-dom";
import Routes from './Routes/Routes'
function App() {
  const { pathname } = useLocation();
  return (
    <div>
      {pathname !== "/auth" && <Navbar />}
      <Routes />
    </div>
  );
}
export default App;
