import Link from "next/link";
import { useNav } from "../../context/NavContext";
import { usePosts } from "../../context/PostsContext";

const Posts = () => {
  const { postId } = useNav();
  const mobileStyle =
    "hover:bg-stone-200 hover:no-underline text-ellipsis overflow-x-hidden m-auto overflow-y-scroll w-[8rem] whitespace-nowrap block p-2 rounded-md";

  const deskTopStyle =
    "py-1 text-ellipsis overflow-hidden whitespace-nowrap block hover:bg-white/40 hover:no-underline p-2 rounded-md";

  return (
    <>
      <Posts.Mobile>
        <Posts.Lists render={renderPostLink(postId, mobileStyle)} />
        <Posts.More />
      </Posts.Mobile>

      <Posts.Desktop>
        <Posts.Lists render={renderPostLink(postId, deskTopStyle)} />
        <Posts.More />
      </Posts.Desktop>
    </>
  );
};

const renderPostLink = (postId, style) => {
  const RenderedPostLink = (post) => (
    <Link
      key={post?._id}
      href={`/post/${post?._id}`}
      className={`${style} ${
        post?._id === postId ? "bg-stone-200 lg:bg-white/40" : "border-white/0"
      }`}
    >
      {post?.topic}
    </Link>
  );

  RenderedPostLink.displayName = "RenderedPostLink";
  return RenderedPostLink;
};

const Lists = ({ render }) => {
  const { posts } = usePosts();
  if (posts.length === 0) return <p>No data to show at the moment</p>;
  return <>{posts.map(render)}</>;
};

const More = () => {
  const { posts, noMorePosts, getPosts } = usePosts();
  return (
    <>
      {!noMorePosts && (
        <div
          onClick={() => {
            getPosts({ lastPostDate: posts[posts.length - 1].created });
          }}
          className="hover:underline text-sm text-secondary text-center cursor-pointer mt-4"
        >
          Load More Posts
        </div>
      )}
    </>
  );
};

const Mobile = ({ children }) => {
  return (
    <ul
      tabIndex={0}
      className="lg:hidden menu menu-sm dropdown-content z-[1] w-[10rem] overflow-x-scroll bg-base-100 shadow rounded-box"
    >
      {children}
    </ul>
  );
};

const Desktop = ({ children }) => {
  return (
    <div className="hidden px-4 flex-1 lg:flex flex-col gap-1 overflow-auto">
      {children}
    </div>
  );
};

Posts.Lists = Lists;
Posts.More = More;
Posts.Mobile = Mobile;
Posts.Desktop = Desktop;

export default Posts;
