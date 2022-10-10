import logo from './logo.svg';
import './App.scss';
import {
    BrowserRouter,
    Routes,
    Route,
    Link, useLocation
} from "react-router-dom";
import PrivateRoute from './PrivateRoutes/PrivateRoute'
import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home";
import LoginSuccess from './Components/Auth/AuthComponents/LoginSuccess'
import ForgotPassword from "./Components/Auth/AuthComponents/ForgotPassword";
import CreateCollection from "./Components/Create/CreateCollection";
import React,{useState} from "react";
import axios from "axios";
import Admin from "./Components/AdminPage/Admin";
import AdminPrivateRoute from "./PrivateRoutes/AdminPrivateRoute";
import UserProfile from "./Components/UserProfil/UserProfile";
import Navbar from "./Components/Navbar/Navbar";
export const UserPermisionContext = React.createContext();
function App() {

    const [user,setUser] = React.useState("");
    const { pathname } = useLocation();
    React.useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    },[])


  return (
    <div className="App">
        <UserPermisionContext.Provider value = {{
            user,
        }}>
            {
                pathname !== '/auth' &&
                <Navbar/>
            }
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
                    <Route path="/collection/:id/create" element={<CreateCollection/>}/>
                    <Route path="/user/:userId" element={<UserProfile/>}/>
                    <Route
                        path="/admin"
                        element={
                        <AdminPrivateRoute>
                            <Admin/>
                        </AdminPrivateRoute>
                    }
                    />
                </Routes>
        </UserPermisionContext.Provider>
    </div>
  );
}

export default App;
