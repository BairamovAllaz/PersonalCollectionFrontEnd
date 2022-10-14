import logo from './logo.svg';
import './App.scss';
import {
    BrowserRouter,
    Routes,
    Route,
    Link, useLocation, useNavigate, Navigate
} from "react-router-dom";
import PrivateRoute from './PrivateRoutes/PrivateRoute'
import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home";
import LoginSuccess from './Components/Auth/AuthComponents/LoginSuccess'
import ForgotPassword from "./Components/Auth/AuthComponents/ForgotPassword";
import CreateCollection from "./Components/Create/CreateCollection";
import React, {useEffect, useState} from "react";
import Admin from "./Components/AdminPage/Admin";
import AdminPrivateRoute from "./PrivateRoutes/AdminPrivateRoute";
import UserProfile from "./Components/UserProfil/UserProfile";
import Navbar from "./Components/Navbar/Navbar";
import Context, {UserPermisionContext} from "./UserContext/Context";
import CollectionShowPage from "./Components/CollectionShowPage/CollectionShowPage";
import UserEdit from "./Components/UserProfil/UserProfileComponents/UserEdit";
import MyPrivate from "./PrivateRoutes/MyPrivate";
import CreateItem from "./Components/Create/CreateItem";
import {Grid} from "@material-ui/core";
function App() {
    const { pathname } = useLocation();
    const [isLoading, setLoading] = useState(true);
    const {user} = React.useContext(UserPermisionContext);

    if(user === null) {
        return <div className="App">Loading...</div>;
    }
  return (
      <Grid className="App">
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
                    <Route path="/collection/item/:id/create" element={<CreateItem/>}/>
                    <Route path="/user/:userId" element={<UserProfile/>}/>
                    <Route path="/User/:userId/collection/:collectionId" element={<CollectionShowPage/>}/>
                    <Route  element={
                        <MyPrivate/>
                    }>
                        <Route path="/User/:userId/edit" element={<UserEdit/>}/>
                    </Route>
                        <Route
                            path="/admin"
                            element={
                                <AdminPrivateRoute>
                                    <Admin />
                                </AdminPrivateRoute>
                            }
                        />
                </Routes>
      </Grid>

  );
}

export default App;
