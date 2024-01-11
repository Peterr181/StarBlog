import React, { useState } from "react";
import Editor from "react-simple-wysiwyg";

interface PostCreatorProps {
  setIsPostAdding: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NewPostData {
  title: string;
  content: string;
  category: string;
}

const PostCreator: React.FC<PostCreatorProps> = ({ setIsPostAdding }) => {
  const [html, setHtml] = useState("");
  const [title, setTitle] = useState("");
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
    setIsPostAdding(false);
  };

  const handleAddPost = () => {
    const newPostData = {
      title: title,
      content: html,
      category: selectedOption || "Default Category",
    };

    submitNewPost(newPostData);
  };

  const submitNewPost = (postData: NewPostData) => {
    fetch("http://localhost/index.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New post added:", data);
      })
      .catch((error) => console.error("Error adding a new post:", error))
      .finally(() => {
        setIsPostAdding(false);
      });
  };

  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-center mb-10 text-2xl">Adding new post...</h1>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#1A1A1A] border border-gray-800 p-5 flex gap-3 items-center rounded-md customclass outline-none mb-6 w-full"
            placeholder="Title..."
          />
        </div>
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
        <div className="flex items-center justify-between mt-10">
          <div className="flex gap-3">
            <div
              className="bg-[#141414] border border-gray-800 p-5 flex gap-3 items-center rounded-md cursor-pointer customclass"
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
              <div className="absolute mt-2 bg-[#141414] border border-gray-800 rounded-md customclass ">
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
