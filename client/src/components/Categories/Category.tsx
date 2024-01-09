import React from "react";

interface categoryProps {
  categoryName: string;
}

const Category: React.FC<categoryProps> = ({ categoryName }) => {
  return (
    <li className="border border-gray-800 cursor-pointer rounded-sm p-5 text-[#98989A]">
      {categoryName}
    </li>
  );
};

export default Category;
