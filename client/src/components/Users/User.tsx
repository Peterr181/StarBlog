import React, { useState } from "react";
import { useAuthData } from "../../hooks/useAuthData";
import { useUserData } from "../../hooks/useUserData";

interface userProps {
  name: string;
  handleDeleteCheck: () => void;
  handleAuthorize: () => void;
  isAuthorized: boolean;
  avatar: string;
}

const User = ({
  name,
  handleDeleteCheck,
  handleAuthorize,
  isAuthorized,
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
            className="w-full h-full"
          />
        </div>
        <div>
          <span className="">{name}</span>
        </div>
        {isAuthorized && (
          <button
            className="bg-green-500 text-[#141414] rounded-lg p-14 md:p-14 lg:p-3 font-bold-sm font-medium mt-6"
            onClick={handleAuthorize}
          >
            Authorize
          </button>
        )}
      </div>
    </>
  );
};

export default User;
