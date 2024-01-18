import React, { useEffect, useState } from "react";
import { useAuthData } from "../../hooks/useAuthData";
import { useUserData } from "../../hooks/useUserData";
import Modal, { Styles } from "react-modal";
import User from "./User";

interface Users {
  id: number;
  username: string;
  role: string;
}

const Users = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const { userId } = useAuthData();
  const userData = useUserData(userId);
  const [checkDelete, setCheckDelete] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number>(0);

  const handleDeleteCheck = (userId: number) => {
    setCheckDelete(true);
    setModalIsOpen(true);
    setUserIdToDelete(userId);
  };

  const fetchUsers = () => {
    fetch(`http://localhost/react-blog/server/api/src/users/getAll/index.php`)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching comments:", error));
  };

  const handleDelete = () => {
    if (userIdToDelete) {
      fetch(
        `http://localhost/react-blog/server/api/src/users/remove/index.php?userId=${userIdToDelete}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setModalIsOpen(false); // Close the modal after successful deletion
          fetchUsers();
        })
        .catch((error) => console.error("Error deleting user:", error));
    }
  };

  const handleAuthorize = (userId: number) => {
    // Wyślij zapytanie do serwera, aby zaktualizować rolę użytkownika
    fetch(
      `http://localhost/react-blog/server/api/src/users/update/index.php?userId=${userId}`,
      {
        method: "PUT",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchUsers(); // Odśwież listę użytkowników po udanej autoryzacji
      })
      .catch((error) => console.error("Error authorizing user:", error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const customStyles: Styles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      backgroundColor: "#141414",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      width: "400px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "#fff",
      border: "2px solid #262626",
      height: "200px",
    },
  };

  return (
    <div>
      <div className="max-w-[1400px] mx-auto p-6">
        <h2 className="text-center font-semibold text-5xl m-10">
          All users that are registered on blog ✨
        </h2>
      </div>
      <div className="flex justify-center gap-6 border-t border-b p-6 border-[#262626]">
        {users.map((user) => (
          <User
            key={user.id}
            name={user.username}
            handleDeleteCheck={() => handleDeleteCheck(user.id)}
            handleAuthorize={() => handleAuthorize(user.id)}
            isAuthorized={user.role === "userGuest"}
          />
        ))}
        {checkDelete && (
          <Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false}>
            <div className="flex justify-center items-center flex-col">
              <p>Are you sure that you want delete him?</p>
              <div className="flex gap-6 mt-9">
                <button
                  className="bg-green-500 text-[#141414] rounded-lg p-14 md:p-14 lg:p-3 font-bold-sm font-medium"
                  onClick={handleDelete}
                >
                  YES
                </button>
                <button
                  className="bg-red-500 text-[#141414] rounded-lg p-14 md:p-14 lg:p-3 font-bold-sm font-medium"
                  onClick={() => setModalIsOpen(false)}
                >
                  NO
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Users;
