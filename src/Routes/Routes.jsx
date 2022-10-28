import React from "react";
import PrivateRoute from "./PrivateRouteComponents/PrivateRoute";
import Auth from "../Pages/Auth/AuthPage";
import Home from "../Pages/HomePages/Home";
import LoginSuccess from "../Pages/Auth/LoginSuccess";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import CreateCollection from "../Components/Create/CreateCollection";
import Admin from "../Pages/AdminPage/Admin";
import OnlyAdminRoute from "../Routes/PrivateRouteComponents/OnlyAdminRoute";
import UserPage from "../Pages/UserPage/UserPage";
import CollectionShowPage from "../Pages/CollectionShowPage/CollectionShowPage";
import UserEdit from "../Pages/EditPages/UserEdit";
import OwnPageRoute from "./PrivateRouteComponents/OwnPageRoute";
import CreateItem from "../Components/Create/CreateItem";
import EditCollection from "../Pages/EditPages/EditCollection";
import EditItem from "../Pages/EditPages/EditItem";
import ItemPage from "../Pages/ItemPage/ItemPage";
import { Routes, Route } from "react-router-dom";
function AuthRoutes() {
  return (
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
      <Route path="/forgot-password/:id/:token" element={<ForgotPassword />} />

      <Route path="/user/:userId" element={<UserPage />} />
      <Route
        path="/User/:userId/collection/:collectionId"
        element={<CollectionShowPage />}
      />
      <Route
        path="/User/:userId/edit"
        element={
          <OwnPageRoute>
            <UserEdit />
          </OwnPageRoute>
        }
      />
      <Route
        path="/User/:userId/Collection/:collectionId/edit"
        element={
          <OwnPageRoute>
            <EditCollection />
          </OwnPageRoute>
        }
      />
      <Route
        path="/User/:userId/collection/create"
        element={
          <OwnPageRoute>
            <CreateCollection />
          </OwnPageRoute>
        }
      />
      <Route
        path="/User/:userId/collection/:collectionId/Item/:itemId/edit"
        element={
          <OwnPageRoute>
            <EditItem />
          </OwnPageRoute>
        }
      />
      <Route
        path="/User/:userId/collection/:collectionId/item/create"
        element={
          <OwnPageRoute>
            <CreateItem />
          </OwnPageRoute>
        }
      />
      <Route
        path="/User/:userId/collection/:collectionId/Item/:itemId"
        element={<ItemPage />}
      />
      <Route
        path="/admin"
        element={
          <OnlyAdminRoute>
            <Admin />
          </OnlyAdminRoute>
        }
      />
    </Routes>
  );
}

export default AuthRoutes;
