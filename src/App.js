import logo from './logo.svg';
import './App.scss';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";
import {useEffect,useState} from 'react';
import PrivateRoute from './PrivateRoutes/PrivateRoute'
import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home";
import LoginSuccess from './Components/Auth/AuthComponents/LoginSuccess'
import ForgotPassword from "./Components/Auth/AuthComponents/ForgotPassword";
function App() {

  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/success/google" element={<LoginSuccess/>}/>
                <Route path="/forgot-password/:id/:token" element={<ForgotPassword/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
