import React, { useState, useEffect } from "react";
import face from "../../assets/face.jpg";
import PostCreator from "./PostCreator";
import Comments from "../Comments/Comments";
import Modal, { Styles } from "react-modal";
import { iconFile } from "../../utils/iconFile";

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

interface CommentForPost {
  id: number;
  postId: number;
  nickname: string;
  title: string;
  content: string;
  created_at: string;
}

interface PostProps {
  isNewPostAdded: boolean;
}

const Post: React.FC<PostProps> = ({ isNewPostAdded }) => {
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

  const formatDate = (timestamp: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(timestamp).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const fetchPosts = () => {
      fetch("http://localhost/react-blog/server/index.php")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => setPosts(data))
        .catch((error) => console.error("Error fetching posts:", error));
    };

    fetchPosts();

    // Fetch posts again when isNewPostAdded is true
    if (isNewPostAdded || !isNewPostAdded) {
      fetchPosts();
    }
  }, [isNewPostAdded]);

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
    fetch(`http://localhost/react-blog/server/comments.php?postId=${postId}`)
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
                {iconFile.deleteIcon}
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
                      <>{iconFile.heartOutline}</>
                    ) : (
                      <>{iconFile.heartFilled}</>
                    )}
                    <button>{post.like_count}</button>
                  </div>
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
                <div
                  className="bg-[#141414] border border-gray-800 p-3 flex gap-3 items-center rounded-md cursor-pointer"
                  onClick={() => handleEdit(post.id)}
                >
                  <button className="" style={{ whiteSpace: "nowrap" }}>
                    Edit
                  </button>

                  {iconFile.editIcon}
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
              />
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
