import { useState, useEffect } from "react";

interface UserData {
  id: string;
  username: string;
  email: string;
  role: string;
  avatar: string;
}

export function useUserData(userId: any): UserData | null {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost/react-blog/server/api/src/users/get/index.php?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: UserData = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return userData;
}
