import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";
import AppLayout from "../../components/AppLayout";

export default function NewPost(props) {
  
  async function handleClick() {
    const response = await fetch('/api/generatePost', {
      method: 'POST'
    }).then(res => res.json())
    console.log('post', response)
  }
  return (
    <div>
      <h1>This is the new post page</h1>
      <button className="btn" onClick={handleClick}>
        Generate
      </button>
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
