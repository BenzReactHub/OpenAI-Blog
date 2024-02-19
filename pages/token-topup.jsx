import { AuthRouteProtect } from "./post/AuthRouteProtect";
import React from "react";

const TokenTopup = () => {
  return <div>TokenTopup</div>;
};

export default TokenTopup;

export const getServerSideProps = AuthRouteProtect;
