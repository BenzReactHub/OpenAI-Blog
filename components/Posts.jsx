import Link from "next/link";

const Posts = ({ posts, postId, getPosts, noMorePosts }) => {
  return (
    <>
      <Posts.Mobile>
        <Posts.Lists posts={posts} postId={postId} mode="mobile" />
        <Posts.More
          posts={posts}
          noMorePosts={noMorePosts}
          getPosts={getPosts}
        />
      </Posts.Mobile>

      <Posts.Desktop>
        <Posts.Lists posts={posts} postId={postId} mode="desktop" />
        <Posts.More
          posts={posts}
          noMorePosts={noMorePosts}
          getPosts={getPosts}
        />
      </Posts.Desktop>
    </>
  );
};

const Lists = ({ posts, postId, mode }) => {
  let baseStyle = "";
  if (mode === "mobile")
    baseStyle =
      "hover:bg-stone-200 hover:no-underline text-ellipsis overflow-x-hidden m-auto overflow-y-scroll w-[8rem] whitespace-nowrap block p-2 rounded-md";
  if (mode === "desktop")
    baseStyle =
      "py-1 text-ellipsis overflow-hidden whitespace-nowrap block hover:bg-white/40 hover:no-underline p-2 rounded-md";
  return (
    <>
      {posts.map((post) => (
        <Link
          key={post._id}
          href={`/post/${post._id}`}
          className={`${baseStyle} ${
            post._id === postId
              ? "bg-stone-200 lg:bg-white/40"
              : "border-white/0"
          }`}
        >
          {post.topic}
        </Link>
      ))}
    </>
  );
};

const More = ({ posts, noMorePosts, getPosts }) => {
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
