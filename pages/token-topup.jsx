import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";
import AppLayout from "../components/AppLayout";

export default function TokenTopup() {
  async function handleClick() {
    await fetch(`/api/addTokens`, {
      method: 'POST',
    })
  }
  return <div>
    <h1>This is the token topup</h1>
    <button className="btn" onClick={handleClick}>Add Tokens</button>
  </div>;
};

TokenTopup.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
