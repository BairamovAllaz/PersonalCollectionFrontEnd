import logo from './logo.svg';
import './App.scss';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";
import {useEffect,useState} from 'react';
import PrivateRoute from './Components/Auth/PrivateRoute'
import Registration from "./Components/Auth/Registration";
import Home from "./Components/Home";
import LoginSuccess from './Components/Auth/LoginSuccess'
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
                <Route path="/auth" element={<Registration/>}/>
                <Route path="/success/google" element={<LoginSuccess/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
