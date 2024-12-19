import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Class from "./pages/Class";
import ClassDetails from "./pages/ClassDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/class" element={<Class />} />
        <Route path="/class/:id" element={<ClassDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
