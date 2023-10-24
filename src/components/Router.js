import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home userObj={userObj} /> : <Auth />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;