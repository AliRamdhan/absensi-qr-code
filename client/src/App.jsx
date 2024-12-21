import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Class from "./pages/Class";
import ClassDetails from "./pages/ClassDetails";

function PrivateRoute({ element, ...rest }) {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Check authentication status
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/class"
          element={<PrivateRoute element={<Class />} />}
        />
        <Route
          path="/class/:id"
          element={<PrivateRoute element={<ClassDetails />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
