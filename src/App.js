import logo from "./logo.svg";
import "./App.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";
import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home";
import LoginSuccess from "./Components/Auth/AuthComponents/LoginSuccess";
import ForgotPassword from "./Components/Auth/AuthComponents/ForgotPassword";
import CreateCollection from "./Components/Create/CreateCollection";
import React, { useEffect, useState } from "react";
import Admin from "./Components/AdminPage/Admin";
import AdminPrivateRoute from "./PrivateRoutes/AdminPrivateRoute";
import UserProfile from "./Components/UserProfil/UserProfile";
import Navbar from "./Layouts/Navbar/Navbar"
import Context, { UserPermisionContext } from "./UserContext/Context";
import CollectionShowPage from "./Components/CollectionShowPage/CollectionShowPage";
import UserEdit from "./Components/UserProfil/UserProfileComponents/UserEdit";
import MyPrivate from "./PrivateRoutes/MyPrivate";
import CreateItem from "./Components/Create/CreateItem";
import EditCollection from "./Components/EditPages/EditCollection";
import EditItem from "./Components/EditPages/EditItem";
import { Grid } from "@material-ui/core";
import ItemShow from "./Components/ItemShow/ItemShow";
function App() {
  const { pathname } = useLocation();
  const [isLoading, setLoading] = useState(true);
  const { user } = React.useContext(UserPermisionContext);

  if (user === null) {
    return <div className="App">Loading...</div>;
  }
  return (
    <Grid className="App">
      {pathname !== "/auth" && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="/success/google" element={<LoginSuccess />} />
        <Route
          path="/forgot-password/:id/:token"
          element={<ForgotPassword />}
        />

        <Route path="/user/:userId" element={<UserProfile />} />
        <Route
          path="/User/:userId/collection/:collectionId"
          element={<CollectionShowPage />}
        />
        <Route
          path="/User/:userId/edit"
          element={
            <MyPrivate>
              <UserEdit />
            </MyPrivate>
          }
        />
        <Route
          path="/User/:userId/Collection/:collectionId/edit"
          element={
            <MyPrivate>
              <EditCollection />
            </MyPrivate>
          }
        />
        <Route
          path="/User/:userId/collection/create"
          element={
            <MyPrivate>
              <CreateCollection />
            </MyPrivate>
          }
        />
        <Route
          path="/User/:userId/collection/:collectionId/Item/:itemId/edit"
          element={
            <MyPrivate>
              <EditItem />
            </MyPrivate>
          }
        />
        <Route
          path="/User/:userId/collection/:collectionId/item/create"
          element={
            <MyPrivate>
              <CreateItem />
            </MyPrivate>
          }
        />
        <Route
          path="/User/:userId/collection/:collectionId/Item/:itemId"
          element={<ItemShow />}
        />

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
