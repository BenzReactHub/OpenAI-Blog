import { faBrain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Logo = () => {
  return (
    <div className="text-3xl text-center py-4 flex font-heading items-center gap-2">
      <span className="inline-block">OpenAI-Blog</span>
      <FontAwesomeIcon icon={faBrain} className="text-2xl text-slate-400" />
    </div>
  );
};

export default Logo;
