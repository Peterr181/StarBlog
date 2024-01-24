import React, { useState } from "react";
import star from "../../assets/star.png";
import { Link } from "react-router-dom";
import { useAuthData } from "../../hooks/useAuthData";
import { useUserData } from "../../hooks/useUserData";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userId, isAuthenticated } = useAuthData();
  const userData = useUserData(userId);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("isAuthenticated");

    window.location.reload();
  };

  return (
    <>
      <nav className="bg-[#1A1A1A]">
        <div className="flex items-center justify-between p-6 max-w-[1400px] mx-auto">
          <Link to="/">
            <div className="flex items-center gap-3">
              <img src={star} alt="star logo" className="w-12 h-12" />
              <p className="font-medium">StarBlog</p>
            </div>
          </Link>

          <div className="relative">
            <div className="cursor-pointer" onClick={toggleMenu} tabIndex={0}>
              {userData ? (
                <div className="flex items-center gap-6">
                  <div>
                    <img
                      src={`../../../public/avatars/${userData.avatar}`}
                      alt="avatar"
                      className="w-16 h-16 rounded-full"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-white text-md">
                        {userData && userData.username}
                      </p>
                      <p className="text-[#FFFF00] text-sm">{userData?.role}</p>
                    </div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.5 8.25L12 15.75L4.5 8.25"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex gap-6">
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
                    <Link to="/register">
                      <button className="bg-[#FFD11A] text-[#141414] rounded-lg p-14 md:p-14 lg:p-3 font-bold-sm font-medium">
                        Register
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>

            {isMenuOpen && (
              <div className="absolute top-30 right-[-30px] bg-[#1A1A1A]  rounded-md shadow-md text-center w-44 p-3  ">
                {userData?.role === "admin" && (
                  <div className="w-full">
                    <Link to="/users" className="">
                      <p className="mt-3 mb-3 cursor-pointer  p-3">
                        Users Panel
                      </p>
                    </Link>
                  </div>
                )}
                {userData && (
                  <button
                    className="bg-[#FFD11A] text-[#141414] rounded-lg p-2 font-bold-sm font-medium"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
