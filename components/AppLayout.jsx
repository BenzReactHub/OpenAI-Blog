import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineUser } from "react-icons/hi2";
import { PiArticleMediumBold } from "react-icons/pi";
import PostsContext from "../context/PostsContext";
import Logo from "./Logo";
import Tokens from "./Tokens";

const AppLayout = ({
  children,
  availableToken,
  posts: postsFromSSR,
  postCreated,
  postId,
}) => {
  const { user } = useUser();

  const { setPostsFromSSR, posts, getPosts, noMorePosts } =
    useContext(PostsContext);

  useEffect(() => {
    setPostsFromSSR(postsFromSSR);
    if (postId) {
      const exists = postsFromSSR.find((post) => post._id === postId);
      if (!exists) {
        getPosts({ getNewerPosts: true, lastPostDate: postCreated });
      }
    }
  }, [postsFromSSR, setPostsFromSSR, postId, postCreated, getPosts]);

  return (
    <div className="grid gird-cols-1 lg:grid-cols-[300px_1fr] h-screen max-h-screen">
      <SideBar
        postId={postId}
        user={user}
        posts={posts}
        availableToken={availableToken}
        noMorePosts={noMorePosts}
        getPosts={getPosts}
      />
      <NavBar
        postId={postId}
        user={user}
        posts={posts}
        availableToken={availableToken}
        noMorePosts={noMorePosts}
        getPosts={getPosts}
      />
      {children}
    </div>
  );
};

const SideBar = ({
  postId,
  user,
  posts,
  availableToken,
  noMorePosts,
  getPosts,
}) => {
  return (
    <div className="hidden lg:flex flex-col bg-gradient-b text-white overflow-hidden">
      <div className="px-2">
        <Logo />
        <Link
          href="/post/new"
          className="btn btn-secondary w-full text-xl hover:no-underline"
        >
          New Post
        </Link>
        <Tokens availableToken={availableToken} />
      </div>
      <div className="px-4 flex-1 flex flex-col gap-1 overflow-auto">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/post/${post._id}`}
            className={`py-1 text-ellipsis overflow-hidden whitespace-nowrap block hover:bg-white/40 hover:no-underline p-2 rounded-md ${
              postId === post._id ? "bg-white/40" : "border-white/0"
            }`}
          >
            {post.topic}
          </Link>
        ))}
        {!noMorePosts && (
          <div
            onClick={() => {
              getPosts({ lastPostDate: posts[posts.length - 1].created });
            }}
            className="hover:underline text-sm text-base-200 text-center cursor-pointer mt-4"
          >
            Load More Posts
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 border-t border-t-white h-20 px-2">
        {user ? (
          <>
            <div className="min-w-[50px]">
              <Image
                src={user.picture}
                alt={user.name}
                height={50}
                width={50}
                className="rounded-full"
              />
            </div>
            <div className="flex-1 font-extrabold text-base-200">
              <div>{user?.email}</div>
              <Link
                className="text-sm hover:no-underline"
                href="/api/auth/logout"
              >
                Logout
              </Link>
            </div>
          </>
        ) : (
          <Link href="/api/auth/login">Login</Link>
        )}
      </div>
    </div>
  );
};

const NavBar = ({
  posts,
  postId,
  user,
  availableToken,
  noMorePosts,
  getPosts,
}) => {
  return (
    <div className="lg:hidden h-[6rem] flex items-center justify-between px-8 bg-gradient-r">
      <Logo />
      <div className="flex items-center gap-3">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="text-xl">
            <PiArticleMediumBold className="text-3xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content z-[1] w-[10rem] overflow-x-scroll bg-base-100 shadow rounded-box"
          >
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/post/${post._id}`}
                className={`hover:bg-stone-200 hover:no-underline text-ellipsis overflow-x-hidden m-auto overflow-y-scroll w-[8rem] whitespace-nowrap block p-2 rounded-md ${
                  post._id === postId ? "bg-stone-200" : ""
                }`}
              >
                {post.topic}
              </Link>
            ))}
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
          </ul>
        </div>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <Tokens availableToken={availableToken} />
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="text-xl">
            <HiOutlineUser className="text-3xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content z-[1] shadow bg-base-100 pr-8 rounded-box overflow-auto flex flex-col items-start px-2"
          >
            <li>
              <div className="flex">
                <Image
                  src={user?.picture}
                  alt={user?.name}
                  height={25}
                  width={25}
                  className="rounded-full"
                />
                <span className="">{user?.email}</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="text-xl">
            <GiHamburgerMenu className="text-3xl" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content z-[1] shadow bg-base-100 rounded-box w-[8rem]"
          >
            <li>
              <Link href="/post/new" className="btn btn-outline btn-info">
                New Post
              </Link>
            </li>
            <li>
              <Link
                href="/api/auth/logout"
                className="btn btn-outline btn-error"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
