import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { ObjectId } from "mongodb";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSlackHash } from "react-icons/fa";
import AppLayout from "../../components/AppLayout";
import { usePosts } from "../../context/PostsContext";
import clientPromise from "../../lib/mongodb";
import { getAppProps } from "../../utils/getAppProps";

const Post = (props) => {
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { deletePost } = usePosts();

  async function handleDeleteConfirm() {
    try {
      const response = await fetch(`/api/deletePosts`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ postId: props.id }),
      }).then((res) => res.json());
      if (response.success) {
        deletePost(props.id)
        router.push(`/post/new`);
        router.refresh();
      }
    } catch (error) {}
  }
  return (
    <div className="overflow-auto h-full py-8 px-4">
      <div className="max-w-screen-md mx-auto">
        <div className="text-2xl font-bold mt-6 p-2 bg-stone-200 rounded-sm">
          Seo Title and meta description
        </div>
        <div className="p-4 my-2 border border-stone-200 rounded-md">
          <div className="text-blue-600 text-2xl font-bold">
            {props.postTitle}
          </div>
          <div className="mt-2">{props.metaDescription}</div>
        </div>
        <div className="text-2xl font-bold mt-6 p-2 bg-stone-200 rounded-sm">
          Keywords
        </div>
        <div className="flex flex-wrap pt-2 gap-1">
          {props.keywords.split(", ").map((keyword, idx) => (
            <div key={idx} className="p-2 rounded-full bg-slate-800 text-white flex items-center gap-1 font-bold">
              <FaSlackHash />
              {keyword}
            </div>
          ))}
        </div>
        <div className="text-2xl font-bold mt-6 p-2 bg-stone-200 rounded-sm">
          Blog post
        </div>
        <div
          className="px-2"
          dangerouslySetInnerHTML={{ __html: props.postContent || "" }}
        />
        <div className="my-4">
          {!showDeleteConfirm && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="btn btn-error w-full"
            >
              Delete Post
            </button>
          )}
          {showDeleteConfirm && (
            <div className="flex flex-col gap-4">
              <p className="p-2 bg-accent text-center">
                Are you sure you want to delete this post? This action is
                irreversible
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="btn btn-outline"
                >
                  cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="btn btn-error"
                >
                  confirm delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;

Post.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    const userSession = await getSession(ctx.req, ctx.res);
    const client = await clientPromise;
    const db = client.db("OpenAIBlog");
    const user = await db.collection("users").findOne({
      auth0Id: userSession.user.sub,
    });
    const post = await db.collection("posts").findOne({
      _id: new ObjectId(ctx.params.postId),
      userId: user._id,
    });
    if (!post) {
      return {
        redirect: {
          destination: "/post/new",
          permanent: false,
        },
      };
    }
    return {
      props: {
        id: ctx.params.postId,
        postContent: post.postContent,
        title: post.postTitle,
        metaDescription: post.metaDescription,
        keywords: post.keywords,
        postCreated: post.created.toString(),
        ...props,
      },
    };
  },
});
