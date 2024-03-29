import React, { useState, useEffect, useRef } from "react";
import { formatDistanceToNow } from "date-fns";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuthData } from "../../hooks/useAuthData";
import { useUserData } from "../../hooks/useUserData";

declare const process: {
  env: {
    REACT_APP_SITE_KEY: string;
  };
};

interface CommentForPost {
  id: number;
  postId: number;
  nickname: string;
  title: string;
  content: string;
  created_at: string;
}

interface CommentsProps {
  postId: number;
  comments: CommentForPost[];
  setComments: React.Dispatch<React.SetStateAction<CommentForPost[]>>;
  setIsCommentAdded: React.Dispatch<React.SetStateAction<boolean>>;
  updateCommentCount: any;
}

interface NewCommentData {
  postId: number;
  nickname: string;
  title: string;
  content: string;
}

const Comments: React.FC<CommentsProps> = ({
  postId,
  comments,
  setComments,
  setIsCommentAdded,
  updateCommentCount,
}) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const recaptcha = useRef<ReCAPTCHA | null>(null);

  const { userId, isAuthenticated } = useAuthData();
  const userData = useUserData(userId);

  useEffect(() => {
    console.log("Current postId:", postId);
    fetchComments();
  }, [postId]);

  const fetchComments = () => {
    fetch(
      `http://localhost/react-blog/server/api/src/comments/get/index.php?postId=${postId}`
    )
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  };

  const handleAdding = () => {
    setIsAddingComment(true);
  };

  const submitNewComment = async (e: React.FormEvent) => {
    e.preventDefault();

    const captchaValue = recaptcha.current?.getValue();

    if (!captchaValue) {
      alert("Please verify the reCAPTCHA!");
      return;
    }

    const commentData: NewCommentData = {
      postId: postId,
      nickname: userData ? userData.username : nickname,
      title: title,
      content: content,
    };

    fetch("http://localhost/react-blog/server/api/src/comments/add/index.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New comment added:", data);

        setComments((prevComments: CommentForPost[]) => [
          ...prevComments,
          data,
        ]);

        updateCommentCount(postId, data.comment_count);
      })
      .catch((error) => console.error("Error adding a new comment:", error))
      .finally(() => {
        setIsAddingComment(false);

        fetchComments();
        setIsCommentAdded(true);
      });
  };

  const filteredComments = comments.filter(
    (comment) => comment.postId == postId
  );

  const formatDateDistance = (timestamp: string) => {
    const distance = formatDistanceToNow(new Date(timestamp), {
      addSuffix: true,
    });
    return distance;
  };

  console.log(filteredComments);

  return (
    <div>
      <div className="flex justify-center flex-col">
        <div className="flex justify-center mb-5">
          {!isAddingComment && (
            <button
              className="bg-[#141414] border border-gray-800 p-5 flex gap-3 items-center rounded-md cursor-pointer customclass"
              onClick={handleAdding}
            >
              Add Comment
            </button>
          )}
        </div>
        {isAddingComment && (
          <div>
            <form className="flex flex-col gap-8">
              {!userData && (
                <input
                  type="text"
                  placeholder="Enter your nickname..."
                  className="bg-[#141414] border border-gray-800 p-5 flex gap-3 items-center rounded-md  customclass outline-none"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              )}
              <input
                type="text"
                placeholder="Enter comment title..."
                className="bg-[#141414] border border-gray-800 p-5 flex gap-3 items-center rounded-md  customclass outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter comment content..."
                className="bg-[#141414] border border-gray-800 p-5 flex gap-3 items-center rounded-md  customclass outline-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <ReCAPTCHA
                ref={(ref) => (recaptcha.current = ref)}
                sitekey="6Lfb1VApAAAAAGga8ia2-rQ4lz35_oBN-MbDDxAn"
              />
              <div className="flex justify-center" onClick={submitNewComment}>
                <button
                  type="submit"
                  className="bg-[#141414] border border-gray-800 p-5 flex gap-3 items-center rounded-md cursor-pointer customclass"
                >
                  Add new comment
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      {filteredComments.map((comment) => (
        <div key={comment.id} className="">
          <div className="bg-[#1A1A1A] p-8 rounded-md mt-6">
            <div className="flex justify-between">
              <p>{comment.nickname}</p>
              <p>{formatDateDistance(comment.created_at)}</p>
            </div>
            <p className="text-center text-[#FFD11A]">{comment.title}</p>
            <p className="text-center mt-3">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
