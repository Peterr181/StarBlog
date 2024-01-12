import React from "react";

interface Comment {
  id: number;
  postId: number;
  text: string;
  // Add other comment properties as needed
}

interface CommentsProps {
  postId: number;
  comments: Comment[];
}

const Comments: React.FC<CommentsProps> = ({ postId, comments }) => {
  return (
    <div>
      <h3>Comments for Post #{postId}</h3>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
