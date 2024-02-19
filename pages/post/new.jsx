import { AuthRouteProtect } from "./AuthRouteProtect";
import React from "react";

const NewPost = (props) => {
  console.log(props.test);
  return (
    <div>
      <h1>This is the new post page</h1>
    </div>
  );
};

export default NewPost;

export const getServerSideProps = AuthRouteProtect;
