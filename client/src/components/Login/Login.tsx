import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      const response = await fetch(
        "http://localhost/react-blog/server/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem("isAuthenticated", data.authenticated);
        navigate("/");
      } else {
        setError(
          data.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Login failed. An error occurred.");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-[1400px] mx-auto ">
        <h1 className="font-bold text-4xl mb-6">Log in to your account</h1>
        <div>
          <form id="login" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-sm" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="rounded-md border border-solid border-gray-800 bg-[#1A1A1A] outline-none p-3"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2 mt-9">
              <label className="text-sm" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="rounded-md border border-solid border-gray-800 bg-[#1A1A1A] outline-none p-3"
              />
            </div>
            <div className="flex justify-between mt-9 flex-col gap-3">
              <div>
                <button
                  className="bg-[#FFD11A] text-[#141414] rounded-lg p-14 md:p-14 lg:p-3 font-bold-sm font-medium"
                  name="login"
                  type="submit"
                  id="login-submit"
                >
                  Login
                </button>
              </div>
              <div>{error && <p className="text-red-500 ">{error}</p>}</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
