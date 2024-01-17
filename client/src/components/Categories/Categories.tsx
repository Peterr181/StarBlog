// Categories.tsx

import React, { useState } from "react";
import Category from "./Category";

interface CategoriesProps {
  categories: CategoryData[];
  setSelectedCategory: (categoryName: string) => void;
  selectedCategory: string;
}

interface CategoryData {
  id: number;
  name: string;
}

const Categories: React.FC<CategoriesProps> = ({
  setSelectedCategory,
  selectedCategory,
  categories,
}) => {
  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  return (
    <div className="flex justify-center  ">
      <ul className="flex gap-14">
        {categories.map((category, index) => (
          <Category
            key={index}
            categoryName={category.name}
            isSelected={category.name === selectedCategory}
            onClick={() => handleCategoryClick(category.name)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Categories;
