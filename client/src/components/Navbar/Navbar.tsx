import React from "react";
import star from "../../assets/star.png";
import { Link } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";

const Navbar = () => {
  const { loggedIn, user, handleLogout } = useAuthentication();

  return (
    <>
      <nav className="bg-[#1A1A1A]">
        <div className="flex items-center justify-between p-6 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3">
            <img src={star} alt="star logo" className="w-12 h-12" />
            <p className="font-medium">StarBlog</p>
          </div>

          <div>
            {loggedIn ? (
              <div className="flex items-center gap-3">
                <p className="text-white">Welcome, {user && user.username}!</p>
                <button
                  className="bg-[#FFD11A] text-[#141414] rounded-lg p-2 font-bold-sm font-medium"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/register">
                <button className="bg-[#FFD11A] text-[#141414] rounded-lg p-14 md:p-14 lg:p-3 font-bold-sm font-medium">
                  Register
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
