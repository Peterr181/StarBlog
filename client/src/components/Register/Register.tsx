import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const { nickname, email, password, repeatPassword } = formData;
    console.log(nickname, email, password, repeatPassword);
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
            <div className="flex flex-col gap-2 mt-9">
              <label className="text-sm" htmlFor="repeatPassword">
                Repeat Password
              </label>
              <input
                type="password"
                placeholder="Repeat Password"
                name="repeatPassword"
                id="repeatPassword"
                value={formData.repeatPassword}
                onChange={(e) =>
                  setFormData({ ...formData, repeatPassword: e.target.value })
                }
                className="rounded-md border border-solid border-gray-800 bg-[#1A1A1A] outline-none p-3"
              />
            </div>
            <div className="flex justify-between mt-9">
              <div>
                <button
                  className="bg-[#FFD11A] text-[#141414] rounded-lg p-14 md:p-14 lg:p-3 font-bold-sm font-medium"
                  name="register"
                  type="submit"
                  id="register-submit"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
