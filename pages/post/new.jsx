import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState } from "react";
import AppLayout from "../../components/AppLayout";
import { useRouter } from "next/navigation";
import { getAppProps } from "../../utils/getAppProps";
export default function NewPost(props) {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("/api/generatePost", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ topic, keywords }),
    }).then((res) => res.json());
    if(response?.postId) {
      router.push(`/post/${response.postId}`)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <strong>Generate a blog post on the topic of:</strong>
          </label>
          <textarea
            className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
            }}
          />
        </div>
        <div>
          <label>
            <strong>Targeting the following keywords:</strong>
          </label>
          <textarea
            className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm"
            value={keywords}
            onChange={(e) => {
              setKeywords(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn">
          Generate
        </button>
      </form>
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
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
