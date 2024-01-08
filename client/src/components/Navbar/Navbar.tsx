import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className=" bg-[#1A1A1A]">
        <div className="flex items-center justify-between p-6 max-w-[1400px] mx-auto">
          <div>
            <p className="font-medium">GoodBlog</p>
          </div>
          <div>
            <button className="bg-[#FFD11A] text-[#141414] rounded-lg p-14 md:p-14 lg:p-3 font-bold-sm font-medium">
              Register
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
