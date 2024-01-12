import React, { useState, useEffect } from "react";
import face from "../../assets/face.jpg";
import PostCreator from "./PostCreator";
import Comments from "../Comments/Comments";
import Modal, { Styles } from "react-modal";

interface Post {
  id: number;
  username: string;
  category: string;
  title: string;
  content: string;
  like_count: number;
  comment_count: number;
  created_at: string;
}

interface Comment {
  id: number;
  postId: number;
  text: string;
}

const Post: React.FC = () => {
  const customStyles: Styles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      width: "600px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)", // Center the modal
      color: "#333",
    },
  };
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [isEditingPost, setIsEditingPost] = useState<boolean>(false);
  const [isPostEditing, setIsPostEditing] = useState<boolean>(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const formatDate = (timestamp: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(timestamp).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    fetch("http://localhost/react-blog/server/index.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const handleClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };

  const handleDelete = (postId: number) => {
    fetch(`http://localhost/index.php?id=${postId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      })
      .catch((error) => console.error("Error deleting post:", error));
  };

  const handleEdit = (postId: number) => {
    setIsEditingPost(true);
    setEditingPostId(postId);
  };

  const closePostCreator = () => {
    setIsEditingPost(false);
    setEditingPostId(null);
  };

  const handleViewComments = (postId: number) => {
    // Fetch comments for the selected post
    fetch(`http://localhost/index.php/comments?id=${postId}`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));

    setSelectedPostId(postId);
    setIsCommentModalOpen(true);
    setIsOpen(true);
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalOpen(false);
    setSelectedPostId(null);
  };

  console.log(posts);
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className=" border-b-2 border-gray-800 ">
          {editingPostId !== post.id ? (
            <div className="flex justify-between  max-w-[1400px] mx-auto items-center p-9 relative">
              <div
                className="absolute top-0 right-0 border border-gray-800 p-1 mt-2 cursor-pointer rounded-lg"
                onClick={() => handleDelete(post.id)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 18L18 6M6 6L18 18"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="flex gap-6 items-center user-info">
                <div>
                  <img
                    src={face}
                    alt="user face"
                    className="rounded-full w-20 h-20"
                  />
                </div>
                <div className="flex flex-col">
                  <p>{post.username}</p>
                  <p className="text-[#98989A]">{post.category}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-col max-w-2xl w-1/2">
                <p className="mb-5 text-[#98989A]">
                  {formatDate(post.created_at)}
                </p>
                <h2>{post.title}</h2>
                <p className="text-[#98989A]">{post.content}</p>
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
                    <button>{post.like_count}</button>
                  </div>
                  <div
                    onClick={() => handleViewComments(post.id)}
                    className="bg-[#1A1A1A] border border-gray-800 p-2 rounded-lg text-[#98989A] flex items-center gap-1 cursor-pointer"
                  >
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
                    <button>{post.comment_count}</button>
                  </div>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-[#141414] border border-gray-800 p-3 flex gap-3 items-center rounded-md cursor-pointer">
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
                <div
                  className="bg-[#141414] border border-gray-800 p-3 flex gap-3 items-center rounded-md cursor-pointer"
                  onClick={() => handleEdit(post.id)}
                >
                  <button className="" style={{ whiteSpace: "nowrap" }}>
                    Edit
                  </button>

                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.8617 4.48667L18.5492 2.79917C19.2814 2.06694 20.4686 2.06694 21.2008 2.79917C21.9331 3.53141 21.9331 4.71859 21.2008 5.45083L10.5822 16.0695C10.0535 16.5981 9.40144 16.9868 8.68489 17.2002L6 18L6.79978 15.3151C7.01323 14.5986 7.40185 13.9465 7.93052 13.4178L16.8617 4.48667ZM16.8617 4.48667L19.5 7.12499M18 14V18.75C18 19.9926 16.9926 21 15.75 21H5.25C4.00736 21 3 19.9926 3 18.75V8.24999C3 7.00735 4.00736 5.99999 5.25 5.99999H10"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-center  max-w-[1400px] mx-auto items-center p-9 ">
                <PostCreator
                  key={post.id}
                  mode="editing"
                  postTitle={post.title}
                  postContent={post.content}
                  setIsPostEditing={setIsPostEditing}
                  closePostCreator={closePostCreator}
                  postId={post.id}
                />
              </div>
            </>
          )}
        </div>
      ))}
      {isCommentModalOpen && selectedPostId !== null && (
        <div className="">
          {modalIsOpen && (
            <Modal
              isOpen={modalIsOpen}
              style={customStyles}
              ariaHideApp={false}
            >
              <button onClick={handleCloseCommentModal} className="">
                &times;
              </button>
              <h2>Comments for Post #{selectedPostId}</h2>
              <Comments postId={selectedPostId} comments={comments} />
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
