import React, { useState } from "react";
import { useAuthData } from "../../hooks/useAuthData";
import { useUserData } from "../../hooks/useUserData";

interface userProps {
  name: string;
  handleDeleteCheck: () => void;
  handleAuthorize: () => void;
  isAuthorized: boolean;
}

const User = ({
  name,
  handleDeleteCheck,
  handleAuthorize,
  isAuthorized,
}: userProps) => {
  const { userId } = useAuthData();
  const userData = useUserData(userId);

  return (
    <>
      <div className="relative border border-gray-800 p-9 flex flex-col items-center justify-center">
        {userData?.role === "admin" && (
          <div
            className="absolute top-1 right-2 text-red-500 cursor-pointer"
            onClick={handleDeleteCheck}
          >
            X
          </div>
        )}
        <span className="">{name}</span>
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
