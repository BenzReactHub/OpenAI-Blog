import { AuthRouteProtect } from "./AuthRouteProtect";
import React from "react";

const Post = () => {
  return <div>Post</div>;
};

export default Post;

export const getServerSideProps = AuthRouteProtect;
