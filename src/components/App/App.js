import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";
import Dashboard from "../../pages/Dashboard/Dashboard";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Register />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<Dashboard />} path="/dashboard" />
        </Routes>
      </Router>
    </>
  );
};

export default App;
