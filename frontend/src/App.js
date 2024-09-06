import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { fetchUser } from "./utils/fetch";
import UserProfile from "./components/UserProfile";
import PinDetail from "./components/PinDetail";
import CreatePin from "./components/CreatePin";
import UpdatePin from "./components/UpdatePin";

const App = () => {
  const navigate = useNavigate();
  const user = fetchUser();
  if (!user) navigate("/login");

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Home />} />
        <Route path="/category/:category" element={<Home />} />
        <Route path="/user-profile/:id" element={<UserProfile user={user} />} />
        <Route path="/create-pin" element={<CreatePin user={user} />} />
        <Route path="/update-pin/:id" element={<UpdatePin user={user} />} />
        <Route path="/pin-detail/:id" element={<PinDetail user={user} />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
