import React, { useState, useEffect } from "react";
import face from "../../assets/face.jpg";
import PostCreator from "./PostCreator";
import Comments from "../Comments/Comments";
import Modal, { Styles } from "react-modal";
import { iconFile } from "../../utils/iconFile";
import { useAuthData } from "../../hooks/useAuthData";
import { useUserData } from "../../hooks/useUserData";

interface Post {
  id: number;
  username: string;
  category: string;
  user_id: string;
  title: string;
  content: string;
  like_count: number;
  comment_count: number;
  created_at: string;
  avatar: string;
}

interface CommentForPost {
  id: number;
  postId: number;
  nickname: string;
  title: string;
  content: string;
  created_at: string;
}

interface PostProps {
  isNewPostAdded: number;
  setNewPostAdded?: React.Dispatch<React.SetStateAction<number>>;
  selectedCategory: string;
}

const Post: React.FC<PostProps> = ({
  isNewPostAdded,
  setNewPostAdded,
  selectedCategory,
}) => {
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
      width: "1200px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "#fff",
      border: "2px solid #262626",
      height: "800px",
    },
  };
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [isEditingPost, setIsEditingPost] = useState<boolean>(false);
  const [isPostEditing, setIsPostEditing] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentForPost[]>([]);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [isCommentAdded, setIsCommentAdded] = useState<boolean>(false);
  const [likedPosts, setLikedPosts] = useState<{ [postId: number]: boolean }>(
    {}
  );
  const { userId, isAuthenticated } = useAuthData();
  const userData = useUserData(userId);

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  console.log(posts);

  const formatDate = (timestamp: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(timestamp).toLocaleDateString("en-US", options);
  };

  const updateCommentCount = (postId: number, newCommentCount: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comment_count: newCommentCount } : post
      )
    );
  };

  const fetchPosts = async () => {
    try {
      let apiUrl =
        "http://localhost/react-blog/server/api/src/posts/get/index.php";

      // If a category is selected, append it to the API URL
      if (selectedCategory !== "All") {
        apiUrl += `?category=${selectedCategory}`;
      }

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleClick = (postId: number) => {
    const isLiked = likedPosts[postId];
    const userId = userData?.id;

    console.log(userId);

    // Toggle the liked status
    setLikedPosts((prevLikedPosts) => ({
      ...prevLikedPosts,
      [postId]: !isLiked,
    }));

    // Make a POST request to likes.php to handle likes
    fetch("http://localhost/react-blog/server/api/src/likes/add/index.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, isLiked: !isLiked, userId }), // Send the liked status
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post liked:", data);
        fetchPosts();
      })
      .catch((error) => console.error("Error liking the post:", error));
  };

  const handleDelete = (postId: number) => {
    fetch(
      `http://localhost/react-blog/server/api/src/posts/remove/index.php?id=${postId}`,
      {
        method: "DELETE",
      }
    )
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
    fetch(
      `http://localhost/react-blog/server/api/src/comments/get/index.php?postId=${postId}`
    )
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));

    const selectedPostData = posts.find((post) => post.id === postId) || null;
    setSelectedPost(selectedPostData);
    setIsCommentModalOpen(true);
    setIsOpen(true);
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalOpen(false);
    setSelectedPost(null);
  };

  const [isPostAdding, setIsPostAdding] = useState(false);

  const handleAddPost = () => {
    setIsPostAdding((prevIsPostAdding) => !prevIsPostAdding);
  };

  console.log(posts);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className=" border-b-2 border-gray-800 ">
          {editingPostId !== post.id ? (
            <div className="flex justify-between  max-w-[1400px] mx-auto items-center p-9 relative">
              {(userData?.id === post.user_id ||
                userData?.role === "admin") && (
                <div
                  className="absolute top-0 right-0 border border-gray-800 p-1 mt-2 cursor-pointer rounded-lg"
                  onClick={() => handleDelete(post.id)}
                >
                  {iconFile.deleteIcon}
                </div>
              )}

              <div className="flex gap-6 items-center user-info w-1/3">
                {post.avatar && (
                  <div>
                    <img
                      src={`../../../public/avatars/${post.avatar}`}
                      alt="user face"
                      className="rounded-full w-20 h-20"
                    />
                  </div>
                )}
                {!post.avatar && (
                  <div>
                    <img
                      src={face}
                      alt="user face"
                      className="rounded-full w-20 h-20"
                    />
                  </div>
                )}
                <div className="flex flex-col">
                  <p>{post.username}</p>
                  <p className="text-[#98989A]">{post.category}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-col  w-1/2">
                <p className="mb-5 text-[#98989A]">
                  {formatDate(post.created_at)}
                </p>
                <h2>{post.title}</h2>

                <p className="text-[#98989A] break-words mr-9">
                  {post.content}
                </p>

                <div className="flex gap-2 items-center mt-5">
                  {userData && (
                    <div
                      className="bg-[#1A1A1A] border border-gray-800 p-2 rounded-lg text-[#98989A] flex items-center gap-1 cursor-pointer"
                      onClick={() => handleClick(post.id)}
                    >
                      {iconFile.heartOutline}
                      <button>{post.like_count}</button>
                    </div>
                  )}
                  <div
                    onClick={() => handleViewComments(post.id)}
                    className="bg-[#1A1A1A] border border-gray-800 p-2 rounded-lg text-[#98989A] flex items-center gap-1 cursor-pointer"
                  >
                    {iconFile.commentsIcon}
                    <button>{post.comment_count}</button>
                  </div>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-[#141414] border border-gray-800 p-3 flex gap-3 items-center rounded-md cursor-pointer">
                  <button className="" style={{ whiteSpace: "nowrap" }}>
                    Read More
                  </button>
                  {iconFile.moreArrow}
                </div>
                {(userData?.id === post.user_id ||
                  userData?.role === "admin") && (
                  <div
                    className="bg-[#141414] border border-gray-800 p-3 flex gap-3 items-center rounded-md cursor-pointer"
                    onClick={() => handleEdit(post.id)}
                  >
                    <button className="" style={{ whiteSpace: "nowrap" }}>
                      Edit
                    </button>
                    {iconFile.editIcon}
                  </div>
                )}
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
                  setNewPostAdded={setNewPostAdded}
                  fetchPosts={fetchPosts}
                />
              </div>
            </>
          )}
        </div>
      ))}
      {isCommentModalOpen && selectedPost !== null && (
        <div className="">
          {modalIsOpen && (
            <Modal
              isOpen={modalIsOpen}
              style={customStyles}
              ariaHideApp={false}
            >
              <div className="flex justify-end">
                <button
                  onClick={handleCloseCommentModal}
                  className="text-3xl text-[#fff]"
                >
                  &times;
                </button>
              </div>

              <div className=" p-5">
                <h1 className="text-center text-3xl mb-5  border-b pb-6 border-gray-800">
                  Comments for post{" "}
                  <span className="text-[#FFD11A]">{selectedPost.title}</span>
                </h1>
              </div>
              <Comments
                postId={selectedPost.id}
                comments={comments}
                setComments={setComments}
                setIsCommentAdded={setIsCommentAdded}
                updateCommentCount={updateCommentCount}
              />
            </Modal>
          )}
        </div>
      )}
      <div className="flex justify-center   max-w-[1400px] mx-auto items-center p-12 ">
        {userData?.role !== "userGuest" && !isPostAdding && (
          <div
            className="bg-[#141414] border border-gray-800 p-5 flex gap-3 items-center rounded-md cursor-pointer customclass "
            onClick={handleAddPost}
          >
            <button>Add Post</button>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 11H13V5C13 4.73478 12.8946 4.48043 12.7071 4.29289C12.5196 4.10536 12.2652 4 12 4C11.7348 4 11.4804 4.10536 11.2929 4.29289C11.1054 4.48043 11 4.73478 11 5V11H5C4.73478 11 4.48043 11.1054 4.29289 11.2929C4.10536 11.4804 4 11.7348 4 12C4 12.2652 4.10536 12.5196 4.29289 12.7071C4.48043 12.8946 4.73478 13 5 13H11V19C11 19.2652 11.1054 19.5196 11.2929 19.7071C11.4804 19.8946 11.7348 20 12 20C12.2652 20 12.5196 19.8946 12.7071 19.7071C12.8946 19.5196 13 19.2652 13 19V13H19C19.2652 13 19.5196 12.8946 19.7071 12.7071C19.8946 12.5196 20 12.2652 20 12C20 11.7348 19.8946 11.4804 19.7071 11.2929C19.5196 11.1054 19.2652 11 19 11Z"
                fill="#FFD11A"
              />
            </svg>
          </div>
        )}
        {isPostAdding && (
          <PostCreator
            setNewPostAdded={(newPostId) => {
              setIsPostAdding(false);

              setNewPostAdded && setNewPostAdded(newPostId);
            }}
            mode="adding"
            setIsPostEditing={setIsPostEditing}
            closePostCreator={() => setIsPostAdding(false)}
            fetchPosts={fetchPosts}
          />
        )}
      </div>
    </div>
  );
};

export default Post;
