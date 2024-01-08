import React from "react";
import Category from "./Category";

interface CategoriesProps {
  categories: CategoryData[];
}

interface CategoryData {
  id: number;
  name: string;
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <div className="flex justify-center ">
      <ul className="flex gap-14">
        {categories.map((category, index) => (
          <Category key={index} categoryName={category.name} />
        ))}
      </ul>
    </div>
  );
};

export default Categories;
