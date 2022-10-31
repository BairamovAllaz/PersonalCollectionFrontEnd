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
import EditCollection from "../Pages/CollectionEdit/index";
import EditItem from "../Pages/ItemEdit/index";
import ItemPage from "../Pages/ItemShow/index";
import CollectionAll from '../Pages/CollectionAll/index'
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
      <Route
        path="/AllCollections"
        element={
          <PrivateRoute>
            <CollectionAll />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/:userId"
        element={
          <PrivateRoute>
            <UserPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/User/:userId/collection/:collectionId"
        element={
          <PrivateRoute>
            <CollectionShowPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/User/:userId/edit"
        element={
          <PrivateRoute>
            <OwnPageRoute>
              <UserEdit />
            </OwnPageRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/User/:userId/Collection/:collectionId/edit"
        element={
          <PrivateRoute>
            <OwnPageRoute>
              <EditCollection />
            </OwnPageRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/User/:userId/collection/create"
        element={
          <PrivateRoute>
            <OwnPageRoute>
              <CreateCollection />
            </OwnPageRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/User/:userId/collection/:collectionId/Item/:itemId/edit"
        element={
          <PrivateRoute>
            <OwnPageRoute>
              <EditItem />
            </OwnPageRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/User/:userId/collection/:collectionId/item/create"
        element={
          <PrivateRoute>
            <OwnPageRoute>
              <CreateItem />
            </OwnPageRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/User/:userId/collection/:collectionId/Item/:itemId"
        element={
          <PrivateRoute>
            <ItemPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <OnlyAdminRoute>
              <Admin />
            </OnlyAdminRoute>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
export default AuthRoutes;
