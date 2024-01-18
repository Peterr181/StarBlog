import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blogs from "./components/Blogs/Blogs";
import Navbar from "./components/Navbar/Navbar";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Users from "./components/Users/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Blogs />
              <Contact />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/users"
          element={
            <>
              <Navbar />
              <Users />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
