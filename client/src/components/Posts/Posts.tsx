import React, { useState } from "react";
import Post from "./Post";
import PostCreator from "./PostCreator";

const Posts = () => {
  const [isNewPostAdded, setNewPostAdded] = useState<number>(0);

  return (
    <div>
      <Post isNewPostAdded={isNewPostAdded} setNewPostAdded={setNewPostAdded} />
      <div className=" border-b-2 border-gray-800 "></div>
    </div>
  );
};

export default Posts;
