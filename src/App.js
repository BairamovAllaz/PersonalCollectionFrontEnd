import logo from './logo.svg';
import './App.scss';
import {
    BrowserRouter,
    Routes,
    Route,
    Link, useLocation, useNavigate
} from "react-router-dom";
import PrivateRoute from './PrivateRoutes/PrivateRoute'
import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home";
import LoginSuccess from './Components/Auth/AuthComponents/LoginSuccess'
import ForgotPassword from "./Components/Auth/AuthComponents/ForgotPassword";
import CreateCollection from "./Components/Create/CreateCollection";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Admin from "./Components/AdminPage/Admin";
import AdminPrivateRoute from "./PrivateRoutes/AdminPrivateRoute";
import UserProfile from "./Components/UserProfil/UserProfile";
import Navbar from "./Components/Navbar/Navbar";
import Context from "./PrivateRoutes/Context";
import CollectionShowPage from "./CollectionShowPage/CollectionShowPage";
function App() {
    const { pathname } = useLocation();
    const [user, setUser] = useState();
    const [isLoading, setLoading] = useState(true);
    // useEffect(() => {
    //     const guest = JSON.parse(localStorage.getItem("user"));
    //     if(guest !== null){
    //         setisAuth(true);
    //     }else {
    //         axios.get(`${global.config.backendUrl}/v1/getuser`, {
    //             withCredentials: true,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         }).then((response) => {
    //             setisAuth(true);
    //         }).catch((err) => {
    //             setisAuth(false);
    //         })
    //     }
    // }, []);


    useEffect(() => {
        axios.get(`${global.config.backendUrl}/v1/getuser`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            setUser(response.data);
            setLoading(false)
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    if(isLoading) {
        return <div className="App">Loading...</div>;
    }
  return (
      <div className="App">
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
                    <Route path="/User/:userId/collection/:collectionId" element={<CollectionShowPage/>}/>
                    <Route
                        path="/admin"
                        element={
                            <Admin/>
                        }
                    />
                </Routes>
    </div>

  );
}

export default App;
