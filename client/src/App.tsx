import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blogs from "./components/Blogs/Blogs";
import Navbar from "./components/Navbar/Navbar";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
