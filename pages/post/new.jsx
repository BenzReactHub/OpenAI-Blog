import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState } from "react";
import AppLayout from "../../components/AppLayout";

export default function NewPost(props) {
  const [postContent, setPostContent] = useState("");
  async function handleClick() {
    const response = await fetch("/api/generatePost", {
      method: "POST",
    }).then((res) => res.json());
    console.log("Post: ", response.post.postContent);
    setPostContent(response.post.postContent);
  }
  return (
    <div>
      <h1>This is the new post page</h1>
      <button className="btn" onClick={handleClick}>
        Generate
      </button>
      <div
        className="max-w-screen-sm p-10"
        dangerouslySetInnerHTML={{ __html: postContent }}
      />
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
