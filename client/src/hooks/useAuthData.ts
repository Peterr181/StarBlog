import { useState, useEffect } from "react";

interface AuthData {
  userId: string | null;
  isAuthenticated: boolean;
}

export function useAuthData(): AuthData {
  const [authData, setAuthData] = useState<AuthData>({
    userId: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const userDataId = sessionStorage.getItem("userId");
    const userAuth = sessionStorage.getItem("authenticated");
    const loggedUserId = JSON.parse(userDataId || "null");
    const isAuthenticated = JSON.parse(userAuth || "false");

    setAuthData({
      userId: loggedUserId,
      isAuthenticated: isAuthenticated,
    });
  }, []);

  return authData;
}
