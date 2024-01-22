import React, { useState } from "react";
import { useAuthData } from "../../hooks/useAuthData";
import { useUserData } from "../../hooks/useUserData";

interface userProps {
  name: string;
  handleDeleteCheck: () => void;
  handleAuthorize: () => void;
  isAuthorized: boolean;
  avatar: string;
  role: string;
}

const User = ({
  name,
  handleDeleteCheck,
  handleAuthorize,
  isAuthorized,
  role,
  avatar,
}: userProps) => {
  const { userId } = useAuthData();
  const userData = useUserData(userId);

  return (
    <>
      <div className="relative border border-gray-800  flex flex-col items-center justify-center">
        {userData?.role === "admin" && (
          <div
            className="absolute top-2 right-2 text-red-500 cursor-pointer"
            onClick={handleDeleteCheck}
          >
            X
          </div>
        )}
        <div className="w-40 h-40">
          <img
            src={`../../../public/avatars/${avatar}`}
            alt="avatar"
            className="w-full h-full object-cover "
          />
        </div>
        <div className="mt-6">
          <span className="mt-6">{name}</span>
        </div>
        {isAuthorized && (
          <div>
            <button
              className="bg-green-500 text-[#141414] rounded-lg p-14 md:p-14 lg:p-3 font-bold-sm font-medium mt-6 mb-6"
              onClick={handleAuthorize}
            >
              Authorize
            </button>
          </div>
        )}
        {!isAuthorized && (
          <div className="border border-green-500  text-[#fff] rounded-lg p-14 md:p-14 lg:p-3 font-bold-sm font-medium mt-6 mb-6">
            {role}
          </div>
        )}
      </div>
    </>
  );
};

export default User;
