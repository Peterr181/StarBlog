import { useState, useEffect } from "react";

interface User {
  id: string;
  username: string;
  email: string;
}

interface Authentication {
  loggedIn: boolean;
  user: User | null;
  handleLogin: (userData: User) => void;
  handleLogout: () => void;
}

export function useAuthentication(): Authentication {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
    setUser(null);

    window.location.reload();
  };

  return { loggedIn, user, handleLogin, handleLogout };
}
