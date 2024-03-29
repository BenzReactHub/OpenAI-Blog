import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState } from "react";
import AppLayout from "../../components/AppLayout";
import { useRouter } from "next/navigation";
import { getAppProps } from "../../utils/getAppProps";
import { FaPenNib } from "react-icons/fa";

export default function NewPost(props) {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [generating, setGenerating] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setGenerating(true);
    try {
      const response = await fetch("/api/generatePost", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ topic, keywords }),
      }).then((res) => res.json());
      if (response?.postId) {
        router.push(`/post/${response.postId}`);
        router.refresh();
      }
    } catch (error) {
      setGenerating(false);
    }
  }
  return (
    <div className="h-screen lg:h-auto overflow-hidden">
      {generating && (
        <div className="text-green-500 flex h-full animate-pulse w-full flex-col justify-center items-center">
          <FaPenNib className="text-3xl"/>
          <h6>Generating...</h6>
        </div>
      )}

      {!generating && (
        <div className="w-full h-full flex flex-col overflow-auto">
          <form
            onSubmit={handleSubmit}
            className="m-auto w-[80%] lg:w-[35rem] max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border border-slate-200 shadow-slate-200"
          >
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
                maxLength={80}
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
                maxLength={80}
              />
              <small className="block mb-2">
                Separate keyword with a comma
              </small>
            </div>
            <button
              type="submit"
              className="btn btn-secondary w-full text-xl text-white"
              disabled={!topic.trim() || !keywords.trim()}
            >
              Generate
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    if (!props.availableToken) {
      return {
        redirect: {
          destination: "/token-topup",
          permanent: false,
        },
      };
    }
    return {
      props,
    };
  },
});
