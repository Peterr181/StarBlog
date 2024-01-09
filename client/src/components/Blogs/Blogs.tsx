import React from "react";
import Categories from "../Categories/Categories";
import { categories } from "../../constants/data";
import Posts from "../Posts/Posts";

const Blogs = () => {
  return (
    <section className="mb-60">
      <div className="max-w-[1400px] mx-auto p-6">
        <h1 className="text-center font-semibold text-5xl m-10">
          Explore our newest great posts 💖
        </h1>
      </div>
      <div className="w-full border-b-2 border-t-2 pt-6 border-gray-800 pb-6 ">
        <Categories categories={categories} />
      </div>
      <Posts />
    </section>
  );
};

export default Blogs;
