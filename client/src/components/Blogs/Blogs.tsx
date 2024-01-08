import React from "react";
import Categories from "../Categories/Categories";
import { categories } from "../../constants/data";

const Blogs = () => {
  return (
    <section className="bg-[#141414] h-screen">
      <div className="max-w-[1400px] mx-auto p-6">
        <h1 className="text-center font-semibold text-5xl m-20">
          Explore our newest great posts
        </h1>
        <Categories categories={categories} />
      </div>
    </section>
  );
};

export default Blogs;
