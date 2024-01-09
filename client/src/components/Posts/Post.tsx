import React, { useState } from "react";
import face from "../../assets/face.jpg";
const Post = () => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const handleClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };

  return (
    <div className=" border-b-2 border-gray-800 ">
      <div className="flex justify-between  gap-20 max-w-[1400px] mx-auto items-center p-9">
        <div className="flex gap-6 items-center">
          <div>
            <img
              src={face}
              alt="user face"
              className="rounded-full w-full h-full"
            />
          </div>
          <div className="flex  flex-col ">
            <p>Peter</p>
            <p className="text-[#98989A]">Technology</p>
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <p className="mb-5 text-[#98989A]">October 15, 2023</p>
          <h2>Tech Giants Annouce Something Like</h2>
          <p className="text-[#98989A]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque in
            esse ea necessitatibus eaque ipsum tempore id? Dont wait and go!
          </p>
          <div className="flex gap-2 items-center mt-5">
            <div
              className="bg-[#1A1A1A] border border-gray-800 p-2 rounded-lg text-[#98989A] flex items-center gap-1 cursor-pointer"
              onClick={handleClick}
            >
              {!isHeartClicked ? (
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.645 21.4107L11.6384 21.4071L11.6158 21.3949C11.5965 21.3844 11.5689 21.3693 11.5336 21.3496C11.4629 21.3101 11.3612 21.2524 11.233 21.1769C10.9765 21.0261 10.6132 20.8039 10.1785 20.515C9.31074 19.9381 8.15122 19.0901 6.9886 18.0063C4.68781 15.8615 2.25 12.6751 2.25 8.75C2.25 5.82194 4.7136 3.5 7.6875 3.5C9.43638 3.5 11.0023 4.29909 12 5.5516C12.9977 4.29909 14.5636 3.5 16.3125 3.5C19.2864 3.5 21.75 5.82194 21.75 8.75C21.75 12.6751 19.3122 15.8615 17.0114 18.0063C15.8488 19.0901 14.6893 19.9381 13.8215 20.515C13.3868 20.8039 13.0235 21.0261 12.767 21.1769C12.6388 21.2524 12.5371 21.3101 12.4664 21.3496C12.4311 21.3693 12.4035 21.3844 12.3842 21.3949L12.3616 21.4071L12.355 21.4107L12.3523 21.4121C12.1323 21.5289 11.8677 21.5289 11.6477 21.4121L11.645 21.4107Z"
                    stroke="#666666"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.645 21.4107L11.6384 21.4072L11.6158 21.3949C11.5965 21.3844 11.5689 21.3693 11.5336 21.3496C11.4629 21.3101 11.3612 21.2524 11.233 21.1769C10.9765 21.0261 10.6132 20.8039 10.1785 20.515C9.31074 19.9381 8.15122 19.0901 6.9886 18.0063C4.68781 15.8615 2.25 12.6751 2.25 8.75C2.25 5.82194 4.7136 3.5 7.6875 3.5C9.43638 3.5 11.0023 4.29909 12 5.5516C12.9977 4.29909 14.5636 3.5 16.3125 3.5C19.2864 3.5 21.75 5.82194 21.75 8.75C21.75 12.6751 19.3122 15.8615 17.0114 18.0063C15.8488 19.0901 14.6893 19.9381 13.8215 20.515C13.3868 20.8039 13.0235 21.0261 12.767 21.1769C12.6388 21.2524 12.5371 21.3101 12.4664 21.3496C12.4311 21.3693 12.4035 21.3844 12.3842 21.3949L12.3616 21.4072L12.355 21.4107L12.3523 21.4121C12.1323 21.5289 11.8677 21.5289 11.6477 21.4121L11.645 21.4107Z"
                    fill="#FF5500"
                  />
                </svg>
              )}
              <button>24.5k</button>
            </div>
            <div className="bg-[#1A1A1A] border border-gray-800 p-2 rounded-lg text-[#98989A] flex items-center gap-1 cursor-pointer">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.48581 19.6888C9.54657 20.2083 10.7392 20.5 12 20.5C16.4183 20.5 20 16.9183 20 12.5C20 8.08172 16.4183 4.5 12 4.5C7.58172 4.5 4 8.08172 4 12.5C4 14.1401 4.49356 15.665 5.34026 16.9341M8.48581 19.6888L4 20.5L5.34026 16.9341M8.48581 19.6888L8.49231 19.6877M5.34026 16.9341L5.34154 16.9308"
                  stroke="#666666"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <button>50</button>
            </div>
            <div className="bg-[#1A1A1A] border border-gray-800 p-2 rounded-lg text-[#98989A] flex items-center gap-1 cursor-pointer">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0386 14.4615L4.17215 11.7949C3.36478 11.4279 3.39923 10.2696 4.22697 9.95122L18.9002 4.30768C19.7089 3.99663 20.5035 4.79127 20.1925 5.60001L14.549 20.2732C14.2306 21.1009 13.0722 21.1354 12.7052 20.328L10.0386 14.4615ZM10.0386 14.4615L14.4234 10.0769"
                  stroke="#666666"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <button>20</button>
            </div>
          </div>
        </div>
        <div className="bg-[#141414] border border-gray-800 p-3 flex gap-3 items-center rounded-md">
          <button className="" style={{ whiteSpace: "nowrap" }}>
            Read More
          </button>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Icon">
              <path
                id="Vector 431 (Stroke)"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.25 3.75L19.5 3.75C19.6989 3.75 19.8897 3.82902 20.0303 3.96967C20.171 4.11032 20.25 4.30109 20.25 4.5V15.75C20.25 16.1642 19.9142 16.5 19.5 16.5C19.0858 16.5 18.75 16.1642 18.75 15.75V6.31066L5.03033 20.0303C4.73744 20.3232 4.26256 20.3232 3.96967 20.0303C3.67678 19.7374 3.67678 19.2626 3.96967 18.9697L17.6893 5.25L8.25 5.25C7.83579 5.25 7.5 4.91421 7.5 4.5C7.5 4.08579 7.83579 3.75 8.25 3.75Z"
                fill="#FFD11A"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Post;
