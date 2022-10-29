import React from "react";
import PrivateRoute from "./PrivateRouteComponents/PrivateRoute";
import Auth from "../Pages/Auth/index";
import Home from "../Pages/Home/index";
import LoginSuccess from "../Pages/Auth/LoginSuccess";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import CreateCollection from "../Pages/CreateCollection/index";
import Admin from "../Pages/Admin/index";
import OnlyAdminRoute from "../Routes/PrivateRouteComponents/OnlyAdminRoute";
import UserPage from "../Pages/User/index";
import CollectionShowPage from "../Pages/CollectionShow";
import UserEdit from "../Pages/UserEdit/index";
import OwnPageRoute from "./PrivateRouteComponents/OwnPageRoute";
import CreateItem from "../Pages/CreateItem/index";
import EditCollection from "../Pages/CollectionEdit/index"
import EditItem from "../Pages/ItemEdit/index";
import ItemPage from "../Pages/ItemShow/index";
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