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
    <div className="h-full p-4 lg:flex lg:flex-col lg:justify-center lg:items-center">
      <div className="bg-neutral-content/80 rounded-md p-8 w-[80%] m-auto lg:w-[35rem]">
        <h1 className="text-center text-xl lg:text-2xl">This is the token topup</h1>
        <button className="btn btn-secondary w-full text-xl" onClick={handleClick}>
          Add Tokens
        </button>
      </div>
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
