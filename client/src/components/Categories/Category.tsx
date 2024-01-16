// Category.tsx

import React from "react";

interface CategoryProps {
  categoryName: string;
  isSelected: boolean;
  onClick: () => void;
}

const Category: React.FC<CategoryProps> = ({
  categoryName,
  isSelected,
  onClick,
}) => {
  return (
    <li
      className={`border border-gray-800 cursor-pointer rounded-sm p-5 text-[#98989A] ${
        isSelected ? "text-[#fff] font-bold" : ""
      }`}
      onClick={onClick}
    >
      {categoryName}
    </li>
  );
};

export default Category;
