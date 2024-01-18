import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    repeatPassword: "",
    avatar: null as File | null,
  });

  const [passwordError, setPasswordError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { nickname, email, password, repeatPassword, avatar } = formData;

    if (password !== repeatPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/react-blog/server/register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nickname,
            email,
            password,
            repeatPassword,
            avatar,
          }),
        }
      );

      const data = await response.json();

      // Handle the response data as needed
      console.log(data);
      setPasswordError("");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-[1400px] mx-auto ">
        <h1 className="font-bold text-4xl mb-3">Sign up on platform!</h1>
        <div>
          <form id="register" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-sm" htmlFor="nickname">
                Nickname
              </label>
              <input
                type="text"
                name="nickname"
                id="nickname"
                required
                placeholder="Enter Nickname"
                className="rounded-md border border-solid border-gray-800 bg-[#1A1A1A] outline-none p-3"
                value={formData.nickname}
                onChange={(e) =>
                  setFormData({ ...formData, nickname: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2 mt-9">
              <label className="text-sm" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
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
                required
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="rounded-md border border-solid border-gray-800 bg-[#1A1A1A] outline-none p-3"
              />
            </div>
            <div className="flex flex-col gap-2 mt-9">
              <label className="text-sm" htmlFor="repeatPassword">
                Repeat Password
              </label>
              <input
                type="password"
                placeholder="Repeat Password"
                name="repeatPassword"
                required
                id="repeatPassword"
                value={formData.repeatPassword}
                onChange={(e) =>
                  setFormData({ ...formData, repeatPassword: e.target.value })
                }
                className="rounded-md border border-solid border-gray-800 bg-[#1A1A1A] outline-none p-3"
              />
            </div>
            <div className="flex flex-col gap-2 mt-9">
              <label className="text-sm" htmlFor="avatar">
                Avatar
              </label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                placeholder="Enter Avatar URL"
                className="rounded-md border border-solid border-gray-800 bg-[#1A1A1A] outline-none p-3"
                onChange={handleFileChange}
              />
            </div>
            <div className="flex justify-between mt-9 flex-col gap-3">
              <div className="flex justify-center items-center">
                <button
                  className="bg-[#FFD11A] text-[#141414] rounded-lg p-14 md:p-14 lg:p-3 font-bold-sm font-medium"
                  name="register"
                  type="submit"
                  id="register-submit"
                >
                  Register
                </button>
              </div>
              <div>
                {passwordError && (
                  <span className="text-red-500">{passwordError}</span>
                )}
              </div>

              <div className="flex flex-col justify-center items-center gap-6">
                <p>Do you have an account on our blog?</p>
                <Link to="/login">
                  <button
                    className="border border-yellow-400 text-[#fff] rounded-lg p-14 md:p-14 lg:p-3 font-bold-sm font-medium"
                    name="register"
                    type="submit"
                    id="register-submit"
                  >
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
