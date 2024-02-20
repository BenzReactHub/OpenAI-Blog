import { FaPenNib } from "react-icons/fa";
import React from "react";

const Logo = () => {
  return (
    <div className="text-3xl text-center py-4 flex font-heading justify-center items-center gap-2">
       <span className="hidden lg:inline-block">OpenAI-Blog</span>
      <FaPenNib/>
    </div>
  );
};

export default Logo;
