import { useState, useEffect } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
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
    const storedUser = localStorage.getItem("user");
    let storedUserData: User | null = null;

    if (storedUser) {
      storedUserData = JSON.parse(storedUser);
    }

    // Update the role property if it exists in the new user data
    if (storedUserData && userData.role) {
      storedUserData.role = userData.role;
    }

    localStorage.setItem("user", JSON.stringify(storedUserData || userData));
    setLoggedIn(true);
    setUser(storedUserData || userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
    setUser(null);

    window.location.reload();
  };

  return { loggedIn, user, handleLogin, handleLogout };
}
