import React, { useState } from "react";
import Editor from "react-simple-wysiwyg";

type ClosePostCreator = () => void;

interface PostCreatorProps {
  setIsPostAdding?: React.Dispatch<React.SetStateAction<boolean>>;
  mode: "editing" | "adding";
  postTitle?: string;
  postContent?: string;
  setIsPostEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  closePostCreator?: ClosePostCreator;
  postId?: number;
  setNewPostAdded?: React.Dispatch<React.SetStateAction<number>>;
  fetchPosts?: () => void;
}

interface NewPostData {
  title: string;
  content: string;
  category: string;
}

const PostCreator: React.FC<PostCreatorProps> = ({
  setIsPostAdding,
  setIsPostEditing,
  closePostCreator,
  mode,
  postTitle,
  postContent,
  postId,
  setNewPostAdded,
  fetchPosts,
}) => {
  const [html, setHtml] = useState("");
  const [title, setTitle] = useState("");

  const [existingTitle, setExistingTitle] = useState(postTitle || "");
  const [exisitngContent, setExistingConent] = useState(postContent || "");

  function onChange(e: any) {
    setHtml(e.target.value);
  }

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = ["Technology", "Health", "Politics"];

  const handleSelectToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsPostAdding && setIsPostAdding(false);
    if (mode === "editing") {
      setIsPostEditing && setIsPostEditing(false);
    }

    closePostCreator && closePostCreator();
  };
  const handleAddPost = async (e: any) => {
    e.preventDefault();
    const newPostData = {
      title: title,
      content: html,
      category: selectedOption || "Default Category",
    };

    const editingPostData = {
      title: existingTitle,
      content: exisitngContent,
      category: selectedOption || "Default Category", // Set default category if selectedOption is not defined
    };

    if (mode === "adding") {
      if (setNewPostAdded) {
        setNewPostAdded((prev) => prev + 1);
      }
      await submitNewPost(newPostData);
      fetchPosts && fetchPosts();
    } else if (mode === "editing") {
      if (setNewPostAdded) {
        console.log("post zedytowany");
        setNewPostAdded((prev) => prev + 1);
      }
      await submitEditingPost(editingPostData);
      fetchPosts && fetchPosts();
    }
  };

  const submitNewPost = async (postData: NewPostData) => {
    try {
      const response = await fetch(
        "http://localhost/react-blog/server/api/src/posts/add/index.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("New post added:", data);
    } catch (error) {
      console.error("Error adding a new post:", error);
    } finally {
      setIsPostAdding && setIsPostAdding(false);
    }
  };

  const submitEditingPost = async (postData: NewPostData) => {
    try {
      const response = await fetch(
        `http://localhost/react-blog/server/api/src/posts/update/index.php?id=${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // You can process the response data if needed
      const data = await response.json();
      console.log("Post updated:", data);
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setIsPostEditing && setIsPostEditing(false);

      closePostCreator && closePostCreator();
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-center mb-10 text-2xl">
          {(mode === "adding" && "Adding new post...") ||
            (mode === "editing" && "Editing post...")}
        </h1>
        <div>
          {mode === "adding" && (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#1A1A1A] border border-gray-800 p-5 flex gap-3 items-center rounded-md customclass outline-none mb-6 w-full"
              placeholder="Title..."
            />
          )}
          {mode === "editing" && (
            <input
              type="text"
              value={existingTitle}
              onChange={(e) => setExistingTitle(e.target.value)}
              className="bg-[#1A1A1A] border border-gray-800 p-5 flex gap-3 items-center rounded-md customclass outline-none mb-6 w-full"
              placeholder="Title..."
            />
          )}
        </div>
        {mode === "adding" && (
          <div className="bg-[#1A1A1A]">
            <Editor
              value={html}
              onChange={onChange}
              containerProps={{
                style: {
                  resize: "none",
                  backgroundColor: "#1A1A1A",
                  color: "#fff",
                },
              }}
            />
          </div>
        )}
        {mode === "editing" && (
          <div className="bg-[#1A1A1A]">
            <Editor
              value={exisitngContent}
              onChange={(e) => setExistingConent(e.target.value)}
              containerProps={{
                style: {
                  resize: "none",
                  backgroundColor: "#1A1A1A",
                  color: "#fff",
                },
              }}
            />
          </div>
        )}
        <div className="flex items-center justify-between mt-10">
          <div className="flex gap-3">
            <div
              className="bg-[#141414] border border-gray-800 p-5 flex gap-3 items-center rounded-md cursor-pointer customclass"
              onClick={handleAddPost}
            >
              <button>{mode === "adding" ? "Add post" : "Edit post"}</button>
              {mode === "adding" && (
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
              )}
              {mode === "editing" && (
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
              )}
            </div>
            <div
              className="bg-[#141414] border border-gray-800 p-5 flex gap-3 items-center rounded-md cursor-pointer customclass"
              onClick={handleCancel}
            >
              <button>Cancel</button>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="red"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18L18 6M6 6L18 18"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div>
            <div
              className="bg-[#141414] border border-gray-800 p-5 flex gap-3 items-center rounded-md cursor-pointer customclass w-40"
              onClick={handleSelectToggle}
            >
              <span>{selectedOption || "Category"}</span>
              <svg
                className="w-6 h-6 fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </div>
            {isOpen && (
              <div className="absolute mt-2 bg-[#141414] border border-gray-800 rounded-md customclass z-10 ">
                {options.map((option) => (
                  <div
                    key={option}
                    className="p-5 cursor-pointer hover:bg-gray-700 w-40 "
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCreator;
