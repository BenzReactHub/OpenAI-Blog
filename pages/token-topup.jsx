import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";
import AppLayout from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";

export default function TokenTopup() {
  async function handleClick() {
    const result = await fetch(`/api/addTokens`, {
      method: "POST",
    }).then((res) => res.json());
    window.location.href = result.session.url;
  }
  return (
    <div className="max-w-screen-lg m-auto">
      <h1>This is the token topup</h1>
      <button className="btn" onClick={handleClick}>
        Add Tokens
      </button>
    </div>
  );
}

TokenTopup.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    return {
      props,
    };
  },
});
